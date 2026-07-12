export const navigationData = {
    mainLinks: [
        { id: "home", label: "Home", to: "/", icon: "home", active: true },
        { id: "projects", label: "Projects", to: "/projects", icon: "projects", active: true },
        { id: "research", label: "Research", to: "/research", icon: "research", active: true },
        { id: "recognition", label: "Recognition", to: "/recognition", icon: "recognition", active: true },
        { id: "more", label: "More", to: null, icon: "more", active: true }
    ],
    subLinks: {
        projects: [
            { label: "All Projects", to: "/projects", desc: "Browse full gallery of software & hardware build logs.", icon: "all" },
            { label: "jchengroa.com", to: "/project/jchengroa-com", desc: "Vibe coding portfolio site details.", icon: "code" },
            { label: "CloudBased", to: "/project/cloudbased", desc: "Vite + PocketBase Inventory System.", icon: "database" }
        ],
        research: [
            { label: "All Research", to: "/research", desc: "Academic findings and PDF publications.", icon: "all" },
            { label: "Mega Box Robot", to: "/project/jhs-1", desc: "RC robot collecting floating waste from waters.", icon: "anchor" },
            { label: "Cabbage Shelf-Life", to: "/project/shs-1", desc: "Radish post-harvest quality preservation.", icon: "leaf" },
            { label: "Cabbage Cytotoxicity", to: "/project/shs-2", desc: "Allium onion safety evaluation.", icon: "shield" }
        ],
        recognition: [
            { label: "All Recognition", to: "/recognition", desc: "Hackathon wins and competitive milestones.", icon: "all" }
        ],
        more: [
            { label: "Socials", to: "/socials", desc: "Find me on GitHub, LinkedIn, Reddit, & Facebook.", icon: "share" },
            { label: "Changelog", to: "/changelog", desc: "A timeline of technical rollouts.", icon: "history" },
            { label: "Legal & Domain", to: "/legal", desc: "Terms, VPS configs, & domain details.", icon: "scale" },
            { label: "Settings Panel", to: "settings", desc: "Adjust theme and custom accent colors.", icon: "settings", action: "settings" }
        ]
    }
};
