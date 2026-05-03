# jchengroa.com

A premium, multidisciplinary portfolio website showcasing engineering projects, academic research, and professional experience. Built with a focus on modern aesthetics and smooth performance.

![Portfolio Preview](/public/jchengroacomResources/webcom1.png)

---

## ✨ Key Features

- **Dynamic Project Gallery**: Interactive showcase of software, hardware, and embedded systems projects.
- **Academic Research Hub**: Dedicated section for published research with structured findings, metrics, and full-paper access.
- **Immersive Visuals**: High-resolution image lightbox with zoom animations and backdrop blur effects.
- **Responsive & Performant**: Fully optimized for all device sizes using React 19 and Tailwind CSS.
- **Interactive Components**: Custom-built navigation, animated hero section, and a functional contact system.
- **Analytics Integrated**: Powered by Vercel Analytics for real-time traffic monitoring.

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://react.dev/), [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Search Engine**: [Fuse.js](https://www.fusejs.io/)
- **Carousel/Slider**: [Embla Carousel](https://www.embla-carousel.com/)
- **Data Processing**: [Lodash](https://lodash.com/)
- **Analytics**: [Vercel Analytics](https://vercel.com/analytics)
- **Deployment**: [Vercel](https://vercel.com/)
- **Typography**: [Outfit](https://fonts.google.com/specimen/Outfit) via Google Fonts
- **Icons**: Lucide-inspired SVG components


---

## 🚀 Getting Started

Follow these steps to set up the development environment on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (Latest LTS version recommended)
- [npm](https://www.npmjs.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jchengroa/jchengroa.com.git
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   # If you are on Windows and encounter execution policy errors:
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process

   # Start the Vite dev server
   npm run dev
   ```

---

## 🏗️ Project Structure

```
jchengroa.com/
├── public/                # Static assets & project screenshots
│   ├── CloudBasedResources/
│   ├── jchengroacomResources/
│   └── logo.png
├── src/
│   ├── components/        # UI components & page sections
│   │   ├── Contact.jsx
│   │   ├── FeaturedProjects.jsx
│   │   ├── FeaturedResearch.jsx
│   │   ├── Hero.jsx
│   │   ├── WorkDetail.jsx
│   │   └── components.jsx # Shared UI elements
│   ├── data/              # Project & Research data files
│   │   ├── projects.js
│   │   └── research.js
│   ├── index.css          # Design system & animations
│   └── main.jsx           # Main application entry
├── index.html
├── package.json
└── vite.config.js
```

---

## 📝 License

This project is personal and is used to showcase the work of **John Carlo Cheng Roa**. Feel free to explore the code for inspiration, but please do not redistribute the content as your own.

---

## Changelog:
- [0.0.1] - 2026-04-25
Created initail files for the website.
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