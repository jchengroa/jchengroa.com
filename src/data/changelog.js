export const changelogData = [
  {
    "version": "0.0.1",
    "date": "2026-04-25",
    "content": [
      "Created initail files for the website.",
      "Used **Vite**, **React.js**, and **Tailwind CSS**."
    ]
  },
  {
    "version": "0.0.2",
    "date": "2026-04-25",
    "content": [
      "Updated scripts in **package.json**",
      "Added **.gitignore** file"
    ]
  },
  {
    "version": "0.0.3",
    "date": "2026-04-25",
    "content": [
      "Added objects such as **ProjectCard.jsx** and **Title.jsx**",
      "Updated styling in **main.jsx**"
    ]
  },
  {
    "version": "0.0.4",
    "date": "2026-04-25",
    "content": [
      "Added **Vercel Analytics** for website traffic tracking."
    ]
  },
  {
    "version": "0.0.5",
    "date": "2026-04-25",
    "content": [
      "Updated and organized the UI of the website to include projects.",
      "Added projects section with clickable links.",
      "Added some spacing and alignment in the UI."
    ]
  },
  {
    "version": "0.0.6",
    "date": "2026-04-26",
    "content": [
      "Separated the objects from **main.jsx** to **components.jsx**",
      "Updated the UI to include a navigation bar that scrolls to the different sections of the website.",
      "Added a top bar to the navigation bar.",
      "Added the home section with clickable links to my professional accounts.",
      "Added the contact section template."
    ]
  },
  {
    "version": "0.0.7",
    "date": "2026-04-26",
    "content": [
      "Restructured the UI of the website.",
      "Fixed Visual Bugs."
    ]
  },
  {
    "version": "0.1.0",
    "date": "2026-04-26",
    "content": [
      "Updated the **Contact Section** to display my social media accounts and links to them, and a send message form.",
      "Reorganized the project structure.",
      "Abstracted **Hero**, **Projects**, and **Contact** sections into **Hero.jsx**, **Projects.jsx**, and **Contact.jsx**.",
      "Added smooth scrolling animation to the navigation bar."
    ]
  },
  {
    "version": "0.1.1",
    "date": "2026-04-26",
    "content": [
      "Fixed bug where images are not loading in the deployed website."
    ]
  },
  {
    "version": "0.2.0",
    "date": "2026-04-27",
    "content": [
      "Updated look and theme of the website.",
      "Added custom CSS animations.",
      "Updated Projects and Contact sections to be more modern.",
      "Updated Projects to have different sections for software, hardware, embedded.",
      "Updated Navbar.",
      "Created **ProjectDetail.jsx** for the project detail page.",
      "Updated **Projects.jsx** to link to the project detail page.",
      "Updated **ProjectCard.jsx** to include a link to the project detail page.",
      "Created **projects.js** to store project data.",
      "Updated **main.jsx** to include the project detail page.",
      "Updated contact card in **components.jsx** to make send message function work.",
      "Added **Legal.jsx** for domain information and legal disclaimers."
    ]
  },
  {
    "version": "0.3.0",
    "date": "2026-04-28",
    "content": [
      "Updated the look and theme of the website, specifically **hero.jsx**.",
      "Added new information in **hero.jsx**.",
      "Created **research.jsx** and **research.js** to store research data.",
      "Updated **main.jsx** to include the standalone projects and research page.",
      "Updated **WorkDetail.jsx** to include the research detail page.",
      "Updated navbar in **components.jsx** to include link to new projects and research page.",
      "Separated and created **FeaturedProjects.jsx** for the featured projects section.",
      "Created **FeaturedResearch.jsx** for the featured research section.",
      "Updated **main.jsx** to include the featured projects and featured research sections.",
      "Updated project and research details."
    ]
  },
  {
    "version": "0.3.1",
    "date": "2026-04-28",
    "content": [
      "Added Demo Website for CloudBased."
    ]
  },
  {
    "version": "0.3.2",
    "date": "2026-04-28",
    "content": [
      "Removed Pro Tips appearing in WorkDetail for projects.",
      "Added images for the projects, specifically jchengroa.com and CloudBased.",
      "Added ability to view images full screen."
    ]
  },
  {
    "version": "0.3.4",
    "date": "2026-04-28",
    "content": [
      "Fixed bug where opening links to work detail pages caused a navigation error.",
      "Fixed visual bugs within hero and featuredprojects sections in the main overlay page."
    ]
  },
  {
    "version": "0.4.0",
    "date": "2026-05-01",
    "content": [
      "Fixed bugs in the projects section and created a better system for projects to be organized and displayed.",
      "Added new keyword engine used overall for the website to pull keywords from the project and research data.",
      "Added functionality to search and filter projects and research.",
      "Revised some information in Domain and Legal.",
      "Fixed some visual bugs and inconsistencies."
    ]
  },
  {
    "version": "0.5.0",
    "date": "2026-05-02",
    "content": [
      "Cleaned up website code and files.",
      "Enhanced the website with better animations and transitions including scroll-linked animations and hover effects.",
      "Utilized External Libraries: **Framer Motion** for animations, **Fuse.js** for fuzzy search functionality, **Lenis** for smooth scrolling. **Lodash** for keyword engine functions.",
      "Fixed bugs in the projects and research sections."
    ]
  },
  {
    "version": "0.5.1",
    "date": "2026-05-03",
    "content": [
      "Updated the **Legal.jsx** to display and show links to the documentation of the different technologies used in the website."
    ]
  },
  {
    "version": "0.6.0",
    "date": "2026-05-04",
    "content": [
      "Replaced the old inline navbar links with a new animated **Hamburger Menu** component.",
      "Created **HamburgerMenu.jsx** using **Framer Motion** for icon morph animations and staggered dropdown entrances.",
      "Introduced the **Prompt** component (consolidated in `components.jsx`), a custom modal for displaying detailed keyword definitions and metrics from **keywords.js**.",
      "Enhanced **KeywordHighlights** and **WorkDetail** sections (Key Metrics, Tech Tags) with interactivity and deep-insight modals.",
      "Integrated the navigation and prompt systems across the **Home**, **Projects**, **Research**, and **WorkDetail** pages.",
      "Updated **Legal.jsx** to reflect new features and technical documentation.",
      "Fixed visual bugs in Projects and Research pages."
    ]
  },
  {
    "version": "0.7.0",
    "date": "2026-05-04",
    "content": [
      "Reorganized the hero in **home.jsx**.",
      "Implemented the automated **Changelog System** synced from README.md.",
      "Added the **What's New** smart popup with version tracking to avoid repeated notifications.",
      "Created a dedicated **Changelog** timeline page with premium entrance animations.",
      "Refactored the **Title** component to match the premium site design and synced it across all pages.",
      "Integrated a custom **Markdown-lite parser** to support **bold text** formatting in project descriptions and logs.",
      "Added the **Changelog** link to the animated Hamburger Menu."
    ]
  }
];