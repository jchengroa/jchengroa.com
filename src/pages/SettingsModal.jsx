import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { HexColorPicker } from 'react-colorful';
import { ChangelogPopup } from "./Changelog";
import { siteContent } from "../data/site_content";
import { useAnimationLevel } from "../utils/animations.js";
import { applyCustomAccent, clearCustomAccent } from "../utils/colorUtils.js";

const accentColors = [
    { id: 'red', name: 'Red', hex: '#dc2626' },
    { id: 'orange', name: 'Orange', hex: '#ea580c' },
    { id: 'yellow', name: 'Yellow', hex: '#eab308' },
    { id: 'green', name: 'Green', hex: '#16a34a' },
    { id: 'blue', name: 'Blue', hex: '#2563eb' },
    { id: 'violet', name: 'Violet', hex: '#7c3aed' },
];

const STORAGE_KEYS = {
    themeMode: 'themeMode',
    accentColor: 'accentColor',
    customColor: 'customAccentColor',
    darkMode: 'darkMode',
    monochrome: 'jchengroa_monochrome',
    animationLevel: 'jchengroa_animation_level',
    animationSpeed: 'jchengroa_animation_speed',
    seenVersion: 'seenVersion',
    view: 'jchengroa_view_preference',
    subheader: 'jchengroa_subheader_visible',
    docsOutline: 'jchengroa_docs_outline_open',
    docsExpanded: 'jchengroa_docs_expanded_sections',
    docsTabs: 'jchengroa_doc_tabs_desktop_open',
    changelogOutline: 'jchengroa_changelog_outline_open',
};

const ICONS = {
    appearance: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 1 0 20"/><path d="M2 12h20"/></svg>
    ),
    animations: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="17 10 12 15 7 10"/><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
    ),
    developer: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
    ),
    data: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/></svg>
    ),
};

const SIDEBAR_ITEMS = [
    { id: 'appearance', label: 'Appearance', icon: ICONS.appearance },
    { id: 'animations', label: 'Animations', icon: ICONS.animations },
    { id: 'developer', label: 'Developer', icon: ICONS.developer },
    { id: 'data', label: 'Data', icon: ICONS.data },
];

function ToggleSwitch({ enabled, onChange, label }) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={enabled}
            onClick={() => onChange(!enabled)}
            className={`relative inline-flex items-center h-7 w-12 shrink-0 rounded-full transition-colors duration-200 focus:outline-none ${enabled ? 'bg-gray-900 dark:bg-white' : 'bg-gray-200 dark:bg-gray-700'}`}
        >
            <span className={`inline-block w-5 h-5 transform rounded-full bg-white dark:bg-gray-900 shadow-sm transition-transform duration-200 ${enabled ? 'translate-x-6' : 'translate-x-0.5'}`} />
        </button>
    );
}

