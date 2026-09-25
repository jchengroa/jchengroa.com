/**
 * Performance Manager & Hardware-Adaptive Lite Motion Engine
 * Automatically balances rich visual fidelity vs. butter-smooth performance.
 * 
 * Features:
 * 1. Hardware Detection: Checks CPU cores, RAM, network saveData, and OS accessibility.
 * 2. Runtime Frame Rate (FPS) Watchdog: Samples frame deltas and jank frames during interaction.
 * 3. Automatic Escalation: If device drops frames (<40 FPS) with animations enabled, auto-engages Lite Motion.
 * 4. User Preference Integration: Supports 'auto' (default), 'enabled' (force on), 'disabled' (force off).
 */

const STORAGE_KEY = 'jchengroa_reduced_motion';

// Hardware quality evaluation
export function checkLowSpecHardware() {
    if (typeof window === 'undefined') return false;

    // 1. Accessibility OS Preference
    try {
        if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return true;
        }
    } catch (_) {}

    // 2. Data Saver / Low Connection
    try {
        if (navigator.connection && (navigator.connection.saveData === true || ['slow-2g', '2g'].includes(navigator.connection.effectiveType))) {
            return true;
        }
    } catch (_) {}

    // 3. Limited CPU Cores (Budget smartphones, low-power netbooks)
    try {
        if (typeof navigator.hardwareConcurrency === 'number' && navigator.hardwareConcurrency <= 4) {
            return true;
        }
    } catch (_) {}

    // 4. Low RAM memory (Chromium API)
    try {
        if (typeof navigator.deviceMemory === 'number' && navigator.deviceMemory <= 4) {
            return true;
        }
    } catch (_) {}

    return false;
}

// Current Motion Mode: 'auto' | 'enabled' | 'disabled'
export function getMotionMode() {
    if (typeof window === 'undefined') return 'auto';
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'true') return 'enabled';
    if (saved === 'false') return 'disabled';
    return 'auto';
}

// Internal State
let currentActiveState = false;
let isWatchdogActive = false;
let watchdogRafId = null;

// Determine if Lite Motion should currently be active
export function calculateIsLiteMotionActive() {
    const mode = getMotionMode();
    if (mode === 'enabled') return true;
    if (mode === 'disabled') return false;
    
    // Auto Mode: Hardware check
    return checkLowSpecHardware();
}

/**
 * Real-time Runtime Performance Watchdog
 * Only runs when Lite Motion is in 'auto' mode and currently inactive.
 * Monitors real rendering frame times over a 60-frame sliding window.
 * If severe frame drops or jank are encountered, automatically activates Lite Motion.
 */
export function startPerformanceWatchdog(onAutoEngage) {
    if (typeof window === 'undefined') return;
    if (isWatchdogActive) return;

    // Only monitor if we are in auto mode and animations are currently active
    const mode = getMotionMode();
    if (mode !== 'auto') return;
    if (calculateIsLiteMotionActive()) return;

    isWatchdogActive = true;

    let frameCount = 0;
    let lastTime = performance.now();
    let jankFrames = 0;
    let windowStartTime = lastTime;
    const MAX_SAMPLES = 120; // 2 seconds at 60Hz

    // Long Task Observer (detects main thread pauses > 50ms)
    let observer = null;
    try {
        if ('PerformanceObserver' in window && PerformanceObserver.supportedEntryTypes?.includes('longtask')) {
            observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (entry.duration > 65) {
                        jankFrames += 2;
                        if (jankFrames >= 4) {
                            triggerAutoLiteMotion('longtask_detected');
                        }
                    }
                }
            });
            observer.observe({ entryTypes: ['longtask'] });
        }
    } catch (_) {}

    function triggerAutoLiteMotion(reason = 'low_fps') {
        stopWatchdog();
        currentActiveState = true;
        document.documentElement.setAttribute('data-reduce-animations', 'true');
        window.dispatchEvent(new CustomEvent('jchengroa_reduced_motion_setting_changed', { 
            detail: true,
            reason: reason 
        }));
        if (typeof onAutoEngage === 'function') {
            onAutoEngage(true, reason);
        }
    }

    function checkFrame(currentTime) {
        if (!isWatchdogActive) return;

        const delta = currentTime - lastTime;
        lastTime = currentTime;

        // A frame taking > 32ms indicates < 31 FPS (severe jank)
        if (delta > 32) {
            jankFrames++;
        }

        frameCount++;

        // Every window evaluation
        if (frameCount >= MAX_SAMPLES) {
            const elapsed = currentTime - windowStartTime;
            const averageFps = (frameCount / elapsed) * 1000;

            // If average FPS dropped below 38 FPS or more than 4 severely janky frames occurred
            if (averageFps < 38 || jankFrames >= 4) {
                triggerAutoLiteMotion(`low_fps_${Math.round(averageFps)}`);
                return;
            }

            // Reset window counter
            frameCount = 0;
            jankFrames = 0;
            windowStartTime = currentTime;
        }

        watchdogRafId = requestAnimationFrame(checkFrame);
    }

    function stopWatchdog() {
        isWatchdogActive = false;
        if (watchdogRafId) {
            cancelAnimationFrame(watchdogRafId);
            watchdogRafId = null;
        }
        if (observer) {
            try { observer.disconnect(); } catch (_) {}
            observer = null;
        }
    }

    watchdogRafId = requestAnimationFrame(checkFrame);

    // Stop watchdog after 15 seconds to completely eliminate any sampling overhead once initial page load is verified
    setTimeout(() => {
        stopWatchdog();
    }, 15000);
}

/**
 * Initialize Lite Motion on Application Boot
 */
export function initPerformanceManager() {
    if (typeof window === 'undefined') return false;

    const shouldEnable = calculateIsLiteMotionActive();
    currentActiveState = shouldEnable;
    document.documentElement.setAttribute('data-reduce-animations', shouldEnable.toString());

    // If disabled in auto mode, start performance watchdog to catch dynamic frame drops
    if (!shouldEnable && getMotionMode() === 'auto') {
        startPerformanceWatchdog();
    }

    return shouldEnable;
}

/**
 * Set Motion Mode from User Interaction: 'auto' | 'enabled' | 'disabled'
 */
export function setMotionMode(mode) {
    if (typeof window === 'undefined') return;

    if (mode === 'auto') {
        localStorage.removeItem(STORAGE_KEY);
    } else if (mode === 'enabled') {
        localStorage.setItem(STORAGE_KEY, 'true');
    } else if (mode === 'disabled') {
        localStorage.setItem(STORAGE_KEY, 'false');
    }

    const isActive = calculateIsLiteMotionActive();
    currentActiveState = isActive;
    document.documentElement.setAttribute('data-reduce-animations', isActive.toString());
    
    window.dispatchEvent(new CustomEvent('jchengroa_reduced_motion_setting_changed', { 
        detail: isActive,
        mode: mode 
    }));

    if (!isActive && mode === 'auto') {
        startPerformanceWatchdog();
    }
}
