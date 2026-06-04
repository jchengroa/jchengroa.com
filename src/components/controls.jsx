import { useViewSwitcher } from "../utils/viewSwitcher";
import { useSubheaderToggle } from "../utils/subheaderToggle.js";
import { siteContent } from "../data/siteContent";

function SearchBar({ searchQuery, setSearchQuery }) {
    const { common } = siteContent;

    const handleSubmit = (e) => {
        e.preventDefault();
        // Search is already handled by onChange, but this allows "Enter" key behavior
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto mb-8 relative group z-20">
            {/* Colorful Icon */}
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none z-20">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="url(#search-gradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-focus-within:scale-110 transition-transform duration-300">
                    <defs>
                        <linearGradient id="search-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#3b82f6" className="group-focus-within:stopColor-[#2563eb]" />
                            <stop offset="100%" stopColor="#8b5cf6" className="group-focus-within:stopColor-[#7c3aed]" />
                        </linearGradient>
                    </defs>
                    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
                </svg>
            </div>

            {/* Gradient Border Wrapper */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300 dark:from-blue-900/50 dark:via-indigo-900/50 dark:to-purple-900/50 opacity-60 group-focus-within:opacity-100 group-focus-within:from-blue-500 group-focus-within:via-indigo-500 group-focus-within:to-purple-500 transition-all duration-500 p-[3px] shadow-lg group-focus-within:shadow-blue-500/25">
                <div className="w-full h-full bg-blue-50/95 dark:bg-gray-900/95 backdrop-blur-md rounded-[calc(1.5rem-3px)] group-focus-within:bg-white dark:group-focus-within:bg-gray-900 transition-colors duration-500"></div>
            </div>

            <div className="relative flex items-center">
                <input
                    type="text"
                    placeholder={common.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="relative w-full pl-16 pr-32 py-5 bg-transparent outline-none font-black text-gray-800 dark:text-gray-100 text-lg placeholder:text-indigo-300/80 dark:placeholder:text-indigo-700/50 transition-all z-10"
                />
                <button
                    type="submit"
                    className="absolute right-4 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-bold text-sm shadow-lg hover:shadow-blue-500/30 hover:scale-105 active:scale-95 transition-all z-20"
                >
                    {common.searchButton}
                </button>
            </div>
        </form>
    );
}

function FilterList({ activeFilter, setActiveFilter, filters }) {
    if (!filters || filters.length === 0) return null;

    return (
        <div className="w-full max-w-3xl mx-auto mb-16 flex flex-wrap gap-3 justify-center z-10 relative">
            {filters.map(filter => (
                <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 ${activeFilter === filter ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-lg scale-105' : 'bg-white/80 dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'}`}
                >
                    {filter}
                </button>
            ))}
        </div>
    );
}

function ViewSwitcherButton({ className = "" }) {
    const { view, toggleView } = useViewSwitcher();

    return (
        <button
            onClick={toggleView}
            className={`flex items-center gap-2 px-5 py-2.5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-md transition-all text-sm font-bold text-gray-700 dark:text-gray-300 ${className}`}
            aria-label={`Switch to ${view === 'grid' ? 'list' : 'grid'} view`}
        >
            {view === 'grid' ? (
                <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
                    <span>List View</span>
                </>
            ) : (
                <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                    <span>Grid View</span>
                </>
            )}
        </button>
    );
}

function SubheaderToggleButton({ className = "" }) {
    const { isVisible, toggleSubheader } = useSubheaderToggle();

    return (
        <button
            onClick={toggleSubheader}
            className={`flex items-center gap-2 px-5 py-2.5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-md transition-all text-sm font-bold text-gray-700 dark:text-gray-300 ${className}`}
            aria-label={`${isVisible ? 'Hide' : 'Show'} subheader and highlights`}
            title={`${isVisible ? 'Hide' : 'Show'} subheader and highlights`}
        >
            {isVisible ? (
                <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-10-8-10-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 10 8 10 8a18.57 18.57 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                    <span>Hide Details</span>
                </>
            ) : (
                <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                    <span>Show Details</span>
                </>
            )}
        </button>
    );
}

export { SearchBar, FilterList, ViewSwitcherButton, SubheaderToggleButton };
