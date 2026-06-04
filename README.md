# jchengroa.com

A premium, multidisciplinary portfolio website showcasing engineering projects, academic research, and professional experience. Built with a focus on modern aesthetics and smooth performance.

![Portfolio Preview](/public/jchengroacomResources/webcom1.png)

---

## Key Features

- **Dynamic Project Gallery**: Interactive showcase of software, hardware, and embedded systems projects.
- **Academic Research Hub**: Dedicated section for published research with structured findings, metrics, and full-paper access.
- **Documentation System**: Dashboard-style docs page with a hierarchical outline sidebar and individual detail pages.
- **Interactive Tools**: Built-in Tic Tac Toe game with Minimax AI at three difficulty levels.
- **Immersive Visuals**: High-resolution image lightbox with zoom animations and backdrop blur effects.
- **Responsive & Performant**: Fully optimized for all device sizes using React 19 and Tailwind CSS.
- **Settings Panel**: Full-screen overlay for theme mode, accent color, animation level, dev tools, and local storage management.
- **Custom Download Manager**: Floating queue displaying active PDF downloads with speed, size, and progress bar.

## Tech Stack

- **Frontend**: [React 19](https://react.dev/), [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) — UI animations, scroll-linked effects, and animated hamburger menu
- **Search**: [Fuse.js](https://www.fusejs.io/) — fuzzy search across projects, research, and tools
- **Carousel**: [Embla Carousel](https://www.embla-carousel.com/) — hero section carousels
- **Data**: [Lodash](https://lodash.com/) — keyword engine data processing
- **HTTP**: [Axios](https://axios-http.com/) — download manager with progress tracking
- **Color**: [React Colorful](https://github.com/omgovich/react-colorful) — custom accent color picker with palette generation
- **Deployment**: Contabo VPS via GitHub Actions
- **Typography**: [Outfit](https://fonts.google.com/specimen/Outfit)
- **Icons**: Lucide-inspired SVG components

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (Latest LTS recommended)
- [npm](https://www.npmjs.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jchengroa/jchengroa.com.git
   cd jchengroa.com
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the dev server**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`.

---

## Syncing the Changelog

The website pulls changelog data from this README. After adding entries below:

```bash
npm run sync-changelog
```

This regenerates `src/data/changelog.js`.

---

## Project Structure

```
jchengroa.com/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── .gitignore
├── Dockerfile
├── docs/
│   └── index.html
├── index.html
├── package-lock.json
├── package.json
├── public/
│   ├── bg1.jpg
│   ├── bg2.jpg
│   ├── bg3.jpg
│   ├── bg4.jpg
│   ├── cloud1.jpg
│   ├── cloud2.jpg
│   ├── cloud3.jpg
│   ├── cloud4.jpg
│   ├── Documents/
│   │   ├── JHS1.pdf
│   │   ├── SHS1.pdf
│   │   ├── SHS2.pdf
│   │   └── UGP1.pdf
│   ├── logo.png
│   ├── web1.jpg
│   ├── web2.jpg
│   ├── web3.jpg
│   └── web4.jpg
├── README.md
├── scripts/
│   └── sync-changelog.js
├── src/
│   ├── components/
│   │   ├── cards.jsx
│   │   ├── changelogOutline.jsx
│   │   ├── components.jsx
│   │   ├── controls.jsx
│   │   ├── docDetail.jsx
│   │   ├── docsOutline.jsx
│   │   ├── documentTabs.jsx
│   │   ├── navigation.jsx
│   │   ├── prompt.jsx
│   │   └── typography.jsx
│   ├── data/
│   │   ├── changelog.js
│   │   ├── docs.js
│   │   ├── docsList.js
│   │   ├── keywords.js
│   │   ├── projectList.js
│   │   ├── projects.js
│   │   ├── recognitionList.js
│   │   ├── research.js
│   │   ├── researchList.js
│   │   ├── siteContent.js
│   │   └── toolsList.js
│   ├── docsMain.jsx
│   ├── index.css
│   ├── main.jsx
│   ├── pages/
│   │   ├── changelog.jsx
│   │   ├── docs.jsx
│   │   ├── home.jsx
│   │   ├── legal.jsx
│   │   ├── projects.jsx
│   │   ├── recognition.jsx
│   │   ├── research.jsx
│   │   ├── settingsModal.jsx
│   │   ├── tools.jsx
│   │   └── workDetail.jsx
│   ├── tools/
│   │   └── ticTacToe.jsx
│   └── utils/
│       ├── animations.js
│       ├── colorUtils.js
│       ├── downloadManager.jsx
│       ├── hamburgerMenu.jsx
│       ├── keywordEngine.jsx
│       ├── subheaderToggle.js
│       └── viewSwitcher.jsx
└── vite.config.js
```

---

## License

This project is personal and is used to showcase the work of **John Carlo Cheng Roa**. Feel free to explore the code for inspiration, but please do not redistribute the content as your own.

---

## Changelog:

- [0.0.1] - 2026-04-25
Created initial files for the website.
Used **Vite**, **React.js**, and **Tailwind CSS**.

- [0.0.2] - 2026-04-25
Updated scripts in **package.json**
Added **.gitignore** file

- [0.0.3] - 2026-04-25
Added objects such as **ProjectCard.jsx** and **Title.jsx**
Updated styling in **main.jsx**

- [0.0.4] - 2026-04-25
Added **Vercel Analytics** for website traffic tracking.

- [0.0.5] - 2026-04-25
Updated and organized the UI of the website to include projects.
Added projects section with clickable links.
Added some spacing and alignment in the UI.

- [0.0.6] - 2026-04-26
Separated the objects from **main.jsx** to **components.jsx**
Updated the UI to include a navigation bar that scrolls to the different sections of the website.
Added a top bar to the navigation bar.
Added the home section with clickable links to my professional accounts.
Added the contact section template.

- [0.0.7] - 2026-04-26
Restructured the UI of the website.
Fixed Visual Bugs.

- [0.1.0] - 2026-04-26
Updated the **Contact Section** to display my social media accounts and links to them, and a send message form.
Reorganized the project structure.
Abstracted **Hero**, **Projects**, and **Contact** sections into **Hero.jsx**, **Projects.jsx**, and **Contact.jsx**.
Added smooth scrolling animation to the navigation bar.

- [0.1.1] - 2026-04-26
Fixed bug where images are not loading in the deployed website.

- [0.2.0] - 2026-04-27
Updated look and theme of the website.
Added custom CSS animations.
Updated Projects and Contact sections to be more modern.
Updated Projects to have different sections for software, hardware, embedded.
Updated Navbar.
Created **ProjectDetail.jsx** for the project detail page.
Updated **Projects.jsx** to link to the project detail page.
Updated **ProjectCard.jsx** to include a link to the project detail page.
Created **projects.js** to store project data.
Updated **main.jsx** to include the project detail page.
Updated contact card in **components.jsx** to make send message function work.
Added **Legal.jsx** for domain information and legal disclaimers.

- [0.3.0] - 2026-04-28
Updated the look and theme of the website, specifically **hero.jsx**.
Added new information in **hero.jsx**.
Created **research.jsx** and **research.js** to store research data.
Updated **main.jsx** to include the standalone projects and research page.
Updated **WorkDetail.jsx** to include the research detail page.
Updated navbar in **components.jsx** to include link to new projects and research page.
Separated and created **FeaturedProjects.jsx** for the featured projects section.
Created **FeaturedResearch.jsx** for the featured research section.
Updated **main.jsx** to include the featured projects and featured research sections.
Updated project and research details.

- [0.3.1] - 2026-04-28
Added Demo Website for CloudBased.

- [0.3.2] - 2026-04-28
Removed Pro Tips appearing in WorkDetail for projects.
Added images for the projects, specifically jchengroa.com and CloudBased.
Added ability to view images full screen.

- [0.3.4] - 2026-04-28
Fixed bug where opening links to work detail pages caused a navigation error.
Fixed visual bugs within hero and featuredprojects sections in the main overlay page.

- [0.4.0] - 2026-05-01
Fixed bugs in the projects section and created a better system for projects to be organized and displayed.
Added new keyword engine used overall for the website to pull keywords from the project and research data.
Added functionality to search and filter projects and research.
Revised some information in Domain and Legal.
Fixed some visual bugs and inconsistencies.

- [0.5.0] - 2026-05-02
Cleaned up website code and files.
Enhanced the website with better animations and transitions including scroll-linked animations and hover effects.
Utilized External Libraries: **Framer Motion** for animations, **Fuse.js** for fuzzy search functionality, **Lenis** for smooth scrolling. **Lodash** for keyword engine functions.
Fixed bugs in the projects and research sections.

- [0.5.1] - 2026-05-03
Updated the **Legal.jsx** to display and show links to the documentation of the different technologies used in the website.

- [0.6.0] - 2026-05-04
Replaced the old inline navbar links with a new animated **Hamburger Menu** component.
Created **HamburgerMenu.jsx** using **Framer Motion** for icon morph animations and staggered dropdown entrances.
Introduced the **Prompt** component, a custom modal for displaying detailed keyword definitions and metrics.
Enhanced **KeywordHighlights** and **WorkDetail** sections with interactivity and deep-insight modals.
Integrated the navigation and prompt systems across the **Home**, **Projects**, **Research**, and **WorkDetail** pages.
Updated **Legal.jsx** to reflect new features and technical documentation.
Fixed visual bugs in Projects and Research pages.

- [0.7.0] - 2026-05-04
Reorganized the hero in **home.jsx**.
Implemented the automated **Changelog System** synced from README.md.
Added the **What's New** smart popup with version tracking to avoid repeated notifications.
Created a dedicated **Changelog** timeline page with premium entrance animations.
Refactored the **Title** component to match the premium site design and synced it across all pages.
Integrated a custom **Markdown-lite parser** to support **bold text** formatting.
Added the **Changelog** link to the animated Hamburger Menu.

- [0.7.1] - 2026-05-04
Implemented a **Keyword Shortening System** to handle long technical terms.
Integrated shortening logic across the Hero, Work Cards, Prompt Modals, and Detail Pages.
Added **Dynamic Font Sizing** for long labels to prevent UI overflow and maintain layout balance.
Optimized the **sync-changelog.js** script for word-for-word accuracy.

- [0.7.2] - 2026-05-04
Implemented a auto-updating footer to display current version and last updated date.

- [0.7.3] - 2026-05-04
Added more background images to the hero section.
Added new settings dropdown in the hamburger menu, including Dark Mode toggle and Clear Local Storage button.
Added dark mode, casually.
Added Enter button to the search bar throughout the website.
Modularized almost every component into /data.
Optimized the website and fixed bugs.

- [0.7.4] - 2026-05-08
Changed behavior of changelog prompt to only pop up if new version is detected and the user has opened the website.
Changed "Forums" to "Recognition" throughout the website.
Updated the hamburger menu visual and codebase.

- [0.7.5] - 2026-05-11
Cleaned up and optimized codebase to reflect new backend changes.
Removed Vercel Analytics and Vercel support.
Added new GitHub workflow for automatic deployment.

- [0.8.0] - 2026-05-15
Added the Recognition Page.
Added the Tools Page.
Used Facebook post embed URLs for the recognition posts.
Cleaned up codebase and resolved duplicate import build errors in components.jsx.

- [0.9.0] - 2026-05-18
Added Featured Recognition section to the homepage.
Added the ability to switch from Grid View to List View across all pages.
Added the ability to toggle subheader visibility.
Added accent colors and an accent color picker in the settings dropdown.
Added an auto theme that detects the OS/browser theme.
Added Document Tabs sticky navigation sidebar with real-time active section highlighting.
Added state persistence for sidebar, theme, accent color, view selection, and subheader visibility.
Added specific pages for each recognition entry.
Added filtering tools to the recognition page.

- [0.9.1] - 2026-05-19
Fixed bug where changelog prompts were broken on mobile and small screens.
Fixed a visual bug in the changelog prompt.

- [0.9.2] - 2026-05-19
Added Download Manager to the website.
Uploaded Documents into codebase to make them more accessible.
Removed support for Google Drive downloads, ensuring reliability and consistency.

- [0.9.3] - 2026-05-23
Updated all components to be more mobile friendly.
Created new animation utility to unify all animations across the website.

- [0.10.0] - 2026-05-23
Added the Documentation page with a dashboard-style layout and customizable icons for each document.
Added documentation detail pages with content sections and prev/next navigation.
Added a hierarchical documentation outline sidebar with expand/collapse sections, documents, headings, and subheadings.
Switched the outline sidebar to use a draggable bottom sheet on mobile for smoother resizing.
Added the Settings panel (full-screen overlay) with theme mode, accent color, animation level, dev tools, and data controls.
Added an Animation Level setting (Full, Reduced, None) with localStorage persistence.
Moved the Dev Tools section from the Legal page into the new Settings panel.
Added back links to WorkDetail pages (Projects, Research, Recognition, Tools).
Improved the Document Tabs outline to separate chevron toggle from navigation.
Built a Tic Tac Toe game on the Tools page using Minimax with alpha-beta pruning and three difficulty levels.

- [0.11.0] - 2026-05-29
Added outline sidebar into the changelog page.
Added a color picker for accent colors.
Replaced all icons to a more stable React Lucide Library.
Updated Settings panel with more customization options across the website.
Updated Project Structure and abstracted many essential components.
Updated some information.
Updated Hamburger Menu to feel more comfortable.
Fixed Mobile Specific Visual Bugs.
Fixed Visual Bugs across all platforms ang pages.
Fixed the features carousel visual bug.

- [0.11.1] - 2026-06-05
Updated docs section to its own page to be more functional and focused.
Optimized the entire website and compressed image files to make it faster and work better on low end devices.
Reorganized some files for a more efficient workflow.