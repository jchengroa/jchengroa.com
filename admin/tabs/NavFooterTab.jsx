import React, { useState } from 'react';
import LinkItemModal from '../components/LinkItemModal.jsx';
import SectionCardHeader from '../components/SectionCardHeader.jsx';

export default function NavFooterTab({
    navbarData = {},
    onChangeNavbarData,
    savedNavbarData = {},
    navigationData = {},
    onChangeNavigationData,
    savedNavigationData = {},
    footerData = {},
    onChangeFooterData,
    savedFooterData = {},
    onSaveKey,
    saving = false
}) {
    const [modalConfig, setModalConfig] = useState({
        isOpen: false,
        targetList: null, // 'navbar' | 'more'
        editIndex: null,
        itemData: null
    });

    const links = Array.isArray(navbarData.links) ? navbarData.links : [];
    const moreLinks = navigationData.subLinks?.more || [];

    const isNavbarChanged = JSON.stringify(navbarData) !== JSON.stringify(savedNavbarData);
    const isNavigationChanged = JSON.stringify(navigationData) !== JSON.stringify(savedNavigationData);
    const isFooterChanged = JSON.stringify(footerData) !== JSON.stringify(savedFooterData);

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
        <div className="space-y-6 sm:space-y-8">
            <LinkItemModal
                isOpen={modalConfig.isOpen}
                initialData={modalConfig.itemData}
                onSave={handleSaveLink}
                onClose={() => setModalConfig({ isOpen: false, targetList: null, editIndex: null, itemData: null })}
            />

            {/* NAVBAR SECTION */}
            <div className="p-4 sm:p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm space-y-6">
                <SectionCardHeader
                    title="Header & Navbar Prompts"
                    keyBadge="key: navbar"
                    description="Configure brand name and primary navigation buttons."
                    hasUnsaved={isNavbarChanged}
                    onUpload={() => onSaveKey && onSaveKey('navbar', navbarData)}
                    isSaving={saving}
                />

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
                            className="w-full px-3.5 py-2.5 sm:py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>

                    <div className="space-y-3 pt-2">
                        <div className="flex items-center justify-between">
                            <label className="text-xs font-black uppercase tracking-wider text-gray-400 dark:text-gray-500">
                                Primary Nav Links ({links.length})
                            </label>
                            <button
                                type="button"
                                onClick={() => handleOpenAddModal('navbar')}
                                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 hover:bg-blue-100 transition-colors cursor-pointer"
                            >
                                + Add Link
                            </button>
                        </div>

                        <div className="space-y-2">
                            {links.map((link, idx) => (
                                <div
                                    key={idx}
                                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl sm:rounded-2xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200/80 dark:border-gray-800 gap-2"
                                >
                                    <div className="min-w-0">
                                        <span className="text-xs font-black text-gray-900 dark:text-white truncate block leading-normal">
                                            {link.name || link.label}
                                        </span>
                                        <span className="text-[11px] font-mono text-gray-400 dark:text-gray-500 truncate block leading-normal">
                                            {link.to || link.href}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
                                        <button
                                            type="button"
                                            onClick={() => handleOpenEditModal('navbar', idx, link)}
                                            className="px-2.5 py-1 text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors cursor-pointer"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleDeleteLink('navbar', idx)}
                                            className="px-2.5 py-1 text-xs font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors cursor-pointer"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {links.length === 0 && (
                                <div className="text-center py-6 text-xs text-gray-400">
                                    No navigation links added yet.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* MORE DROPDOWN SUBLINKS */}
            <div className="p-4 sm:p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm space-y-6">
                <SectionCardHeader
                    title="Navigation Dropdown & Sublinks"
                    keyBadge="key: navigation_data"
                    description="Items shown inside the 'More' dropdown popover."
                    hasUnsaved={isNavigationChanged}
                    onUpload={() => onSaveKey && onSaveKey('navigation_data', navigationData)}
                    isSaving={saving}
                />

                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <label className="text-xs font-black uppercase tracking-wider text-gray-400 dark:text-gray-500">
                            Sublinks ({moreLinks.length})
                        </label>
                        <button
                            type="button"
                            onClick={() => handleOpenAddModal('more')}
                            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 hover:bg-blue-100 transition-colors cursor-pointer"
                        >
                            + Add Dropdown Link
                        </button>
                    </div>

                    <div className="space-y-2">
                        {moreLinks.map((link, idx) => (
                            <div
                                key={idx}
                                className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl sm:rounded-2xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200/80 dark:border-gray-800 gap-2"
                            >
                                <div className="min-w-0">
                                    <span className="text-xs font-black text-gray-900 dark:text-white truncate block leading-normal">
                                        {link.name || link.label}
                                    </span>
                                    <span className="text-[11px] font-mono text-gray-400 dark:text-gray-500 truncate block leading-normal">
                                        {link.to || link.href}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
                                    <button
                                        type="button"
                                        onClick={() => handleOpenEditModal('more', idx, link)}
                                        className="px-2.5 py-1 text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors cursor-pointer"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleDeleteLink('more', idx)}
                                        className="px-2.5 py-1 text-xs font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors cursor-pointer"
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
            <div className="p-4 sm:p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm space-y-6">
                <SectionCardHeader
                    title="Footer Microcopy & Prefixes"
                    keyBadge="key: footer"
                    description="Copyright statement and category headings in the website footer."
                    hasUnsaved={isFooterChanged}
                    onUpload={() => onSaveKey && onSaveKey('footer', footerData)}
                    isSaving={saving}
                />

                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                            Copyright Statement
                        </label>
                        <input
                            type="text"
                            value={footerData.copyright || ''}
                            onChange={(e) => onChangeFooterData({ ...footerData, copyright: e.target.value })}
                            placeholder="© 2026 John Carlo Cheng Roa. All rights reserved."
                            className="w-full px-3.5 py-2.5 sm:py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-1">
                        <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
                                Prefix: Sections
                            </label>
                            <input
                                type="text"
                                value={footerData.sections || ''}
                                onChange={(e) => onChangeFooterData({ ...footerData, sections: e.target.value })}
                                placeholder="Sections"
                                className="w-full px-3.5 py-2.5 sm:py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm sm:text-xs font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>
                        <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
                                Prefix: Social
                            </label>
                            <input
                                type="text"
                                value={footerData.social || ''}
                                onChange={(e) => onChangeFooterData({ ...footerData, social: e.target.value })}
                                placeholder="Social"
                                className="w-full px-3.5 py-2.5 sm:py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm sm:text-xs font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>
                        <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
                                Prefix: Legal
                            </label>
                            <input
                                type="text"
                                value={footerData.legal || ''}
                                onChange={(e) => onChangeFooterData({ ...footerData, legal: e.target.value })}
                                placeholder="Legal"
                                className="w-full px-3.5 py-2.5 sm:py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm sm:text-xs font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
