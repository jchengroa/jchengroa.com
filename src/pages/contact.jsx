import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Title, ContactCard } from "../components/components.jsx";
import { FaFacebook, FaReddit, FaXTwitter, FaLinkedin, FaGithub, FaYoutube, FaInstagram, FaDiscord, FaEnvelope, FaGlobe } from 'react-icons/fa6';
import { useData } from "../context/DataContext.jsx";

const iconMap = {
    facebook: <FaFacebook className="w-8 h-8 transition-transform duration-300 group-hover:scale-110" />,
    reddit: <FaReddit className="w-8 h-8 transition-transform duration-300 group-hover:scale-110" />,
    twitter: <FaXTwitter className="w-8 h-8 transition-transform duration-300 group-hover:scale-110" />,
    x: <FaXTwitter className="w-8 h-8 transition-transform duration-300 group-hover:scale-110" />,
    linkedin: <FaLinkedin className="w-8 h-8 transition-transform duration-300 group-hover:scale-110" />,
    github: <FaGithub className="w-8 h-8 transition-transform duration-300 group-hover:scale-110" />,
    youtube: <FaYoutube className="w-8 h-8 transition-transform duration-300 group-hover:scale-110" />,
    instagram: <FaInstagram className="w-8 h-8 transition-transform duration-300 group-hover:scale-110" />,
    discord: <FaDiscord className="w-8 h-8 transition-transform duration-300 group-hover:scale-110" />,
    mail: <FaEnvelope className="w-8 h-8 transition-transform duration-300 group-hover:scale-110" />,
    email: <FaEnvelope className="w-8 h-8 transition-transform duration-300 group-hover:scale-110" />
};

const defaultIcon = <FaGlobe className="w-8 h-8 transition-transform duration-300 group-hover:scale-110" />;

const hoverColorMap = {
    facebook: "group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:border-blue-600/30 dark:group-hover:border-blue-500/30",
    reddit: "group-hover:text-orange-500 dark:group-hover:text-orange-400 group-hover:border-orange-500/30 dark:group-hover:border-orange-400/30",
    twitter: "group-hover:text-gray-900 dark:group-hover:text-white group-hover:border-gray-900/30 dark:group-hover:border-gray-400/30",
    x: "group-hover:text-gray-900 dark:group-hover:text-white group-hover:border-gray-900/30 dark:group-hover:border-gray-400/30",
    linkedin: "group-hover:text-blue-700 dark:group-hover:text-blue-400 group-hover:border-blue-700/30 dark:group-hover:border-blue-500/30",
    github: "group-hover:text-gray-900 dark:group-hover:text-gray-100 group-hover:border-gray-900/30 dark:group-hover:border-gray-600/30",
    youtube: "group-hover:text-red-600 dark:group-hover:text-red-400 group-hover:border-red-600/30",
    instagram: "group-hover:text-pink-600 dark:group-hover:text-pink-400 group-hover:border-pink-600/30",
    discord: "group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:border-indigo-600/30"
};

const gradientGlowMap = {
    facebook: "from-blue-600 to-indigo-600",
    reddit: "from-orange-500 to-red-500",
    twitter: "from-gray-700 to-gray-950 dark:from-gray-600 dark:to-gray-400",
    x: "from-gray-700 to-gray-950 dark:from-gray-600 dark:to-gray-400",
    linkedin: "from-blue-700 to-blue-500",
    github: "from-gray-800 to-black dark:from-gray-700 dark:to-gray-500",
    youtube: "from-red-600 to-red-800",
    instagram: "from-pink-500 to-purple-600",
    discord: "from-indigo-600 to-blue-600"
};

// Map items to categories if category is missing or custom
function getItemCategory(item) {
    if (item.category) {
        const cat = item.category.toLowerCase().trim();
        if (["professional", "socials", "personal"].includes(cat)) return cat;
    }
    const id = (item.id || "").toLowerCase();
    if (["linkedin", "github"].includes(id)) return "professional";
    if (["facebook", "twitter", "x", "instagram", "threads"].includes(id)) return "socials";
    return "personal";
}

