import { Link } from "react-router-dom";
import { Title, FormattedText } from "../components/components.jsx";
import { useEffect } from "react";
import { motion } from 'framer-motion';
import { LuExternalLink, LuScale } from "react-icons/lu";
import { useData } from "../context/dataContext.jsx";
import {
    legalPageVariants,
    legalSectionVariants,
    legalDocButtonHover,
    legalDocButtonTap
} from "../animations/legal.js";

const DocButton = ({ href, label }) => (
    <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={legalDocButtonHover}
        whileTap={legalDocButtonTap}
        className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-gray-50 dark:bg-gray-800 hover:bg-blue-600 dark:hover:bg-blue-600 text-gray-900 dark:text-gray-200 hover:text-white rounded-xl text-xs font-bold transition-colors duration-200 border border-gray-100 dark:border-gray-700 hover:border-blue-600 dark:hover:border-blue-600 group"
    >
        <span>{label} Docs</span>
        <LuExternalLink size={12} strokeWidth={3} className="opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
    </motion.a>
);

function Legal() {
    const { siteContent } = useData();
    const { legal } = siteContent;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <section className="relative min-h-screen pt-20 md:pt-32 pb-32 md:pb-20 px-4 md:px-6 bg-transparent flex flex-col items-center overflow-x-hidden">
            <div className="max-w-6xl w-full z-10">
                <motion.div
                    variants={legalPageVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <div className="mb-8 lg:mb-12 text-left">
                        <Title
                            title={legal?.title || "Legal & Policies"}
                            subtitle={legal?.subtitle || "Architecture credits, open source licensing, and terms of use for jchengroa.com"}
                            icon={LuScale}
                            align="left"
                            className="!mb-0"
                        />
                    </div>

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
                                        <p className="text-gray-900 dark:text-white font-bold mb-1">{legal.libraries.axios.title}</p>
                                        {legal.libraries.axios.content}
                                        <div className="flex flex-wrap gap-2">
                                            <DocButton href="https://axios-http.com/" label="Axios" />
                                        </div>
                                    </li>
                                    <li>
                                        <p className="text-gray-900 dark:text-white font-bold mb-1">{legal.libraries.reactIcons.title}</p>
                                        {legal.libraries.reactIcons.content}
                                        <div className="flex flex-wrap gap-2">
                                            <DocButton href="https://react-icons.github.io/react-icons/" label="React Icons" />
                                        </div>
                                    </li>
                                    <li>
                                        <p className="text-gray-900 dark:text-white font-bold mb-1">{legal.libraries.viewSwitcher.title}</p>
                                        {legal.libraries.viewSwitcher.content}
                                    </li>
                                    <li>
                                        <p className="text-gray-900 dark:text-white font-bold mb-1">{legal.libraries.quickNav.title}</p>
                                        {legal.libraries.quickNav.content}
                                    </li>
                                    <li>
                                        <p className="text-gray-900 dark:text-white font-bold mb-1">{legal.libraries.reactColorful.title}</p>
                                        {legal.libraries.reactColorful.content}
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
        </section>
    );
}

export default Legal;