function AppearanceSettings({ themeMode, setThemeMode, accentColor, setAccentColor, customHex, setCustomHex, monochrome, setMonochrome }) {
    const [pickerOpen, setPickerOpen] = useState(false);
    const [tempHex, setTempHex] = useState(customHex || '#2563eb');

    const isCustom = accentColor === 'custom';
    const currentHex = isCustom && customHex ? customHex : accentColors.find(c => c.id === accentColor)?.hex || '#2563eb';

    const handlePresetClick = (colorId) => {
        setAccentColor(colorId);
        setPickerOpen(false);
    };

    const handlePickerOpen = () => {
        setTempHex(customHex || '#2563eb');
        setPickerOpen(true);
    };

    const handlePickerChange = useCallback((hex) => {
        setTempHex(hex);
    }, []);

    const handleApply = () => {
        setCustomHex(tempHex);
        setAccentColor('custom');
        setPickerOpen(false);
    };

    return (
        <div className="space-y-10">
            <div>
                <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">
                    Theme Mode
                </h3>
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-1.5 flex flex-col sm:flex-row gap-1">
                    {['light', 'dark', 'auto'].map(mode => (
                        <button
                            key={mode}
                            onClick={() => setThemeMode(mode)}
                            className={`flex-1 min-w-0 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${themeMode === mode ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                        >
                            {mode.charAt(0).toUpperCase() + mode.slice(1)}
                        </button>
                    ))}
                </div>
                <p className="text-gray-400 dark:text-gray-500 text-xs font-medium mt-3 leading-relaxed">
                    Light uses a bright interface, Dark is easier on the eyes in low light, and Auto follows your system preference.
                </p>
            </div>

            <div>
                <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">
                    Accent Color
                </h3>
                <div className="flex gap-3 items-center flex-wrap">
                    {accentColors.map((color) => (
                        <button
                            key={color.id}
                            type="button"
                            onClick={() => handlePresetClick(color.id)}
                            title={color.name}
                            disabled={monochrome}
                            className={`w-10 h-10 rounded-full transition-all ${monochrome ? 'opacity-30 cursor-not-allowed' : ''} ${accentColor === color.id && !monochrome ? 'scale-125 ring-2 ring-gray-900 dark:ring-white ring-offset-2 ring-offset-white dark:ring-offset-gray-900 shadow-lg' : 'hover:scale-110 opacity-70 hover:opacity-100'}`}
                            style={{ backgroundColor: color.hex }}
                        />
                    ))}
                    <button
                        type="button"
                        onClick={handlePickerOpen}
                        title="Custom color"
                        disabled={monochrome}
                        className={`w-10 h-10 rounded-full border-2 border-dashed transition-all flex items-center justify-center ${monochrome ? 'opacity-30 cursor-not-allowed border-gray-300 dark:border-gray-600' : isCustom ? 'scale-125 ring-2 ring-gray-900 dark:ring-white ring-offset-2 ring-offset-white dark:ring-offset-gray-900 shadow-lg border-gray-900 dark:border-white' : 'border-gray-300 dark:border-gray-600 hover:scale-110 hover:border-gray-400 dark:hover:border-gray-500'}`}
                        style={isCustom ? { backgroundColor: currentHex } : { backgroundColor: 'transparent' }}
                    >
                        {!isCustom && (
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 dark:text-gray-500"><circle cx="12" cy="12" r="10"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>
                        )}
                    </button>
                </div>
                {isCustom && customHex && (
                    <div className="mt-2 flex items-center gap-2">
                        <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider bg-gray-50 dark:bg-gray-800/50 px-2 py-1 rounded-lg">{customHex}</span>
                    </div>
                )}
                <p className="text-gray-400 dark:text-gray-500 text-xs font-medium mt-3 leading-relaxed">
                    Choose a preset or pick your own custom color. Disabled when monochrome mode is active.
                </p>
            </div>

            {pickerOpen && (
                <div className="bg-gray-50 dark:bg-gray-800/30 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-widest">
                            Custom Color
                        </h4>
                        <button
                            onClick={handleApply}
                            className="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-[10px] font-black rounded-xl hover:opacity-80 transition-all"
                        >
                            Apply Color
                        </button>
                    </div>
                    <div className="flex justify-center mb-4">
                        <HexColorPicker color={tempHex} onChange={handlePickerChange} style={{ width: '100%', maxWidth: 200 }} />
                    </div>
                    <div className="flex items-center gap-3 justify-center">
                        <div className="w-8 h-8 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm" style={{ backgroundColor: tempHex }} />
                        <input
                            type="text"
                            value={tempHex}
                            onChange={(e) => {
                                let v = e.target.value;
                                if (!v.startsWith('#')) v = '#' + v;
                                if (/^#[0-9a-fA-F]{0,6}$/.test(v)) {
                                    setTempHex(v);
                                }
                            }}
                            className="w-full max-w-[8rem] text-center text-sm font-bold font-mono bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl py-1.5 px-3 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white"
                            placeholder="#2563eb"
                        />
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4 justify-center">
                        {['#dc2626','#ea580c','#eab308','#16a34a','#2563eb','#7c3aed','#ec4899','#06b6d4','#14b8a6','#84cc16'].map(hex => (
                            <button
                                key={hex}
                                type="button"
                                onClick={() => setTempHex(hex)}
                                className={`w-6 h-6 rounded-full transition-all hover:scale-125 ${tempHex === hex ? 'ring-2 ring-gray-900 dark:ring-white ring-offset-1' : ''}`}
                                style={{ backgroundColor: hex }}
                            />
                        ))}
                    </div>
                </div>
            )}

            <div>
                <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">
                    Monochrome Mode
                </h3>
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/30 rounded-2xl border border-gray-100 dark:border-gray-800">
                    <div className="flex-1 mr-4">
                        <p className="text-gray-900 dark:text-white font-bold text-sm">Black &amp; White Design</p>
                        <p className="text-gray-500 dark:text-gray-400 text-xs font-medium mt-0.5 leading-relaxed">
                            Strips all color accents, replacing them with grayscale tones for a clean, minimalist look.
                        </p>
                    </div>
                    <ToggleSwitch enabled={monochrome} onChange={setMonochrome} />
                </div>
            </div>
        </div>
    );
}

function AnimationSettings({ animationLevel, setAnimationLevel, animationSpeed, setAnimationSpeed }) {
    return (
        <div className="space-y-10">
            <div>
                <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">
                    Animation Level
                </h3>
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-1.5 flex flex-col sm:flex-row gap-1">
                    {['full', 'reduced', 'none'].map(level => (
                        <button
                            key={level}
                            onClick={() => setAnimationLevel(level)}
                            className={`flex-1 min-w-0 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${animationLevel === level ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                        >
                            {level.charAt(0).toUpperCase() + level.slice(1)}
                        </button>
                    ))}
                </div>
                <p className="text-gray-400 dark:text-gray-500 text-xs font-medium mt-3 leading-relaxed">
                    Full enables all motion effects. Reduced minimizes motion for accessibility. None disables all animations.
                </p>
            </div>

            <div>
                <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">
                    Animation Speed
                </h3>
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider shrink-0">0.5x</span>
                        <input
                            type="range"
                            min="0.5"
                            max="2"
                            step="0.25"
                            value={animationSpeed}
                            onChange={(e) => setAnimationSpeed(parseFloat(e.target.value))}
                            className="flex-1 h-2 rounded-full appearance-none bg-gray-200 dark:bg-gray-700 accent-gray-900 dark:accent-white cursor-pointer min-w-0"
                        />
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider shrink-0">2x</span>
                    </div>
                    <div className="flex justify-between text-[10px] font-bold text-gray-400 dark:text-gray-500 px-1">
                        <span>Slower</span>
                        <span>Faster</span>
                    </div>
                </div>
                <p className="text-gray-400 dark:text-gray-500 text-xs font-medium mt-4 leading-relaxed">
                    Controls the global speed multiplier for all animations. Lower values create a more relaxed feel; higher values feel snappier.
                </p>
            </div>
        </div>
    );
}

function DeveloperSettings({ onShowChangelog }) {
    return (
        <div className="space-y-10">
            <div>
                <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">
                    Dev Tools
                </h3>
                <div className="p-5 bg-gray-50 dark:bg-gray-800/30 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        <div className="flex-1">
                            <p className="text-gray-900 dark:text-white font-bold text-sm">Changelog Popup</p>
                            <p className="text-gray-500 dark:text-gray-400 text-xs font-medium mt-0.5">Force-show the update prompt regardless of version state.</p>
                        </div>
                        <button
                            onClick={onShowChangelog}
                            className="shrink-0 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-black rounded-xl hover:bg-blue-600 dark:hover:bg-blue-600 dark:hover:text-white transition-all duration-200"
                        >
                            Show Popup
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const DATA_CATEGORIES = [
    {
        id: 'appearance',
        label: 'Appearance',
        description: 'Theme mode, accent color, and monochrome settings.',
        keys: [STORAGE_KEYS.themeMode, STORAGE_KEYS.darkMode, STORAGE_KEYS.accentColor, STORAGE_KEYS.monochrome],
    },
    {
        id: 'animations',
        label: 'Animation Preferences',
        description: 'Animation level, speed, and motion preferences.',
        keys: [STORAGE_KEYS.animationLevel, STORAGE_KEYS.animationSpeed],
    },
    {
        id: 'layout',
        label: 'Layout & View',
        description: 'View mode, subheader visibility, and sidebar states.',
        keys: [STORAGE_KEYS.view, STORAGE_KEYS.subheader, STORAGE_KEYS.docsOutline, STORAGE_KEYS.docsExpanded, STORAGE_KEYS.docsTabs, STORAGE_KEYS.changelogOutline],
    },
    {
        id: 'changelog',
        label: 'Changelog State',
        description: 'Last seen version tracking for the update popup.',
        keys: [STORAGE_KEYS.seenVersion],
    },
];

function DataSettings() {
    const [cleared, setCleared] = useState([]);

    const clearCategory = (keys) => {
        keys.forEach(k => localStorage.removeItem(k));
        setCleared(prev => [...prev, ...keys].filter((v, i, a) => a.indexOf(v) === i));
        setTimeout(() => setCleared([]), 2000);
    };

    const clearAll = () => {
        if (window.confirm('Clear all stored settings and preferences? This will reset everything to defaults.')) {
            localStorage.clear();
            window.location.reload();
        }
    };

    const getStoredCount = (keys) => {
        return keys.filter(k => localStorage.getItem(k) !== null).length;
    };

    return (
        <div className="space-y-8">
            <div>
                <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">
                    Storage Categories
                </h3>
                <p className="text-gray-400 dark:text-gray-500 text-xs font-medium leading-relaxed mb-5">
                    Clear individual storage categories without affecting other settings. Each card shows how many stored values exist in that category.
                </p>
                <div className="space-y-3">
                    {DATA_CATEGORIES.map(cat => {
                        const count = getStoredCount(cat.keys);
                        const justCleared = cat.keys.some(k => cleared.includes(k));
                        return (
                            <div key={cat.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 bg-gray-50 dark:bg-gray-800/30 rounded-2xl border border-gray-100 dark:border-gray-800 group hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all">
                                <div className="flex-1 sm:mr-4 min-w-0">
                                    <div className="flex items-center gap-2 mb-0.5">
                                        <p className="text-gray-900 dark:text-white font-bold text-sm">{cat.label}</p>
                                        <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded-full">{count} stored</span>
                                    </div>
                                    <p className="text-gray-500 dark:text-gray-400 text-xs font-medium">{cat.description}</p>
                                </div>
                                <button
                                    onClick={() => clearCategory(cat.keys)}
                                    disabled={count === 0 || justCleared}
                                    className={`shrink-0 w-full sm:w-auto px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${justCleared ? 'bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-800/50' : count > 0 ? 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-600 dark:hover:text-red-400 border border-gray-200 dark:border-gray-600/50' : 'bg-gray-100 dark:bg-gray-800 text-gray-300 dark:text-gray-600 cursor-not-allowed'}`}
                                >
                                    {justCleared ? 'Cleared' : 'Clear'}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                <button
                    type="button"
                    onClick={clearAll}
                    className="flex w-full items-center justify-between p-4 bg-red-50 dark:bg-red-950/20 rounded-2xl border border-red-100 dark:border-red-900/30 hover:bg-red-100 dark:hover:bg-red-950/40 transition-all group"
                >
                    <div className="flex items-center gap-3 text-left">
                        <span className="text-red-500 dark:text-red-400">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /></svg>
                        </span>
                        <div>
                            <p className="text-sm font-bold text-red-600 dark:text-red-400">Clear All Data</p>
                            <p className="text-xs font-medium text-red-400/70 dark:text-red-400/50 mt-0.5">Removes every stored setting and preference. The page will reload.</p>
                        </div>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-red-400 dark:text-red-500 group-hover:translate-x-0.5 transition-transform"><path d="m9 18 6-6-6-6" /></svg>
                </button>
            </div>
        </div>
    );
}

export default function SettingsModal({ isOpen, onClose }) {
    const { navbar } = siteContent;
    const { level: animationLevel, speed: animationSpeed, setAnimationLevel, setAnimationSpeed } = useAnimationLevel();
    const [activeTab, setActiveTab] = useState('appearance');
    const [themeMode, setThemeMode] = useState(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem(STORAGE_KEYS.themeMode);
            if (saved) return saved;
            const legacyDark = localStorage.getItem(STORAGE_KEYS.darkMode);
            if (legacyDark !== null) return JSON.parse(legacyDark) ? 'dark' : 'light';
        }
        return 'auto';
    });
    const [accentColor, setAccentColor] = useState(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem(STORAGE_KEYS.accentColor);
            if (saved) return saved;
        }
        return 'blue';
    });
    const [customHex, setCustomHex] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem(STORAGE_KEYS.customColor) || null;
        }
        return null;
    });
    const [monochrome, setMonochrome] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem(STORAGE_KEYS.monochrome) === 'true';
        }
        return false;
    });
    const [showChangelogDebug, setShowChangelogDebug] = useState(false);

    useEffect(() => {
        const applyTheme = (mode) => {
            let isDark = false;
            if (mode === 'dark') isDark = true;
            else if (mode === 'auto') isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (isDark) document.documentElement.classList.add("dark");
            else document.documentElement.classList.remove("dark");
        };
        applyTheme(themeMode);
        localStorage.setItem(STORAGE_KEYS.themeMode, themeMode);
        if (themeMode === 'auto') {
            const mq = window.matchMedia('(prefers-color-scheme: dark)');
            const handler = () => applyTheme('auto');
            mq.addEventListener('change', handler);
            return () => mq.removeEventListener('change', handler);
        }
    }, [themeMode]);

    useEffect(() => {
        if (accentColor === 'custom' && customHex) {
            applyCustomAccent(customHex);
            document.documentElement.setAttribute('data-custom-accent', 'true');
        } else {
            clearCustomAccent();
            document.documentElement.setAttribute("data-accent", accentColor);
        }
        localStorage.setItem(STORAGE_KEYS.accentColor, accentColor);
        if (customHex) {
            localStorage.setItem(STORAGE_KEYS.customColor, customHex);
        } else {
            localStorage.removeItem(STORAGE_KEYS.customColor);
        }
    }, [accentColor, customHex]);

    useEffect(() => {
        document.documentElement.setAttribute("data-monochrome", monochrome.toString());
        localStorage.setItem(STORAGE_KEYS.monochrome, monochrome.toString());
    }, [monochrome]);

    useEffect(() => {
        if (isOpen) {
            const syncedTheme = localStorage.getItem(STORAGE_KEYS.themeMode) || 'auto';
            setThemeMode(syncedTheme);
            const syncedAccent = localStorage.getItem(STORAGE_KEYS.accentColor) || 'blue';
            setAccentColor(syncedAccent);
            const syncedCustomHex = localStorage.getItem(STORAGE_KEYS.customColor) || null;
            setCustomHex(syncedCustomHex);
            const syncedMono = localStorage.getItem(STORAGE_KEYS.monochrome) === 'true';
            setMonochrome(syncedMono);
        }
    }, [isOpen]);

    const renderContent = () => {
        switch (activeTab) {
            case 'appearance':
                return <AppearanceSettings themeMode={themeMode} setThemeMode={setThemeMode} accentColor={accentColor} setAccentColor={setAccentColor} customHex={customHex} setCustomHex={setCustomHex} monochrome={monochrome} setMonochrome={setMonochrome} />;
            case 'animations':
                return <AnimationSettings animationLevel={animationLevel} setAnimationLevel={setAnimationLevel} animationSpeed={animationSpeed} setAnimationSpeed={setAnimationSpeed} />;
            case 'developer':
                return <DeveloperSettings onShowChangelog={() => setShowChangelogDebug(true)} />;
            case 'data':
                return <DataSettings />;
            default:
                return null;
        }
    };

    const activeItem = SIDEBAR_ITEMS.find(i => i.id === activeTab);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[110] sm:flex sm:items-center sm:justify-center sm:p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full h-full sm:h-[min(85vh,600px)] sm:max-w-3xl bg-white dark:bg-gray-900 shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800 flex flex-col sm:rounded-[2.5rem] rounded-none"
                    >
                        <div className="flex-shrink-0 px-5 sm:px-8 pt-5 sm:pt-7 pb-3 border-b border-gray-100 dark:border-gray-800">
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="text-[10px] font-black tracking-[0.2em] text-blue-600 uppercase mb-1.5 block">
                                        Preferences
                                    </span>
                                    <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter">
                                        Settings
                                    </h2>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors group -mr-1"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 dark:text-gray-600 group-hover:text-gray-900 dark:group-hover:text-white transition-colors"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 flex flex-col sm:flex-row min-h-0 overflow-hidden">
                            <div className="hidden sm:flex flex-col w-52 lg:w-56 flex-shrink-0 border-r border-gray-100 dark:border-gray-800 bg-gray-50/30 dark:bg-gray-950/30 py-4 px-3 gap-1">
                                {SIDEBAR_ITEMS.map(item => (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveTab(item.id)}
                                        className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-left transition-all group ${activeTab === item.id ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-800/50'}`}
                                    >
                                        <span className={`flex-shrink-0 transition-colors ${activeTab === item.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300'}`}>
                                            {item.icon}
                                        </span>
                                        <span className="text-sm font-bold">{item.label}</span>
                                    </button>
                                ))}
                            </div>

                            <div className="sm:hidden w-full flex-shrink-0 border-b border-gray-100 dark:border-gray-800 bg-gray-50/30 dark:bg-gray-950/30">
                                <nav className="flex overflow-x-auto px-3 py-2 gap-1 scrollbar-none">
                                    {SIDEBAR_ITEMS.map(item => (
                                        <button
                                            key={item.id}
                                            onClick={() => setActiveTab(item.id)}
                                            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex-shrink-0 ${activeTab === item.id ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
                                        >
                                            <span className={activeTab === item.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500'}>
                                                {item.icon}
                                            </span>
                                            {item.label}
                                        </button>
                                    ))}
                                </nav>
                            </div>

                            <div className="flex-1 min-w-0 overflow-y-auto overscroll-contain">
                                {activeItem && (
                                    <div className="sm:hidden px-4 pt-4 pb-1">
                                        <div className="flex items-center gap-2.5">
                                            <span className="text-blue-600 dark:text-blue-400">
                                                {activeItem.icon}
                                            </span>
                                            <h3 className="text-lg font-black text-gray-900 dark:text-white tracking-tight">{activeItem.label}</h3>
                                        </div>
                                    </div>
                                )}
                                <div className="px-4 sm:px-8 py-4 sm:py-6">
                                    {renderContent()}
                                </div>
                            </div>
                        </div>

                        <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 to-indigo-600 flex-shrink-0" />
                    </motion.div>
                </div>
            )}
            {showChangelogDebug && (
                <ChangelogPopup
                    forceOpen={true}
                    onForceClose={() => setShowChangelogDebug(false)}
                />
            )}
        </AnimatePresence>
    );
}
