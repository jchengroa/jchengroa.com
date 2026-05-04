import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { changelogData } from "../data/changelog";
import { NavBar, Title, FormattedText, SearchBar } from "./components";
import { siteContent } from "../data/site_content";
import Fuse from 'fuse.js';

/**
 * ChangelogPopup Component
 * Automatically detects new versions and shows a popup once.
 */
export function ChangelogPopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [latestEntry, setLatestEntry] = useState(null);

    useEffect(() => {
        const checkChangelog = () => {
            if (changelogData.length > 0) {
                const absoluteLatest = changelogData[changelogData.length - 1];

                const seenVersion = localStorage.getItem("seenVersion");
                if (seenVersion !== absoluteLatest.version) {
                    setLatestEntry(absoluteLatest);
                    setIsOpen(true);
                }
            }
        };

        checkChangelog();
    }, []);

    const handleClose = () => {
        if (latestEntry) {
            localStorage.setItem("seenVersion", latestEntry.version);
        }
        setIsOpen(false);
    };

    if (!latestEntry) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-md"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 30 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] dark:shadow-black/50 overflow-hidden border border-gray-100 dark:border-gray-800"
                    >
                        <div className="p-8 md:p-12">
                            {/* Header */}
                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-black tracking-widest uppercase rounded-full">
                                            New Update
                                        </span>
                                        <span className="text-[10px] font-black tracking-[0.2em] text-gray-400 uppercase">
                                            v{latestEntry.version}
                                        </span>
                                    </div>
                                    <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter">
                                        What's New
                                    </h2>
                                </div>
                                <button
                                    onClick={handleClose}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors group"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 dark:text-gray-600 group-hover:text-gray-900 dark:group-hover:text-white transition-colors"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                </button>
                            </div>

                            {/* Content */}
                            <div className="space-y-6">
                                <div className="space-y-3">
                                    {latestEntry.content.map((item, index) => (
                                        <div key={index} className="flex gap-4 items-start group">
                                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 group-hover:scale-150 transition-transform" />
                                            <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                                                <FormattedText text={item} />
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <div className="p-5 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-800">
                                    <p className="text-xs text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest mb-1">Release Date</p>
                                    <p className="text-gray-900 dark:text-100 font-black">
                                        {latestEntry.date}
                                    </p>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="mt-12 flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={handleClose}
                                    className="flex-grow px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-black rounded-2xl hover:bg-black dark:hover:bg-gray-100 transition-all hover:scale-105 shadow-xl shadow-gray-200 dark:shadow-none"
                                >
                                    Awesome!
                                </button>
                            </div>
                        </div>

                        {/* Subtle accent line */}
                        <div className="h-2 w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

export default function Changelog() {
    const { changelog } = siteContent;
    const [searchQuery, setSearchQuery] = useState("");
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadChangelog = () => {
            let data = [...changelogData].reverse(); // Show newest first
            
            if (searchQuery.trim() !== "") {
                const fuse = new Fuse(data, {
                    keys: ['version', 'date', 'content'],
                    threshold: 0.3
                });
                data = fuse.search(searchQuery).map(result => result.item);
            }

            setEntries(data);
            setLoading(false);
        };
        loadChangelog();
        if (!searchQuery) window.scrollTo(0, 0);
    }, [searchQuery]);

    return (
        <div className="min-h-screen bg-gray-50/50 dark:bg-gray-950">
            <NavBar name="jchengroa" />

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
                    className="mb-12"
                >
                    <SearchBar 
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                    />
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
                                    key={entry.version}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.4, delay: index * 0.05 }}
                                    className="relative pl-12 pb-12 border-l-2 border-gray-100 dark:border-gray-800 last:border-0"
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
    );
}
