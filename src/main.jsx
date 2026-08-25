import { createRoot } from 'react-dom/client'
import './index.css'

import { BrowserRouter, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import NavBar from './components/components.jsx'
import Home from './pages/home.jsx'
import Projects from './pages/projects.jsx'
import WorkDetail from './pages/workDetail.jsx'
import Legal from './pages/legal.jsx'
import Research from './pages/research.jsx'
import Recognition from './pages/recognition.jsx'
import Contact from './pages/contact.jsx'

import SettingsModal from './pages/settingsModal.jsx'
import Changelog, { ChangelogPopup } from './pages/changelog.jsx'
import { DownloadManager } from './utils/downloadManager.jsx'
import { SplitBackground } from './components/splitBackground.jsx'
import CookieConsentBanner from './components/cookieConsentBanner.jsx'
import { applyCustomAccent } from './utils/colorUtils.js'
import { DataProvider, useData } from './context/dataContext.jsx'
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Analytics } from "@vercel/analytics/react"

function MainLayout() {
    const { siteContent, changelogs, loading } = useData();
    const [settingsOpen, setSettingsOpen] = useState(false);
    const location = useLocation();
    const isHome = location.pathname === "/";

    useEffect(() => {
        const defaultAccent = siteContent.default_accent_color || 'blue';
        const defaultCustomHex = siteContent.custom_accent_hex || null;
        const defaultTheme = siteContent.default_theme_mode || 'light';

        const savedAccent = localStorage.getItem('accentColor');
        const accentColor = savedAccent || defaultAccent;
        const customHex = localStorage.getItem('customAccentColor') || defaultCustomHex;

        if (accentColor === 'custom' && customHex) {
            applyCustomAccent(customHex);
            document.documentElement.setAttribute('data-custom-accent', 'true');
        } else {
            document.documentElement.setAttribute('data-accent', accentColor);
        }

        const monochrome = localStorage.getItem('jchengroa_monochrome');
        if (monochrome === 'true' || accentColor === 'monochrome' || (!savedAccent && defaultAccent === 'monochrome')) {
            document.documentElement.setAttribute('data-monochrome', 'true');
        } else {
            document.documentElement.setAttribute('data-monochrome', 'false');
        }

        const savedTheme = localStorage.getItem('themeMode');
        const themeMode = savedTheme || defaultTheme;
        let isDark = false;
        if (themeMode === 'dark') isDark = true;
        else if (themeMode === 'auto') isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (isDark) document.documentElement.classList.add("dark");
        else document.documentElement.classList.remove("dark");
    }, [siteContent]);

    useEffect(() => {
        const handler = () => setSettingsOpen(true);
        window.addEventListener('openSettings', handler);
        return () => window.removeEventListener('openSettings', handler);
    }, []);

    if (loading) {
        return (
            <div className="w-full h-screen flex items-center justify-center bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    const { footer } = siteContent;
    const latestUpdate = changelogs[changelogs.length - 1];
    const currentVersion = latestUpdate?.version || "0.0.0";
    const lastUpdatedDate = latestUpdate?.date 
        ? new Date(latestUpdate.date).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          })
        : "Unknown";

    return (
        <div className={isHome ? "w-full h-screen overflow-hidden relative" : "p-2.5 pb-28 sm:pb-12 sm:pt-28 min-h-screen relative bg-blue-50/50 dark:bg-blue-950/20 text-gray-900 dark:text-white isolate transition-colors duration-300"}>
            {!isHome && <SplitBackground />}

            <div className={isHome ? "relative w-full h-full" : "relative z-10 w-full"}>
                <div id="navbar">
                    <NavBar
                        name="jchengroa"
                    />
                </div>

                <ChangelogPopup />
                <DownloadManager />
                <SettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
                <CookieConsentBanner />

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/projects/:id" element={<WorkDetail />} />
                    <Route path="/research" element={<Research />} />
                    <Route path="/research/:id" element={<WorkDetail />} />
                    <Route path="/recognition" element={<Recognition />} />
                    <Route path="/recognition/:id" element={<WorkDetail />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/socials" element={<Navigate to="/contact" replace />} />

                    <Route path="/legal" element={<Legal />} />
                    <Route path="/changelog" element={<Changelog />} />
                </Routes>

                {!isHome && (
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
                )}
            </div>
        </div>
    );
}

function App() {
    return (
        <DataProvider>
            <BrowserRouter>
                <MainLayout />
                <SpeedInsights />
                <Analytics />
            </BrowserRouter>
        </DataProvider>
    );
}

createRoot(document.getElementById('root')).render(<App />)
