import { projectsList, projectData } from './project_list';

export const projectsPageContent = {
    title: "Projects",
    subtitle: "A comprehensive showcase of my multidisciplinary engineering journey, spanning high-level software architecture to low-level hardware integration.",
    sections: {
        software: {
            title: "Software Projects",
            description: "Modern web applications and distributed systems built with scalable architectures and user-centric design."
        },
        hardware: {
            title: "Hardware Projects",
            description: "Physical computing and circuit design projects focusing on PCB layout, signal integrity, and hardware prototyping."
        },
        embedded: {
            title: "Embedded Projects",
            description: "Real-time systems and firmware development for microcontrollers, bridging the gap between code and physical sensors."
        }
    },
    noResults: {
        title: "No projects found",
        subtitle: "Try adjusting your search or filters."
    }
};

export { projectsList, projectData };
