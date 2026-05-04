import { Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from 'framer-motion';

const DocButton = ({ href, label }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-gray-50 hover:bg-blue-600 text-gray-900 hover:text-white rounded-xl text-xs font-bold transition-all duration-300 border border-gray-100 hover:border-blue-600 group"
    >
        <span>{label} Docs</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
            <path d="M7 7h10v10" /><path d="M7 17 17 7" />
        </svg>
    </a>
);

function Legal() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-white text-gray-900 pt-32 pb-20 px-6">
            <div className="max-w-4xl mx-auto">


                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
                    <header className="mb-20">
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-gray-900 leading-tight">
                            Domain & Legal <br /><span className="text-blue-600">Information</span>
                        </h1>
                    </header>

                    <div className="space-y-20">
                        <section>
                            <h2 className="text-xs font-black tracking-[0.2em] uppercase text-gray-400 mb-8">Domain Status</h2>
                            <div className="p-10 bg-gray-50 rounded-[2.5rem] border border-gray-100">
                                <h3 className="text-2xl font-bold mb-4 italic text-gray-900">"DOMAIN NOT FOR SALE"</h3>
                                <p className="text-xl text-gray-600 leading-relaxed font-medium">
                                    The domain <span className="text-blue-600 font-black">jchengroa.com</span> is a personal digital asset used for professional identification, portfolio hosting, and software development research. It is currently <span className="font-bold underline decoration-blue-500 underline-offset-4 text-gray-900">NOT FOR SALE</span>.
                                </p>
                                <p className="mt-6 text-gray-500 font-medium">
                                    Offers for acquisition will be ignored. This domain is intended for long-term personal use as part of my professional brand as a Computer Engineer.
                                </p>
                            </div>
                        </section>

                        <section className="grid grid-cols-1 md:grid-cols-2 gap-16">
                            <div>
                                <h2 className="text-xs font-black tracking-[0.2em] uppercase text-gray-400 mb-8">Credits</h2>
                                <ul className="space-y-8 font-medium text-gray-600">
                                    <li>
                                        <p className="text-gray-900 font-bold mb-1">Architecture & Code</p>
                                        Built using React, Vite, and Tailwind CSS. Deployed using Vercel. Built with the help of Google Antigravity & Gemini, as a vibe coding project.
                                        <div className="flex flex-wrap gap-2">
                                            <DocButton href="https://react.dev/" label="React" />
                                            <DocButton href="https://vitejs.dev/" label="Vite" />
                                            <DocButton href="https://tailwindcss.com/" label="Tailwind" />
                                            <DocButton href="https://vercel.com/" label="Vercel" />
                                        </div>
                                    </li>
                                    <li>
                                        <p className="text-gray-900 font-bold mb-1">Typography</p>
                                        Outfit & System Fonts for maximum performance and readability.
                                        <div className="flex flex-wrap gap-2">
                                            <DocButton href="https://fonts.google.com/specimen/Outfit" label="Outfit" />
                                        </div>
                                    </li>
                                    <li>
                                        <p className="text-gray-900 font-bold mb-1">Icons</p>
                                        Lucide-inspired SVG components & custom paths.
                                        <div className="flex flex-wrap gap-2">
                                            <DocButton href="https://lucide.dev/" label="Lucide" />
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-xs font-black tracking-[0.2em] uppercase text-gray-400 mb-8">Third-Party Libraries</h2>
                                <ul className="space-y-8 font-medium text-gray-600">
                                    <li>
                                        <p className="text-gray-900 font-bold mb-1">Framer Motion</p>
                                        Used for advanced UI animations, scroll-linked effects, smooth transitions, and the animated hamburger navigation menu — including the icon morph and staggered dropdown entrance via <code>motion</code> and <code>AnimatePresence</code>.
                                        <div className="flex flex-wrap gap-2">
                                            <DocButton href="https://www.framer.com/motion/" label="Framer" />
                                        </div>
                                    </li>
                                    <li>
                                        <p className="text-gray-900 font-bold mb-1">Fuse.js</p>
                                        Powers the fuzzy search engine for projects and research filtering.
                                        <div className="flex flex-wrap gap-2">
                                            <DocButton href="https://www.fusejs.io/" label="Fuse.js" />
                                        </div>
                                    </li>
                                    <li>
                                        <p className="text-gray-900 font-bold mb-1">Embla Carousel</p>
                                        Provides the lightweight, touch-enabled slider components for featured work.
                                        <div className="flex flex-wrap gap-2">
                                            <DocButton href="https://www.embla-carousel.com/" label="Embla" />
                                        </div>
                                    </li>
                                    <li>
                                        <p className="text-gray-900 font-bold mb-1">Lodash</p>
                                        Utilized for efficient data manipulation within the keyword engine.
                                        <div className="flex flex-wrap gap-2">
                                            <DocButton href="https://lodash.com/" label="Lodash" />
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </section>

                        <section className="grid grid-cols-1 md:grid-cols-2 gap-16">
                            <div>
                                <h2 className="text-xs font-black tracking-[0.2em] uppercase text-gray-400 mb-8">Privacy & Disclaimer</h2>
                                <ul className="space-y-8 font-medium text-gray-600">
                                    <li>
                                        <p className="text-gray-900 font-bold mb-1">Privacy Policy</p>
                                        This site does not use cookies for tracking. We use Vercel Analytics for anonymous traffic data to improve the user experience.
                                        <div className="flex flex-wrap gap-2">
                                            <DocButton href="https://vercel.com/docs/analytics/privacy-policy" label="Vercel" />
                                        </div>
                                    </li>
                                    <li>
                                        <p className="text-gray-900 font-bold mb-1">Content Disclaimer</p>
                                        All project data and visuals are for demonstration purposes and represent original work or credited collaborations.
                                    </li>
                                </ul>
                            </div>
                        </section>


                        <div className="pt-10 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
                            <p className="text-gray-400 font-bold text-sm uppercase tracking-widest italic">Est. April 25, 2026</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default Legal;

