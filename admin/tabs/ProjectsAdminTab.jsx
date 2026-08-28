import React, { useState } from 'react';
import LiveCardPreview from '../components/LiveCardPreview.jsx';

export default function ProjectsAdminTab({ projects = [], onSaveProject, onDeleteProject }) {
    const [selectedProject, setSelectedProject] = useState(projects[0] || null);
    const [isCreatingNew, setIsCreatingNew] = useState(false);
    const [techInput, setTechInput] = useState('');
    const [linkNameInput, setLinkNameInput] = useState('');
    const [linkUrlInput, setLinkUrlInput] = useState('');

    const emptyProject = {
        id: `project-${Date.now()}`,
        title: '',
        subtitle: '',
        info: 'Engineering Project',
        category: 'software',
        summary: '',
        description: '',
        image: '',
        images: [],
        tech: [],
        keywords: [],
        stats: [],
        links: []
    };

    const currentItem = selectedProject || emptyProject;

    const handleSelect = (item) => {
        setIsCreatingNew(false);
        setSelectedProject(item);
    };

    const handleCreateNew = () => {
        setIsCreatingNew(true);
        setSelectedProject({ ...emptyProject, id: `project-${Date.now()}` });
    };

    const handleFieldChange = (field, value) => {
        setSelectedProject(prev => ({
            ...(prev || emptyProject),
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

    const handleAddLink = (e) => {
        e.preventDefault();
        if (!linkNameInput.trim() || !linkUrlInput.trim()) return;
        const currentLinks = Array.isArray(currentItem.links) ? currentItem.links : [];
        handleFieldChange('links', [...currentLinks, { label: linkNameInput.trim(), url: linkUrlInput.trim() }]);
        setLinkNameInput('');
        setLinkUrlInput('');
    };

    const handleRemoveLink = (index) => {
        const currentLinks = Array.isArray(currentItem.links) ? currentItem.links : [];
        handleFieldChange('links', currentLinks.filter((_, i) => i !== index));
    };

    const handleSave = () => {
        if (!currentItem.title.trim() || !currentItem.id.trim()) {
            alert('Project ID and Title are required.');
            return;
        }
        onSaveProject(currentItem);
    };

    return (
        <div className="space-y-6">
            {/* Header & List Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm">
                <div>
                    <div className="flex items-center gap-2">
                        <h2 className="text-lg font-black text-gray-900 dark:text-white tracking-tight">
                            Projects Table Management
                        </h2>
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full border border-blue-200 dark:border-blue-800">
                            {projects.length} items
                        </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        Manage projects with live side-by-side card and detail preview.
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={handleCreateNew}
                        className="px-4 py-2 rounded-xl text-xs font-black text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/20 transition-all flex items-center gap-1.5"
                    >
                        <span>+ Add New Project</span>
                    </button>
                </div>
            </div>

            {/* Main Split Layout: Selector + Editor Form + Live Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left: Project Selector List */}
                <div className="lg:col-span-3 space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">
                        Select Project
                    </label>
                    <div className="space-y-1.5 max-h-[700px] overflow-y-auto pr-1 no-scrollbar">
                        {projects.map(p => (
                            <button
                                key={p.id}
                                type="button"
                                onClick={() => handleSelect(p)}
                                className={`w-full text-left p-3 rounded-2xl border transition-all ${
                                    selectedProject?.id === p.id && !isCreatingNew
                                        ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-500 shadow-sm'
                                        : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
                                }`}
                            >
                                <div className="text-xs font-black text-gray-900 dark:text-white truncate">
                                    {p.title || 'Untitled'}
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400 uppercase">
                                        {p.category || 'general'}
                                    </span>
                                    <span className="text-[10px] text-gray-400">
                                        ID: {p.id}
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Middle: Live Editor Form */}
                <div className="lg:col-span-5 p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm space-y-5">
                    <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
                        <h3 className="text-sm font-extrabold text-gray-900 dark:text-white">
                            {isCreatingNew ? 'Create New Project' : `Edit: ${currentItem.title || currentItem.id}`}
                        </h3>
                        <div className="flex items-center gap-2">
                            {!isCreatingNew && (
                                <button
                                    type="button"
                                    onClick={() => onDeleteProject(currentItem.id)}
                                    className="px-2.5 py-1 text-xs font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors"
                                >
                                    Delete
                                </button>
                            )}
                            <button
                                type="button"
                                onClick={handleSave}
                                className="px-4 py-1.5 rounded-xl text-xs font-black text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/20"
                            >
                                Save to Supabase
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
                                    Project ID (Unique slug)
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={currentItem.id || ''}
                                    onChange={(e) => handleFieldChange('id', e.target.value)}
                                    placeholder="e.g. smart-irrigation"
                                    className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-mono text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
                                    Category
                                </label>
                                <select
                                    value={currentItem.category || 'software'}
                                    onChange={(e) => handleFieldChange('category', e.target.value)}
                                    className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-bold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                                >
                                    <option value="software">Software Applications</option>
                                    <option value="hardware">Hardware Engineering</option>
                                    <option value="embedded">Embedded Systems</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
                                Title
                            </label>
                            <input
                                type="text"
                                required
                                value={currentItem.title || ''}
                                onChange={(e) => handleFieldChange('title', e.target.value)}
                                placeholder="e.g. Autonomous Robotic Rover"
                                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
                                    Subtitle / Info Badge
                                </label>
                                <input
                                    type="text"
                                    value={currentItem.info || currentItem.subtitle || ''}
                                    onChange={(e) => {
                                        handleFieldChange('info', e.target.value);
                                        handleFieldChange('subtitle', e.target.value);
                                    }}
                                    placeholder="e.g. Embedded IoT • 2026"
                                    className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
                                    Main Image URL
                                </label>
                                <input
                                    type="text"
                                    value={currentItem.image || (Array.isArray(currentItem.images) && currentItem.images[0]) || ''}
                                    onChange={(e) => {
                                        handleFieldChange('image', e.target.value);
                                        handleFieldChange('images', [e.target.value]);
                                    }}
                                    placeholder="https://... image link"
                                    className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-mono text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
                                Summary (Card Abstract)
                            </label>
                            <textarea
                                rows={3}
                                value={currentItem.summary || ''}
                                onChange={(e) => handleFieldChange('summary', e.target.value)}
                                placeholder="Short synopsis shown on the project card gallery..."
                                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-medium text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>

                        <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
                                Full Description (Detail Page)
                            </label>
                            <textarea
                                rows={5}
                                value={currentItem.description || ''}
                                onChange={(e) => handleFieldChange('description', e.target.value)}
                                placeholder="Comprehensive project description and technical background..."
                                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-medium text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>

                        {/* Tech stack tags */}
                        <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
                                Technologies & Tech Stack
                            </label>
                            <div className="flex flex-wrap gap-1.5 mb-2">
                                {(currentItem.tech || []).map((t, idx) => (
                                    <span key={idx} className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded-lg text-[10px] font-bold">
                                        <span>{t}</span>
                                        <button type="button" onClick={() => handleRemoveTech(t)} className="text-rose-500 font-bold hover:opacity-80">✕</button>
                                    </span>
                                ))}
                            </div>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={techInput}
                                    onChange={(e) => setTechInput(e.target.value)}
                                    placeholder="Add tech (e.g. React, C++, ESP32)"
                                    className="flex-1 px-3 py-1.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                                />
                                <button
                                    type="button"
                                    onClick={handleAddTech}
                                    className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 text-xs font-bold rounded-xl"
                                >
                                    + Add
                                </button>
                            </div>
                        </div>

                        {/* Links section */}
                        <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
                                External Links (GitHub, Demo, etc.)
                            </label>
                            <div className="space-y-1.5 mb-2">
                                {(currentItem.links || []).map((lnk, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-gray-50 dark:bg-gray-800 text-xs">
                                        <span className="font-bold">{lnk.label}</span>
                                        <span className="text-gray-400 font-mono truncate max-w-[140px]">{lnk.url}</span>
                                        <button type="button" onClick={() => handleRemoveLink(idx)} className="text-rose-500 font-bold">✕</button>
                                    </div>
                                ))}
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <input
                                    type="text"
                                    value={linkNameInput}
                                    onChange={(e) => setLinkNameInput(e.target.value)}
                                    placeholder="Label (e.g. GitHub)"
                                    className="px-2.5 py-1.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-semibold"
                                />
                                <input
                                    type="text"
                                    value={linkUrlInput}
                                    onChange={(e) => setLinkUrlInput(e.target.value)}
                                    placeholder="URL (https://...)"
                                    className="px-2.5 py-1.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-mono"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={handleAddLink}
                                className="mt-2 w-full py-1.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 text-xs font-bold rounded-xl"
                            >
                                + Add Link
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right: Live Visual Preview */}
                <div className="lg:col-span-4 sticky top-20 self-start">
                    <LiveCardPreview item={currentItem} type="project" />
                </div>
            </div>
        </div>
    );
}
