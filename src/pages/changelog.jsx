import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, TIMING, EASING } from "../utils/animations.js";
import { NavBar, Title, FormattedText, SearchBar, FilterList } from "../components/components";
import ChangelogOutline from "../components/changelogOutline";
import { useData } from "../context/DataContext.jsx";
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
            // but we DON'T show the popup. This satisfies the requirement that it won't
            // show simply because a new user entered the website.
            if (seenVersion === null) {
                localStorage.setItem("seenVersion", absoluteLatest.version);
                return;
            }

            // If they are a returning user and the version has changed, show the popup.
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

    if (!isOpen || !latestEntry) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-md"
                    />

                    {/* Popup Box */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 350 }}
                        className="relative w-full max-w-xl bg-white dark:bg-gray-900 rounded-[2.5rem] overflow-hidden border border-gray-100 dark:border-gray-800 shadow-2xl flex flex-col max-h-[85vh] z-10"
                    >
                        {/* Header */}
                        <div className="p-8 pb-4 border-b border-gray-100 dark:border-gray-850 flex-shrink-0 flex items-start justify-between">
                            <div>
                                <span className="text-[10px] font-black tracking-[0.25em] text-blue-600 uppercase mb-2 block">
                                    Release Update
                                </span>
                                <h3 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                                    Version {latestEntry.version}
                                </h3>
                                <p className="text-xs font-bold text-gray-400 dark:text-gray-500 mt-1">
                                    Released on {new Date(latestEntry.date).toLocaleDateString('en-US', {
                                        month: 'long',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-8 pt-6 overflow-y-auto flex-grow text-left">
                            <h4 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">
                                What's New
                            </h4>
                            <ul className="space-y-4 font-medium text-gray-650 dark:text-gray-350 leading-relaxed text-sm md:text-base">
                                {latestEntry.content.map((point, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mt-2.5 shrink-0" />
                                        <span className="flex-1"><FormattedText text={point} /></span>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-8 flex gap-3">
                                <button
                                    onClick={handleClose}
                                    className="flex-grow px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-black rounded-2xl hover:bg-black dark:hover:bg-gray-100 transition-all hover:scale-105 shadow-xl shadow-gray-200 dark:shadow-none"
                                >
                                    Awesome!
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

export default function Changelog() {
    const { siteContent, changelogs, loading } = useData();
    const { changelog } = siteContent;
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
        <div className="relative min-h-screen bg-transparent overflow-x-hidden">
            <NavBar name="jchengroa" />

            <div>
                <ChangelogOutline versions={versionList} />

                <main className="max-w-4xl mx-auto px-6 pt-32 pb-24">
                <AnimatePresence mode="wait">
                    {!searchQuery && (
                        <motion.div
                            key="header"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Title
                                title={changelog.title}
                                subtitle={changelog.subtitle}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.div 
                    initial={{ opacity: 0, y: 30 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-8"
                >
                    <SearchBar 
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                    />
                    <div className="-mt-4">
                        <FilterList 
                            activeFilter={sortOrder}
                            setActiveFilter={setSortOrder}
                            filters={["Newest to Oldest", "Oldest to Newest"]}
                        />
                    </div>
                </motion.div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="space-y-12">
                        <AnimatePresence mode="popLayout">
                            {entries.map((entry, index) => (
                                <motion.section
                                    id={`changelog-${entry.version}`}
                                    key={entry.version}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.4, delay: index * 0.05 }}
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
                                initial={{ opacity: 0, y: 20 }} 
                                animate={{ opacity: 1, y: 0 }} 
                                className="text-center py-20"
                            >
                                <h3 className="text-2xl font-black text-gray-400">No updates found</h3>
                                <p className="text-gray-500 mt-2">Try searching for a different version or feature.</p>
                            </motion.div>
                        )}
                    </div>
                )}
            </main>
            </div>
        </div>
    );
}
