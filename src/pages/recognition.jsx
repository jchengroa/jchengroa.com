import { useState } from "react";
import { RecognitionCard, Title, SearchBar, FilterList, Prompt, ViewSwitcherButton, UniversalListCard, SubheaderToggleButton } from "../components/components.jsx";
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, TIMING, EASING } from '../utils/animations.js';
import { recognitionList, recognitionPageContent } from "../data/recognitionList";
import { getKeywordEngine, KeywordHighlights } from "../utils/keywordEngine";
import { useViewSwitcher } from "../utils/viewSwitcher";
import Fuse from 'fuse.js';

function Recognition() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState("All");
    const [isPromptOpen, setIsPromptOpen] = useState(false);
    const [selectedKeyword, setSelectedKeyword] = useState("");
    const { view } = useViewSwitcher();

    const openPrompt = (keyword) => {
        setSelectedKeyword(keyword);
        setIsPromptOpen(true);
    };

    const isSearchingText = searchQuery.trim() !== "";
    const isSearching = isSearchingText || activeFilter !== "All";

    const engine = getKeywordEngine();

    const filters = ["All", "Hackathon", "Tech Decon", "Prototyping"];

    let filteredItems = recognitionList.filter(item => {
        return activeFilter === "All" || (item.keywords && item.keywords.includes(activeFilter));
    });

    if (searchQuery.trim() !== "") {
        const fuse = new Fuse(filteredItems, {
            keys: ['title', 'description', 'tech', 'info', 'keywords'],
            threshold: 0.3
        });
        filteredItems = fuse.search(searchQuery).map(result => result.item);
    }

    return (
        <section
            id="recognition"
            className="relative min-h-screen pt-32 pb-20 px-6 flex flex-col items-center overflow-hidden bg-gray-50/50 dark:bg-gray-950"
        >
            {/* Background Decorative Element */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none opacity-20 dark:opacity-10">
                <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-200 dark:bg-purple-900 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-700"></div>
            </div>

            <div className="max-w-6xl w-full z-10">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="relative text-center w-full mb-16">
                    <AnimatePresence>
                        {!isSearchingText && (
                            <motion.div key="title-block" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                                <Title 
                                    title={recognitionPageContent.title} 
                                    subtitle={recognitionPageContent.subtitle}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                    
                    <SearchBar 
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                    />

                    <AnimatePresence>
                        {!isSearchingText && (
                            <motion.div key="filters" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="flex flex-wrap items-center justify-center gap-4 mt-6">
                                <FilterList
                                    activeFilter={activeFilter}
                                    setActiveFilter={setActiveFilter}
                                    filters={filters}
                                />
                                <ViewSwitcherButton />
                                <SubheaderToggleButton />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                <AnimatePresence>
                    {!isSearching && (
                        <motion.div key="highlights" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="mb-12">
                            <KeywordHighlights 
                                highlights={engine.getCategoryHighlights("recognition")} 
                                onKeywordClick={openPrompt}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className={view === 'list' ? "grid grid-cols-1 gap-4" : "grid grid-cols-1 md:grid-cols-2 gap-12"}>
                    {filteredItems.map((item, index) => (
                        <motion.div 
                            key={item.id} 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="h-full"
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
                
                {filteredItems.length === 0 && (
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="text-center py-20">
                        <h3 className="text-2xl font-black text-gray-400 dark:text-gray-500">{recognitionPageContent.noResults.title}</h3>
                        <p className="text-gray-500 dark:text-gray-600 mt-2">{recognitionPageContent.noResults.subtitle}</p>
                    </motion.div>
                )}
            </div>

            <Prompt 
                isOpen={isPromptOpen}
                onClose={() => setIsPromptOpen(false)}
                keyword={selectedKeyword}
            />
        </section>
    );
}

export default Recognition;
