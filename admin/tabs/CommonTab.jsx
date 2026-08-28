import React, { useState } from 'react';

const COMMON_PRESET_FIELDS = [
    { key: 'awesome', label: 'Awesome / Success Banner Title', default: 'Awesome!' },
    { key: 'whatsNew', label: "What's New Notification Heading", default: "What's New" },
    { key: 'searchPlaceholder', label: 'Global Search Bar Placeholder', default: 'Search projects, research...' },
    { key: 'viewDetails', label: 'View Details Button Text', default: 'View Details' },
    { key: 'learnMore', label: 'Learn More Button Text', default: 'Learn More' },
    { key: 'backToHome', label: 'Back to Home Link Text', default: 'Back to Home' },
    { key: 'noResults', label: 'No Search Results Dialogue', default: 'No matching items found.' },
    { key: 'copied', label: 'Copied to Clipboard Toast', default: 'Copied to clipboard!' }
];

export default function CommonTab({ commonData = {}, onChangeCommonData }) {
    const [newKey, setNewKey] = useState('');
    const [newVal, setNewVal] = useState('');
    const [showAddForm, setShowAddForm] = useState(false);

    const handleFieldChange = (key, value) => {
        onChangeCommonData({
            ...commonData,
            [key]: value
        });
    };

    const handleDeleteKey = (key) => {
        const copy = { ...commonData };
        delete copy[key];
        onChangeCommonData(copy);
    };

    const handleAddCustomKey = (e) => {
        e.preventDefault();
        if (!newKey.trim()) return;
        onChangeCommonData({
            ...commonData,
            [newKey.trim()]: newVal
        });
        setNewKey('');
        setNewVal('');
        setShowAddForm(false);
    };

    // Find custom keys not in presets
    const customKeys = Object.keys(commonData).filter(
        k => !COMMON_PRESET_FIELDS.some(p => p.key === k)
    );

    return (
        <div className="space-y-8">
            <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm space-y-6">
                <div className="border-b border-gray-100 dark:border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="text-lg font-black text-gray-900 dark:text-white tracking-tight">
                                Common UI Dialogues & Button Prompts
                            </h2>
                            <code className="text-[11px] font-mono bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-md">
                                key: common
                            </code>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Shared labels, feedback dialogues, button prompts, and global microcopy.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => setShowAddForm(!showAddForm)}
                        className="px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 transition-colors self-start sm:self-center"
                    >
                        {showAddForm ? 'Cancel' : '+ Add Custom Dialogue Key'}
                    </button>
                </div>

                {/* Add Custom Key Form */}
                {showAddForm && (
                    <form onSubmit={handleAddCustomKey} className="p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/50 space-y-3">
                        <h4 className="text-xs font-black text-blue-900 dark:text-blue-200 uppercase tracking-wider">
                            Add New Common Dialogue Field
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <input
                                type="text"
                                required
                                placeholder="Property Key (e.g. submitSuccess)"
                                value={newKey}
                                onChange={(e) => setNewKey(e.target.value)}
                                className="px-3.5 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-mono text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                            />
                            <input
                                type="text"
                                required
                                placeholder="Dialogue Text (e.g. Message sent successfully!)"
                                value={newVal}
                                onChange={(e) => setNewVal(e.target.value)}
                                className="px-3.5 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>
                        <button
                            type="submit"
                            className="px-4 py-1.5 rounded-xl text-xs font-black text-white bg-blue-600 hover:bg-blue-700 shadow-sm"
                        >
                            Save Property
                        </button>
                    </form>
                )}

                {/* Preset Common Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {COMMON_PRESET_FIELDS.map((field) => (
                        <div key={field.key} className="space-y-1.5">
                            <div className="flex items-center justify-between">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                    {field.label}
                                </label>
                                <span className="text-[10px] font-mono text-gray-400 dark:text-gray-600">
                                    {field.key}
                                </span>
                            </div>
                            <input
                                type="text"
                                value={commonData[field.key] !== undefined ? commonData[field.key] : ''}
                                onChange={(e) => handleFieldChange(field.key, e.target.value)}
                                placeholder={field.default}
                                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>
                    ))}
                </div>

                {/* Custom Keys List if any exist */}
                {customKeys.length > 0 && (
                    <div className="pt-4 border-t border-gray-100 dark:border-gray-800 space-y-3">
                        <h4 className="text-xs font-black uppercase tracking-wider text-gray-400 dark:text-gray-500">
                            Custom Dialogue Keys ({customKeys.length})
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {customKeys.map(k => (
                                <div key={k} className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700 space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                                            {k}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => handleDeleteKey(k)}
                                            className="text-[11px] font-bold text-rose-600 hover:text-rose-700"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                    <input
                                        type="text"
                                        value={typeof commonData[k] === 'object' ? JSON.stringify(commonData[k]) : commonData[k] || ''}
                                        onChange={(e) => handleFieldChange(k, e.target.value)}
                                        className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
