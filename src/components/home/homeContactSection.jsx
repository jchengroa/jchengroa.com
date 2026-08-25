import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { Title } from '../typography.jsx';
import { ContactCard } from '../contactCard.jsx';
import { SplitBackground } from '../splitBackground.jsx';
import { useData } from '../../context/dataContext.jsx';
import {
    contactContainerVariants,
    contactHeaderVariants,
    contactSocialsContainerVariants,
    contactSocialPillVariants,
    contactCardContainerVariants,
    contactSocialPillHover,
    contactSocialPillTap,
    inlineFooterVariants,
} from '../../animations/home.js';

export default function HomeContactSection() {
    const { siteContent, changelogs } = useData();
    const { title, subtitle, cardInfo, socials } = siteContent.contact || {};
    const { footer } = siteContent;

    const socialLinks = [
        {
            label: "Facebook",
            href: socials?.facebook,
            Icon: FaFacebookF,
            className: "hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600"
        },
        {
            label: "Github",
            href: socials?.github,
            Icon: FaGithub,
            className: "hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-black"
        },
        {
            label: "LinkedIn",
            href: socials?.linkedin,
            Icon: FaLinkedinIn,
            className: "hover:bg-blue-700 hover:text-white dark:hover:bg-blue-600"
        }
    ].filter(item => Boolean(item.href));

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
        <section
            id="contact"
            className="snap-start shrink-0 min-h-dvh md:h-dvh w-full flex flex-col justify-between items-center pt-16 pb-28 md:py-10 px-6 relative overflow-y-auto no-scrollbar md:overflow-hidden border-none rounded-none bg-blue-50/50 dark:bg-blue-950/20 text-gray-900 dark:text-white isolate transition-colors duration-300"
        >
            <SplitBackground />

            <motion.div 
                variants={contactContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="w-full flex flex-col items-center gap-6 my-auto overflow-y-auto no-scrollbar pb-2 max-w-7xl mx-auto relative z-10"
            >
                <motion.div variants={contactHeaderVariants} className="relative z-10 text-center">
                    <Title
                        title={title}
                        subtitle={subtitle}
                        className="!mb-0"
                    />
                </motion.div>

                <motion.div variants={contactSocialsContainerVariants} className="relative z-10 flex flex-wrap justify-center gap-3">
                    {socialLinks.map(({ label, href, Icon, className }) => (
                        <motion.a
                            key={label}
                            variants={contactSocialPillVariants}
                            whileHover={contactSocialPillHover}
                            whileTap={contactSocialPillTap}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center bg-white dark:bg-gray-950 border border-gray-150 dark:border-gray-800 text-gray-800 dark:text-gray-200 px-5 py-2.5 rounded-xl font-black text-xs shadow-sm transition-colors duration-300 ${className}`}
                        >
                            <Icon size={14} className="mr-2" />
                            {label}
                        </motion.a>
                    ))}
                </motion.div>

                <motion.div variants={contactCardContainerVariants} className="relative z-10 w-full max-w-4xl">
                    <ContactCard info={cardInfo} />
                </motion.div>
            </motion.div>

            {/* Inline Footer for Snapping Layout */}
            <motion.div 
                variants={inlineFooterVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="w-full text-center pt-2 pb-2 z-10 max-w-7xl mx-auto mt-4 relative z-10"
            >
                <p className="text-[14px] font-black text-gray-900 dark:text-white mb-1.5 tracking-tight select-none lowercase">
                    jchengroa
                </p>
                <p className="text-xs text-gray-900 dark:text-gray-100">
                    <Link to="/legal" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        <b>{footer?.legalLink || 'Legal'}</b>
                    </Link>
                </p>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1">
                    <Link to="/changelog" className="hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 group inline-flex items-center gap-1">
                        <span className="opacity-70 group-hover:opacity-100">{footer?.versionPrefix} {currentVersion}</span>
                        <span className="opacity-30">|</span>
                        <span className="opacity-70 group-hover:opacity-100">{footer?.updatedPrefix}: {lastUpdatedDate}</span>
                    </Link>
                </p>
            </motion.div>
        </section>
    );
}

export { HomeContactSection };
