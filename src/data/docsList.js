export const docsSections = [
  { id: "getting-started", title: "Getting Started", description: "Setting up, running locally, and overall folder structure of the website." },
  { id: "customization", title: "Theme & Styling", description: "Configuration of accent colors, custom colors, dark/light modes, and animations." },
  { id: "interactive-tools", title: "Interactive Tools", description: "Deep-dives into features like the Minimax AI Tic-Tac-Toe and other tool views." },
  { id: "core-engines", title: "Core Engines", description: "Understanding the keyword highlights and the client-side fuzzy search implementation." },
  { id: "operations", title: "Operations & Build", description: "Details about Docker, CI/CD, and deployment on a Contabo VPS." }
];

export const docsList = [
  {
    id: "getting-started-overview",
    title: "Project Overview & Structure",
    description: "An overview of the portfolio architecture and folder conventions.",
    icon: "rocket",
    iconColor: "blue",
    section: "getting-started",
    tech: ["React 19", "Vite", "Tailwind CSS"],
    linkUrl: "/docs/getting-started-overview",
    lastUpdated: "2026-06-10",
    outline: [
      { id: "architecture", label: "System Architecture", sub: ["Frontend Stack", "Routing Scheme"] },
      { id: "folders", label: "Folder Conventions", sub: ["Components", "Data", "Pages"] }
    ],
    content: {
      intro: "This portfolio is a single-page application built using modern frontend paradigms to achieve maximum responsiveness and high-resolution visual layout aesthetics.",
      sections: [
        {
          heading: "System Architecture",
          subheading: "Architecture",
          text: "The application uses React 19 as the core UI rendering library, coupled with Vite for extremely fast hot-module replacement (HMR) during development. Tailwind CSS v4.0 is integrated for utility-first styling, using a fully fluid layout design that stretches to fit mobile devices and ultrawide screens alike."
        },
        {
          heading: "Folder Structure Overview",
          subheading: "Folders",
          text: "The codebase is organized logically into key sub-directories under src/:\n- `components/`: Pure visual cards, outlines, navigation, and feedback wrappers.\n- `data/`: Centralized site content, project databases, and list variables.\n- `pages/`: Individual entry pages (e.g., Home, Projects, Tools, Docs).\n- `utils/`: Reusable helper scripts, download managers, and math logic engines."
        }
      ]
    }
  },
  {
    id: "theme-customization",
    title: "Theme & Accent Customization",
    description: "Detailed guide on the custom accent color generator and light/dark theme matching.",
    icon: "wrench",
    iconColor: "amber",
    section: "customization",
    tech: ["CSS variables", "LocalStorage", "React Colorful"],
    linkUrl: "/docs/theme-customization",
    lastUpdated: "2026-06-10",
    outline: [
      { id: "accent-colors", label: "Accent Colors Engine", sub: ["Default Palettes", "Custom Hex Color Picker"] },
      { id: "theme-detection", label: "Auto Theme Detection", sub: ["OS Prefers Color Scheme", "Theme Persistence"] }
    ],
    content: {
      intro: "The website implements a robust customization engine allowing users to select preset accent colors, pick custom colors using an HSV color-wheel, and configure animation levels.",
      sections: [
        {
          heading: "Dynamic Accent Colors",
          subheading: "Accent Color Engine",
          text: "Accent colors are updated dynamically using CSS custom properties (variables) defined at the document root level. When a user selects a color or inputs a custom hexadecimal value, the system computes related shades and sets the root styling variables. This propagates instantly through all Tailwind-styled borders, buttons, and gradient overlays."
        },
        {
          heading: "Theme Syncing & Dark Mode",
          subheading: "Themes",
          text: "Theme management supports Light Mode, Dark Mode, and System Default. When set to 'System Default', the app utilizes media queries (`window.matchMedia('(prefers-color-scheme: dark)')`) to detect the browser's current theme, adding or removing the 'dark' utility class dynamically."
        }
      ]
    }
  },
  {
    id: "tic-tac-toe-ai",
    title: "Minimax AI Tic-Tac-Toe",
    description: "Algorithm walkthrough of the alpha-beta pruning minimax AI opponent.",
    icon: "puzzle",
    iconColor: "green",
    section: "interactive-tools",
    tech: ["Algorithms", "Minimax", "Recursion"],
    linkUrl: "/docs/tic-tac-toe-ai",
    lastUpdated: "2026-06-10",
    outline: [
      { id: "minimax-algo", label: "The Minimax Algorithm", sub: ["Base Recursion", "Alpha-Beta Pruning Optimization"] },
      { id: "difficulties", label: "Difficulty Levels", sub: ["Easy (Randomizer)", "Medium (Partial heuristic)", "Hard (Perfect play)"] }
    ],
    content: {
      intro: "The built-in Tic-Tac-Toe tool is powered by a custom minimax decision algorithm, providing three distinct gameplay difficulty levels.",
      sections: [
        {
          heading: "Minimax with Alpha-Beta Pruning",
          subheading: "Algorithms",
          text: "The hard difficulty mode computes the optimal move by traversing the game state tree. It scores game terminals (+10 for AI win, -10 for human win, 0 for draw) and uses alpha-beta pruning to discard branches that cannot influence the final decision, reducing calculation steps from thousands to under a hundred per turn."
        },
        {
          heading: "Simulating Human Error",
          subheading: "Heuristics",
          text: "To ensure that easy and medium difficulties are winnable, the AI alternates between calculating the best minimax move and selecting random moves. In Easy mode, it chooses random placements 80% of the time, while in Medium mode, it plays optimally 50% of the time, allowing human players to construct traps."
        }
      ]
    }
  },
  {
    id: "search-keyword-engine",
    title: "Fuzzy Search & Keywords",
    description: "How Fuse.js and Lodash are utilized to highlight technical keywords.",
    icon: "layers",
    iconColor: "purple",
    section: "core-engines",
    tech: ["Fuse.js", "Lodash", "Regex"],
    linkUrl: "/docs/search-keyword-engine",
    lastUpdated: "2026-06-10",
    outline: [
      { id: "fuzzy-search", label: "Fuzzy Search Engine", sub: ["Fuse.js Keys", "Threshold Configurations"] },
      { id: "keyword-system", label: "Keyword Tooltips", sub: ["Regex Matching", "Global Engine Register"] }
    ],
    content: {
      intro: "Search functionality across projects, research, and documentation leverages fuzzy string matching and regex-based tooltips.",
      sections: [
        {
          heading: "Fuse.js Indexing & Matching",
          subheading: "Fuzzy Search",
          text: "Search queries are evaluated in real-time. Fuse.js is configured with a threshold value of `0.3`, allowing it to tolerate minor spelling errors or incomplete queries while searching indexed fields like title, tech stack, and description."
        },
        {
          heading: "Interactive Technical Highlights",
          subheading: "Keyword Engine",
          text: "The keyword highlight system registers technical definitions globally. A parser walks through texts on the pages, wraps matching keywords with custom interaction boundaries, and shows a floating insight drawer explaining definitions on click."
        }
      ]
    }
  },
  {
    id: "operations-deployment",
    title: "Docker & Deployment Pipeline",
    description: "Walkthrough of GitHub Actions and containerization for VPS deployments.",
    icon: "server",
    iconColor: "blue",
    section: "operations",
    tech: ["Docker", "GitHub Actions", "VPS"],
    linkUrl: "/docs/operations-deployment",
    lastUpdated: "2026-06-10",
    outline: [
      { id: "dockerization", label: "Containerization", sub: ["Dockerfile setup", "Nginx static serving"] },
      { id: "ci-cd-workflow", label: "CI/CD Deployment", sub: ["GitHub Actions runner", "SSH deployment scripts"] }
    ],
    content: {
      intro: "This documentation outlines the automated pipeline that builds, tests, and deploys the static site to a remote Linux VPS container.",
      sections: [
        {
          heading: "Docker Container Setup",
          subheading: "Infrastructure",
          text: "The application is built inside a multi-stage Docker environment. The first stage uses Node.js to install dependencies and run the production build. The second stage copies the static built files into an Nginx image, optimizing caching rules and headers."
        },
        {
          heading: "GitHub Actions Automation",
          subheading: "CI/CD Pipeline",
          text: "Upon pushing to the main branch, a workflow runs. It validates that the project builds, builds a Docker image, pushes it to a private container registry, and logs into the Contabo VPS to pull and restart the container."
        }
      ]
    }
  }
];
