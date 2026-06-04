import { createRoot } from 'react-dom/client'
import './index.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Docs from './pages/docs.jsx'
import DocDetail from './components/docDetail.jsx'
import SettingsModal from './pages/settingsModal.jsx'
import { siteContent } from './data/siteContent.js'
import { applyCustomAccent } from './utils/colorUtils.js'

function DocsHeader() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur">
            <div className="flex h-16 items-center px-4 md:px-6">
                <a href="/" className="flex h-12 items-center text-xl leading-none text-black dark:text-white hover:text-gray-800 dark:hover:text-gray-200 font-black tracking-tight transition shrink-0">
                    jchengroa
                </a>
                <div className="flex-1" />
                <span className="text-xs font-black tracking-[0.2em] uppercase text-gray-400 dark:text-gray-500">
                    jchengroa documentation
                </span>
            </div>
        </header>
    );
}

function DocsApp() {
    const [settingsOpen, setSettingsOpen] = useState(false);

    useEffect(() => {
        const accentColor = localStorage.getItem('accentColor');
        const customHex = localStorage.getItem('customAccentColor');
        if (accentColor === 'custom' && customHex) {
            applyCustomAccent(customHex);
            document.documentElement.setAttribute('data-custom-accent', 'true');
        }
        const monochrome = localStorage.getItem('jchengroa_monochrome');
        if (monochrome === 'true') {
            document.documentElement.setAttribute('data-monochrome', 'true');
        }
    }, []);

    useEffect(() => {
        const handler = () => setSettingsOpen(true);
        window.addEventListener('openSettings', handler);
        return () => window.removeEventListener('openSettings', handler);
    }, []);

    return (
        <BrowserRouter basename="/docs">
            <div className="flex flex-col min-h-screen bg-gray-50/50 dark:bg-gray-950">
                <DocsHeader />
                <SettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />

                <div className="flex-1 w-full flex">
                    {/* The DocsOutline component from docs.jsx / docDetail.jsx handles the sidebar */}
                    <main className="flex-1 min-w-0 flex">
                        <Routes>
                            <Route path="/" element={<Docs />} />
                            <Route path="/index.html" element={<Docs />} />
                            <Route path="/:id" element={<DocDetail />} />
                        </Routes>
                    </main>
                </div>
            </div>
        </BrowserRouter>
    );
}

createRoot(document.getElementById('root')).render(<DocsApp />)
