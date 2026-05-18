import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { keywordsData } from "../data/keywords";
import { shortenKeyword } from "../utils/keywordEngine";
import HamburgerMenu from "../utils/HamburgerMenu.jsx";
import { siteContent } from "../data/site_content";

/* Objects */

function WorkCard(props) {
    const { common } = siteContent;
    const linkTo = props.linkTo || `/project/${props.id}`;
    return (
        <Link to={linkTo} className="block group h-full">
            <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-10 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-3xl transition-all duration-500 h-full flex flex-col justify-between overflow-hidden relative">
                {/* Subtle Gradient Glow on Hover */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 transition duration-500"></div>

                <div className="relative z-10 flex-grow">
                    {props.image && (
                        <div className="mb-8 rounded-2xl overflow-hidden aspect-[16/10] bg-gray-50 border border-gray-100 group-hover:shadow-lg transition-all duration-500">
                            <img 
                                src={props.image} 
                                alt={props.title} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    )}

                    <span className="text-xs font-black tracking-[0.2em] text-blue-600 uppercase mb-4 block">
                        {props.info}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 tracking-tighter leading-tight">
                        <span className="bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-gray-900 dark:group-hover:from-white group-hover:via-blue-800 dark:group-hover:via-blue-400 group-hover:to-indigo-900 dark:group-hover:to-blue-600 transition-all duration-500">
                            {props.title}
                        </span>
                    </h2>
                    <p className="text-gray-500 text-lg font-medium leading-relaxed mb-8 opacity-80 group-hover:opacity-100 transition-opacity">
                        <FormattedText text={props.summary || props.description} />
                    </p>

                    {props.stack && (
                        <div className="flex flex-wrap gap-2 mb-8">
                            {props.stack.map((tech, index) => (
                                <span key={index} className="px-4 py-1.5 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-xl text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    {shortenKeyword(tech)}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                <div className="relative z-10 flex items-center text-blue-600 font-black text-lg group-hover:translate-x-2 transition-transform duration-300">
                    {common.learnMore}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="ml-2"><path d="m9 18 6-6-6-6" /></svg>
                </div>
            </div>
        </Link>
    );
}

function RecognitionCard(props) {
    const { facebookUrl, title, info, description, tech, id } = props;
    const { common } = siteContent;
    const encodedUrl = encodeURIComponent(facebookUrl);
    const iframeSrc = `https://www.facebook.com/plugins/post.php?href=${encodedUrl}&show_text=true&width=auto`;

    return (
        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-3xl transition-all duration-500 h-full flex flex-col overflow-hidden relative group">
            {/* Subtle Gradient Glow on Hover */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 transition duration-500"></div>

            <div className="relative z-10 flex-grow flex flex-col">
                <div className="mb-6">
                    <span className="text-xs font-black tracking-[0.2em] text-blue-600 uppercase mb-3 block">
                        {info}
                    </span>
                    <Link to={`/project/${id}`} className="block group/link">
                        <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4 tracking-tighter leading-tight group-hover/link:text-blue-600 dark:group-hover/link:text-blue-400 transition-colors duration-300">
                            {title}
                        </h2>
                    </Link>
                    <p className="text-gray-500 text-base font-medium leading-relaxed mb-6 opacity-80">
                        <FormattedText text={description} />
                    </p>
                    
                    {tech && (
                        <div className="flex flex-wrap gap-2 mb-6">
                            {tech.map((t, index) => (
                                <span key={index} className="px-3 py-1 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-lg text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    {shortenKeyword(t)}
                                </span>
                            ))}
                        </div>
                    )}

                    <div className="mb-2">
                        <Link to={`/project/${id}`} className="inline-flex items-center text-blue-600 font-black text-lg hover:translate-x-2 transition-transform duration-300">
                            {common.learnMore}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="ml-2"><path d="m9 18 6-6-6-6" /></svg>
                        </Link>
                    </div>
                </div>

                {/* Facebook Embed Container */}
                <div className="mt-auto rounded-2xl overflow-hidden bg-gray-50 dark:bg-gray-800/30 border border-gray-100 dark:border-gray-700 flex items-center justify-center min-h-[400px]">
                    <iframe 
                        src={iframeSrc} 
                        width="100%" 
                        height="500" 
                        style={{ border: 'none', overflow: 'hidden' }} 
                        scrolling="no" 
                        frameBorder="0" 
                        allowFullScreen={true} 
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                        title={title}
                        className="max-w-full"
                    ></iframe>
                </div>
            </div>
        </div>
    );
}

function ContactCard(props) {
    const { common, home } = siteContent;
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSend = () => {
        const { name, email, message } = formData;
        const recipient = home.hero.email;
        const subject = encodeURIComponent(`Portfolio Message from ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
        
        window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
    };

    return (
        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-12 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col gap-8 h-full w-full max-w-4xl mx-auto relative overflow-hidden group">
            {/* Subtle Gradient Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-[0.03] transition duration-500 pointer-events-none"></div>

            <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">Send a Message</h2>
                <p className="text-gray-500 dark:text-gray-400 font-medium text-lg mb-4">{props.info}</p>
            </div>

            <div className="relative z-10 flex-grow space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        className="w-full p-5 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/20 focus:bg-white dark:focus:bg-gray-900 focus:border-blue-600 outline-none transition-all font-medium text-gray-700 dark:text-gray-200"
                    />
                    <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your Email"
                        className="w-full p-5 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/20 focus:bg-white dark:focus:bg-gray-900 focus:border-blue-600 outline-none transition-all font-medium text-gray-700 dark:text-gray-200"
                    />
                </div>
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full p-5 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/20 focus:bg-white dark:focus:bg-gray-900 focus:border-blue-600 outline-none transition-all resize-none text-gray-700 dark:text-gray-200 font-medium"
                    rows="6"
                    placeholder="Tell me about your project..."
                ></textarea>
            </div>

            <div className="relative z-10 flex justify-end">
                <button
                    onClick={handleSend}
                    className="group flex items-center bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-10 py-4 rounded-2xl font-black text-lg hover:bg-black dark:hover:bg-gray-100 hover:scale-105 hover:shadow-2xl dark:hover:shadow-none transition-all duration-300"
                >
                    {common.sendMessage}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="ml-2 group-hover:translate-x-1 transition-transform"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg>
                </button>
            </div>
        </div>
    );
}

function Title(props) {
    const { isVisible } = useSubheaderToggle();
    return (
        <header className={`mb-20 text-center ${props.className || ''}`}>
            {props.badge && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-block px-4 py-1.5 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30 rounded-full text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-[0.2em] mb-6"
                >
                    {props.badge}
                </motion.div>
            )}
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-6xl md:text-7xl font-black text-gray-900 dark:text-white tracking-tighter mb-8"
            >
                {props.title}
            </motion.h1>
            <AnimatePresence>
                {isVisible && (props.subtitle || props.description) && (
                    <motion.p 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-gray-500 text-xl font-medium max-w-2xl mx-auto leading-relaxed overflow-hidden"
                    >
                        {props.subtitle || props.description}
                    </motion.p>
                )}
            </AnimatePresence>
        </header>
    );
}

/**
 * FormattedText Component
 * Replaces **text** with <strong>text</strong> for simple markdown-style bolding.
 * Supports [[blue:text]] for blue highlighted text.
 * Supports [[status:text]] for underlined status text.
 */
function FormattedText({ text }) {
    if (!text) return null;
    
    // Split text by ** or [[tag:text]] patterns
    const parts = text.split(/(\*\*.*?\*\*|\[\[blue:.*?\]\]|\[\[status:.*?\]\])/g);
    
    return (
        <span>
            {parts.map((part, i) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={i} className="font-black text-gray-900 dark:text-white">{part.slice(2, -2)}</strong>;
                }
                if (part.startsWith('[[blue:') && part.endsWith(']]')) {
                    return <span key={i} className="text-blue-600 dark:text-blue-400 font-black">{part.slice(7, -2)}</span>;
                }
                if (part.startsWith('[[status:') && part.endsWith(']]')) {
                    return <span key={i} className="font-bold underline decoration-blue-500 underline-offset-4 text-gray-900 dark:text-white">{part.slice(9, -2)}</span>;
                }
                return part;
            })}
        </span>
    );
}

function SubTitle(props) {
    return (
        <>
            <div className="p-2 text-center">
                <h2 className="text-2xl font-bold text-black dark:text-white">{props.title}</h2>
            </div>
            {/* Spacing */}
            <div className="mx-auto rounded-full mt-5 mb-5"></div>
        </>
    );
}

function NavBar() {
    const { navbar } = siteContent;
    
    const iconMap = {
        projects: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M2 17V5c0-1.1.9-2 2-2h4l2 2h10c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2Z"/><path d="M2 9h20"/></svg>,
        research: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
        recognition: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>,
        docs: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>,
        tools: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
    };

    return (
        <>
            <div className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
                <div className="mx-auto mt-4 px-4 max-w-7xl">
                    <div className="flex items-center justify-between rounded-2xl border border-white/20 bg-white/80 px-5 py-4 shadow-lg backdrop-blur-lg dark:border-white/10 dark:bg-gray-900/80 sm:px-6">
                        <div className="flex items-center gap-8">
                            <Link to="/" className="text-xl text-black dark:text-white hover:text-gray-800 dark:hover:text-gray-200 font-black tracking-tight transition shrink-0" onClick={() => {
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

function SearchBar({ searchQuery, setSearchQuery }) {
    const { common } = siteContent;

    const handleSubmit = (e) => {
        e.preventDefault();
        // Search is already handled by onChange, but this allows "Enter" key behavior
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto mb-8 relative group z-20">
            {/* Colorful Icon */}
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none z-20">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="url(#search-gradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-focus-within:scale-110 transition-transform duration-300">
                    <defs>
                        <linearGradient id="search-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#3b82f6" className="group-focus-within:stopColor-[#2563eb]" />
                            <stop offset="100%" stopColor="#8b5cf6" className="group-focus-within:stopColor-[#7c3aed]" />
                        </linearGradient>
                    </defs>
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
                </svg>
            </div>
            
            {/* Gradient Border Wrapper */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300 dark:from-blue-900/50 dark:via-indigo-900/50 dark:to-purple-900/50 opacity-60 group-focus-within:opacity-100 group-focus-within:from-blue-500 group-focus-within:via-indigo-500 group-focus-within:to-purple-500 transition-all duration-500 p-[3px] shadow-lg group-focus-within:shadow-blue-500/25">
                <div className="w-full h-full bg-blue-50/95 dark:bg-gray-900/95 backdrop-blur-md rounded-[calc(1.5rem-3px)] group-focus-within:bg-white dark:group-focus-within:bg-gray-900 transition-colors duration-500"></div>
            </div>

            <div className="relative flex items-center">
                <input
                    type="text"
                    placeholder={common.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="relative w-full pl-16 pr-32 py-5 bg-transparent outline-none font-black text-gray-800 dark:text-gray-100 text-lg placeholder:text-indigo-300/80 dark:placeholder:text-indigo-700/50 transition-all z-10"
                />
                <button 
                    type="submit"
                    className="absolute right-4 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-bold text-sm shadow-lg hover:shadow-blue-500/30 hover:scale-105 active:scale-95 transition-all z-20"
                >
                    {common.searchButton}
                </button>
            </div>
        </form>
    );
}

function FilterList({ activeFilter, setActiveFilter, filters }) {
    if (!filters || filters.length === 0) return null;
    
    return (
        <div className="w-full max-w-3xl mx-auto mb-16 flex flex-wrap gap-3 justify-center z-10 relative">
            {filters.map(filter => (
                <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 ${activeFilter === filter ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-lg scale-105' : 'bg-white/80 dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'}`}
                >
                    {filter}
                </button>
            ))}
        </div>
    );
}

/**
 * Prompt Component
 * A modal that displays details about a specific keyword.
 */
function Prompt({ isOpen, onClose, keyword }) {
    const data = keywordsData[keyword] || {
        definition: "Definition not found for this keyword.",
        metrics: "No metrics available."
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    {/* Backdrop */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800"
                    >
                        <div className="p-8 md:p-12">
                            {/* Header */}
                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    <span className="text-[10px] font-black tracking-[0.2em] text-blue-600 uppercase mb-2 block">
                                        Keyword Detail
                                    </span>
                                    <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter">
                                        {keyword}
                                    </h2>
                                </div>
                                <button 
                                    onClick={onClose}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors group"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 dark:text-gray-600 group-hover:text-gray-900 dark:group-hover:text-white transition-colors"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                                </button>
                            </div>

                            {/* Content */}
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">Definition</h3>
                                    <p className="text-lg text-gray-600 dark:text-gray-400 font-medium leading-relaxed italic">
                                        "<FormattedText text={data.definition} />"
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">Metrics / Key Insight</h3>
                                    <div className="p-5 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-900/30">
                                        <p className="text-blue-900 dark:text-blue-200 font-bold leading-relaxed">
                                            <FormattedText text={data.metrics} />
                                        </p>
                                    </div>
                                </div>
                            </div>

                             {/* Footer */}
                             <div className="mt-12 flex justify-end">
                                 <button 
                                     onClick={onClose}
                                     className="px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-black rounded-xl hover:bg-black dark:hover:bg-gray-100 transition-all hover:scale-105"
                                 >
                                     Close
                                 </button>
                             </div>
                         </div>

                        {/* Subtle accent line */}
                        <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 to-indigo-600" />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

import { useViewSwitcher } from '../utils/viewSwitcher';

function ViewSwitcherButton({ className = "" }) {
    const { view, toggleView } = useViewSwitcher();

    return (
        <button
            onClick={toggleView}
            className={`flex items-center gap-2 px-5 py-2.5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-md transition-all text-sm font-bold text-gray-700 dark:text-gray-300 ${className}`}
            aria-label={`Switch to ${view === 'grid' ? 'list' : 'grid'} view`}
        >
            {view === 'grid' ? (
                <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
                    <span>List View</span>
                </>
            ) : (
                <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                    <span>Grid View</span>
                </>
            )}
        </button>
    );
}

function UniversalListCard(props) {
    const { id, title, info, description, tech, linkURL, linkName, facebookUrl } = props;
    const { common } = siteContent;
    const linkTo = props.linkTo || (id ? `/project/${id}` : undefined);

    return (
        <div className="bg-white dark:bg-gray-900 rounded-[1.5rem] p-6 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6 group relative overflow-hidden">
            {/* Subtle Gradient Glow on Hover */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[1.5rem] blur-xl opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 transition duration-500 pointer-events-none"></div>

            <div className="flex-grow min-w-0 relative z-10">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="text-[10px] font-black tracking-[0.2em] text-blue-600 uppercase">
                        {info}
                    </span>
                </div>

                {linkTo ? (
                    <Link to={linkTo} className="block group/link mb-2 truncate">
                        <h3 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white tracking-tight group-hover/link:text-blue-600 dark:group-hover/link:text-blue-400 transition-colors truncate">
                            {title}
                        </h3>
                    </Link>
                ) : (
                    <h3 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white tracking-tight mb-2 truncate">
                        {title}
                    </h3>
                )}

                <p className="text-gray-500 text-sm font-medium leading-relaxed mb-4 line-clamp-2 opacity-80 max-w-3xl">
                    <FormattedText text={description} />
                </p>

                {tech && tech.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                        {tech.map((t, index) => (
                            <span key={index} className="px-2.5 py-0.5 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-md text-[9px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                {shortenKeyword(t)}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            <div className="flex flex-wrap items-center gap-4 flex-shrink-0 relative z-10 pt-4 md:pt-0 border-t md:border-t-0 border-gray-100 dark:border-gray-800">
                {linkURL && (
                    <a 
                        href={linkURL} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl text-xs font-bold transition-colors border border-gray-200 dark:border-gray-700"
                    >
                        {linkName || "Visit"}
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                    </a>
                )}

                {facebookUrl && (
                    <a 
                        href={facebookUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-xl text-xs font-bold transition-colors border border-blue-200 dark:border-blue-800"
                    >
                        Facebook Post
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                    </a>
                )}

                {linkTo && (
                    <Link to={linkTo} className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 font-black text-xs hover:translate-x-1 transition-transform py-2">
                        {common.learnMore}
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                    </Link>
                )}
            </div>
        </div>
    );
}

const SUBHEADER_STORAGE_KEY = 'jchengroa_subheader_visible';

const useSubheaderToggle = () => {
    const [isVisible, setIsVisible] = useState(() => {
        return localStorage.getItem(SUBHEADER_STORAGE_KEY) !== 'false';
    });

    const toggleSubheader = () => {
        const nextState = !isVisible;
        setIsVisible(nextState);
        localStorage.setItem(SUBHEADER_STORAGE_KEY, nextState.toString());
        window.dispatchEvent(new CustomEvent('subheaderToggle', { detail: nextState }));
    };

    useEffect(() => {
        const handleToggle = (e) => {
            setIsVisible(e.detail);
        };
        window.addEventListener('subheaderToggle', handleToggle);
        return () => window.removeEventListener('subheaderToggle', handleToggle);
    }, []);

    return { isVisible, toggleSubheader };
};

function SubheaderToggleButton({ className = "" }) {
    const { isVisible, toggleSubheader } = useSubheaderToggle();

    return (
        <button
            onClick={toggleSubheader}
            className={`flex items-center gap-2 px-5 py-2.5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-md transition-all text-sm font-bold text-gray-700 dark:text-gray-300 ${className}`}
            aria-label={`${isVisible ? 'Hide' : 'Show'} subheader and highlights`}
            title={`${isVisible ? 'Hide' : 'Show'} subheader and highlights`}
        >
            {isVisible ? (
                <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-10-8-10-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 10 8 10 8a18.57 18.57 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                    <span>Hide Details</span>
                </>
            ) : (
                <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                    <span>Show Details</span>
                </>
            )}
        </button>
    );
}

function DocumentTabs({ tabs = [] }) {
    const [activeTab, setActiveTab] = useState(tabs[0]?.id || "");
    const [isDesktopOpen, setIsDesktopOpen] = useState(() => {
        return localStorage.getItem('jchengroa_doc_tabs_desktop_open') !== 'false';
    });
    // mobileSheetState: 'closed' | 'half' | 'full'
    const [mobileSheetState, setMobileSheetState] = useState('closed');
    const isScrollingRef = useRef(false);

    const toggleDesktopOpen = (nextState) => {
        setIsDesktopOpen(nextState);
        localStorage.setItem('jchengroa_doc_tabs_desktop_open', nextState.toString());
    };

    useEffect(() => {
        const handleScroll = () => {
            if (isScrollingRef.current) return;

            const headingElements = tabs.map(tab => ({
                id: tab.id,
                element: document.getElementById(tab.id)
            })).filter(item => item.element !== null);

            if (headingElements.length === 0) return;

            // Find all elements that are currently visible in the upper/middle viewport
            const visibleElements = headingElements.filter(({ element }) => {
                const rect = element.getBoundingClientRect();
                return rect.top <= window.innerHeight * 0.5 && rect.bottom > 100;
            });

            if (visibleElements.length > 0) {
                // If the current activeTab is already one of the visibleElements, keep it!
                // Otherwise, pick the first visible element (which is the main column item)
                const isCurrentVisible = visibleElements.some(item => item.id === activeTab);
                if (!isCurrentVisible) {
                    setActiveTab(visibleElements[0].id);
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [tabs, activeTab]);

    const scrollToSection = (id) => {
        isScrollingRef.current = true;
        setActiveTab(id);
        const element = document.getElementById(id);
        if (element) {
            const yOffset = -120; // Account for fixed header
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
        setMobileSheetState('closed');

        setTimeout(() => {
            isScrollingRef.current = false;
        }, 1000);
    };

    if (!tabs || tabs.length === 0) return null;

    return (
        <>
            {/* Desktop View: Floating Left Sidebar */}
            <AnimatePresence>
                {isDesktopOpen ? (
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="hidden xl:flex fixed left-6 top-28 bottom-6 z-40 w-64 bg-white/70 dark:bg-gray-900/70 backdrop-blur-2xl border border-gray-200/50 dark:border-gray-800/50 rounded-[2.5rem] p-6 shadow-2xl flex-col justify-between overflow-hidden"
                    >
                        <div>
                            <div className="flex items-center justify-between mb-8 px-1">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-2xl shadow-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 5h10"/><path d="M6 9h10"/><path d="M6 13h6"/></svg>
                                    </div>
                                    <span className="text-sm font-black tracking-widest uppercase text-gray-900 dark:text-white">Outline</span>
                                </div>
                                <button 
                                    onClick={() => toggleDesktopOpen(false)} 
                                    className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all" 
                                    title="Hide Navigation"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/><path d="m16 15-3-3 3-3"/></svg>
                                </button>
                            </div>
                            <nav className="flex flex-col gap-2 relative overflow-y-auto max-h-[calc(100vh-16rem)] pr-1">
                                {tabs.map((tab) => {
                                    const isActive = activeTab === tab.id;
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => scrollToSection(tab.id)}
                                            className={`flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-left text-xs font-bold transition-all relative group ${isActive ? 'text-blue-600 dark:text-blue-400 font-black bg-blue-50/50 dark:bg-blue-950/20 shadow-sm' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50'}`}
                                        >
                                            {isActive && (
                                                <motion.div
                                                    layoutId="desktopActiveTabIndicator"
                                                    className="absolute left-0 w-1.5 inset-y-2 bg-blue-600 dark:bg-blue-400 rounded-full"
                                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                                />
                                            )}
                                            <span className="truncate">{tab.label}</span>
                                        </button>
                                    );
                                })}
                            </nav>
                        </div>
                        <div className="pt-4 border-t border-gray-100 dark:border-gray-800/60 text-center">
                            <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Quick Nav</span>
                        </div>
                    </motion.div>
                ) : (
                    <motion.button 
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        onClick={() => toggleDesktopOpen(true)} 
                        className="hidden xl:flex fixed left-6 top-1/2 -translate-y-1/2 z-40 items-center justify-center w-14 h-14 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-full shadow-2xl border border-gray-200/50 dark:border-gray-800/50 backdrop-blur-xl hover:scale-110 active:scale-95 transition-all group" 
                        title="Show Navigation"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/><path d="m14 9 3 3-3 3"/></svg>
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Mobile View: Floating Action Button & Curved Bottom Sheet */}
            <div className="xl:hidden">
                {/* Floating Button Bottom Right */}
                <AnimatePresence>
                    {mobileSheetState === 'closed' && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            onClick={() => setMobileSheetState('half')}
                            aria-label="Open Document Navigation"
                            className="fixed right-6 bottom-6 z-50 flex items-center justify-center w-14 h-14 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 5h10"/><path d="M6 9h10"/><path d="M6 13h6"/></svg>
                        </motion.button>
                    )}
                </AnimatePresence>

                {/* Curved Bottom Sheet */}
                <AnimatePresence>
                    {mobileSheetState !== 'closed' && (
                        <>
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setMobileSheetState('closed')}
                                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[90]"
                            />

                            {/* Bottom Sheet Card */}
                            <motion.div
                                initial={{ y: "100%" }}
                                animate={{ y: 0, height: mobileSheetState === 'full' ? '90vh' : '50vh' }}
                                exit={{ y: "100%" }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="fixed inset-x-0 bottom-0 z-[100] bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl border-t border-gray-200/50 dark:border-gray-800/50 rounded-t-[2.5rem] shadow-[0_-10px_50px_rgba(0,0,0,0.2)] flex flex-col overflow-hidden"
                            >
                                {/* Handle Bar */}
                                <div 
                                    onClick={() => setMobileSheetState(mobileSheetState === 'full' ? 'half' : 'full')}
                                    className="w-full pt-4 pb-2 flex items-center justify-center cursor-pointer group"
                                >
                                    <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-700 group-hover:bg-gray-400 dark:group-hover:bg-gray-600 rounded-full transition-colors" />
                                </div>

                                {/* Sheet Header */}
                                <div className="flex items-center justify-between px-8 pb-4 border-b border-gray-100 dark:border-gray-800/60 flex-shrink-0">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-xl shadow-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 5h10"/><path d="M6 9h10"/><path d="M6 13h6"/></svg>
                                        </div>
                                        <span className="text-sm font-black tracking-widest uppercase text-gray-900 dark:text-white">Document Outline</span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button 
                                            onClick={() => setMobileSheetState(mobileSheetState === 'full' ? 'half' : 'full')} 
                                            className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all text-xs font-bold"
                                        >
                                            {mobileSheetState === 'full' ? 'Collapse' : 'Expand'}
                                        </button>
                                        <button 
                                            onClick={() => setMobileSheetState('closed')} 
                                            className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                                        </button>
                                    </div>
                                </div>

                                {/* Sheet Content */}
                                <nav className="flex-1 overflow-y-auto px-6 py-4 space-y-2">
                                    {tabs.map((tab) => {
                                        const isActive = activeTab === tab.id;
                                        return (
                                            <button
                                                key={tab.id}
                                                onClick={() => scrollToSection(tab.id)}
                                                className={`flex items-center gap-4 w-full px-5 py-4 rounded-2xl text-left text-sm font-bold transition-all relative ${isActive ? 'text-blue-600 dark:text-blue-400 font-black bg-blue-50/50 dark:bg-blue-950/20 shadow-sm' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50'}`}
                                            >
                                                {isActive && (
                                                    <motion.div
                                                        layoutId="mobileActiveTabIndicator"
                                                        className="absolute left-0 w-1.5 inset-y-2 bg-blue-600 dark:bg-blue-400 rounded-full"
                                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                                    />
                                                )}
                                                <span className="truncate">{tab.label}</span>
                                            </button>
                                        );
                                    })}
                                </nav>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
}

export { WorkCard, RecognitionCard, ContactCard, Title, SubTitle, NavBar, SearchBar, FilterList, Prompt, FormattedText, ViewSwitcherButton, UniversalListCard, useSubheaderToggle, SubheaderToggleButton, DocumentTabs }
export default NavBar
