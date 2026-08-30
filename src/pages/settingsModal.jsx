import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { HexColorPicker } from 'react-colorful';
import { 
    LuSparkles, 
    LuPanelRight, 
    LuSun, 
    LuMoon, 
    LuMonitor, 
    LuCloudOff, 
    LuBellRing, 
    LuDatabase, 
    LuTrash2,
    LuHighlighter
} from "react-icons/lu";
import { applyCustomAccent, clearCustomAccent } from "../utils/colorUtils.js";
import { useData } from "../context/dataContext.jsx";
import { ToggleTile } from "../components/settings/toggleTile.jsx";

export const STORAGE_KEYS = {
    themeMode: 'themeMode',
    accentColor: 'accentColor',
    customColor: 'customAccentColor',
    darkMode: 'darkMode',
    monochrome: 'jchengroa_monochrome',
    view: 'jchengroa_view_preference',
    subheader: 'jchengroa_subheader_visible',
    docsOutline: 'jchengroa_docs_outline_open',
    docsExpanded: 'jchengroa_docs_expanded_sections',
    docsTabs: 'jchengroa_doc_tabs_desktop_open',
    changelogOutline: 'jchengroa_changelog_outline_open',
    analyticsConsent: 'jchengroa_analytics_consent',
    heroParticles: 'jchengroa_hero_particles_enabled',
    searchHighlight: 'jchengroa_search_highlight_enabled',
};

export const ACCENT_COLORS = [
    { id: 'red', name: 'Red', hex: '#dc2626' },
    { id: 'orange', name: 'Orange', hex: '#ea580c' },
    { id: 'yellow', name: 'Yellow', hex: '#eab308' },
    { id: 'green', name: 'Green', hex: '#16a34a' },
    { id: 'blue', name: 'Blue', hex: '#2563eb' },
    { id: 'violet', name: 'Violet', hex: '#7c3aed' },
    { id: 'monochrome', name: 'Monochrome', hex: '#737373' },
];

export const DATA_CATEGORIES = [
    {
        id: 'appearance',
        label: 'Appearance',
        keys: [STORAGE_KEYS.themeMode, STORAGE_KEYS.darkMode, STORAGE_KEYS.accentColor, STORAGE_KEYS.monochrome, STORAGE_KEYS.heroParticles],
    },
    {
        id: 'layout',
        label: 'Layout & View',
        keys: [STORAGE_KEYS.view, STORAGE_KEYS.subheader, STORAGE_KEYS.docsOutline, STORAGE_KEYS.docsExpanded, STORAGE_KEYS.docsTabs, STORAGE_KEYS.changelogOutline, STORAGE_KEYS.searchHighlight],
    },
    {
        id: 'privacy',
        label: 'Privacy & Consent',
        keys: [STORAGE_KEYS.analyticsConsent],
    },
];

const SHOW_DEV_OPTIONS = import.meta.env.VITE_SHOW_DEV_OPTIONS === 'true' || import.meta.env.VITE_SHOW_DEV_OPTIONS === true;

const THEME_OPTIONS = [
    { 
        id: 'light', 
        label: 'Light', 
        icon: LuSun,
        iconActive: 'bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-md shadow-amber-500/30',
        iconInactive: 'bg-amber-500/10 text-amber-500 dark:text-amber-400 group-hover:bg-amber-500/20',
        borderActive: 'border-amber-500/50 dark:border-amber-500/50 ring-1 ring-amber-500/25 bg-amber-50/50 dark:bg-amber-950/20'
    },
    { 
        id: 'dark', 
        label: 'Dark', 
        icon: LuMoon,
        iconActive: 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/30',
        iconInactive: 'bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 group-hover:bg-indigo-500/20',
        borderActive: 'border-indigo-500/50 dark:border-indigo-500/50 ring-1 ring-indigo-500/25 bg-indigo-50/50 dark:bg-indigo-950/20'
    },
    { 
        id: 'auto', 
        label: 'System', 
        icon: LuMonitor,
        iconActive: 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-md shadow-blue-500/30',
        iconInactive: 'bg-sky-500/10 text-sky-500 dark:text-sky-400 group-hover:bg-sky-500/20',
        borderActive: 'border-blue-500/50 dark:border-blue-500/50 ring-1 ring-blue-500/25 bg-blue-50/50 dark:bg-blue-950/20'
    },
];

