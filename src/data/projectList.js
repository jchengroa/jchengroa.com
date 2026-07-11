export const projectData = {
    "jchengroa-com": {
        id: "jchengroa-com",
        category: "software",
        title: "jchengroa.com",
        subtitle: "Personal Portfolio Website",
        description: "My personal website showcasing my projects and contact information. Built with Vite, React.js, and Tailwind CSS. It features custom animations, a responsive design, and a clean, modern aesthetic inspired by Apple's design language.",
        tech: ["React 19", "Vite", "Tailwind CSS"],
        keywords: ["Frontend", "UI/UX", "Web Development", "Portfolio"],
        links: [
            { name: "GitHub Repository", url: "https://github.com/jchengroa/jchengroa.com" }
        ],
        images: [
            "/web1.jpg",
            "/web2.jpg",
            "/web3.jpg",
            "/web4.jpg"
        ],
        info: "Personal Website"
    },
    "cloudbased": {
        id: "cloudbased",
        category: "software",
        title: "CloudBased",
        subtitle: "Inventory Management System",
        description: "A robust, multi-warehouse cloud-based inventory management system. This project centralizes multisite inventory tracking and vendor details into a single platform, solving critical data fragmentation issues for businesses. Developed following the SDLC framework.",
        tech: ["React", "PocketBase", "Tailwind CSS", "Vite"],
        keywords: ["Full-Stack", "Cloud", "SaaS", "Enterprise"],
        links: [
            { name: "GitHub Repository", url: "https://github.com/jchengroa/CloudBased" }
        ],
        images: [
            "/cloud1.jpg",
            "/cloud2.jpg",
            "/cloud3.jpg",
            "/cloud4.jpg"
        ],
        info: "Multi-Warehouse Cloud-Based Inventory Management System"
    }
};

export const projectsList = Object.values(projectData);
