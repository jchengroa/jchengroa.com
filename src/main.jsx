import { createRoot } from 'react-dom/client'
import './index.css'


import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import NavBar from './components/components.jsx'
import Home from './components/home.jsx'
import Projects from './components/projects.jsx'
import WorkDetail from './components/WorkDetail.jsx'
import Legal from './components/Legal.jsx'
import Research from './components/research.jsx'
import Recognition from './components/recognition.jsx'
import Tools from './components/tools.jsx'
import Docs from './components/docs.jsx'
import DocDetail from './components/DocDetail.jsx'
import SettingsModal from './components/SettingsModal.jsx'
import Changelog, { ChangelogPopup } from './components/Changelog.jsx'
import { DownloadManager } from './utils/DownloadManager.jsx'
import { changelogData } from './data/changelog.js'
import { siteContent } from './data/site_content.js'

function App() {
    const { footer } = siteContent;
    const [settingsOpen, setSettingsOpen] = useState(false);

    useEffect(() => {
        const handler = () => setSettingsOpen(true);
        window.addEventListener('openSettings', handler);
        return () => window.removeEventListener('openSettings', handler);
    }, []);

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
                <DownloadManager />
                <SettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/research" element={<Research />} />
                    <Route path="/recognition" element={<Recognition />} />
                    <Route path="/tools" element={<Tools />} />
                    <Route path="/docs" element={<Docs />} />
                    <Route path="/docs/:id" element={<DocDetail />} />
                    <Route path="/project/:id" element={<WorkDetail />} />
                    <Route path="/legal" element={<Legal />} />
                    <Route path="/changelog" element={<Changelog />} />
                </Routes>

                <div id="footer" className="p-5 text-center mt-12">
                    <p className="text-sm text-gray-900 dark:text-gray-100">
                        <Link to="/legal" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                            <b>{footer.legalLink}</b>
                        </Link>
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        <Link to="/changelog" className="hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 group inline-flex items-center gap-1.5">
                            <span className="opacity-70 group-hover:opacity-100">{footer.versionPrefix} {currentVersion}</span>
                            <span className="opacity-30">|</span>
                            <span className="opacity-70 group-hover:opacity-100">{footer.updatedPrefix}: {lastUpdatedDate}</span>
                        </Link>
                    </p>
                </div>
            </div>
        </BrowserRouter>
    );
}

createRoot(document.getElementById('root')).render(<App />)
