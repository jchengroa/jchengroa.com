import React, { useState } from 'react';

export default function ChangelogsAdminTab({ changelogs = [], onSaveChangelog, onDeleteChangelog }) {
    const [selectedEntry, setSelectedEntry] = useState(changelogs[0] || null);
    const [isCreatingNew, setIsCreatingNew] = useState(false);
    const [newBulletText, setNewBulletText] = useState('');

    const emptyChangelog = {
        version: '1.0.0',
        date: new Date().toISOString().split('T')[0],
        content: ['Initial release']
    };

    const currentItem = selectedEntry || emptyChangelog;
    const contentList = Array.isArray(currentItem.content) ? currentItem.content : [];

    const handleSelect = (item) => {
        setIsCreatingNew(false);
        setSelectedEntry(item);
    };

    const handleCreateNew = () => {
        setIsCreatingNew(true);
        setSelectedEntry({
            version: `1.${changelogs.length}.0`,
            date: new Date().toISOString().split('T')[0],
            content: []
        });
    };

    const handleAddBullet = (e) => {
        e.preventDefault();
        if (!newBulletText.trim()) return;
        setSelectedEntry(prev => ({
            ...(prev || emptyChangelog),
            content: [...contentList, newBulletText.trim()]
        }));
        setNewBulletText('');
    };

    const handleRemoveBullet = (index) => {
        setSelectedEntry(prev => ({
            ...(prev || emptyChangelog),
            content: contentList.filter((_, i) => i !== index)
        }));
    };

    const handleSave = () => {
        if (!currentItem.version.trim()) {
            alert('Version number is required.');
            return;
        }
        onSaveChangelog(currentItem);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm">
                <div>
                    <div className="flex items-center gap-2">
                        <h2 className="text-lg font-black text-gray-900 dark:text-white tracking-tight">
                            Changelogs Table Management
                        </h2>
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full border border-blue-200 dark:border-blue-800">
                            {changelogs.length} versions
                        </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        Manage website release notes, version dates, and update chronicles.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={handleCreateNew}
                    className="px-4 py-2 rounded-xl text-xs font-black text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/20"
                >
                    + Add New Version
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Version List */}
                <div className="lg:col-span-4 space-y-2">
                    <div className="space-y-1.5 max-h-[600px] overflow-y-auto pr-1 no-scrollbar">
                        {changelogs.map(cl => (
                            <div
                                key={cl.version}
                                onClick={() => handleSelect(cl)}
                                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                                    selectedEntry?.version === cl.version && !isCreatingNew
                                        ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-500 shadow-sm'
                                        : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 hover:border-gray-300'
                                }`}
                            >
                                <div>
                                    <div className="text-xs font-black text-blue-600 dark:text-blue-400">
                                        v{cl.version}
                                    </div>
                                    <div className="text-[11px] text-gray-400 font-mono">
                                        {cl.date}
                                    </div>
                                    <div className="text-[11px] text-gray-500 mt-1">
                                        {Array.isArray(cl.content) ? `${cl.content.length} change bullets` : '1 note'}
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDeleteChangelog(cl.version);
                                    }}
                                    className="p-1.5 text-xs text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Editor */}
                <div className="lg:col-span-8 p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
                        <h3 className="text-sm font-extrabold text-gray-900 dark:text-white">
                            {isCreatingNew ? 'Create New Version Note' : `Edit Changelog: v${currentItem.version}`}
                        </h3>
                        <button
                            type="button"
                            onClick={handleSave}
                            className="px-4 py-1.5 rounded-xl text-xs font-black text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/20"
                        >
                            Save to Supabase
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
                                    Version (Primary Key)
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={currentItem.version || ''}
                                    onChange={(e) => setSelectedEntry(prev => ({ ...prev, version: e.target.value }))}
                                    placeholder="e.g. 1.2.0"
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-mono font-bold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                                />
                            </div>

                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
                                    Release Date
                                </label>
                                <input
                                    type="text"
                                    value={currentItem.date || ''}
                                    onChange={(e) => setSelectedEntry(prev => ({ ...prev, date: e.target.value }))}
                                    placeholder="YYYY-MM-DD"
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-mono text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                                />
                            </div>
                        </div>

                        {/* Bullets editor */}
                        <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">
                                Change Bullets & Enhancements ({contentList.length})
                            </label>
                            <div className="space-y-2 mb-3">
                                {contentList.map((bullet, idx) => (
                                    <div key={idx} className="flex items-start justify-between p-3 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-xs gap-3">
                                        <span className="font-semibold text-gray-800 dark:text-gray-200 leading-relaxed">
                                            • {bullet}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveBullet(idx)}
                                            className="text-rose-500 font-bold hover:opacity-80 p-1"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <form onSubmit={handleAddBullet} className="flex gap-2">
                                <input
                                    type="text"
                                    value={newBulletText}
                                    onChange={(e) => setNewBulletText(e.target.value)}
                                    placeholder="Add bullet item (e.g. Added Supabase multi-table admin editor)"
                                    className="flex-1 px-3.5 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                                />
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 text-xs font-bold rounded-xl"
                                >
                                    + Add Item
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
