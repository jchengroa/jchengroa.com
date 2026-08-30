import { useState } from "react";
import { RecognitionCard, UniversalListCard, QuickNav } from "../components/components.jsx";
import { WorkPageHeader } from "../components/workPageHeader.jsx";
import { NoResults } from "../components/noResults.jsx";
import { motion } from 'framer-motion';
import {
    recognitionHeaderVariants,
    recognitionControlsVariants,
    recognitionSectionVariants,
    recognitionSectionHeaderVariants,
    recognitionCardGridVariants,
    recognitionCardItemVariants,
    recognitionNoResultsVariants
} from '../animations/recognition.js';
import { useViewSwitcher } from "../utils/viewSwitcher.jsx";
import { useData } from "../context/dataContext.jsx";
import { LuAward } from "react-icons/lu";
import Fuse from 'fuse.js';

export default function Recognition() {
    const { recognition, siteContent } = useData();
    const recognitionPageContent = siteContent.recognition || {};
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState("All");
    const { view } = useViewSwitcher();

    const isSearchingText = searchQuery.trim() !== "";
    const filters = ["All", "Hackathon", "Tech Decon", "Prototyping"];

    let filteredItems = recognition.filter(item => {
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
        <motion.div
            id={category}
            variants={recognitionSectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="w-full max-w-6xl space-y-10 scroll-mt-36 pt-12"
        >
            <motion.div
                variants={recognitionSectionHeaderVariants}
                className="border-l-4 border-amber-500 pl-6 mb-8 text-left z-10 relative"
            >
                <h3 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight mb-2">{title}</h3>
            </motion.div>
            <motion.div
                variants={recognitionCardGridVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                className={view === 'list' ? "grid grid-cols-1 gap-4" : "grid grid-cols-1 md:grid-cols-2 gap-12"}
            >
                {items.map((recItem) => (
                    <motion.div 
                        key={recItem.id} 
                        variants={recognitionCardItemVariants}
                        className="h-full z-10 relative"
                    >
                        {view === 'list' ? (
                            <UniversalListCard
                                id={recItem.id}
                                title={recItem.title}
                                info={recItem.info}
                                tech={recItem.tech}
                                description={recItem.description}
                                facebookUrl={recItem.facebookUrl}
                                category={recItem.category}
                                searchQuery={searchQuery}
                            />
                        ) : (
                            <RecognitionCard
                                id={recItem.id}
                                title={recItem.title}
                                info={recItem.info}
                                description={recItem.description}
                                facebookUrl={recItem.facebookUrl}
                                tech={recItem.tech}
                                searchQuery={searchQuery}
                            />
                        )}
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );

    return (
        <section
            id="recognition"
            className="relative min-h-screen pt-20 md:pt-32 pb-32 md:pb-20 px-4 md:px-6 flex flex-col items-center overflow-x-hidden bg-transparent"
        >
            <div className="max-w-6xl w-full z-10">
                <WorkPageHeader
                    title={recognitionPageContent.title}
                    subtitle={recognitionPageContent.subtitle}
                    icon={LuAward}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    activeFilter={activeFilter}
                    setActiveFilter={setActiveFilter}
                    filters={filters}
                    headerVariants={recognitionHeaderVariants}
                    controlsVariants={recognitionControlsVariants}
                />

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
                    <NoResults
                        title={recognitionPageContent.noResults?.title || "No Recognition Found"}
                        subtitle={recognitionPageContent.noResults?.subtitle}
                        variants={recognitionNoResultsVariants}
                    />
                )}
            </div>
        </section>
    );
}

export { Recognition };
