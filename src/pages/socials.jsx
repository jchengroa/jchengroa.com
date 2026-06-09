import { motion } from 'framer-motion';
import { Title } from "../components/components.jsx";
import { socialsList, socialsPageContent } from "../data/socialsList";
import { FaFacebook, FaReddit, FaXTwitter, FaLinkedin, FaGithub } from 'react-icons/fa6';

const iconMap = {
    facebook: <FaFacebook className="w-8 h-8 transition-transform duration-300 group-hover:scale-110" />,
    reddit: <FaReddit className="w-8 h-8 transition-transform duration-300 group-hover:scale-110" />,
    twitter: <FaXTwitter className="w-8 h-8 transition-transform duration-300 group-hover:scale-110" />,
    linkedin: <FaLinkedin className="w-8 h-8 transition-transform duration-300 group-hover:scale-110" />,
    github: <FaGithub className="w-8 h-8 transition-transform duration-300 group-hover:scale-110" />
};

const hoverColorMap = {
    facebook: "group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:border-blue-600/30 dark:group-hover:border-blue-500/30",
    reddit: "group-hover:text-orange-500 dark:group-hover:text-orange-400 group-hover:border-orange-500/30 dark:group-hover:border-orange-400/30",
    twitter: "group-hover:text-gray-900 dark:group-hover:text-white group-hover:border-gray-900/30 dark:group-hover:border-gray-400/30",
    linkedin: "group-hover:text-blue-700 dark:group-hover:text-blue-400 group-hover:border-blue-700/30 dark:group-hover:border-blue-500/30",
    github: "group-hover:text-gray-900 dark:group-hover:text-gray-100 group-hover:border-gray-900/30 dark:group-hover:border-gray-600/30"
};

const gradientGlowMap = {
    facebook: "from-blue-600 to-indigo-600",
    reddit: "from-orange-500 to-red-500",
    twitter: "from-gray-700 to-gray-950 dark:from-gray-600 dark:to-gray-400",
    linkedin: "from-blue-700 to-blue-500",
    github: "from-gray-800 to-black dark:from-gray-700 dark:to-gray-500"
};

function Socials() {
    return (
        <section
            id="socials"
            className="relative min-h-screen pt-32 pb-20 px-6 flex flex-col items-center overflow-hidden bg-gray-50/50 dark:bg-gray-950"
        >
            {/* Background Decorative Element */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none opacity-20 dark:opacity-10">
                <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-200 dark:bg-purple-900 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-700"></div>
            </div>

            <div className="max-w-6xl w-full z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.8, ease: "easeOut" }} 
                    className="relative text-center w-full mb-16"
                >
                    <Title
                        title={socialsPageContent.title}
                        subtitle={socialsPageContent.subtitle}
                    />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {socialsList.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="h-full"
                        >
                            <a
                                href={item.linkUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block group h-full"
                            >
                                <div className={`bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-3xl transition-all duration-500 h-full flex flex-col justify-between overflow-hidden relative ${hoverColorMap[item.id] || "group-hover:text-blue-600 group-hover:border-blue-600/30"}`}>
                                    {/* Subtle Gradient Glow on Hover */}
                                    <div className={`absolute -inset-1 bg-gradient-to-r ${gradientGlowMap[item.id] || "from-blue-600 to-indigo-600"} rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 transition duration-500`}></div>

                                    <div className="relative z-10 flex-grow">
                                        <div className="flex items-center justify-between mb-6">
                                            <div className="text-gray-400 dark:text-gray-500 group-hover:text-inherit transition-colors duration-300">
                                                {iconMap[item.id] || null}
                                            </div>
                                            <span className="text-xs font-black tracking-[0.2em] text-gray-400 dark:text-gray-600 uppercase">
                                                {item.username}
                                            </span>
                                        </div>

                                        <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
                                            {item.title}
                                        </h2>

                                        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-relaxed mb-6 opacity-80 group-hover:opacity-100 transition-opacity">
                                            {item.description}
                                        </p>
                                    </div>

                                    <div className="relative z-10 flex items-center font-black text-sm group-hover:translate-x-2 transition-transform duration-300 mt-auto text-blue-600 dark:text-blue-400 group-hover:text-inherit">
                                        Visit Profile
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="ml-1.5"><path d="m9 18 6-6-6-6" /></svg>
                                    </div>
                                </div>
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Socials;
