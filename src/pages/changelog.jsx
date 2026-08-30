import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    changelogPageVariants,
    changelogHeaderVariants,
    changelogControlsVariants,
    changelogTimelineItemVariants
} from "../animations/changelog.js";
import { Title, FormattedText, SearchBar, FilterList } from "../components/components";
import ChangelogOutline from "../components/changelogOutline";
import { useData } from "../context/dataContext.jsx";
import { HighlightText } from "../utils/searchHighlight.jsx";
import { LuHistory } from "react-icons/lu";
import Fuse from 'fuse.js';

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
                                                        v<HighlightText text={entry.version} query={searchQuery} />
                                                    </h2>
                                                    <span className="text-gray-400 dark:text-gray-500 font-bold text-sm">
                                                        <HighlightText text={entry.date} query={searchQuery} />
                                                    </span>
                                                </div>

                                                <ul className="space-y-4">
                                                    {entry.content.map((item, i) => (
                                                        <li key={i} className="flex gap-4 items-start">
                                                            <div className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 group-hover:bg-blue-600 transition-colors shrink-0" />
                                                            <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                                                                <HighlightText text={item} query={searchQuery} />
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
