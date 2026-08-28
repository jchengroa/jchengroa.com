import React, { useState } from 'react';

export default function LiveCardPreview({ item = {}, type = 'project' }) {
    const [previewMode, setPreviewMode] = useState('card'); // 'card' | 'detail'
    const [previewDark, setPreviewDark] = useState(false);

    const title = item.title || 'Untitled Work Item';
    const info = item.info || item.subtitle || (type === 'project' ? 'Project Milestone' : type === 'research' ? 'Research Paper' : 'Recognition Award');
    const summary = item.summary || item.description || 'Provide a compelling summary or abstract for this item to see it render live in the preview.';
    const tech = Array.isArray(item.tech) ? item.tech : Array.isArray(item.stack) ? item.stack : [];
    const image = item.image || (Array.isArray(item.images) && item.images.length > 0 ? item.images[0] : null);
    const stats = Array.isArray(item.stats) ? item.stats : [];
    const links = Array.isArray(item.links) ? item.links : [];

    return (
        <div className="space-y-4">
            {/* Header controls for Live Preview */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-black uppercase tracking-wider text-gray-900 dark:text-white">
                        Live Visual Preview
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    {/* Dark/Light simulation toggle */}
                    <button
                        type="button"
                        onClick={() => setPreviewDark(!previewDark)}
                        className="px-2.5 py-1 rounded-lg text-xs font-bold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 transition-colors"
                    >
                        {previewDark ? '🌙 Dark Mode' : '☀️ Light Mode'}
                    </button>

                    {/* Card vs Detail view toggle */}
                    <div className="flex bg-gray-100 dark:bg-gray-800 p-0.5 rounded-lg text-xs font-bold">
                        <button
                            type="button"
                            onClick={() => setPreviewMode('card')}
                            className={`px-3 py-1 rounded-md transition-all ${previewMode === 'card' ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-gray-500'}`}
                        >
                            Card View
                        </button>
                        <button
                            type="button"
                            onClick={() => setPreviewMode('detail')}
                            className={`px-3 py-1 rounded-md transition-all ${previewMode === 'detail' ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-gray-500'}`}
                        >
                            Detail View
                        </button>
                    </div>
                </div>
            </div>

            {/* Simulated Website Canvas Container */}
            <div className={`p-4 sm:p-6 rounded-3xl border transition-all duration-300 ${
                previewDark 
                    ? 'bg-gray-950 text-white border-gray-800' 
                    : 'bg-blue-50/40 text-gray-900 border-gray-200 shadow-inner'
            }`}>
                {previewMode === 'card' ? (
                    /* CARD VIEW PREVIEW */
                    <div className="max-w-md mx-auto">
                        <div className={`rounded-[2rem] p-6 sm:p-7 border shadow-lg transition-all ${
                            previewDark ? 'bg-gray-900 border-gray-800 text-white' : 'bg-white border-gray-100 text-gray-900'
                        }`}>
                            {image ? (
                                <div className="mb-5 rounded-2xl overflow-hidden aspect-[16/10] bg-gray-100 dark:bg-gray-800/60 border border-gray-200/50 dark:border-gray-700/50 relative">
                                    <img
                                        src={image}
                                        alt={title}
                                        className="w-full h-full object-cover"
                                        onError={(e) => { e.target.style.display = 'none'; }}
                                    />
                                </div>
                            ) : (
                                <div className="mb-5 rounded-2xl aspect-[16/10] bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 font-bold text-xs">
                                    🖼️ Image Placeholder
                                </div>
                            )}

                            <span className="text-[10px] font-black tracking-[0.2em] text-blue-600 dark:text-blue-400 uppercase mb-2 block">
                                {info}
                            </span>
                            <h3 className="text-xl sm:text-2xl font-black mb-3 tracking-tighter leading-snug">
                                {title}
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium leading-relaxed mb-5 line-clamp-3">
                                {summary}
                            </p>

                            {tech.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 mb-5">
                                    {tech.map((t, idx) => (
                                        <span
                                            key={idx}
                                            className="px-2.5 py-1 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-[10px] font-black text-gray-600 dark:text-gray-300 uppercase tracking-wider"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            )}

                            <div className="flex items-center text-blue-600 dark:text-blue-400 font-black text-xs">
                                <span>Learn More</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="ml-1.5"><path d="m9 18 6-6-6-6"/></svg>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* DETAIL VIEW PREVIEW */
                    <div className="space-y-6 max-w-2xl mx-auto">
                        <div className="space-y-2">
                            <span className="text-[11px] font-black tracking-[0.2em] text-blue-600 dark:text-blue-400 uppercase block">
                                {info}
                            </span>
                            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
                                {title}
                            </h1>
                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-medium leading-relaxed">
                                {summary}
                            </p>
                        </div>

                        {image && (
                            <div className="rounded-2xl overflow-hidden aspect-[16/9] border border-gray-200 dark:border-gray-800 shadow-md">
                                <img src={image} alt={title} className="w-full h-full object-cover" />
                            </div>
                        )}

                        {tech.length > 0 && (
                            <div>
                                <h4 className="text-xs font-black uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">
                                    Technologies & Stack
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {tech.map((t, idx) => (
                                        <span key={idx} className="px-3 py-1.5 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 rounded-xl text-xs font-bold">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {stats.length > 0 && (
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {stats.map((st, idx) => (
                                    <div key={idx} className="p-3 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-center">
                                        <div className="text-base font-black text-blue-600 dark:text-blue-400">{st.value || st.stat}</div>
                                        <div className="text-[10px] font-bold text-gray-500 uppercase">{st.label || st.name}</div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {links.length > 0 && (
                            <div className="flex flex-wrap gap-2 pt-2">
                                {links.map((link, idx) => (
                                    <a
                                        key={idx}
                                        href={link.url || '#'}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-blue-600/20"
                                    >
                                        <span>{link.label || link.name || 'View Link'}</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
