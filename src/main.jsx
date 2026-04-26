import { createRoot } from 'react-dom/client'
import './index.css'

/* Vercel Analytics */
import { inject } from '@vercel/analytics'
inject()

import NavBar from './components/components.jsx'
import Hero from './components/hero.jsx'
import Projects from './components/projects.jsx'
import Contact from './components/contact.jsx'

/* Main Application */
function App() {
    return (
        <div className="p-2.5">
            <div id="navbar">
                <NavBar
                    name="jchengroa"
                />
            </div>

            <div id="home">
                <Hero
                    title="John Carlo Cheng Roa"
                    subtitle="Computer Engineering Student"
                    backgroundImage="./src/assets/hero_background.jpg"
                />
            </div>

            <div id="projects">
                <Projects />
            </div>

            <div id="contact">
                <Contact />
            </div>

            <div id="footer" className="p-5 text-center">
                <p className="text-sm"><b>DOMAIN NOT FOR SALE</b></p>
                <p className="text-gray-500 text-sm">Version 0.0.7 | Last Updated: April 26, 2026</p>
            </div>
        </div>
    );
}

createRoot(document.getElementById('root')).render(<App />)