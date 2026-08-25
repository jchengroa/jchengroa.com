import { useState } from "react";
import { WorkCard, UniversalListCard, useSubheaderToggle, QuickNav } from "../components/components.jsx";
import { WorkPageHeader } from "../components/workPageHeader.jsx";
import { NoResults } from "../components/noResults.jsx";
import { motion, AnimatePresence } from 'framer-motion';
import {
    projectsHeaderVariants,
    projectsControlsVariants,
    projectSectionVariants,
    projectSectionHeaderVariants,
    projectCardGridVariants,
    projectCardItemVariants,
    projectNoResultsVariants
} from '../animations/projects.js';
import { accordionExpandVariants } from '../animations/components.js';
import { useViewSwitcher } from "../utils/viewSwitcher.jsx";
import { useData } from "../context/dataContext.jsx";
import { LuFolder } from "react-icons/lu";
import Fuse from 'fuse.js';

export default function Projects() {
    const { projects, siteContent } = useData();
    const projectsPageContent = siteContent.projects || {};
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState("All");
    const { view } = useViewSwitcher();
    const { isVisible } = useSubheaderToggle();

    const isSearchingText = searchQuery.trim() !== "";

    const filterItems = (items, categoryMatch) => {
        let filtered = items.filter(item => item.category === categoryMatch);

        if (activeFilter !== "All" && activeFilter.toLowerCase() !== categoryMatch) {
            return [];
        }

        if (searchQuery.trim() !== "") {
            const fuse = new Fuse(filtered, {
                keys: ['title', 'description', 'tech'],
                threshold: 0.3
            });
            filtered = fuse.search(searchQuery).map(result => result.item);
        }

        return filtered;
    };

    const softwareProjects = filterItems(projects, "software");
    const hardwareProjects = filterItems(projects, "hardware");
    const embeddedProjects = filterItems(projects, "embedded");

    const ProjectSection = ({ title, description, projects, category }) => (
        <motion.div
            id={category}
            variants={projectSectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="w-full max-w-6xl space-y-10 scroll-mt-36"
        >
            <AnimatePresence>
                {!isSearchingText && (
                    <motion.div
                        key="header"
                        variants={projectSectionHeaderVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="border-l-4 border-blue-600 pl-6 mb-8"
                    >
                        <h3 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight mb-2">{title}</h3>
                        <AnimatePresence>
                            {isVisible && (
                                <motion.p
                                    variants={accordionExpandVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    className="text-gray-500 dark:text-gray-400 font-medium max-w-2xl overflow-hidden mt-1"
                                >
                                    {description}
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                variants={projectCardGridVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                className={view === 'list' ? "grid grid-cols-1 gap-4" : "grid grid-cols-1 md:grid-cols-2 gap-8"}
            >
                {projects.map((project) => (
                    <motion.div
                        key={project.id}
                        variants={projectCardItemVariants}
                    >
                        {view === 'list' ? (
                            <UniversalListCard
                                id={project.id}
                                title={project.title}
                                info={project.info}
                                tech={project.tech}
                                linkName="GitHub"
                                linkURL={project.links?.[0]?.url}
                                description={project.description}
                                category={project.category}
                            />
                        ) : (
                            <WorkCard
                                id={project.id}
                                title={project.title}
                                info={project.info}
                                stack={project.tech}
                                linkName="GitHub"
                                linkPicture="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                                linkURL={project.links?.[0]?.url}
                                description={project.description}
                                image={project.images && project.images[0]}
                                category={project.category}
                            />
                        )}
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );

    return (
        <section
            id="projects"
            className="relative min-h-screen pt-20 md:pt-32 pb-32 md:pb-20 px-4 md:px-6 flex flex-col items-center overflow-x-hidden bg-transparent"
        >
            <div className="max-w-6xl w-full z-10">
                <WorkPageHeader
                    title={projectsPageContent.title}
                    subtitle={projectsPageContent.subtitle}
                    icon={LuFolder}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    activeFilter={activeFilter}
                    setActiveFilter={setActiveFilter}
                    filters={["All", "Software", "Hardware", "Embedded"]}
                    headerVariants={projectsHeaderVariants}
                    controlsVariants={projectsControlsVariants}
                />

                {isSearchingText ? null : (
                    <QuickNav
                        tabs={[
                            ...(softwareProjects.length > 0 ? [{ id: 'software', label: projectsPageContent.sections?.software?.title || 'Software' }] : []),
                            ...(hardwareProjects.length > 0 ? [{ id: 'hardware', label: projectsPageContent.sections?.hardware?.title || 'Hardware' }] : []),
                            ...(embeddedProjects.length > 0 ? [{ id: 'embedded', label: projectsPageContent.sections?.embedded?.title || 'Embedded' }] : []),
                        ]}
                    />
                )}

                <div className="space-y-24">
                    {softwareProjects.length > 0 && (
                        <ProjectSection
                            title={projectsPageContent.sections?.software?.title || 'Software Projects'}
                            description={projectsPageContent.sections?.software?.description}
                            projects={softwareProjects}
                            category="software"
                        />
                    )}

                    {hardwareProjects.length > 0 && (
                        <ProjectSection
                            title={projectsPageContent.sections?.hardware?.title || 'Hardware Projects'}
                            description={projectsPageContent.sections?.hardware?.description}
                            projects={hardwareProjects}
                            category="hardware"
                        />
                    )}

                    {embeddedProjects.length > 0 && (
                        <ProjectSection
                            title={projectsPageContent.sections?.embedded?.title || 'Embedded Systems'}
                            description={projectsPageContent.sections?.embedded?.description}
                            projects={embeddedProjects}
                            category="embedded"
                        />
                    )}
                </div>

                {softwareProjects.length === 0 && hardwareProjects.length === 0 && embeddedProjects.length === 0 && (
                    <NoResults
                        title={projectsPageContent.noResults?.title || "No Projects Found"}
                        subtitle={projectsPageContent.noResults?.subtitle}
                        variants={projectNoResultsVariants}
                    />
                )}
            </div>
        </section>
    );
}

export { Projects };
