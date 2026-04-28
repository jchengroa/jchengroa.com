export const projectData = {
    "jchengroa-com": {
        id: "jchengroa-com",
        category: "software",
        title: "jchengroa.com",
        subtitle: "Personal Portfolio Website",
        description: "My personal website showcasing my projects and contact information. Built with Vite, React.js, and Tailwind CSS. It features custom animations, a responsive design, and a clean, modern aesthetic inspired by Apple's design language.",
        tech: ["React 19", "Vite", "Tailwind CSS", "Vercel Analytics"],
        links: [
            { name: "GitHub Repository", url: "https://github.com/jchengroa/jchengroa.com" }
        ],
        images: [
            "/jchengroacomResources/webcom1.png",
            "/jchengroacomResources/webcom2.png",
            "/jchengroacomResources/webcom3.png",
            "/jchengroacomResources/webcom4.png"
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
        links: [
            { name: "GitHub Repository", url: "https://github.com/jchengroa/CloudBased" },
            { name: "Demo Website", url: "https://cloudbasedims.vercel.app/" }
        ],
        images: [
            "/CloudBasedResources/cbimage1.png",
            "/CloudBasedResources/cbimage2.png",
            "/CloudBasedResources/cbimage3.png",
            "/CloudBasedResources/cbimage4.png"
        ],
        info: "Multi-Warehouse Cloud-Based Inventory Management System"
    },
    "hardware-placeholder": {
        id: "hardware-placeholder",
        category: "hardware",
        title: "Hardware Concept",
        subtitle: "Circuit Design & Prototyping",
        description: "A conceptual hardware project involving PCB design and system architecture. This placeholder represents ongoing work in hardware engineering and physical computing.",
        tech: ["KiCad", "Circuit Simulation", "Prototyping"],
        links: [
            { name: "Documentation", url: "#" }
        ],
        images: [],
        info: "Hardware Engineering"
    },
    "embedded-placeholder": {
        id: "embedded-placeholder",
        category: "embedded",
        title: "Embedded System",
        subtitle: "Microcontroller Firmware",
        description: "An embedded systems project focused on firmware development and sensor integration. This placeholder highlights upcoming work in real-time operating systems and C-based firmware.",
        tech: ["C", "C++", "FreeRTOS", "STM32"],
        links: [
            { name: "Source Code", url: "#" }
        ],
        images: [],
        info: "Embedded Development"
    }
};

export const projectsList = Object.values(projectData);
