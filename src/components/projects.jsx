import { useState } from "react";
import { WorkCard, Title, SearchFilter } from "./components.jsx";
import { projectsList } from "../data/projects";
import { getKeywordEngine, KeywordHighlights } from "../utils/keywordEngine";

function Projects() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState("All");

    const engine = getKeywordEngine();
    
    // Filtering logic
    const filterItems = (items, categoryMatch) => {
        return items.filter(item => {
            const searchLower = searchQuery.toLowerCase();
            const matchesSearch = 
                item.title.toLowerCase().includes(searchLower) ||
                (item.description && item.description.toLowerCase().includes(searchLower)) ||
                (item.tech && item.tech.some(t => t.toLowerCase().includes(searchLower))) ||
                (item.keywords && item.keywords.some(k => k.toLowerCase().includes(searchLower)));
            
            const matchesCategory = activeFilter === "All" || activeFilter.toLowerCase() === item.category;
            
            return matchesSearch && matchesCategory && item.category === categoryMatch;
        });
    };

    const softwareProjects = filterItems(projectsList, "software");
    const hardwareProjects = filterItems(projectsList, "hardware");
    const embeddedProjects = filterItems(projectsList, "embedded");

    const ProjectSection = ({ title, description, projects, category, delay }) => (
        <div className={`w-full max-w-6xl space-y-10 animate-fade-in`} style={{ animationDelay: `${delay}ms` }}>
            <div className="border-l-4 border-blue-600 pl-6 mb-8">
                <h3 className="text-3xl font-black text-gray-900 tracking-tight mb-2">{title}</h3>
                <p className="text-gray-500 font-medium max-w-2xl">{description}</p>
            </div>
            
            <div className="mb-10">
                <KeywordHighlights highlights={engine.getCategoryHighlights(category)} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((project, index) => (
                    <div key={project.id} className="hover:translate-y-[-8px] transition-transform duration-300" style={{ transitionDelay: `${index * 100}ms` }}>
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
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <section
            id="projects"
            className="relative min-h-screen pt-32 pb-20 px-6 flex flex-col items-center overflow-hidden bg-gray-50/50"
        >
            {/* Background Decorative Element */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none opacity-20">
                <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-700"></div>
            </div>

            <div className="max-w-6xl w-full z-10">
                <div className="relative animate-fade-up text-center w-full mb-16">
                    <Title
                        title="Projects"
                    />
                    <p className="text-center text-gray-600 max-w-2xl mx-auto -mt-6 font-medium text-lg mb-12">
                        A comprehensive showcase of my multidisciplinary engineering journey, spanning high-level software architecture to low-level hardware integration.
                    </p>
                    
                    <SearchFilter 
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        activeFilter={activeFilter}
                        setActiveFilter={setActiveFilter}
                        filters={["All", "Software", "Hardware", "Embedded"]}
                    />
                </div>

                <div className="space-y-24">
                    {softwareProjects.length > 0 && (
                        <ProjectSection 
                            title="Software Projects"
                            description="Modern web applications and distributed systems built with scalable architectures and user-centric design."
                            projects={softwareProjects}
                            category="software"
                            delay={200}
                        />
                    )}

                    {hardwareProjects.length > 0 && (
                        <ProjectSection 
                            title="Hardware Projects"
                            description="Physical computing and circuit design projects focusing on PCB layout, signal integrity, and hardware prototyping."
                            projects={hardwareProjects}
                            category="hardware"
                            delay={400}
                        />
                    )}

                    {embeddedProjects.length > 0 && (
                        <ProjectSection 
                            title="Embedded Projects"
                            description="Real-time systems and firmware development for microcontrollers, bridging the gap between code and physical sensors."
                            projects={embeddedProjects}
                            category="embedded"
                            delay={600}
                        />
                    )}
                </div>
                
                {softwareProjects.length === 0 && hardwareProjects.length === 0 && embeddedProjects.length === 0 && (
                    <div className="text-center py-20 animate-fade-in">
                        <h3 className="text-2xl font-black text-gray-400">No projects found</h3>
                        <p className="text-gray-500 mt-2">Try adjusting your search or filters.</p>
                    </div>
                )}
            </div>
        </section>
    );
}

export default Projects;