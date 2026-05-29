import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import HamburgerMenu from "../utils/HamburgerMenu.jsx";
import { siteContent } from "../data/site_content";

function NavBar() {
    const { navbar } = siteContent;
    const [outlineOpen, setOutlineOpen] = useState(false);

    useEffect(() => {
        const handler = (e) => setOutlineOpen(e.detail);
        window.addEventListener('documentOutlineToggle', handler);
        return () => window.removeEventListener('documentOutlineToggle', handler);
    }, []);

    const iconMap = {
        projects: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M2 17V5c0-1.1.9-2 2-2h4l2 2h10c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2Z" /><path d="M2 9h20" /></svg>,
        research: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>,
        recognition: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" /></svg>,
        docs: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg>,
        tools: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
    };

    return (
        <>
            <div className={`fixed top-0 left-0 w-full transition-all duration-300 ${outlineOpen ? 'z-[40]' : 'z-50'}`}>
                <div className="mx-auto mt-4 px-4 max-w-7xl">
                    <div className="flex items-center justify-between rounded-2xl border border-white/20 bg-white/80 px-5 py-4 shadow-lg backdrop-blur-lg dark:border-white/10 dark:bg-gray-900/80 sm:px-6">
                        <div className="flex items-center gap-8">
                            <Link to="/" className="flex h-12 items-center text-xl leading-none text-black dark:text-white hover:text-gray-800 dark:hover:text-gray-200 font-black tracking-tight transition shrink-0" onClick={() => {
                                setTimeout(() => {
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }, 100);
                            }}>{navbar.name}</Link>

                            {/* Desktop Navigation Links */}
                            <nav className="hidden xl:flex items-center gap-1 border-l border-gray-100 dark:border-gray-800 pl-8 ml-2">
                                {navbar.links.filter(l => l.showInNavbar).map((link) => (
                                    link.active ? (
                                        <Link
                                            key={link.label}
                                            to={link.to}
                                            className="flex items-center px-4 py-2 rounded-xl text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all font-bold text-sm group"
                                        >
                                            <span className="opacity-50 group-hover:opacity-100 transition-opacity">
                                                {iconMap[link.icon]}
                                            </span>
                                            {link.label}
                                        </Link>
                                    ) : (
                                        <div
                                            key={link.label}
                                            className="flex items-center px-4 py-2 rounded-xl text-gray-300 dark:text-gray-700 cursor-not-allowed font-bold text-sm select-none"
                                        >
                                            <span className="opacity-30">
                                                {iconMap[link.icon]}
                                            </span>
                                            {link.label}
                                        </div>
                                    )
                                ))}
                            </nav>
                        </div>

                        <HamburgerMenu />
                    </div>
                </div>
            </div>
        </>
    );
}

export { NavBar };
export default NavBar;
