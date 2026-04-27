import { createRoot } from 'react-dom/client'
import './index.css'

/* Vercel Analytics */
import { inject } from '@vercel/analytics'
inject()

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import NavBar from './components/components.jsx'
import Hero from './components/hero.jsx'
import Projects from './components/projects.jsx'
import Contact from './components/contact.jsx'
import ProjectDetail from './components/ProjectDetail.jsx'
import Legal from './components/Legal.jsx'

function Home() {
    return (
        <>
            <div id="home">
                <Hero
                    title="John Carlo Cheng Roa"
                    subtitle="Computer Engineering Student"
                    backgroundImage="/hero_background.jpg"
                />
            </div>
            <div id="projects">
                <Projects />
            </div>
            <div id="contact">
                <Contact />
            </div>
        </>
    );
}

function App() {
    return (
        <BrowserRouter>
            <div className="p-2.5">
                <div id="navbar">
                    <NavBar
                        name="jchengroa"
                    />
                </div>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/project/:id" element={<ProjectDetail />} />
                    <Route path="/legal" element={<Legal />} />
                </Routes>

                <div id="footer" className="p-5 text-center mt-12">
                    <p className="text-sm">
                        <Link to="/legal" className="hover:text-blue-600 transition-colors">
                            <b>DOMAIN NOT FOR SALE</b>
                        </Link>
                    </p>
                    <p className="text-gray-500 text-sm">Version 0.2.0 | Last Updated: April 27, 2026</p>
                </div>
            </div>
        </BrowserRouter>
    );
}

createRoot(document.getElementById('root')).render(<App />)