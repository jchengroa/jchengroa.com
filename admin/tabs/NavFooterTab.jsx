import React, { useState } from 'react';
import LinkItemModal from '../components/LinkItemModal.jsx';

export default function NavFooterTab({
    navbarData = {},
    onChangeNavbarData,
    navigationData = {},
    onChangeNavigationData,
    footerData = {},
    onChangeFooterData
}) {
    const [modalConfig, setModalConfig] = useState({
        isOpen: false,
        targetList: null, // 'navbar' | 'more'
        editIndex: null,
        itemData: null
    });

    const links = Array.isArray(navbarData.links) ? navbarData.links : [];
    const moreLinks = navigationData.subLinks?.more || [];

    const handleOpenAddModal = (targetList) => {
        setModalConfig({
            isOpen: true,
            targetList,
            editIndex: null,
            itemData: null
        });
    };

    const handleOpenEditModal = (targetList, index, item) => {
        setModalConfig({
            isOpen: true,
            targetList,
            editIndex: index,
            itemData: item
        });
    };

    const handleSaveLink = (savedItem) => {
        if (modalConfig.targetList === 'navbar') {
            const updated = [...links];
            if (modalConfig.editIndex !== null) {
                updated[modalConfig.editIndex] = savedItem;
            } else {
                updated.push(savedItem);
            }
            onChangeNavbarData({ ...navbarData, links: updated });
        } else if (modalConfig.targetList === 'more') {
            const updated = [...moreLinks];
            if (modalConfig.editIndex !== null) {
                updated[modalConfig.editIndex] = savedItem;
            } else {
                updated.push(savedItem);
            }
            onChangeNavigationData({
                ...navigationData,
                subLinks: {
                    ...(navigationData.subLinks || {}),
                    more: updated
                }
            });
        }
    };

    const handleDeleteLink = (targetList, index) => {
        if (targetList === 'navbar') {
            const updated = links.filter((_, i) => i !== index);
            onChangeNavbarData({ ...navbarData, links: updated });
        } else if (targetList === 'more') {
            const updated = moreLinks.filter((_, i) => i !== index);
            onChangeNavigationData({
                ...navigationData,
                subLinks: {
                    ...(navigationData.subLinks || {}),
                    more: updated
                }
            });
        }
    };

    return (
        <div className="space-y-8">
            <LinkItemModal
                isOpen={modalConfig.isOpen}
                initialData={modalConfig.itemData}
                onSave={handleSaveLink}
                onClose={() => setModalConfig({ isOpen: false, targetList: null, editIndex: null, itemData: null })}
            />

            {/* NAVBAR SECTION */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm space-y-6">
                <div className="border-b border-gray-100 dark:border-gray-800 pb-4">
                    <div className="flex items-center gap-2">
                        <h2 className="text-lg font-black text-gray-900 dark:text-white tracking-tight">
                            Header & Navbar Prompts
                        </h2>
                        <code className="text-[11px] font-mono bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-md">
                            key: navbar
                        </code>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Configure brand name and primary navigation buttons.
                    </p>
                </div>

                <div className="space-y-4">
                    <div className="max-w-md">
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                            Brand Name / Logo Text
                        </label>
                        <input
                            type="text"
                            value={navbarData.name || ''}
                            onChange={(e) => onChangeNavbarData({ ...navbarData, name: e.target.value })}
                            placeholder="jchengroa"
                            className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                Primary Navigation Links ({links.length})
                            </label>
                            <button
                                type="button"
                                onClick={() => handleOpenAddModal('navbar')}
                                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 transition-colors"
                            >
                                + Add Navbar Link
                            </button>
                        </div>

                        <div className="space-y-2">
                            {links.map((link, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="w-6 h-6 rounded-lg bg-gray-200 dark:bg-gray-700 text-[11px] font-bold flex items-center justify-center text-gray-700 dark:text-gray-300">
                                            {idx + 1}
                                        </span>
                                        <div>
                                            <span className="text-xs font-black text-gray-900 dark:text-white">
                                                {link.name || link.label}
                                            </span>
                                            <span className="text-[11px] font-mono text-gray-400 dark:text-gray-500 ml-2">
                                                {link.to || link.href}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <button
                                            type="button"
                                            onClick={() => handleOpenEditModal('navbar', idx, link)}
                                            className="px-2.5 py-1 rounded-lg text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleDeleteLink('navbar', idx)}
                                            className="px-2.5 py-1 rounded-lg text-xs font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* NAVIGATION DATA (SUB LINKS / MORE MENU) */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm space-y-6">
                <div className="border-b border-gray-100 dark:border-gray-800 pb-4">
                    <div className="flex items-center gap-2">
                        <h2 className="text-lg font-black text-gray-900 dark:text-white tracking-tight">
                            "More" Sublinks & Menu Items
                        </h2>
                        <code className="text-[11px] font-mono bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-md">
                            key: navigation_data
                        </code>
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between mb-3">
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                            Sublinks in "More" Menu ({moreLinks.length})
                        </label>
                        <button
                            type="button"
                            onClick={() => handleOpenAddModal('more')}
                            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 transition-colors"
                        >
                            + Add Sublink
                        </button>
                    </div>

                    <div className="space-y-2">
                        {moreLinks.map((link, idx) => (
                            <div
                                key={idx}
                                className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="w-6 h-6 rounded-lg bg-gray-200 dark:bg-gray-700 text-[11px] font-bold flex items-center justify-center text-gray-700 dark:text-gray-300">
                                        {idx + 1}
                                    </span>
                                    <div>
                                        <span className="text-xs font-black text-gray-900 dark:text-white">
                                            {link.name || link.label}
                                        </span>
                                        <span className="text-[11px] font-mono text-gray-400 dark:text-gray-500 ml-2">
                                            {link.to || link.href}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <button
                                        type="button"
                                        onClick={() => handleOpenEditModal('more', idx, link)}
                                        className="px-2.5 py-1 rounded-lg text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleDeleteLink('more', idx)}
                                        className="px-2.5 py-1 rounded-lg text-xs font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* FOOTER SECTION */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm space-y-6">
                <div className="border-b border-gray-100 dark:border-gray-800 pb-4">
                    <div className="flex items-center gap-2">
                        <h2 className="text-lg font-black text-gray-900 dark:text-white tracking-tight">
                            Footer Labels & Prefixes
                        </h2>
                        <code className="text-[11px] font-mono bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-md">
                            key: footer
                        </code>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                            Legal Link Label
                        </label>
                        <input
                            type="text"
                            value={footerData.legalLink || ''}
                            onChange={(e) => onChangeFooterData({ ...footerData, legalLink: e.target.value })}
                            placeholder="Domain & Legal Information"
                            className="w-full px-3.5 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                            Version Prefix
                        </label>
                        <input
                            type="text"
                            value={footerData.versionPrefix || ''}
                            onChange={(e) => onChangeFooterData({ ...footerData, versionPrefix: e.target.value })}
                            placeholder="Version"
                            className="w-full px-3.5 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                            Updated Date Prefix
                        </label>
                        <input
                            type="text"
                            value={footerData.updatedPrefix || ''}
                            onChange={(e) => onChangeFooterData({ ...footerData, updatedPrefix: e.target.value })}
                            placeholder="Last Updated"
                            className="w-full px-3.5 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
