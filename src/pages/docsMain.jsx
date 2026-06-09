import { createRoot } from 'react-dom/client'
import '../index.css'

import { BrowserRouter, Routes, Route, useLocation, useNavigate, Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import Docs from './docs.jsx'
import DocDetail from '../components/docDetail.jsx'
import SettingsModal from './settingsModal.jsx'
import { siteContent } from '../data/siteContent.js'
import { applyCustomAccent } from '../utils/colorUtils.js'
import { docsList } from '../data/docs.js'
import Fuse from 'fuse.js'

function DocsHeader() {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [results, setResults] = useState([]);
    const [isFocused, setIsFocused] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const containerRef = useRef(null);
    const inputRef = useRef(null);

    const isDashboard = location.pathname === "/" || location.pathname === "/index.html";

    // Setup Fuse search
    const fuse = new Fuse(docsList, {
        keys: ['title', 'description', 'tech'],
        threshold: 0.3
    });

    useEffect(() => {
        if (searchQuery.trim() === "") {
            setResults([]);
            setSelectedIndex(-1);
        } else {
            const matches = fuse.search(searchQuery).map(r => r.item);
            setResults(matches);
            setSelectedIndex(prev => Math.min(prev, matches.length - 1));
        }
    }, [searchQuery]);

    // Handle clicks outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setIsFocused(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Listen for '/' or 'Ctrl+K' / 'Cmd+K' shortcut to focus input
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isDashboard && (((e.ctrlKey || e.metaKey) && e.key === 'k') || e.key === '/')) {
                if (document.activeElement !== inputRef.current) {
                    e.preventDefault();
                    inputRef.current?.focus();
                }
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isDashboard]);

    const handleKeyDown = (e) => {
        if (results.length === 0) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelectedIndex(prev => (prev + 1) % results.length);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelectedIndex(prev => (prev - 1 + results.length) % results.length);
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (selectedIndex >= 0 && selectedIndex < results.length) {
                navigate(`/${results[selectedIndex].id}`);
                setSearchQuery("");
                setIsFocused(false);
            }
        } else if (e.key === "Escape") {
            setIsFocused(false);
            inputRef.current?.blur();
        }
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur">
            <div className="flex h-16 items-center justify-between px-4 md:px-6 relative">
                {/* Logo */}
                <a href="/" className="flex h-12 items-center text-xl leading-none text-black dark:text-white hover:text-gray-800 dark:hover:text-gray-200 font-black tracking-tight transition shrink-0 z-10">
                    jchengroa
                </a>

                {/* Header Search Bar (Only shown when NOT on dashboard) */}
                {!isDashboard && (
                    <div ref={containerRef} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[300px] sm:max-w-lg px-2 z-50">
                        <div className="relative group">
                            {/* Input container with gradient focus border */}
                            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300 dark:from-blue-900/50 dark:via-indigo-900/50 dark:to-purple-900/50 transition-all duration-300 p-[2px] ${isFocused ? 'opacity-100 scale-[1.02] shadow-lg shadow-blue-500/10' : 'opacity-60 scale-100'}`}>
                                <div className="w-full h-full bg-blue-50/95 dark:bg-gray-900/95 rounded-[calc(1rem-2px)]"></div>
                            </div>

                            <div className="relative flex items-center">
                                <span className="absolute left-4 text-gray-500 dark:text-gray-400 pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
                                    </svg>
                                </span>
                                <input
                                    ref={inputRef}
                                    type="text"
                                    placeholder="Search docs... (Ctrl+K)"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onFocus={() => setIsFocused(true)}
                                    onKeyDown={handleKeyDown}
                                    className="relative w-full pl-12 pr-16 py-3 bg-transparent outline-none font-black text-gray-900 dark:text-gray-100 text-base placeholder:text-gray-400 dark:placeholder:text-gray-600 z-10"
                                />
                                <span className="absolute right-4 hidden sm:inline-block px-2 py-1 bg-gray-200/60 dark:bg-gray-800/60 border border-gray-300 dark:border-gray-700 rounded-lg text-[10px] font-black text-gray-400 dark:text-gray-500 pointer-events-none z-10">
                                    /
                                </span>
                            </div>
                        </div>

                        {/* Search Results Dropdown Overlay */}
                        {isFocused && results.length > 0 && (
                            <div className="absolute top-[calc(100%+8px)] left-2 right-2 bg-white/98 dark:bg-gray-950/98 backdrop-blur-2xl border-2 border-gray-150 dark:border-gray-800 rounded-[1.75rem] shadow-2xl p-2 max-h-[380px] overflow-y-auto z-[60] flex flex-col gap-1">
                                {results.map((doc, idx) => (
                                    <div
                                        key={doc.id}
                                        onClick={() => {
                                            navigate(`/${doc.id}`);
                                            setSearchQuery("");
                                            setIsFocused(false);
                                        }}
                                        onMouseEnter={() => setSelectedIndex(idx)}
                                        className={`flex items-start gap-3.5 px-5 py-4 rounded-2xl cursor-pointer transition-all ${idx === selectedIndex ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'hover:bg-gray-50 dark:hover:bg-gray-900/50 text-gray-800 dark:text-gray-200'}`}
                                    >
                                        {/* Icon */}
                                        <div className={`p-2 rounded-xl flex-shrink-0 flex items-center justify-center ${idx === selectedIndex ? 'bg-white/20 text-white' : 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400'}`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 5h10"/><path d="M6 9h10"/><path d="M6 13h6"/>
                                            </svg>
                                        </div>

                                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                                            <div className="flex items-center justify-between">
                                                <span className={`text-[9px] font-black tracking-widest uppercase ${idx === selectedIndex ? 'text-blue-200' : 'text-gray-400 dark:text-gray-500'}`}>
                                                    {doc.section.replace('-', ' ')}
                                                </span>
                                            </div>
                                            <span className="text-base font-black tracking-tight mt-0.5 truncate">{doc.title}</span>
                                            <span className={`text-xs truncate mt-0.5 font-medium opacity-85 ${idx === selectedIndex ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'}`}>
                                                {doc.description}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Right side span */}
                <Link to="/" className="text-xs font-black tracking-[0.2em] uppercase text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors hidden md:block shrink-0 z-10 cursor-pointer">
                    jchengroa documentation
                </Link>
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
