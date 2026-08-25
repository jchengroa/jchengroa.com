import { useState, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { ChangelogPopup } from "./changelog.jsx";
import { applyCustomAccent, clearCustomAccent } from "../utils/colorUtils.js";
import { useData } from "../context/dataContext.jsx";
import { AppearanceSettings } from "../components/settings/appearanceSettings.jsx";
import { DeveloperSettings } from "../components/settings/developerSettings.jsx";
import { DataSettings, STORAGE_KEYS } from "../components/settings/dataSettings.jsx";

const ICONS = {
    appearance: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 2a10 10 0 0 1 0 20" /><path d="M2 12h20" /></svg>
    ),
    developer: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
    ),
    data: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" /></svg>
    ),
};

const SHOW_DEV_OPTIONS = import.meta.env.VITE_SHOW_DEV_OPTIONS === 'true' || import.meta.env.VITE_SHOW_DEV_OPTIONS === true;

const ALL_SIDEBAR_ITEMS = [
    { id: 'appearance', label: 'Appearance', icon: ICONS.appearance },
    { id: 'developer', label: 'Developer', icon: ICONS.developer, devOnly: true },
    { id: 'data', label: 'Data', icon: ICONS.data },
];

const SIDEBAR_ITEMS = ALL_SIDEBAR_ITEMS.filter(item => !item.devOnly || SHOW_DEV_OPTIONS);

export default function SettingsModal({ isOpen, onClose }) {
    const { siteContent } = useData();
    const defaultTheme = siteContent.default_theme_mode || 'light';
    const defaultAccent = siteContent.default_accent_color || 'blue';
    const defaultCustomHex = siteContent.custom_accent_hex || null;

    const [activeTab, setActiveTab] = useState('appearance');
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
    const [showChangelogDebug, setShowChangelogDebug] = useState(false);

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
        }
    }, [isOpen, defaultTheme, defaultAccent, defaultCustomHex]);

    const renderContent = () => {
        switch (activeTab) {
            case 'appearance':
                return (
                    <AppearanceSettings
                        themeMode={themeMode}
                        setThemeMode={setThemeMode}
                        accentColor={accentColor}
                        setAccentColor={setAccentColor}
                        customHex={customHex}
                        setCustomHex={setCustomHex}
                        docsTabs={docsTabs}
                        setDocsTabs={setDocsTabs}
                        heroParticles={heroParticles}
                        setHeroParticles={setHeroParticles}
                    />
                );
            case 'developer':
                return <DeveloperSettings onShowChangelog={() => setShowChangelogDebug(true)} />;
            case 'data':
                return <DataSettings />;
            default:
                return null;
        }
    };

    const renderAllContentMobile = () => {
        return (
            <div className="space-y-12">
                <div>
                    <div className="flex items-center gap-2.5 mb-6 border-b border-gray-100 dark:border-gray-800 pb-3">
                        <span className="text-blue-600 dark:text-blue-400">
                            {ICONS.appearance}
                        </span>
                        <h3 className="text-lg font-black text-gray-900 dark:text-white tracking-tight">Appearance</h3>
                    </div>
                    <AppearanceSettings
                        themeMode={themeMode}
                        setThemeMode={setThemeMode}
                        accentColor={accentColor}
                        setAccentColor={setAccentColor}
                        customHex={customHex}
                        setCustomHex={setCustomHex}
                        docsTabs={docsTabs}
                        setDocsTabs={setDocsTabs}
                        heroParticles={heroParticles}
                        setHeroParticles={setHeroParticles}
                    />
                </div>

                {SHOW_DEV_OPTIONS && (
                    <div>
                        <div className="flex items-center gap-2.5 mb-6 border-b border-gray-100 dark:border-gray-800 pb-3">
                            <span className="text-blue-600 dark:text-blue-400">
                                {ICONS.developer}
                            </span>
                            <h3 className="text-lg font-black text-gray-900 dark:text-white tracking-tight">Developer Tools</h3>
                        </div>
                        <DeveloperSettings onShowChangelog={() => setShowChangelogDebug(true)} />
                    </div>
                )}

                <div>
                    <div className="flex items-center gap-2.5 mb-6 border-b border-gray-100 dark:border-gray-800 pb-3">
                        <span className="text-blue-600 dark:text-blue-400">
                            {ICONS.data}
                        </span>
                        <h3 className="text-lg font-black text-gray-900 dark:text-white tracking-tight">Clear Storage Data</h3>
                    </div>
                    <DataSettings />
                </div>
            </div>
        );
    };

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
                                    type="button"
                                    onClick={onClose}
                                    aria-label="Close Settings"
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors group -mr-1"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 dark:text-gray-600 group-hover:text-gray-900 dark:group-hover:text-white transition-colors"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 flex flex-col sm:flex-row min-h-0 overflow-hidden">
                            <div className="hidden sm:flex flex-col w-52 lg:w-56 flex-shrink-0 border-r border-gray-100 dark:border-gray-800 bg-gray-50/30 dark:bg-gray-950/30 py-4 px-3 gap-1">
                                {SIDEBAR_ITEMS.map((item) => (
                                    <button
                                        key={item.id}
                                        type="button"
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

                            <div className="flex-1 min-w-0 overflow-y-auto overscroll-contain">
                                <div className="hidden sm:block px-8 py-6">
                                    {renderContent()}
                                </div>
                                <div className="sm:hidden px-5 py-6">
                                    {renderAllContentMobile()}
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

export { SettingsModal };
