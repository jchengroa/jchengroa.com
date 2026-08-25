import { useState } from "react";
import { WorkCard, UniversalListCard, QuickNav } from "../components/components.jsx";
import { WorkPageHeader } from "../components/workPageHeader.jsx";
import { NoResults } from "../components/noResults.jsx";
import { motion } from 'framer-motion';
import {
    researchHeaderVariants,
    researchControlsVariants,
    researchSectionVariants,
    researchSectionHeaderVariants,
    researchCardGridVariants,
    researchCardItemVariants,
    researchNoResultsVariants
} from '../animations/research.js';
import { useViewSwitcher } from "../utils/viewSwitcher.jsx";
import { useData } from "../context/dataContext.jsx";
import { LuBookOpen } from "react-icons/lu";
import Fuse from 'fuse.js';

export default function Research() {
    const { research, siteContent } = useData();
    const researchPageContent = siteContent.research || {};
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState("All");
    const { view } = useViewSwitcher();

    const isSearchingText = searchQuery.trim() !== "";

    // Extract top 3 unique keywords to use as filters for research
    const researchKeywords = Array.from(new Set(research.flatMap(r => r.keywords || []))).slice(0, 3);
    const filters = ["All", ...researchKeywords];

    // Filtering logic
    let filteredResearch = research.filter(item => {
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
        <motion.div
            id={category}
            variants={researchSectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="w-full max-w-6xl space-y-10 scroll-mt-36 pt-12"
        >
            <motion.div
                variants={researchSectionHeaderVariants}
                className="border-l-4 border-indigo-600 pl-6 mb-8 text-left"
            >
                <h3 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight mb-2">{title}</h3>
            </motion.div>
            <motion.div
                variants={researchCardGridVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                className={view === 'list' ? "grid grid-cols-1 gap-4" : "grid grid-cols-1 md:grid-cols-2 gap-8"}
            >
                {items.map((resItem) => (
                    <motion.div
                        key={resItem.id}
                        variants={researchCardItemVariants}
                    >
                        {view === 'list' ? (
                            <UniversalListCard
                                id={resItem.id}
                                title={resItem.title}
                                info={resItem.info}
                                tech={resItem.tech}
                                description={resItem.summary}
                                category={resItem.category}
                            />
                        ) : (
                            <WorkCard
                                id={resItem.id}
                                title={resItem.title}
                                info={resItem.info}
                                stack={resItem.tech}
                                description={resItem.summary}
                                image={resItem.images && resItem.images[0]}
                                category={resItem.category || "research"}
                            />
                        )}
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );

    return (
        <section className="relative min-h-screen pt-20 md:pt-32 pb-32 md:pb-20 px-4 md:px-6 bg-transparent flex flex-col items-center overflow-x-hidden">
            <div className="max-w-6xl w-full z-10">
                <WorkPageHeader
                    title={researchPageContent.title}
                    subtitle={researchPageContent.subtitle}
                    icon={LuBookOpen}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    activeFilter={activeFilter}
                    setActiveFilter={setActiveFilter}
                    filters={filters}
                    headerVariants={researchHeaderVariants}
                    controlsVariants={researchControlsVariants}
                />

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
                    <NoResults
                        title={researchPageContent.noResults?.title || "No Research Found"}
                        subtitle={researchPageContent.noResults?.subtitle}
                        variants={researchNoResultsVariants}
                    />
                )}
            </div>
        </section>
    );
}

export { Research };
