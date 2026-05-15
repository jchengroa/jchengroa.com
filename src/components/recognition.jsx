import { useState } from "react";
import { RecognitionCard, Title, SearchBar } from "./components.jsx";
import { motion } from 'framer-motion';
import { recognitionList, recognitionPageContent } from "../data/recognition_list";
import Fuse from 'fuse.js';

function Recognition() {
    const [searchQuery, setSearchQuery] = useState("");

    const getFilteredItems = () => {
        if (searchQuery.trim() === "") {
            return recognitionList;
        }

        const fuse = new Fuse(recognitionList, {
            keys: ['title', 'description', 'tech', 'info'],
            threshold: 0.3
        });
        
        return fuse.search(searchQuery).map(result => result.item);
    };

    const filteredItems = getFilteredItems();

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
                    <Title
                        title={recognitionPageContent.title}
                        subtitle={recognitionPageContent.subtitle}
                    />
                    
                    <SearchBar 
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                    />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {filteredItems.map((item, index) => (
                        <motion.div 
                            key={item.id} 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="h-full"
                        >
                            <RecognitionCard
                                title={item.title}
                                info={item.info}
                                description={item.description}
                                facebookUrl={item.facebookUrl}
                                tech={item.tech}
                            />
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
        </section>
    );
}

export default Recognition;
