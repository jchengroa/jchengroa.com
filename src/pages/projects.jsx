import { useState } from "react";
import { WorkCard, Title, SearchBar, FilterList, Prompt, ViewSwitcherButton, UniversalListCard, useSubheaderToggle, SubheaderToggleButton, DocumentTabs } from "../components/components.jsx";
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, TIMING, EASING } from '../utils/animations.js';
import { projectsList, projectsPageContent } from "../data/projects";
import { getKeywordEngine, KeywordHighlights } from "../utils/keywordEngine";
import { useViewSwitcher } from "../utils/viewSwitcher";
import Fuse from 'fuse.js';

function Projects() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState("All");
    const [isPromptOpen, setIsPromptOpen] = useState(false);
    const [selectedKeyword, setSelectedKeyword] = useState("");
    const { view } = useViewSwitcher();
    const { isVisible } = useSubheaderToggle();

    const openPrompt = (keyword) => {
        setSelectedKeyword(keyword);
        setIsPromptOpen(true);
    };

    const isSearchingText = searchQuery.trim() !== "";
    const isSearching = isSearchingText || activeFilter !== "All";

    const engine = getKeywordEngine();

    const filterItems = (items, categoryMatch) => {
        let filtered = items.filter(item => item.category === categoryMatch);

        if (activeFilter !== "All" && activeFilter.toLowerCase() !== categoryMatch) {
            return [];
        }

        if (searchQuery.trim() !== "") {
            const fuse = new Fuse(filtered, {
                keys: ['title', 'description', 'tech', 'keywords'],
                threshold: 0.3
            });
            filtered = fuse.search(searchQuery).map(result => result.item);
        }

        return filtered;
    };

    const softwareProjects = filterItems(projectsList, "software");
    const hardwareProjects = filterItems(projectsList, "hardware");
    const embeddedProjects = filterItems(projectsList, "embedded");

    const ProjectSection = ({ title, description, projects, category, delay }) => (
        <motion.div id={category} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut", delay: delay / 1000 }} className="w-full max-w-6xl space-y-10 scroll-mt-36">
            <AnimatePresence>
                {!isSearchingText && (
                    <motion.div key="header" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="border-l-4 border-blue-600 pl-6 mb-8">
                        <h3 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight mb-2">{title}</h3>
                        <AnimatePresence>
                            {isVisible && (
                                <motion.p
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="text-gray-500 dark:text-gray-400 font-medium max-w-2xl overflow-hidden mt-1"
                                >
                                    {description}
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {!isSearching && (
                    <motion.div key="highlights" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="mb-10">
                        <KeywordHighlights
                            highlights={engine.getCategoryHighlights(category)}
                            onKeywordClick={openPrompt}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <div className={view === 'list' ? "grid grid-cols-1 gap-4" : "grid grid-cols-1 md:grid-cols-2 gap-8"}>
                {projects.map((project, index) => (
                    <div key={project.id} className="hover:translate-y-[-8px] transition-transform duration-300" style={{ transitionDelay: `${index * 100}ms` }}>
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
                    </div>
                ))}
            </div>
        </motion.div>
    );

    return (
        <section
            id="projects"
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
                        title={projectsPageContent.title}
                        subtitle={projectsPageContent.subtitle}
                    />

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
                                    filters={["All", "Software", "Hardware", "Embedded"]}
                                />
                                <ViewSwitcherButton />
                                <SubheaderToggleButton />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {isSearchingText ? null : (
                    <DocumentTabs
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
                            delay={200}
                        />
                    )}

                    {hardwareProjects.length > 0 && (
                        <ProjectSection
                            title={projectsPageContent.sections.hardware.title}
                            description={projectsPageContent.sections.hardware.description}
                            projects={hardwareProjects}
                            category="hardware"
                            delay={400}
                        />
                    )}

                    {embeddedProjects.length > 0 && (
                        <ProjectSection
                            title={projectsPageContent.sections.embedded.title}
                            description={projectsPageContent.sections.embedded.description}
                            projects={embeddedProjects}
                            category="embedded"
                            delay={600}
                        />
                    )}
                </div>

                {softwareProjects.length === 0 && hardwareProjects.length === 0 && embeddedProjects.length === 0 && (
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="text-center py-20">
                        <h3 className="text-2xl font-black text-gray-400 dark:text-gray-500">{projectsPageContent.noResults.title}</h3>
                        <p className="text-gray-500 dark:text-gray-600 mt-2">{projectsPageContent.noResults.subtitle}</p>
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

export default Projects;
