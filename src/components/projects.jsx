import { WorkCard, Title } from "./components.jsx";
import { projectsList } from "../data/projects";

function Projects() {
    const softwareProjects = projectsList.filter(p => p.category === "software");
    const hardwareProjects = projectsList.filter(p => p.category === "hardware");
    const embeddedProjects = projectsList.filter(p => p.category === "embedded");

    const ProjectSection = ({ title, description, projects, delay }) => (
        <div className={`w-full max-w-6xl space-y-10 animate-fade-in`} style={{ animationDelay: `${delay}ms` }}>
            <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-3xl font-black text-gray-900 tracking-tight mb-2">{title}</h3>
                <p className="text-gray-500 font-medium max-w-2xl">{description}</p>
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
                            linkURL={project.links[0].url}
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
            className="relative min-h-screen flex flex-col items-center py-32 px-6 gap-24 overflow-hidden bg-gray-50/50"
        >
            {/* Background Decorative Element */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none opacity-20">
                <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-700"></div>
            </div>

            <div className="relative z-10 animate-fade-up text-center">
                <Title
                    title="Projects"
                />
                <p className="text-center text-gray-600 max-w-2xl mx-auto -mt-6 font-medium text-lg">
                    A comprehensive showcase of my multidisciplinary engineering journey, spanning high-level software architecture to low-level hardware integration.
                </p>
            </div>

            <ProjectSection 
                title="Software Projects"
                description="Modern web applications and distributed systems built with scalable architectures and user-centric design."
                projects={softwareProjects}
                delay={200}
            />

            <ProjectSection 
                title="Hardware Projects"
                description="Physical computing and circuit design projects focusing on PCB layout, signal integrity, and hardware prototyping."
                projects={hardwareProjects}
                delay={400}
            />

            <ProjectSection 
                title="Embedded Projects"
                description="Real-time systems and firmware development for microcontrollers, bridging the gap between code and physical sensors."
                projects={embeddedProjects}
                delay={600}
            />
        </section>
    );
}

export default Projects;