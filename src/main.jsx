import { createRoot } from 'react-dom/client'
import './index.css'

/* Vercel Analytics */
import { inject } from '@vercel/analytics'
inject()

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import NavBar from './components/components.jsx'
import Home from './components/home.jsx'
import Projects from './components/projects.jsx'
import WorkDetail from './components/WorkDetail.jsx'
import Legal from './components/Legal.jsx'
import Research from './components/research.jsx'


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
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/research" element={<Research />} />
                    <Route path="/project/:id" element={<WorkDetail />} />
                    <Route path="/legal" element={<Legal />} />
                </Routes>

                <div id="footer" className="p-5 text-center mt-12">
                    <p className="text-sm">
                        <Link to="/legal" className="hover:text-blue-600 transition-colors">
                            <b>Domain & Legal Information</b>
                        </Link>
                    </p>
                    <p className="text-gray-500 text-sm">Version 0.5.1 | Last Updated: May 3, 2026</p>
                </div>
            </div>
        </BrowserRouter>
    );
}

createRoot(document.getElementById('root')).render(<App />)