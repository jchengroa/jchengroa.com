import { useState } from "react";
import { RecognitionCard, Title, SearchBar, FilterList, ViewSwitcherButton, UniversalListCard, SubheaderToggleButton, QuickNav } from "../components/components.jsx";
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, TIMING, EASING } from '../utils/animations.js';
import { recognitionList, recognitionPageContent } from "../data/recognitionList";
import { useViewSwitcher } from "../utils/viewSwitcher";
import Fuse from 'fuse.js';

function Recognition() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState("All");
    const { view } = useViewSwitcher();

    const isSearchingText = searchQuery.trim() !== "";
    const isSearching = isSearchingText || activeFilter !== "All";

    const filters = ["All", "Hackathon", "Tech Decon", "Prototyping"];

    let filteredItems = recognitionList.filter(item => {
        return activeFilter === "All" || (item.keywords && item.keywords.includes(activeFilter));
    });

    if (searchQuery.trim() !== "") {
        const fuse = new Fuse(filteredItems, {
            keys: ['title', 'description', 'tech', 'info'],
            threshold: 0.3
        });
        filteredItems = fuse.search(searchQuery).map(result => result.item);
    }

    const hackathonItems = filteredItems.filter(item => item.keywords && item.keywords.includes("Hackathon"));
    const competitionItems = filteredItems.filter(item => !item.keywords || !item.keywords.includes("Hackathon"));

    const RecognitionSection = ({ title, items, category }) => (
        <div id={category} className="w-full max-w-6xl space-y-10 scroll-mt-36 pt-12">
            <div className="border-l-4 border-blue-600 pl-6 mb-8 text-left z-10 relative">
                <h3 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight mb-2">{title}</h3>
            </div>
            <div className={view === 'list' ? "grid grid-cols-1 gap-4" : "grid grid-cols-1 md:grid-cols-2 gap-12"}>
                {items.map((item, index) => (
                    <motion.div 
                        key={item.id} 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="h-full z-10 relative"
                    >
                        {view === 'list' ? (
                            <UniversalListCard
                                id={item.id}
                                title={item.title}
                                info={item.info}
                                tech={item.tech}
                                description={item.description}
                                facebookUrl={item.facebookUrl}
                                category={item.category}
                            />
                        ) : (
                            <RecognitionCard
                                id={item.id}
                                title={item.title}
                                info={item.info}
                                description={item.description}
                                facebookUrl={item.facebookUrl}
                                tech={item.tech}
                            />
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );

    return (
        <section
            id="recognition"
            className="relative min-h-screen pt-20 md:pt-32 pb-12 md:pb-20 px-4 md:px-6 flex flex-col items-center overflow-hidden bg-gray-50/50 dark:bg-gray-950"
        >
            {/* Background Decorative Element */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none opacity-20 dark:opacity-10">
                <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-200 dark:bg-purple-900 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-700"></div>
            </div>

            <div className="max-w-6xl w-full z-10">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="w-full mb-12 lg:mb-20">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
                        {/* Left Column: Title and description */}
                        <div className="lg:col-span-5 text-center lg:text-left">
                            <Title 
                                title={recognitionPageContent.title} 
                                subtitle={recognitionPageContent.subtitle}
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
                            ...(hackathonItems.length > 0 ? [{ id: 'hackathons', label: 'Hackathons' }] : []),
                            ...(competitionItems.length > 0 ? [{ id: 'competitions', label: 'Robotics & Tech' }] : [])
                        ]}
                    />
                )}

                <div className="space-y-20 w-full flex flex-col items-center mt-10">
                    {hackathonItems.length > 0 && (
                        <RecognitionSection title="Hackathons" items={hackathonItems} category="hackathons" />
                    )}
                    {competitionItems.length > 0 && (
                        <RecognitionSection title="Robotics & Tech Competitions" items={competitionItems} category="competitions" />
                    )}
                </div>
                
                {filteredItems.length === 0 && (
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="text-center py-20">
                        <h3 className="text-2xl font-black text-gray-400 dark:text-gray-500">{recognitionPageContent.noResults.title}</h3>
                        <p className="text-gray-500 dark:text-gray-600 mt-2">{recognitionPageContent.noResults.subtitle}</p>
                    </motion.div>
                )}
            </div>
        </section>
    );
}

export default Recognition;
