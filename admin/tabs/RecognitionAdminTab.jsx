import React, { useState } from 'react';
import { LuUpload, LuCheck } from 'react-icons/lu';
import LiveCardPreview from '../components/LiveCardPreview.jsx';

export default function RecognitionAdminTab({ recognition = [], onSaveRecognition, onDeleteRecognition }) {
    const [selectedItem, setSelectedItem] = useState(recognition[0] || null);
    const [isCreatingNew, setIsCreatingNew] = useState(false);
    const [techInput, setTechInput] = useState('');

    const emptyRecognition = {
        id: `rec-${Date.now()}`,
        title: '',
        subtitle: '',
        info: 'Achievement / Award',
        category: 'recognition',
        description: '',
        facebookUrl: '',
        image: '',
        images: [],
        tech: [],
        keywords: [],
        stats: [],
        links: []
    };

    const currentItem = selectedItem || emptyRecognition;

    const handleSelect = (item) => {
        setIsCreatingNew(false);
        setSelectedItem(item);
    };

    const handleCreateNew = () => {
        setIsCreatingNew(true);
        setSelectedItem({ ...emptyRecognition, id: `rec-${Date.now()}` });
    };

    const handleFieldChange = (field, value) => {
        setSelectedItem(prev => ({
            ...(prev || emptyRecognition),
            [field]: value
        }));
    };

    const handleAddTech = (e) => {
        e.preventDefault();
        if (!techInput.trim()) return;
        const currentTech = Array.isArray(currentItem.tech) ? currentItem.tech : [];
        if (!currentTech.includes(techInput.trim())) {
            handleFieldChange('tech', [...currentTech, techInput.trim()]);
        }
        setTechInput('');
    };

    const handleRemoveTech = (t) => {
        const currentTech = Array.isArray(currentItem.tech) ? currentItem.tech : [];
        handleFieldChange('tech', currentTech.filter(item => item !== t));
    };

    const handleSave = () => {
        if (!currentItem.title.trim() || !currentItem.id.trim()) {
            alert('Recognition ID and Title are required.');
            return;
        }
        onSaveRecognition(currentItem);
    };

    return (
        <div className="space-y-6">
            {/* Header Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm">
                <div>
                    <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="text-base sm:text-lg font-black text-gray-900 dark:text-white tracking-tight">
                            Awards
                        </h2>
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full border border-blue-200 dark:border-blue-800">
                            {recognition.length} items
                        </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        Manage awards and accolades with live side-by-side card and detail preview.
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={handleCreateNew}
                        className="w-full sm:w-auto px-4 py-2.5 sm:py-2 rounded-xl text-xs font-black text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                        <span>+ Add New Award</span>
                    </button>
                </div>
            </div>

            {/* Split Layout: Selector + Editor Form + Live Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
                {/* Left: Selector List (Horizontal scroll chips on mobile, vertical sidebar on desktop) */}
                <div className="lg:col-span-3 space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                        Select Item
                    </label>
                    <div className="flex lg:flex-col overflow-x-auto lg:overflow-y-auto gap-2 lg:gap-1.5 pb-2 lg:pb-0 max-h-none lg:max-h-[700px] no-scrollbar">
                        {recognition.map(rec => (
                            <button
                                key={rec.id}
                                type="button"
                                onClick={() => handleSelect(rec)}
                                className={`shrink-0 w-64 lg:w-full text-left p-3 rounded-xl sm:rounded-2xl border transition-all cursor-pointer ${
                                    selectedItem?.id === rec.id && !isCreatingNew
                                        ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-500 shadow-sm'
                                        : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
                                }`}
                            >
                                <div className="text-xs font-black text-gray-900 dark:text-white truncate leading-normal">
                                    {rec.title || 'Untitled'}
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-[10px] text-gray-400 truncate leading-normal">
                                        ID: {rec.id}
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Middle: Live Form */}
                <div className="lg:col-span-5 p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm space-y-5">
                    {(() => {
                        const loadedItem = recognition.find(r => r.id === currentItem.id);
                        const hasUnsaved = isCreatingNew
                            ? Boolean(currentItem.title?.trim())
                            : JSON.stringify(currentItem) !== JSON.stringify(loadedItem);
                        return (
                            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3 gap-2 flex-wrap">
                                <h3 className="text-sm font-extrabold text-gray-900 dark:text-white truncate">
                                    {isCreatingNew ? 'Create New Award' : `Edit: ${currentItem.title || currentItem.id}`}
                                </h3>
                                <div className="flex items-center gap-2">
                                    {hasUnsaved ? (
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/60 text-amber-700 dark:text-amber-300 text-xs font-bold">
                                            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                                            Unsaved changes
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
                                            <LuCheck size={12} strokeWidth={3} className="text-emerald-500" />
                                            Saved
                                        </span>
                                    )}
                                    {!isCreatingNew && (
                                        <button
                                            type="button"
                                            onClick={() => onDeleteRecognition(currentItem.id)}
                                            className="px-2.5 py-1 text-xs font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors cursor-pointer"
                                        >
                                            Delete
                                        </button>
                                    )}
                                    <button
                                        type="button"
                                        onClick={handleSave}
                                        disabled={!hasUnsaved}
                                        className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                            hasUnsaved
                                                ? 'text-white bg-blue-600 hover:bg-blue-700 shadow-sm shadow-blue-600/30'
                                                : 'text-gray-400 bg-gray-100 dark:bg-gray-800/80 cursor-not-allowed opacity-60'
                                        }`}
                                    >
                                        <LuUpload size={13} />
                                        <span>Upload</span>
                                    </button>
                                </div>
                            </div>
                        );
                    })()}

                    <div className="space-y-4">
                        <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
                                Recognition ID (Unique slug)
                            </label>
                            <input
                                type="text"
                                required
                                value={currentItem.id || ''}
                                onChange={(e) => handleFieldChange('id', e.target.value)}
                                placeholder="e.g. hackathon-1st-place"
                                className="w-full px-3.5 py-2.5 sm:py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm sm:text-xs font-mono text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>

                        <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
                                Award / Recognition Title
                            </label>
                            <input
                                type="text"
                                required
                                value={currentItem.title || ''}
                                onChange={(e) => handleFieldChange('title', e.target.value)}
                                placeholder="e.g. 1st Place National Hackathon"
                                className="w-full px-3.5 py-2.5 sm:py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
                                    Info Tag / Subtitle
                                </label>
                                <input
                                    type="text"
                                    value={currentItem.info || currentItem.subtitle || ''}
                                    onChange={(e) => {
                                        handleFieldChange('info', e.target.value);
                                        handleFieldChange('subtitle', e.target.value);
                                    }}
                                    placeholder="e.g. National Championship • 2026"
                                    className="w-full px-3.5 py-2.5 sm:py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm sm:text-xs font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
                                    Facebook Embed URL
                                </label>
                                <input
                                    type="text"
                                    value={currentItem.facebookUrl || ''}
                                    onChange={(e) => handleFieldChange('facebookUrl', e.target.value)}
                                    placeholder="https://facebook.com/..."
                                    className="w-full px-3.5 py-2.5 sm:py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm sm:text-xs font-mono text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
                                Image URL (Optional)
                            </label>
                            <input
                                type="text"
                                value={currentItem.image || (Array.isArray(currentItem.images) && currentItem.images[0]) || ''}
                                onChange={(e) => {
                                    handleFieldChange('image', e.target.value);
                                    handleFieldChange('images', [e.target.value]);
                                }}
                                placeholder="https://... photo link"
                                className="w-full px-3.5 py-2.5 sm:py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm sm:text-xs font-mono text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>

                        <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
                                Description & Milestone Summary
                            </label>
                            <textarea
                                rows={5}
                                value={currentItem.description || currentItem.summary || ''}
                                onChange={(e) => {
                                    handleFieldChange('description', e.target.value);
                                    handleFieldChange('summary', e.target.value);
                                }}
                                placeholder="Detailed story of the award, competition results, and certificate info..."
                                className="w-full px-3.5 py-2.5 sm:py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm sm:text-xs font-medium text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>

                        {/* Associated Tech / Category Tags */}
                        <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
                                Focus Areas / Category Tags
                            </label>
                            <div className="flex flex-wrap gap-1.5 mb-2">
                                {(currentItem.tech || []).map((t, idx) => (
                                    <span key={idx} className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded-lg text-[10px] font-bold">
                                        <span>{t}</span>
                                        <button type="button" onClick={() => handleRemoveTech(t)} className="text-rose-500 font-bold p-0.5">✕</button>
                                    </span>
                                ))}
                            </div>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={techInput}
                                    onChange={(e) => setTechInput(e.target.value)}
                                    placeholder="e.g. AI Innovation, Robotics"
                                    className="flex-1 px-3 py-2 sm:py-1.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm sm:text-xs font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                                />
                                <button
                                    type="button"
                                    onClick={handleAddTech}
                                    className="px-3.5 py-2 sm:py-1.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-xs font-bold rounded-xl cursor-pointer"
                                >
                                    + Add
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Live Preview */}
                <div className="lg:col-span-4 sticky top-20 self-start">
                    <LiveCardPreview item={currentItem} type="recognition" />
                </div>
            </div>
        </div>
    );
}
