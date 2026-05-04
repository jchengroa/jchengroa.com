import { useState } from "react";
import { Title, WorkCard, SearchBar, FilterList, Prompt } from "./components.jsx";
import { motion, AnimatePresence } from 'framer-motion';
import { researchList, researchPageContent } from "../data/research";
import { getKeywordEngine, KeywordHighlights } from "../utils/keywordEngine";
import Fuse from 'fuse.js';

function Research() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState("All");
    const [isPromptOpen, setIsPromptOpen] = useState(false);
    const [selectedKeyword, setSelectedKeyword] = useState("");

    const openPrompt = (keyword) => {
        setSelectedKeyword(keyword);
        setIsPromptOpen(true);
    };

    const isSearchingText = searchQuery.trim() !== "";
    const isSearching = isSearchingText || activeFilter !== "All";

    const engine = getKeywordEngine();
    
    // Extract top 3 unique keywords to use as filters for research
    const researchKeywords = Array.from(new Set(researchList.flatMap(r => r.keywords || []))).slice(0, 3);
    const filters = ["All", ...researchKeywords];

    // Filtering logic
    let filteredResearch = researchList.filter(item => {
        return activeFilter === "All" || (item.keywords && item.keywords.includes(activeFilter));
    });

    if (searchQuery.trim() !== "") {
        const fuse = new Fuse(filteredResearch, {
            keys: ['title', 'summary', 'tech', 'keywords'],
            threshold: 0.3
        });
        filteredResearch = fuse.search(searchQuery).map(result => result.item);
    }
    return (
        <section className="min-h-screen pt-32 pb-20 px-6 bg-gray-50/50 dark:bg-gray-950 flex flex-col items-center">
            <div className="max-w-6xl w-full">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="text-center mb-4">
                    <AnimatePresence>
                        {!isSearchingText && (
                            <motion.div key="title-block" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                                <Title 
                                    title={researchPageContent.title} 
                                    subtitle={researchPageContent.subtitle}
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
                            <motion.div key="filters" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                                <FilterList
                                    activeFilter={activeFilter}
                                    setActiveFilter={setActiveFilter}
                                    filters={filters}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
                
                <AnimatePresence>
                    {!isSearching && (
                        <motion.div key="highlights" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="mb-12">
                            <KeywordHighlights 
                                highlights={engine.getCategoryHighlights("research")} 
                                onKeywordClick={openPrompt}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {filteredResearch.map((research, index) => (
                        <div key={research.id} className="hover:translate-y-[-8px] transition-transform duration-300" style={{ transitionDelay: `${index * 100}ms` }}>
                            <WorkCard
                                id={research.id}
                                title={research.title}
                                info={research.info}
                                stack={research.tech}
                                description={research.summary}
                            />
                        </div>
                    ))}
                </motion.div>

                {filteredResearch.length === 0 && (
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="text-center py-20 w-full">
                        <h3 className="text-2xl font-black text-gray-400 dark:text-gray-500">{researchPageContent.noResults.title}</h3>
                        <p className="text-gray-500 dark:text-gray-600 mt-2">{researchPageContent.noResults.subtitle}</p>
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

export default Research;
