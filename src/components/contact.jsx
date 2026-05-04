import { Title, ContactCard } from "./components.jsx";
import { motion } from 'framer-motion';

/* Icons */
const FacebookIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);

const GitHubIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-4.51-2-7-2"/></svg>
);

const LinkedInIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

function Contact() {
    return (
        <section
            id="contact"
            className="relative min-h-screen flex flex-col justify-center items-center py-20 px-6 gap-12 overflow-hidden bg-gray-50/50"
        >
            {/* Background Decorative Element */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none opacity-20">
                <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
            </div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="relative z-10 text-center">
                <Title
                    title="Get In Touch"
                    subtitle="Have a question or want to work together? Feel free to reach out through any of these platforms."
                />
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }} className="relative z-10 flex flex-wrap justify-center gap-4">
                <a
                    href="https://www.facebook.com/@jchengroa/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center bg-white border border-gray-100 text-gray-800 px-8 py-4 rounded-2xl font-black hover:bg-blue-600 hover:text-white hover:scale-105 hover:shadow-xl transition-all duration-300"
                >
                    <FacebookIcon />
                    Facebook
                </a>
                <a
                    href="https://github.com/jchengroa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center bg-white border border-gray-100 text-gray-800 px-8 py-4 rounded-2xl font-black hover:bg-gray-900 hover:text-white hover:scale-105 hover:shadow-xl transition-all duration-300"
                >
                    <GitHubIcon />
                    Github
                </a>
                <a
                    href="https://www.linkedin.com/in/john-carlo-cheng-roa-47aa6a290/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center bg-white border border-gray-100 text-gray-800 px-8 py-4 rounded-2xl font-black hover:bg-blue-700 hover:text-white hover:scale-105 hover:shadow-xl transition-all duration-300"
                >
                    <LinkedInIcon />
                    LinkedIn
                </a>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }} className="relative z-10 w-full max-w-5xl">
                <ContactCard
                    info="directed at johncarlochengroa07@gmail.com"
                />
            </motion.div>
        </section>
    );
}

export default Contact;