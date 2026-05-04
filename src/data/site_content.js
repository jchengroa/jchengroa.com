export const siteContent = {
    home: {
        hero: {
            title: "John Carlo Cheng Roa",
            subtitle: "I am a 2nd-year Computer Engineering student at De La Salle University with a passion for building robust digital systems.",
            description: "Currently maintaining cloud-hosted ERPNext instances and managing secure infrastructure reliability, with a drive toward systems administration and DevOps.",
            cta: "Get In Touch",
            email: "johncarlochengroa07@gmail.com",
            github: "https://github.com/jchengroa",
            linkedin: "https://www.linkedin.com/in/john-carlo-cheng-roa-47aa6a290/"
        },
        featuredProjects: {
            title: "Featured Projects",
            subtitle: "A glimpse into some of my recent work."
        },
        featuredResearch: {
            title: "Featured Research",
            subtitle: "A look into my academic work and studies."
        }
    },
    contact: {
        title: "Get In Touch",
        subtitle: "Have a question or want to work together? Feel free to reach out through any of these platforms.",
        cardInfo: "directed at johncarlochengroa07@gmail.com",
        socials: {
            facebook: "https://www.facebook.com/@jchengroa/",
            github: "https://github.com/jchengroa",
            linkedin: "https://www.linkedin.com/in/john-carlo-cheng-roa-47aa6a290/"
        }
    },
    legal: {
        title: "Domain & Legal Information",
        domainStatus: {
            title: "Domain Status",
            heading: '"DOMAIN NOT FOR SALE"',
            content: "The domain [[blue:jchengroa.com]] is a personal digital asset used for professional identification, portfolio hosting, and software development research. It is currently [[status:NOT FOR SALE]].",
            subtext: "Offers for acquisition will be ignored. This domain is intended for long-term personal use as part of my professional brand as a Computer Engineer.",
            established: "Est. April 25, 2026"
        },
        credits: {
            architecture: {
                title: "Architecture & Code",
                content: "Built using React, Vite, and Tailwind CSS. Deployed using Vercel. Built with the help of Google Antigravity & Gemini, as a vibe coding project."
            },
            typography: {
                title: "Typography",
                content: "Outfit & System Fonts for maximum performance and readability."
            },
            icons: {
                title: "Icons",
                content: "Lucide-inspired SVG components & custom paths."
            }
        },
        libraries: {
            framer: {
                title: "Framer Motion",
                content: "Used for advanced UI animations, scroll-linked effects, smooth transitions, and the animated hamburger navigation menu — including the icon morph and staggered dropdown entrance via motion and AnimatePresence."
            },
            fuse: {
                title: "Fuse.js",
                content: "Powers the fuzzy search engine for projects and research filtering."
            },
            embla: {
                title: "Embla Carousel",
                content: "Provides the lightweight, touch-enabled slider components for featured work."
            },
            lodash: {
                title: "Lodash",
                content: "Utilized for efficient data manipulation within the keyword engine."
            }
        },
        privacy: {
            policy: {
                title: "Privacy Policy",
                content: "This site does not use cookies for tracking. We use Vercel Analytics for anonymous traffic data to improve the user experience."
            },
            disclaimer: {
                title: "Content Disclaimer",
                content: "All project data and visuals are for demonstration purposes and represent original work or credited collaborations."
            }
        }
    },
    changelog: {
        title: "Changelog",
        subtitle: "A detailed timeline of the website's evolution, technical updates, and feature rollouts."
    },
    footer: {
        legalLink: "Domain & Legal Information",
        versionPrefix: "Version",
        updatedPrefix: "Last Updated"
    },
    common: {
        learnMore: "Learn more",
        sendMessage: "Send Message",
        releaseDate: "Release Date",
        newUpdate: "New Update",
        whatsNew: "What's New",
        awesome: "Awesome!",
        noResults: "No results found",
        searching: "Searching...",
        searchPlaceholder: "Search by keyword, technology, or title...",
        itemNotFound: "Item not found",
        notFoundDescription: "The project or research you're looking for doesn't exist or has been moved.",
        returnHome: "Return Home",
        keyMetrics: "Key Metrics & Findings",
        visualGallery: "Visual Gallery",
        resources: "Resources",
        abstractOverview: "Abstract & Overview",
        challengeSolution: "The Challenge & Solution",
        searchButton: "Search"
    },
    navbar: {
        name: "jchengroa",
        description: "Personal Portfolio & Research Hub",
        settings: {
            title: "Settings",
            darkMode: "Dark Mode",
            clearStorage: "Clear Local Storage",
            clearConfirm: "Clear all site settings and cached data?"
        },
        links: [
            { label: "Projects", to: "/projects", icon: "projects", active: true, showInNavbar: true },
            { label: "Research", to: "/research", icon: "research", active: true, showInNavbar: true },
            { label: "Forums", to: "/forums", icon: "forums", active: false, showInNavbar: true },
            { label: "Docs", to: "/docs", icon: "docs", active: false, showInNavbar: true },
            { label: "Downloads", to: "/downloadables", icon: "downloads", active: false, showInNavbar: true },
            { label: "Changelog", to: "/changelog", icon: "changelog", active: true, showInNavbar: false },
            { label: "Legal & Domain", to: "/legal", icon: "legal", active: true, showInNavbar: false }
        ]
    }
};
