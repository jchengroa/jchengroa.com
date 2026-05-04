import { Link } from "react-router-dom";
import { Title, FormattedText } from "./components.jsx";
import { useEffect } from "react";
import { motion } from 'framer-motion';
import { siteContent } from "../data/site_content";

const DocButton = ({ href, label }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-gray-50 dark:bg-gray-800 hover:bg-blue-600 dark:hover:bg-blue-600 text-gray-900 dark:text-gray-200 hover:text-white rounded-xl text-xs font-bold transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-blue-600 dark:hover:border-blue-600 group"
    >
        <span>{label} Docs</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
            <path d="M7 7h10v10" /><path d="M7 17 17 7" />
        </svg>
    </a>
);

function Legal() {
    const { legal } = siteContent;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 pt-32 pb-20 px-6">
            <div className="max-w-4xl mx-auto">


                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
                    <Title 
                        title={legal.title}
                        className="!text-left"
                    />

                    <div className="space-y-20">
                        <section>
                            <h2 className="text-xs font-black tracking-[0.2em] uppercase text-gray-400 dark:text-gray-500 mb-8">{legal.domainStatus.title}</h2>
                            <div className="p-10 bg-gray-50 dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800">
                                <h3 className="text-2xl font-bold mb-4 italic text-gray-900 dark:text-white">{legal.domainStatus.heading}</h3>
                                <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                                    <FormattedText text={legal.domainStatus.content} />
                                </p>
                                <p className="mt-6 text-gray-500 dark:text-gray-500 font-medium">
                                    {legal.domainStatus.subtext}
                                </p>
                            </div>
                        </section>

                        <section className="grid grid-cols-1 md:grid-cols-2 gap-16">
                            <div>
                                <h2 className="text-xs font-black tracking-[0.2em] uppercase text-gray-400 dark:text-gray-500 mb-8">Credits</h2>
                                <ul className="space-y-8 font-medium text-gray-600 dark:text-gray-400">
                                    <li>
                                        <p className="text-gray-900 dark:text-white font-bold mb-1">{legal.credits.architecture.title}</p>
                                        {legal.credits.architecture.content}
                                        <div className="flex flex-wrap gap-2">
                                            <DocButton href="https://react.dev/" label="React" />
                                            <DocButton href="https://vitejs.dev/" label="Vite" />
                                            <DocButton href="https://tailwindcss.com/" label="Tailwind" />
                                            <DocButton href="https://vercel.com/" label="Vercel" />
                                        </div>
                                    </li>
                                    <li>
                                        <p className="text-gray-900 dark:text-white font-bold mb-1">{legal.credits.typography.title}</p>
                                        {legal.credits.typography.content}
                                        <div className="flex flex-wrap gap-2">
                                            <DocButton href="https://fonts.google.com/specimen/Outfit" label="Outfit" />
                                        </div>
                                    </li>
                                    <li>
                                        <p className="text-gray-900 dark:text-white font-bold mb-1">{legal.credits.icons.title}</p>
                                        {legal.credits.icons.content}
                                        <div className="flex flex-wrap gap-2">
                                            <DocButton href="https://lucide.dev/" label="Lucide" />
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-xs font-black tracking-[0.2em] uppercase text-gray-400 dark:text-gray-500 mb-8">Third-Party Libraries</h2>
                                <ul className="space-y-8 font-medium text-gray-600 dark:text-gray-400">
                                    <li>
                                        <p className="text-gray-900 dark:text-white font-bold mb-1">{legal.libraries.framer.title}</p>
                                        {legal.libraries.framer.content}
                                        <div className="flex flex-wrap gap-2">
                                            <DocButton href="https://www.framer.com/motion/" label="Framer" />
                                        </div>
                                    </li>
                                    <li>
                                        <p className="text-gray-900 dark:text-white font-bold mb-1">{legal.libraries.fuse.title}</p>
                                        {legal.libraries.fuse.content}
                                        <div className="flex flex-wrap gap-2">
                                            <DocButton href="https://www.fusejs.io/" label="Fuse.js" />
                                        </div>
                                    </li>
                                    <li>
                                        <p className="text-gray-900 dark:text-white font-bold mb-1">{legal.libraries.embla.title}</p>
                                        {legal.libraries.embla.content}
                                        <div className="flex flex-wrap gap-2">
                                            <DocButton href="https://www.embla-carousel.com/" label="Embla" />
                                        </div>
                                    </li>
                                    <li>
                                        <p className="text-gray-900 dark:text-white font-bold mb-1">{legal.libraries.lodash.title}</p>
                                        {legal.libraries.lodash.content}
                                        <div className="flex flex-wrap gap-2">
                                            <DocButton href="https://lodash.com/" label="Lodash" />
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </section>

                        <section className="grid grid-cols-1 md:grid-cols-2 gap-16">
                            <div>
                                <h2 className="text-xs font-black tracking-[0.2em] uppercase text-gray-400 dark:text-gray-500 mb-8">Privacy & Disclaimer</h2>
                                <ul className="space-y-8 font-medium text-gray-600 dark:text-gray-400">
                                    <li>
                                        <p className="text-gray-900 dark:text-white font-bold mb-1">{legal.privacy.policy.title}</p>
                                        {legal.privacy.policy.content}
                                        <div className="flex flex-wrap gap-2">
                                            <DocButton href="https://vercel.com/docs/analytics/privacy-policy" label="Vercel" />
                                        </div>
                                    </li>
                                    <li>
                                        <p className="text-gray-900 dark:text-white font-bold mb-1">{legal.privacy.disclaimer.title}</p>
                                        {legal.privacy.disclaimer.content}
                                    </li>
                                </ul>
                            </div>
                        </section>


                        <div className="pt-10 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
                            <p className="text-gray-400 dark:text-gray-500 font-bold text-sm uppercase tracking-widest italic">{legal.domainStatus.established}</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default Legal;

