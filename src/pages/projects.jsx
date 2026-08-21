import { useState } from "react";
import { WorkCard, Title, SearchBar, FilterList, ViewSwitcherButton, UniversalListCard, useSubheaderToggle, SubheaderToggleButton, QuickNav } from "../components/components.jsx";
import { motion, AnimatePresence } from 'framer-motion';
import {
    projectsPageVariants,
    projectsHeaderVariants,
    projectsControlsVariants,
    projectSectionVariants,
    projectSectionHeaderVariants,
    projectCardGridVariants,
    projectCardItemVariants,
    projectNoResultsVariants
} from '../animations/projects.js';
import {
    filterCollapseVariants,
    accordionExpandVariants
} from '../animations/components.js';
import { useViewSwitcher } from "../utils/viewSwitcher";
import { useData } from "../context/DataContext.jsx";
import { LuFolder } from "react-icons/lu";
import Fuse from 'fuse.js';

function Projects() {
    const { projects, siteContent } = useData();
    const projectsPageContent = siteContent.projects;
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState("All");
    const { view } = useViewSwitcher();
    const { isVisible } = useSubheaderToggle();

    const isSearchingText = searchQuery.trim() !== "";
    const isSearching = isSearchingText || activeFilter !== "All";

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
                                linkURL={project.links[0]?.url}
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
                                linkURL={project.links[0]?.url}
                                description={project.description}
                                image={project.images && project.images[0]}
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
                <motion.div
                    variants={projectsHeaderVariants}
                    initial="hidden"
                    animate="visible"
                    className="w-full mb-6 lg:mb-10"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
                        {/* Left Column: Title and description */}
                        <div className="lg:col-span-5 text-left">
                            <Title
                                title={projectsPageContent.title}
                                subtitle={projectsPageContent.subtitle}
                                icon={LuFolder}
                                align="left"
                                className="!mb-0"
                            />
                        </div>

                        {/* Right Column: Search, filters, switcher & toggle */}
                        <motion.div
                            variants={projectsControlsVariants}
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
                                            filters={["All", "Software", "Hardware", "Embedded"]}
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
                            ...(softwareProjects.length > 0 ? [{ id: 'software', label: projectsPageContent.sections.software.title }] : []),
                            ...(hardwareProjects.length > 0 ? [{ id: 'hardware', label: projectsPageContent.sections.hardware.title }] : []),
                            ...(embeddedProjects.length > 0 ? [{ id: 'embedded', label: projectsPageContent.sections.embedded.title }] : []),
                        ]}
                    />
                )}

                <div className="space-y-24">
                    {softwareProjects.length > 0 && (
                        <ProjectSection
                            title={projectsPageContent.sections.software.title}
                            description={projectsPageContent.sections.software.description}
                            projects={softwareProjects}
                            category="software"
                        />
                    )}

                    {hardwareProjects.length > 0 && (
                        <ProjectSection
                            title={projectsPageContent.sections.hardware.title}
                            description={projectsPageContent.sections.hardware.description}
                            projects={hardwareProjects}
                            category="hardware"
                        />
                    )}

                    {embeddedProjects.length > 0 && (
                        <ProjectSection
                            title={projectsPageContent.sections.embedded.title}
                            description={projectsPageContent.sections.embedded.description}
                            projects={embeddedProjects}
                            category="embedded"
                        />
                    )}
                </div>

                {softwareProjects.length === 0 && hardwareProjects.length === 0 && embeddedProjects.length === 0 && (
                    <motion.div
                        variants={projectNoResultsVariants}
                        initial="hidden"
                        animate="visible"
                        className="text-center py-20"
                    >
                        <h3 className="text-2xl font-black text-gray-400 dark:text-gray-500">{projectsPageContent.noResults.title}</h3>
                        <p className="text-gray-500 dark:text-gray-600 mt-2">{projectsPageContent.noResults.subtitle}</p>
                    </motion.div>
                )}
            </div>

        </section>
    );
}

export default Projects;