export function Contact() {
    const { contacts, socials, siteContent } = useData();
    const contactList = (contacts && contacts.length > 0) ? contacts : (socials || []);
    const pageContent = siteContent.contact || siteContent.socials || {
        title: "Get In Touch",
        subtitle: "Have a question or want to work together? Send a direct message or connect via any platform below."
    };

    // Categorize items into grouped sections
    const groupedSections = useMemo(() => {
        const groups = {
            professional: { title: "Professional", items: [] },
            socials: { title: "Socials", items: [] },
            personal: { title: "Personal", items: [] }
        };

        contactList.forEach(item => {
            const cat = getItemCategory(item);
            if (groups[cat]) {
                groups[cat].items.push(item);
            } else {
                groups.personal.items.push(item);
            }
        });

        return Object.values(groups).filter(group => group.items.length > 0);
    }, [contactList]);

    return (
        <section
            id="contact"
            className="relative min-h-screen pt-32 pb-20 px-6 flex flex-col items-center overflow-x-hidden bg-transparent"
        >
            <div className="max-w-6xl w-full z-10 space-y-16">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.8, ease: "easeOut" }} 
                    className="relative text-center w-full"
                >
                    <Title
                        title={pageContent.title || "Get In Touch"}
                        subtitle={pageContent.subtitle || "Have a question or want to work together? Reach out directly or connect through any of these platforms."}
                    />
                </motion.div>

                {/* Direct Message Form Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="w-full"
                >
                    <ContactCard info="Fill out the form below to send a message directly to my inbox." />
                </motion.div>

                {/* Grouped Contact Sections */}
                {groupedSections.length > 0 ? (
                    groupedSections.map((section) => (
                        <div key={section.title} className="space-y-6">
                            <div className="flex items-center gap-4">
                                <h3 className="text-xs font-black tracking-[0.2em] uppercase text-gray-400 dark:text-gray-500">
                                    {section.title}
                                </h3>
                                <div className="h-px bg-gray-200 dark:bg-gray-800 flex-1"></div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {section.items.map((item, index) => {
                                    const iconKey = (item.id || "").toLowerCase();
                                    const renderedIcon = iconMap[iconKey] || defaultIcon;
                                    const hoverClass = hoverColorMap[iconKey] || "group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:border-blue-600/30";
                                    const glowClass = gradientGlowMap[iconKey] || "from-blue-600 to-indigo-600";

                                    return (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: index * 0.08 }}
                                            className="h-full"
                                        >
                                            <a
                                                href={item.linkUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="block group h-full"
                                            >
                                                <div className={`bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-2xl transition-all duration-500 h-full flex flex-col justify-between overflow-hidden relative ${hoverClass}`}>
                                                    {/* Subtle Gradient Glow on Hover */}
                                                    <div className={`absolute -inset-1 bg-gradient-to-r ${glowClass} rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 transition duration-500`}></div>

                                                    <div className="relative z-10 flex-grow">
                                                        <div className="flex items-center justify-between mb-6">
                                                            <div className="text-gray-400 dark:text-gray-500 group-hover:text-inherit transition-colors duration-300">
                                                                {renderedIcon}
                                                            </div>
                                                            <span className="text-[10px] font-black tracking-[0.2em] text-gray-400 dark:text-gray-500 uppercase px-3 py-1 bg-gray-50 dark:bg-gray-800 rounded-full border border-gray-100 dark:border-gray-700">
                                                                {item.username || section.title}
                                                            </span>
                                                        </div>

                                                        <h4 className="text-2xl font-black text-gray-900 dark:text-white mb-3 tracking-tight">
                                                            {item.title}
                                                        </h4>

                                                        <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm font-medium leading-relaxed mb-6 opacity-80 group-hover:opacity-100 transition-opacity">
                                                            {item.description}
                                                        </p>
                                                    </div>

                                                    <div className="relative z-10 flex items-center font-black text-xs sm:text-sm group-hover:translate-x-2 transition-transform duration-300 mt-auto text-blue-600 dark:text-blue-400 group-hover:text-inherit">
                                                        <span>Visit Profile</span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="ml-1.5"><path d="m9 18 6-6-6-6" /></svg>
                                                    </div>
                                                </div>
                                            </a>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="p-12 text-center text-gray-400 dark:text-gray-600 font-bold text-sm">
                        No contact links found matching your filters.
                    </div>
                )}
            </div>
        </section>
    );
}

export default Contact;
