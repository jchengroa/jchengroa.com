import { useState, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { ChangelogPopup } from "./Changelog";
import { siteContent } from "../data/site_content";
import { useAnimationLevel } from "../utils/animations.js";

const accentColors = [
    { id: 'red', name: 'Red', hex: '#dc2626' },
    { id: 'orange', name: 'Orange', hex: '#ea580c' },
    { id: 'yellow', name: 'Yellow', hex: '#eab308' },
    { id: 'green', name: 'Green', hex: '#16a34a' },
    { id: 'blue', name: 'Blue', hex: '#2563eb' },
    { id: 'violet', name: 'Violet', hex: '#7c3aed' },
];

export default function SettingsModal({ isOpen, onClose }) {
    const { navbar } = siteContent;
    const { level: animationLevel, setAnimationLevel } = useAnimationLevel();
    const [themeMode, setThemeMode] = useState(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("themeMode");
            if (saved) return saved;
            const legacyDark = localStorage.getItem("darkMode");
            if (legacyDark !== null) return JSON.parse(legacyDark) ? 'dark' : 'light';
        }
        return 'auto';
    });

    const [accentColor, setAccentColor] = useState(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("accentColor");
            if (saved) return saved;
        }
        return 'blue';
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
        localStorage.setItem("themeMode", themeMode);
        if (themeMode === 'auto') {
            const mq = window.matchMedia('(prefers-color-scheme: dark)');
            const handler = () => applyTheme('auto');
            mq.addEventListener('change', handler);
            return () => mq.removeEventListener('change', handler);
        }
    }, [themeMode]);

    useEffect(() => {
        document.documentElement.setAttribute("data-accent", accentColor);
        localStorage.setItem("accentColor", accentColor);
    }, [accentColor]);

    useEffect(() => {
        if (isOpen) {
            const syncedTheme = localStorage.getItem("themeMode") || 'auto';
            setThemeMode(syncedTheme);
            const syncedAccent = localStorage.getItem("accentColor") || 'blue';
            setAccentColor(syncedAccent);
        }
    }, [isOpen]);

    const handleClearStorage = () => {
        if (window.confirm(navbar.settings.clearConfirm)) {
            localStorage.clear();
            window.location.reload();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
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
                        className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800 max-h-[85vh] flex flex-col"
                    >
                        {/* Sticky Header */}
                        <div className="px-8 md:px-10 pt-8 md:pt-10 pb-4 flex-shrink-0">
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="text-[10px] font-black tracking-[0.2em] text-blue-600 uppercase mb-2 block">
                                        Preferences
                                    </span>
                                    <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter">
                                        Settings
                                    </h2>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors group"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 dark:text-gray-600 group-hover:text-gray-900 dark:group-hover:text-white transition-colors"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                </button>
                            </div>
                        </div>

                        <div className="px-8 md:px-10 pb-8 md:pb-10 overflow-y-auto overscroll-contain flex-1 pt-2">

                            {/* Theme Mode */}
                            <div className="mb-10">
                                <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">
                                    Theme Mode
                                </h3>
                                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-1.5 flex gap-1">
                                    {['light', 'dark', 'auto'].map(mode => (
                                        <button
                                            key={mode}
                                            onClick={() => setThemeMode(mode)}
                                            className={`flex-1 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${themeMode === mode ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                                        >
                                            {mode.charAt(0).toUpperCase() + mode.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Accent Color */}
                            <div className="mb-10">
                                <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">
                                    Accent Color
                                </h3>
                                <div className="flex gap-3 items-center">
                                    {accentColors.map((color) => (
                                        <button
                                            key={color.id}
                                            type="button"
                                            onClick={() => setAccentColor(color.id)}
                                            title={color.name}
                                            className={`w-8 h-8 rounded-full transition-all ${accentColor === color.id ? 'scale-125 ring-2 ring-gray-900 dark:ring-white ring-offset-2 ring-offset-white dark:ring-offset-gray-900 shadow-lg' : 'hover:scale-110 opacity-70 hover:opacity-100'}`}
                                            style={{ backgroundColor: color.hex }}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Animations */}
                            <div className="mb-10">
                                <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">
                                    Animations
                                </h3>
                                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-1.5 flex gap-1">
                                    {['full', 'reduced', 'none'].map(level => (
                                        <button
                                            key={level}
                                            onClick={() => setAnimationLevel(level)}
                                            className={`flex-1 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${animationLevel === level ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                                        >
                                            {level.charAt(0).toUpperCase() + level.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Dev Tools */}
                            <div className="mb-8 pt-8 border-t border-gray-100 dark:border-gray-800">
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
                                            onClick={() => setShowChangelogDebug(true)}
                                            className="shrink-0 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-black rounded-xl hover:bg-blue-600 dark:hover:bg-blue-600 dark:hover:text-white transition-all duration-200"
                                        >
                                            Show Popup
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Data */}
                            <div className="pt-8 border-t border-gray-100 dark:border-gray-800">
                                <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">
                                    Data
                                </h3>
                                <button
                                    type="button"
                                    onClick={handleClearStorage}
                                    className="flex w-full items-center justify-between p-4 bg-red-50 dark:bg-red-950/20 rounded-2xl border border-red-100 dark:border-red-900/30 hover:bg-red-100 dark:hover:bg-red-950/40 transition-all group"
                                >
                                    <div className="flex items-center gap-3 text-left">
                                        <span className="text-red-500 dark:text-red-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /></svg>
                                        </span>
                                        <div>
                                            <p className="text-sm font-bold text-red-600 dark:text-red-400">Clear Local Storage</p>
                                            <p className="text-xs font-medium text-red-400/70 dark:text-red-400/50 mt-0.5">Resets all site settings to defaults.</p>
                                        </div>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-red-400 dark:text-red-500 group-hover:translate-x-0.5 transition-transform"><path d="m9 18 6-6-6-6" /></svg>
                                </button>
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
