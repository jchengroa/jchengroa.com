import { useState } from "react";
import { RecognitionCard, Title, SearchBar, FilterList, ViewSwitcherButton, UniversalListCard, SubheaderToggleButton, QuickNav } from "../components/components.jsx";
import { motion, AnimatePresence } from 'framer-motion';
import {
    recognitionPageVariants,
    recognitionHeaderVariants,
    recognitionControlsVariants,
    recognitionSectionVariants,
    recognitionSectionHeaderVariants,
    recognitionCardGridVariants,
    recognitionCardItemVariants,
    recognitionNoResultsVariants
} from '../animations/recognition.js';
import { filterCollapseVariants } from '../animations/components.js';
import { useViewSwitcher } from "../utils/viewSwitcher";
import { useData } from "../context/DataContext.jsx";
import { LuAward } from "react-icons/lu";
import Fuse from 'fuse.js';

function Recognition() {
    const { recognition, siteContent } = useData();
    const recognitionPageContent = siteContent.recognition;
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState("All");
    const { view } = useViewSwitcher();

    const isSearchingText = searchQuery.trim() !== "";
    const isSearching = isSearchingText || activeFilter !== "All";

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
                className="border-l-4 border-blue-600 pl-6 mb-8 text-left z-10 relative"
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
                {items.map((item) => (
                    <motion.div 
                        key={item.id} 
                        variants={recognitionCardItemVariants}
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
            </motion.div>
        </motion.div>
    );

    return (
        <section
            id="recognition"
            className="relative min-h-screen pt-20 md:pt-32 pb-32 md:pb-20 px-4 md:px-6 flex flex-col items-center overflow-x-hidden bg-transparent"
        >
            <div className="max-w-6xl w-full z-10">
                <motion.div
                    variants={recognitionHeaderVariants}
                    initial="hidden"
                    animate="visible"
                    className="w-full mb-6 lg:mb-10"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
                        {/* Left Column: Title and description */}
                        <div className="lg:col-span-5 text-left">
                            <Title 
                                title={recognitionPageContent.title} 
                                subtitle={recognitionPageContent.subtitle}
                                icon={LuAward}
                                align="left"
                                className="!mb-0"
                            />
                        </div>

                        {/* Right Column: Search, filters, switcher & toggle */}
                        <motion.div
                            variants={recognitionControlsVariants}
                            className="lg:col-span-7 flex flex-col items-center lg:items-end gap-2.5 sm:gap-3 w-full"
                        >
                            <SearchBar 
                                searchQuery={searchQuery}
                                setSearchQuery={setSearchQuery}
                            />
                            <AnimatePresence>
                                {!isSearchingText && (
                                    <motion.div
                                        key="filters"
                                        variants={filterCollapseVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        className="flex flex-col items-center lg:items-end gap-2.5 sm:gap-3 w-full"
                                    >
                                        <FilterList
                                            activeFilter={activeFilter}
                                            setActiveFilter={setActiveFilter}
                                            filters={filters}
                                        />
                                        <div className="flex items-center justify-center lg:justify-end gap-2.5 w-full">
                                            <ViewSwitcherButton />
                                            <SubheaderToggleButton />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
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
                    <motion.div
                        variants={recognitionNoResultsVariants}
                        initial="hidden"
                        animate="visible"
                        className="text-center py-20"
                    >
                        <h3 className="text-2xl font-black text-gray-400 dark:text-gray-500">{recognitionPageContent.noResults.title}</h3>
                        <p className="text-gray-500 dark:text-gray-600 mt-2">{recognitionPageContent.noResults.subtitle}</p>
                    </motion.div>
                )}
            </div>
        </section>
    );
}

export default Recognition;

