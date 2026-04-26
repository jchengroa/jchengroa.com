import { ProjectCard, Title } from "./components.jsx";

function Projects() {
    return (
        <section
            id="projects"
            className="relative min-h-screen flex flex-col justify-center items-center p-5 gap-10"
        >
            <div className="pt-20">
                <Title
                    title="Projects"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                <ProjectCard
                    title="jchengroa.com"
                    info="Personal Website"
                    linkName="GitHub"
                    linkPicture="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                    linkURL="https://github.com/jchengroa/jchengroa.com"
                    description="My personal website showcasing my projects and contact information. Built with Vite, React.js, and Tailwind CSS."
                />
                <ProjectCard
                    title="CloudBased"
                    info="Multi-Warehouse Cloud-Based Inventory Management System"
                    linkName="GitHub"
                    linkPicture="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                    linkURL="https://github.com/jchengroa/CloudBased"
                    description="This project centralizes multisite inventory tracking and vendor details into a robust platform, 
                    solving data fragmentation. Developed following the Software Development Life Cycle (SDLC), the solution evolved 
                    from gathering these specific user pain points to systematically designing, implementing, and testing a centralized 
                    web application."
                />
            </div>
        </section>
    );
}

export default Projects;