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
import Changelog, { ChangelogPopup } from './components/Changelog.jsx'
import { changelogData } from './data/changelog.js'

function App() {
    const latestUpdate = changelogData[changelogData.length - 1];
    const currentVersion = latestUpdate?.version || "0.0.0";
    const lastUpdatedDate = latestUpdate?.date 
        ? new Date(latestUpdate.date).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          })
        : "Unknown";

    return (
        <BrowserRouter>
            <div className="p-2.5">
                <div id="navbar">
                    <NavBar
                        name="jchengroa"
                    />
                </div>

                <ChangelogPopup />

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/research" element={<Research />} />
                    <Route path="/project/:id" element={<WorkDetail />} />
                    <Route path="/legal" element={<Legal />} />
                    <Route path="/changelog" element={<Changelog />} />
                </Routes>

                <div id="footer" className="p-5 text-center mt-12">
                    <p className="text-sm">
                        <Link to="/legal" className="hover:text-blue-600 transition-colors">
                            <b>Domain & Legal Information</b>
                        </Link>
                    </p>
                    <p className="text-gray-500 text-sm">Version {currentVersion} | Last Updated: {lastUpdatedDate}</p>
                </div>
            </div>
        </BrowserRouter>
    );
}

createRoot(document.getElementById('root')).render(<App />)