import { useState } from "react";
import { Title, WorkCard, SearchBar, FilterList, ViewSwitcherButton, UniversalListCard, SubheaderToggleButton, QuickNav } from "../components/components.jsx";
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, TIMING, EASING } from '../utils/animations.js';
import { researchList, researchPageContent } from "../data/research";
import { useViewSwitcher } from "../utils/viewSwitcher";
import Fuse from 'fuse.js';

function Research() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState("All");
    const { view } = useViewSwitcher();

    const isSearchingText = searchQuery.trim() !== "";
    const isSearching = isSearchingText || activeFilter !== "All";

    // Extract top 3 unique keywords to use as filters for research
    const researchKeywords = Array.from(new Set(researchList.flatMap(r => r.keywords || []))).slice(0, 3);
    const filters = ["All", ...researchKeywords];

    // Filtering logic
    let filteredResearch = researchList.filter(item => {
        return activeFilter === "All" || (item.keywords && item.keywords.includes(activeFilter));
    });

    if (searchQuery.trim() !== "") {
        const fuse = new Fuse(filteredResearch, {
            keys: ['title', 'summary', 'tech'],
            threshold: 0.3
        });
        filteredResearch = fuse.search(searchQuery).map(result => result.item);
    }

    const jhsResearch = filteredResearch.filter(r => r.id.startsWith("jhs"));
    const shsResearch = filteredResearch.filter(r => !r.id.startsWith("jhs"));

    const ResearchSection = ({ title, items, category }) => (
        <div id={category} className="w-full max-w-6xl space-y-10 scroll-mt-36 pt-12">
            <div className="border-l-4 border-blue-600 pl-6 mb-8 text-left animate-fade-in">
                <h3 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight mb-2">{title}</h3>
            </div>
            <div className={view === 'list' ? "grid grid-cols-1 gap-4" : "grid grid-cols-1 md:grid-cols-2 gap-8"}>
                {items.map((research, index) => (
                    <div key={research.id} className="hover:translate-y-[-8px] transition-transform duration-300" style={{ transitionDelay: `${index * 100}ms` }}>
                        {view === 'list' ? (
                            <UniversalListCard
                                id={research.id}
                                title={research.title}
                                info={research.info}
                                tech={research.tech}
                                description={research.summary}
                                category={research.category}
                            />
                        ) : (
                            <WorkCard
                                id={research.id}
                                title={research.title}
                                info={research.info}
                                stack={research.tech}
                                description={research.summary}
                                image={research.images && research.images[0]}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <section className="relative min-h-screen pt-20 md:pt-32 pb-32 md:pb-20 px-4 md:px-6 bg-transparent flex flex-col items-center overflow-x-hidden">

            <div className="max-w-6xl w-full z-10">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="w-full mb-12 lg:mb-20">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
                        {/* Left Column: Title and description */}
                        <div className="lg:col-span-5 text-center lg:text-left">
                            <Title 
                                title={researchPageContent.title} 
                                subtitle={researchPageContent.subtitle}
                            />
                        </div>

                        {/* Right Column: Search, filters, switcher & toggle */}
                        <div className="lg:col-span-7 flex flex-col items-center lg:items-end gap-4 w-full">
                            <SearchBar 
                                searchQuery={searchQuery}
                                setSearchQuery={setSearchQuery}
                            />
                            <AnimatePresence>
                                {!isSearchingText && (
                                    <motion.div key="filters" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="flex flex-col items-center lg:items-end gap-4 w-full">
                                        <FilterList
                                            activeFilter={activeFilter}
                                            setActiveFilter={setActiveFilter}
                                            filters={filters}
                                        />
                                        <div className="flex items-center justify-center lg:justify-end gap-3 w-full">
                                            <ViewSwitcherButton />
                                            <SubheaderToggleButton />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>

                {isSearchingText ? null : (
                    <QuickNav
                        tabs={[
                            ...(jhsResearch.length > 0 ? [{ id: 'jhs', label: 'Junior High School' }] : []),
                            ...(shsResearch.length > 0 ? [{ id: 'shs', label: 'Senior High School' }] : [])
                        ]}
                    />
                )}

                <div className="space-y-20 w-full flex flex-col items-center mt-10">
                    {jhsResearch.length > 0 && (
                        <ResearchSection title="Junior High School Research" items={jhsResearch} category="jhs" />
                    )}
                    {shsResearch.length > 0 && (
                        <ResearchSection title="Senior High School Research" items={shsResearch} category="shs" />
                    )}
                </div>

                {filteredResearch.length === 0 && (
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="text-center py-20 w-full">
                        <h3 className="text-2xl font-black text-gray-400 dark:text-gray-500">{researchPageContent.noResults.title}</h3>
                        <p className="text-gray-500 dark:text-gray-600 mt-2">{researchPageContent.noResults.subtitle}</p>
                    </motion.div>
                )}
            </div>
        </section>
    );
}

export default Research;
