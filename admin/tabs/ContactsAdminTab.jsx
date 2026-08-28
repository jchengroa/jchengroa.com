import React, { useState } from 'react';

export default function ContactsAdminTab({ 
    contacts = [], 
    onSaveContact, 
    onDeleteContact,
    socials = [],
    onSaveSocial,
    onDeleteSocial 
}) {
    const [activeSubTab, setActiveSubTab] = useState('contacts'); // 'contacts' | 'socials'
    const [editingItem, setEditingItem] = useState(null);
    const [isCreating, setIsCreating] = useState(false);

    const emptyItem = {
        id: `contact-${Date.now()}`,
        title: '',
        username: '',
        linkUrl: '',
        description: '',
        category: 'professional'
    };

    const currentList = activeSubTab === 'contacts' ? contacts : socials;
    const currentItem = editingItem || emptyItem;

    const handleSelect = (item) => {
        setIsCreating(false);
        setEditingItem(item);
    };

    const handleNew = () => {
        setIsCreating(true);
        setEditingItem({ ...emptyItem, id: `${activeSubTab}-${Date.now()}` });
    };

    const handleFieldChange = (field, val) => {
        setEditingItem(prev => ({
            ...(prev || emptyItem),
            [field]: val
        }));
    };

    const handleSave = () => {
        if (!currentItem.title.trim() || !currentItem.id.trim()) {
            alert('ID and Title are required.');
            return;
        }
        if (activeSubTab === 'contacts') {
            onSaveContact(currentItem);
        } else {
            onSaveSocial(currentItem);
        }
    };

    const handleDelete = (id) => {
        if (activeSubTab === 'contacts') {
            onDeleteContact(id);
        } else {
            onDeleteSocial(id);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header & Sub-tab Switch */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm">
                <div>
                    <h2 className="text-lg font-black text-gray-900 dark:text-white tracking-tight">
                        Contacts & Social Profiles Management
                    </h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        Manage your professional contacts, messaging handles, and social media platforms.
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl text-xs font-bold">
                        <button
                            type="button"
                            onClick={() => {
                                setActiveSubTab('contacts');
                                setEditingItem(null);
                                setIsCreating(false);
                            }}
                            className={`px-3 py-1.5 rounded-lg transition-all ${activeSubTab === 'contacts' ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-gray-500'}`}
                        >
                            contacts ({contacts.length})
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setActiveSubTab('socials');
                                setEditingItem(null);
                                setIsCreating(false);
                            }}
                            className={`px-3 py-1.5 rounded-lg transition-all ${activeSubTab === 'socials' ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-gray-500'}`}
                        >
                            socials ({socials.length})
                        </button>
                    </div>

                    <button
                        type="button"
                        onClick={handleNew}
                        className="px-3.5 py-2 rounded-xl text-xs font-black text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/20"
                    >
                        + Add New
                    </button>
                </div>
            </div>

            {/* Split Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* List Column */}
                <div className="lg:col-span-5 space-y-2">
                    <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1 no-scrollbar">
                        {currentList.map(item => (
                            <div
                                key={item.id}
                                onClick={() => handleSelect(item)}
                                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                                    editingItem?.id === item.id && !isCreating
                                        ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-500 shadow-sm'
                                        : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 hover:border-gray-300'
                                }`}
                            >
                                <div className="space-y-0.5">
                                    <div className="text-xs font-extrabold text-gray-900 dark:text-white">
                                        {item.title}
                                    </div>
                                    <div className="text-[11px] text-gray-500 font-mono">
                                        {item.username || item.linkUrl}
                                    </div>
                                    <span className="inline-block text-[9px] uppercase font-bold px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                                        {item.category || 'general'}
                                    </span>
                                </div>

                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete(item.id);
                                    }}
                                    className="p-1.5 text-xs text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Editor Column */}
                <div className="lg:col-span-7 p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
                        <h3 className="text-sm font-extrabold text-gray-900 dark:text-white">
                            {isCreating ? `Add to ${activeSubTab}` : `Edit: ${currentItem.title || currentItem.id}`}
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
                                    ID Slug (Primary Key)
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={currentItem.id || ''}
                                    onChange={(e) => handleFieldChange('id', e.target.value)}
                                    placeholder="e.g. github, linkedin, email"
                                    className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-mono text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
                                    Category Group
                                </label>
                                <select
                                    value={currentItem.category || 'professional'}
                                    onChange={(e) => handleFieldChange('category', e.target.value)}
                                    className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-bold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                                >
                                    <option value="professional">Professional</option>
                                    <option value="socials">Socials</option>
                                    <option value="personal">Personal</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
                                Platform / Channel Title
                            </label>
                            <input
                                type="text"
                                required
                                value={currentItem.title || ''}
                                onChange={(e) => handleFieldChange('title', e.target.value)}
                                placeholder="e.g. GitHub, LinkedIn, Email"
                                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>

                        <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
                                Handle / Username / Text
                            </label>
                            <input
                                type="text"
                                value={currentItem.username || ''}
                                onChange={(e) => handleFieldChange('username', e.target.value)}
                                placeholder="e.g. @jchengroa or johncarloproa@gmail.com"
                                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>

                        <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
                                Target Link URL (linkUrl)
                            </label>
                            <input
                                type="text"
                                value={currentItem.linkUrl || ''}
                                onChange={(e) => handleFieldChange('linkUrl', e.target.value)}
                                placeholder="https://github.com/jchengroa"
                                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-mono text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>

                        <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
                                Description Prompt (Optional)
                            </label>
                            <textarea
                                rows={2}
                                value={currentItem.description || ''}
                                onChange={(e) => handleFieldChange('description', e.target.value)}
                                placeholder="Short context or note..."
                                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-medium text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
