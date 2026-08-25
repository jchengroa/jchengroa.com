import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    changelogPageVariants,
    changelogHeaderVariants,
    changelogControlsVariants,
    changelogTimelineItemVariants,
    changelogPopupBackdropVariants,
    changelogPopupContentVariants
} from "../animations/changelog.js";
import { Title, FormattedText, SearchBar, FilterList } from "../components/components";
import ChangelogOutline from "../components/changelogOutline";
import { useData } from "../context/dataContext.jsx";
import { LuHistory } from "react-icons/lu";
import Fuse from 'fuse.js';

/**
 * ChangelogPopup Component
 * Automatically detects new versions and shows a popup once.
 */
export function ChangelogPopup({ forceOpen = false, onForceClose }) {
    const { changelogs } = useData();
    const [isOpen, setIsOpen] = useState(false);
    const [latestEntry, setLatestEntry] = useState(null);

    useEffect(() => {
        if (changelogs && changelogs.length > 0) {
            const absoluteLatest = changelogs[changelogs.length - 1];

            if (forceOpen) {
                setLatestEntry(absoluteLatest);
                setIsOpen(true);
                return;
            }

            const seenVersion = localStorage.getItem("seenVersion");

            // If it's a new user (never seen any version), we mark current version as seen
            // so we don't spam them on their very first visit
            if (!seenVersion) {
                localStorage.setItem("seenVersion", absoluteLatest.version);
                return;
            }

            // If they haven't seen this version yet, show the popup
            if (seenVersion !== absoluteLatest.version) {
                setLatestEntry(absoluteLatest);
                setIsOpen(true);
            }
        }
    }, [changelogs, forceOpen]);

    const handleClose = () => {
        if (latestEntry) {
            localStorage.setItem("seenVersion", latestEntry.version);
        }
        setIsOpen(false);
        if (onForceClose) onForceClose();
    };

    return (
        <AnimatePresence>
            {isOpen && latestEntry && (
                <div className="fixed inset-0 z-[250] flex items-center justify-center p-3 sm:p-6 md:p-8 isolate overflow-hidden">
                    {/* Backdrop */}
                    <motion.div
                        variants={changelogPopupBackdropVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={handleClose}
                        className="fixed inset-0 bg-black/70 dark:bg-black/85 backdrop-blur-2xl transition-all"
                    />

                    {/* Popup Box */}
                    <motion.div
                        variants={changelogPopupContentVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="relative w-[92vw] sm:w-[86vw] md:w-[75vw] lg:w-[60vw] max-w-2xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-3xl rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden border border-gray-200/60 dark:border-gray-800/80 shadow-[0_25px_70px_rgba(0,0,0,0.45)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.8)] flex flex-col max-h-[85vh] sm:max-h-[82vh] md:max-h-[80vh] z-10"
                    >
                        {/* Header */}
                        <div className="p-5 sm:p-7 md:p-8 pb-3 sm:pb-4 border-b border-gray-100 dark:border-gray-800/80 flex-shrink-0 flex items-start justify-between gap-4">
                            <div>
                                <span className="text-[10px] sm:text-xs font-black tracking-[0.25em] text-blue-600 dark:text-blue-400 uppercase mb-1.5 sm:mb-2 block">
                                    Release Update
                                </span>
                                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
                                    Version {latestEntry.version}
                                </h3>
                                <p className="text-[11px] sm:text-xs font-bold text-gray-400 dark:text-gray-500 mt-1">
                                    Released on {new Date(latestEntry.date).toLocaleDateString('en-US', {
                                        month: 'long',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })}
                                </p>
                            </div>

                            <button
                                onClick={handleClose}
                                className="p-2 sm:p-2.5 rounded-full text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all cursor-pointer -mr-1 -mt-1 shrink-0"
                                aria-label="Close changelog update"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                            </button>
                        </div>

                        {/* Scrollable Content */}
                        <div className="p-5 sm:p-7 md:p-8 pt-4 sm:pt-6 overflow-y-auto flex-grow text-left overscroll-contain">
                            <h4 className="text-[10px] sm:text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3 sm:mb-4">
                                What's New
                            </h4>
                            <ul className="space-y-3.5 sm:space-y-4 font-medium text-gray-650 dark:text-gray-300 leading-relaxed text-xs sm:text-sm md:text-base">
                                {latestEntry.content.map((point, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mt-2 sm:mt-2.5 shrink-0 shadow-[0_0_8px_rgba(37,99,235,0.5)]" />
                                        <span className="flex-1 leading-relaxed"><FormattedText text={point} /></span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Always-visible Footer Action */}
                        <div className="p-4 sm:p-6 border-t border-gray-100 dark:border-gray-800/80 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm flex-shrink-0">
                            <button
                                onClick={handleClose}
                                className="w-full py-3.5 sm:py-4 px-6 sm:px-8 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-black text-xs sm:text-sm md:text-base rounded-2xl hover:bg-black dark:hover:bg-gray-100 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-gray-300/40 dark:shadow-black/60 cursor-pointer"
                            >
                                Awesome!
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

export default function Changelog() {
    const { siteContent, changelogs, loading } = useData();
    const changelog = siteContent.changelog || {
        title: "Changelog",
        subtitle: "A detailed timeline of the website's evolution, technical updates, and feature rollouts."
    };
    const [searchQuery, setSearchQuery] = useState("");
    const [entries, setEntries] = useState([]);
    const [sortOrder, setSortOrder] = useState("Newest to Oldest");

    useEffect(() => {
        let data = [...changelogs];
        
        if (searchQuery.trim() !== "") {
            const fuse = new Fuse(data, {
                keys: ['version', 'date', 'content'],
                threshold: 0.3
            });
            data = fuse.search(searchQuery).map(result => result.item);
        }

        // Parse version array helper
        const parseVersion = (v) => v.split('.').map(Number);
        
        // Compare version helper
        const compareVersions = (a, b) => {
            const va = parseVersion(a.version);
            const vb = parseVersion(b.version);
            for (let i = 0; i < Math.max(va.length, vb.length); i++) {
                const numA = va[i] || 0;
                const numB = vb[i] || 0;
                if (numA !== numB) return numA - numB;
            }
            return new Date(a.date) - new Date(b.date);
        };

        if (sortOrder === "Newest to Oldest") {
            data.sort((a, b) => compareVersions(b, a));
        } else {
            data.sort((a, b) => compareVersions(a, b));
        }

        setEntries(data);
        if (!searchQuery && changelogs.length > 0) window.scrollTo(0, 0);
    }, [searchQuery, changelogs, sortOrder]);

    const versionList = entries.map(e => e.version);

    return (
        <section
            id="changelog"
            className="relative min-h-screen pt-20 md:pt-32 pb-32 md:pb-20 px-4 md:px-6 bg-transparent flex flex-col items-center overflow-x-hidden"
        >
            <div className="max-w-6xl w-full z-10">
                <motion.div
                    variants={changelogHeaderVariants}
                    initial="hidden"
                    animate="visible"
                    className="w-full mb-6 lg:mb-10"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
                        {/* Left Column: Title and description */}
                        <div className="lg:col-span-5 text-left">
                            <Title
                                title={changelog.title || "Changelog"}
                                subtitle={changelog.subtitle || "A detailed timeline of the website's evolution, technical updates, and feature rollouts."}
                                icon={LuHistory}
                                align="left"
                                className="!mb-0"
                            />
                        </div>

                        {/* Right Column: Search & Filters */}
                        <motion.div
                            variants={changelogControlsVariants}
                            className="lg:col-span-7 flex flex-col items-center lg:items-end gap-2.5 sm:gap-3 w-full"
                        >
                            <SearchBar
                                searchQuery={searchQuery}
                                setSearchQuery={setSearchQuery}
                            />
                            <div className="flex items-center justify-center lg:justify-end gap-2.5 w-full">
                                <FilterList
                                    activeFilter={sortOrder}
                                    setActiveFilter={setSortOrder}
                                    filters={["Newest to Oldest", "Oldest to Newest"]}
                                />
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                <div>
                    <ChangelogOutline versions={versionList} />

                    <div className="max-w-4xl mx-auto">
                        {loading ? (
                            <div className="flex justify-center py-20">
                                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        ) : (
                            <div className="space-y-12">
                                <AnimatePresence mode="popLayout">
                                    {entries.map((entry) => (
                                        <motion.section
                                            id={`changelog-${entry.version}`}
                                            key={entry.version}
                                            variants={changelogTimelineItemVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                            className="relative pl-12 pb-12 border-l-2 border-gray-100 dark:border-gray-800 last:border-0 scroll-mt-36"
                                        >
                                            {/* Timeline Dot */}
                                            <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-white dark:bg-gray-900 border-4 border-blue-600 shadow-sm" />

                                            <div className="bg-white dark:bg-gray-900 rounded-[2rem] p-8 md:p-10 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl dark:hover:shadow-black/50 transition-all duration-500 group">
                                                <div className="flex flex-wrap items-baseline gap-4 mb-6">
                                                    <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                                                        v{entry.version}
                                                    </h2>
                                                    <span className="text-gray-400 dark:text-gray-500 font-bold text-sm">
                                                        {entry.date}
                                                    </span>
                                                </div>

                                                <ul className="space-y-4">
                                                    {entry.content.map((item, i) => (
                                                        <li key={i} className="flex gap-4 items-start">
                                                            <div className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 group-hover:bg-blue-600 transition-colors shrink-0" />
                                                            <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                                                                <FormattedText text={item} />
                                                            </p>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </motion.section>
                                    ))}
                                </AnimatePresence>

                                {entries.length === 0 && (
                                    <motion.div 
                                        variants={changelogTimelineItemVariants}
                                        initial="hidden"
                                        animate="visible"
                                        className="text-center py-20"
                                    >
                                        <h3 className="text-2xl font-black text-gray-400">No updates found</h3>
                                        <p className="text-gray-500 mt-2">Try searching for a different version or feature.</p>
                                    </motion.div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