export default function SettingsModal({ isOpen, onClose }) {
    const { siteContent, dbStatus, forceFallback, toggleForceFallback } = useData();
    const defaultTheme = siteContent.default_theme_mode || 'light';
    const defaultAccent = siteContent.default_accent_color || 'blue';
    const defaultCustomHex = siteContent.custom_accent_hex || null;

    const [themeMode, setThemeMode] = useState(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem(STORAGE_KEYS.themeMode);
            if (saved) return saved;
            const legacyDark = localStorage.getItem(STORAGE_KEYS.darkMode);
            if (legacyDark !== null) return JSON.parse(legacyDark) ? 'dark' : 'light';
        }
        return defaultTheme;
    });
    const [accentColor, setAccentColor] = useState(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem(STORAGE_KEYS.accentColor);
            if (saved) return saved;
        }
        return defaultAccent;
    });
    const [customHex, setCustomHex] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem(STORAGE_KEYS.customColor) || defaultCustomHex;
        }
        return defaultCustomHex;
    });
    const [docsTabs, setDocsTabs] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem(STORAGE_KEYS.docsTabs) === 'true';
        }
        return false;
    });
    const [heroParticles, setHeroParticles] = useState(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem(STORAGE_KEYS.heroParticles);
            if (saved !== null) return saved === 'true';
        }
        return true;
    });
    const [searchHighlight, setSearchHighlight] = useState(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem(STORAGE_KEYS.searchHighlight);
            if (saved !== null) return saved === 'true';
        }
        return true;
    });

    const [pickerOpen, setPickerOpen] = useState(false);
    const [tempHex, setTempHex] = useState(customHex || '#2563eb');
    const [clearedCategories, setClearedCategories] = useState([]);

    const isCustom = accentColor === 'custom';
    const currentHex = isCustom && customHex ? customHex : ACCENT_COLORS.find(c => c.id === accentColor)?.hex || '#2563eb';

    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.docsTabs, docsTabs.toString());
        window.dispatchEvent(new CustomEvent('jchengroa_projects_outline_setting_changed', { detail: docsTabs }));
    }, [docsTabs]);

    useEffect(() => {
        const handleSettingChange = (e) => {
            setDocsTabs(e.detail);
        };
        window.addEventListener('jchengroa_projects_outline_setting_changed', handleSettingChange);
        return () => {
            window.removeEventListener('jchengroa_projects_outline_setting_changed', handleSettingChange);
        };
    }, []);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.heroParticles, heroParticles.toString());
        window.dispatchEvent(new CustomEvent('jchengroa_hero_particles_setting_changed', { detail: heroParticles }));
    }, [heroParticles]);

    useEffect(() => {
        const handleParticlesSettingChange = (e) => {
            setHeroParticles(e.detail);
        };
        window.addEventListener('jchengroa_hero_particles_setting_changed', handleParticlesSettingChange);
        return () => {
            window.removeEventListener('jchengroa_hero_particles_setting_changed', handleParticlesSettingChange);
        };
    }, []);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.searchHighlight, searchHighlight.toString());
        window.dispatchEvent(new CustomEvent('jchengroa_search_highlight_setting_changed', { detail: searchHighlight }));
    }, [searchHighlight]);

    useEffect(() => {
        const handleHighlightChange = (e) => {
            setSearchHighlight(e.detail);
        };
        window.addEventListener('jchengroa_search_highlight_setting_changed', handleHighlightChange);
        return () => {
            window.removeEventListener('jchengroa_search_highlight_setting_changed', handleHighlightChange);
        };
    }, []);

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
        const isMono = accentColor === 'monochrome';
        document.documentElement.setAttribute("data-monochrome", isMono.toString());
        localStorage.setItem(STORAGE_KEYS.monochrome, isMono.toString());

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
        if (isOpen) {
            const syncedTheme = localStorage.getItem(STORAGE_KEYS.themeMode) || defaultTheme;
            setThemeMode(syncedTheme);
            const syncedAccent = localStorage.getItem(STORAGE_KEYS.accentColor) || defaultAccent;
            setAccentColor(syncedAccent);
            const syncedCustomHex = localStorage.getItem(STORAGE_KEYS.customColor) || defaultCustomHex;
            setCustomHex(syncedCustomHex);
            const syncedDocsTabs = localStorage.getItem(STORAGE_KEYS.docsTabs) !== 'false';
            setDocsTabs(syncedDocsTabs);
            const syncedParticles = localStorage.getItem(STORAGE_KEYS.heroParticles);
            setHeroParticles(syncedParticles !== null ? syncedParticles === 'true' : true);
            const syncedHighlight = localStorage.getItem(STORAGE_KEYS.searchHighlight);
            setSearchHighlight(syncedHighlight !== null ? syncedHighlight === 'true' : true);
        }
    }, [isOpen, defaultTheme, defaultAccent, defaultCustomHex]);

    const handlePresetColorClick = (colorId) => {
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

    const handleApplyCustomColor = () => {
        setCustomHex(tempHex);
        setAccentColor('custom');
        setPickerOpen(false);
    };

    const handleShowCookieBanner = () => {
        localStorage.removeItem('jchengroa_analytics_consent');
        window.dispatchEvent(new CustomEvent('jchengroa_reset_consent'));
    };

    const clearCategory = (keys) => {
        keys.forEach(k => localStorage.removeItem(k));
        setClearedCategories(prev => [...prev, ...keys].filter((v, i, a) => a.indexOf(v) === i));
        setTimeout(() => setClearedCategories([]), 2000);
    };

    const clearAllData = () => {
        if (window.confirm('Clear all stored settings and preferences? This will reset everything to defaults.')) {
            localStorage.clear();
            window.location.reload();
        }
    };

    const getStoredCount = (keys) => {
        return keys.filter(k => localStorage.getItem(k) !== null).length;
    };

    const getDbStatusDetails = () => {
        switch (dbStatus) {
            case 'connected':
                return {
                    label: 'Connected',
                    color: 'text-green-600 dark:text-green-400 bg-green-500/10 border-green-500/25',
                    dot: 'bg-green-500',
                };
            case 'forced_offline':
                return {
                    label: 'Forced Offline',
                    color: 'text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/25',
                    dot: 'bg-blue-500',
                };
            case 'fallback':
            default:
                return {
                    label: 'Fallback Mode',
                    color: 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/25',
                    dot: 'bg-amber-500',
                };
        }
    };

    const dbDetails = getDbStatusDetails();

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
                        className="relative w-full h-full sm:h-[min(88vh,680px)] sm:max-w-2xl bg-white dark:bg-gray-900 shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800 flex flex-col sm:rounded-[2.5rem] rounded-none"
                    >
                        {/* Modal Header */}
                        <div className="flex-shrink-0 px-5 sm:px-8 pt-5 sm:pt-7 pb-3.5 border-b border-gray-100 dark:border-gray-800">
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="text-[10px] font-black tracking-[0.2em] text-blue-600 uppercase mb-1 block">
                                        Preferences
                                    </span>
                                    <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tighter">
                                        Settings
                                    </h2>
                                </div>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    aria-label="Close Settings"
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors group -mr-1 cursor-pointer"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 dark:text-gray-600 group-hover:text-gray-900 dark:group-hover:text-white transition-colors"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                </button>
                            </div>
                        </div>

                        {/* Single-Page Scrollable Content with Responsive Grid System */}
                        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-5 sm:px-8 py-6 space-y-8">
                            {/* Theme Mode Selector - Square Cards with Colored Icons */}
                            <div>
                                <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3.5">
                                    Theme Mode
                                </h3>
                                <div className="grid grid-cols-[repeat(auto-fit,minmax(95px,1fr))] gap-2.5 sm:gap-3.5">
                                    {THEME_OPTIONS.map((item) => {
                                        const Icon = item.icon;
                                        const isSelected = themeMode === item.id;
                                        return (
                                            <button
                                                key={item.id}
                                                type="button"
                                                onClick={() => setThemeMode(item.id)}
                                                aria-pressed={isSelected}
                                                className={`group relative p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 flex flex-col items-center justify-center text-center cursor-pointer min-h-[96px] sm:min-h-[110px] ${
                                                    isSelected
                                                        ? `${item.borderActive} shadow-sm`
                                                        : 'bg-gray-50 dark:bg-gray-800/30 border-gray-100 dark:border-gray-800 hover:bg-gray-100/60 dark:hover:bg-gray-800/50 hover:border-gray-200 dark:hover:border-gray-700'
                                                }`}
                                            >
                                                <div
                                                    className={`p-2.5 sm:p-3 rounded-2xl mb-2 transition-all duration-200 ${
                                                        isSelected
                                                            ? `${item.iconActive} scale-105`
                                                            : `${item.iconInactive} group-hover:scale-105`
                                                    }`}
                                                >
                                                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                                                </div>
                                                <span className={`text-xs sm:text-sm font-bold transition-colors ${
                                                    isSelected
                                                        ? 'text-gray-900 dark:text-white'
                                                        : 'text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200'
                                                }`}>
                                                    {item.label}
                                                </span>
                                                <span className="text-[10px] sm:text-[11px] text-gray-400 dark:text-gray-500 font-semibold mt-0.5">
                                                    {isSelected ? 'Active' : 'Select'}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Accent Color Palette */}
                            <div>
                                <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3.5">
                                    Accent Color
                                </h3>
                                <div className="flex gap-3 items-center flex-wrap">
                                    {ACCENT_COLORS.map((color) => (
                                        <button
                                            key={color.id}
                                            type="button"
                                            onClick={() => handlePresetColorClick(color.id)}
                                            title={color.name}
                                            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full transition-all cursor-pointer ${
                                                accentColor === color.id
                                                    ? 'scale-120 ring-2 ring-gray-900 dark:ring-white ring-offset-2 ring-offset-white dark:ring-offset-gray-900 shadow-lg'
                                                    : 'hover:scale-110 opacity-75 hover:opacity-100'
                                            }`}
                                            style={color.id === 'monochrome' ? { background: 'linear-gradient(135deg, #171717 50%, #f5f5f5 50%)', border: '1px solid #e5e7eb' } : { backgroundColor: color.hex }}
                                        />
                                    ))}
                                    <button
                                        type="button"
                                        onClick={handlePickerOpen}
                                        title="Custom color"
                                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-dashed transition-all flex items-center justify-center cursor-pointer ${
                                            isCustom
                                                ? 'scale-120 ring-2 ring-gray-900 dark:ring-white ring-offset-2 ring-offset-white dark:ring-offset-gray-900 shadow-lg border-gray-900 dark:border-white'
                                                : 'border-gray-300 dark:border-gray-600 hover:scale-110 hover:border-gray-400 dark:hover:border-gray-500'
                                        }`}
                                        style={isCustom ? { backgroundColor: currentHex } : { backgroundColor: 'transparent' }}
                                    >
                                        {!isCustom && (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 dark:text-gray-500"><circle cx="12" cy="12" r="10" /><path d="M12 8v8" /><path d="M8 12h8" /></svg>
                                        )}
                                    </button>
                                    {isCustom && customHex && (
                                        <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider bg-gray-50 dark:bg-gray-800/50 px-2 py-1 rounded-lg">
                                            {customHex}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Custom Color Picker Card */}
                            {pickerOpen && (
                                <div className="bg-gray-50 dark:bg-gray-800/30 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
                                    <div className="flex items-center justify-between mb-4">
                                        <h4 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-widest">
                                            Custom Color
                                        </h4>
                                        <button
                                            type="button"
                                            onClick={handleApplyCustomColor}
                                            className="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-[10px] font-black rounded-xl hover:opacity-80 transition-all cursor-pointer"
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
                                        {['#dc2626', '#ea580c', '#eab308', '#16a34a', '#2563eb', '#7c3aed', '#ec4899', '#06b6d4', '#14b8a6', '#84cc16'].map((hex) => (
                                            <button
                                                key={hex}
                                                type="button"
                                                onClick={() => setTempHex(hex)}
                                                className={`w-6 h-6 rounded-full transition-all hover:scale-125 cursor-pointer ${tempHex === hex ? 'ring-2 ring-gray-900 dark:ring-white ring-offset-1' : ''}`}
                                                style={{ backgroundColor: hex }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Layout & Animation Toggles - Responsive Grid */}
                            <div>
                                <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3.5">
                                    Layout & Animation
                                </h3>
                                <div className="grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-2.5 sm:gap-3.5">
                                    {/* Hero Physics Particles Toggle Tile */}
                                    <ToggleTile
                                        icon={LuSparkles}
                                        title="Hero Particles"
                                        enabled={heroParticles}
                                        onToggle={() => setHeroParticles(!heroParticles)}
                                    />

                                    {/* Quick Nav Outline Toggle Tile */}
                                    <ToggleTile
                                        icon={LuPanelRight}
                                        title="Quick Nav"
                                        enabled={docsTabs}
                                        onToggle={() => setDocsTabs(!docsTabs)}
                                    />

                                    {/* Search Highlight Toggle Tile */}
                                    <ToggleTile
                                        icon={LuHighlighter}
                                        title="Search Highlight"
                                        enabled={searchHighlight}
                                        onToggle={() => setSearchHighlight(!searchHighlight)}
                                    />
                                </div>
                            </div>

                            {/* Developer Tools */}
                            {SHOW_DEV_OPTIONS && (
                                <div className="border-t border-gray-100 dark:border-gray-800/80 pt-6">
                                    <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3.5">
                                        Developer Tools
                                    </h3>
                                    
                                    {/* Database Status Pill */}
                                    <div className="flex items-center justify-between p-3.5 sm:p-4 bg-gray-50 dark:bg-gray-800/30 rounded-2xl border border-gray-100 dark:border-gray-800 mb-3">
                                        <div className="flex items-center gap-2.5">
                                            <LuDatabase className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                                            <span className="text-sm font-bold text-gray-900 dark:text-white">Database Status</span>
                                        </div>
                                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold ${dbDetails.color}`}>
                                            <span className={`w-2 h-2 rounded-full ${dbDetails.dot} animate-pulse`} />
                                            <span>{dbDetails.label}</span>
                                        </div>
                                    </div>

                                    {/* Developer Action Buttons Responsive Grid */}
                                    <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-2.5 sm:gap-3.5">
                                        {/* Force Offline Fallback Toggle Tile */}
                                        <ToggleTile
                                            icon={LuCloudOff}
                                            title="Force Offline"
                                            enabled={forceFallback}
                                            onToggle={toggleForceFallback}
                                        />

                                        {/* Analytics Notice Button Tile */}
                                        <button
                                            type="button"
                                            onClick={handleShowCookieBanner}
                                            className="group relative p-3.5 sm:p-5 rounded-2xl border transition-all duration-200 flex flex-col items-center justify-center text-center cursor-pointer min-h-[105px] sm:min-h-[120px] bg-gray-50 dark:bg-gray-800/30 border-gray-100 dark:border-gray-800 hover:bg-gray-100/60 dark:hover:bg-gray-800/50 hover:border-gray-200 dark:hover:border-gray-700"
                                        >
                                            <div className="p-2.5 sm:p-3 rounded-2xl mb-2 bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:scale-105 transition-all duration-200">
                                                <LuBellRing className="w-5 h-5 sm:w-6 sm:h-6" />
                                            </div>
                                            <p className="text-xs sm:text-sm font-bold text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors line-clamp-1">
                                                Analytics Notice
                                            </p>
                                            <p className="text-[10px] sm:text-[11px] text-gray-400 dark:text-gray-500 font-semibold mt-0.5">
                                                Show Banner
                                            </p>
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Storage & Data Section */}
                            <div className="border-t border-gray-100 dark:border-gray-800/80 pt-6 space-y-4">
                                <div>
                                    <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3.5">
                                        Storage & Data
                                    </h3>
                                    <div className="space-y-2.5">
                                        {DATA_CATEGORIES.map(cat => {
                                            const count = getStoredCount(cat.keys);
                                            const justCleared = cat.keys.some(k => clearedCategories.includes(k));
                                            return (
                                                <div key={cat.id} className="flex items-center justify-between p-3.5 sm:p-4 bg-gray-50 dark:bg-gray-800/30 rounded-2xl border border-gray-100 dark:border-gray-800 group hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all">
                                                    <div className="flex items-center gap-2.5 min-w-0">
                                                        <p className="text-gray-900 dark:text-white font-bold text-sm">{cat.label}</p>
                                                        <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700/60 px-2 py-0.5 rounded-full">
                                                            {count} stored
                                                        </span>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => clearCategory(cat.keys)}
                                                        disabled={count === 0 || justCleared}
                                                        className={`shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                                                            justCleared 
                                                                ? 'bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-800/50' 
                                                                : count > 0 
                                                                    ? 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-600 dark:hover:text-red-400 border border-gray-200 dark:border-gray-600/50' 
                                                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-300 dark:text-gray-600 cursor-not-allowed opacity-60'
                                                        }`}
                                                    >
                                                        {justCleared ? 'Cleared' : 'Clear'}
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <button
                                        type="button"
                                        onClick={clearAllData}
                                        className="flex w-full items-center justify-between p-3.5 sm:p-4 bg-red-50 dark:bg-red-950/20 rounded-2xl border border-red-100 dark:border-red-900/30 hover:bg-red-100/80 dark:hover:bg-red-950/40 transition-all group cursor-pointer"
                                    >
                                        <div className="flex items-center gap-3 text-left">
                                            <span className="text-red-500 dark:text-red-400">
                                                <LuTrash2 className="w-4 h-4" />
                                            </span>
                                            <p className="text-sm font-bold text-red-600 dark:text-red-400">Reset All Settings & Data</p>
                                        </div>
                                        <span className="text-xs font-bold text-red-500/80 dark:text-red-400/80 group-hover:translate-x-0.5 transition-transform">
                                            Reset
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 to-indigo-600 flex-shrink-0" />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

export { SettingsModal };
