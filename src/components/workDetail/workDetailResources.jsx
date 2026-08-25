export default function WorkDetailResources({ links, isResearch = false, title = "Resources" }) {
    if (!links || links.length === 0) return null;

    return (
        <div id="resources" className="z-10 scroll-mt-36">
            <h3 className="text-xs font-black tracking-[0.2em] uppercase text-gray-400 dark:text-gray-500 mb-6">
                {title}
            </h3>
            <div className="flex flex-col gap-4">
                {links.map((link) => {
                    const isPdf = link.url.toLowerCase().includes(".pdf") || link.url.startsWith("/Documents/") || isResearch;
                    
                    if (isPdf) {
                        const filename = link.name || link.url.substring(link.url.lastIndexOf("/") + 1) || "Research-Paper.pdf";
                        const formattedFilename = filename.toLowerCase().endsWith(".pdf") ? filename : `${filename}.pdf`;

                        return (
                            <div 
                                key={link.name || link.url}
                                className="p-5 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[1.5rem] flex flex-col gap-3 shadow-sm hover:shadow-md transition-all"
                            >
                                <div className="flex items-center gap-3 min-w-0 w-full">
                                    <div className="p-2.5 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-xl border border-blue-100 dark:border-blue-900/30 shrink-0 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                                            <polyline points="14 2 14 8 20 8" />
                                        </svg>
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <span className="font-bold text-sm text-gray-900 dark:text-white block truncate" title={link.name}>{link.name}</span>
                                        <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 block uppercase tracking-wider">Research Document</span>
                                    </div>
                                </div>

                                <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex flex-col gap-2">
                                    <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest block">Choose Action</span>
                                    <div className="grid grid-cols-2 gap-2 w-full">
                                        <a
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 hover:scale-[1.02] active:scale-[0.98] text-center"
                                        >
                                            <span className="truncate">View Paper</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                                <polyline points="15 3 21 3 21 9" />
                                                <line x1="10" y1="14" x2="21" y2="3" />
                                            </svg>
                                        </a>

                                        <button
                                            type="button"
                                            onClick={() => {
                                                window.dispatchEvent(
                                                    new CustomEvent("trigger-file-download", {
                                                        detail: { url: link.url, filename: formattedFilename }
                                                    })
                                                );
                                            }}
                                            className="w-full px-3 py-2.5 bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 hover:scale-[1.02] active:scale-[0.98] text-center"
                                        >
                                            <span className="truncate">Download</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                                <polyline points="7 10 12 15 17 10" />
                                                <line x1="12" y1="15" x2="12" y2="3" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    }

                    return (
                        <a 
                            key={link.name || link.url} 
                            href={link.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex items-center justify-between p-5 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-[1.5rem] font-bold border border-gray-100 dark:border-gray-800 hover:border-blue-600 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all hover:scale-[1.02] cursor-pointer shadow-sm"
                        >
                            <span>{link.name}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                <polyline points="15 3 21 3 21 9" />
                                <line x1="10" y1="14" x2="21" y2="3" />
                            </svg>
                        </a>
                    );
                })}
            </div>
        </div>
    );
}

export { WorkDetailResources };
