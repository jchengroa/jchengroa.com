import { useState } from "react";

export const STORAGE_KEYS = {
    themeMode: 'themeMode',
    accentColor: 'accentColor',
    customColor: 'customAccentColor',
    darkMode: 'darkMode',
    monochrome: 'jchengroa_monochrome',
    seenVersion: 'seenVersion',
    view: 'jchengroa_view_preference',
    subheader: 'jchengroa_subheader_visible',
    docsOutline: 'jchengroa_docs_outline_open',
    docsExpanded: 'jchengroa_docs_expanded_sections',
    docsTabs: 'jchengroa_doc_tabs_desktop_open',
    changelogOutline: 'jchengroa_changelog_outline_open',
    analyticsConsent: 'jchengroa_analytics_consent',
    heroParticles: 'jchengroa_hero_particles_enabled',
};

export const DATA_CATEGORIES = [
    {
        id: 'appearance',
        label: 'Appearance',
        description: 'Theme mode, accent color, monochrome, and particle effects.',
        keys: [STORAGE_KEYS.themeMode, STORAGE_KEYS.darkMode, STORAGE_KEYS.accentColor, STORAGE_KEYS.monochrome, STORAGE_KEYS.heroParticles],
    },
    {
        id: 'layout',
        label: 'Layout & View',
        description: 'View mode, subheader visibility, and sidebar states.',
        keys: [STORAGE_KEYS.view, STORAGE_KEYS.subheader, STORAGE_KEYS.docsOutline, STORAGE_KEYS.docsExpanded, STORAGE_KEYS.docsTabs, STORAGE_KEYS.changelogOutline],
    },
    {
        id: 'privacy',
        label: 'Privacy & Consent',
        description: 'Vercel Analytics consent preference.',
        keys: [STORAGE_KEYS.analyticsConsent],
    },
    {
        id: 'changelog',
        label: 'Changelog State',
        description: 'Last seen version tracking for the update popup.',
        keys: [STORAGE_KEYS.seenVersion],
    },
];

export default function DataSettings() {
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
                                    type="button"
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

export { DataSettings };
