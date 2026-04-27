/* Icons */
const MailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 group-hover:animate-pulse">
        <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
);

const GitHubIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 group-hover:rotate-12 transition-transform">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-4.51-2-7-2"/>
    </svg>
);

const LinkedInIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 group-hover:scale-110 transition-transform">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
    </svg>
);

function Hero(props) {
    return (
        <section
            id="home"
            className="relative min-h-[85vh] flex items-center justify-center text-center p-5 rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 hover:shadow-3xl mt-24 mx-2"
            style={{
                backgroundImage: `url(${props.backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center 40%'
            }}>

            {/* Enhanced Overlay for Visibility */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/75 to-white/60 backdrop-blur-[1px]"></div>

            <div className="relative z-10 text-black max-w-4xl px-4 flex flex-col items-center">
                <div className="animate-fade-up">
                    <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight text-gray-900 drop-shadow-sm">
                        {props.title}
                    </h1>
                    <p className="text-xl md:text-3xl text-gray-700 mb-12 font-bold max-w-2xl mx-auto leading-tight">
                        {props.subtitle}
                    </p>
                </div>
                
                <div className="flex flex-wrap justify-center gap-4 animate-fade-in [animation-delay:400ms]">
                    <a
                        href="mailto:johncarlochengroa07@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center bg-gray-900/90 backdrop-blur-md text-white px-8 py-4 rounded-2xl font-bold hover:bg-black hover:scale-105 hover:shadow-2xl transition-all duration-300 border border-white/10"
                    >
                        <MailIcon />
                        Email
                    </a>
                    <a
                        href="https://github.com/jchengroa"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center bg-gray-900/90 backdrop-blur-md text-white px-8 py-4 rounded-2xl font-bold hover:bg-black hover:scale-105 hover:shadow-2xl transition-all duration-300 border border-white/10"
                    >
                        <GitHubIcon />
                        GitHub
                    </a>
                    <a
                        href="https://www.linkedin.com/in/john-carlo-cheng-roa-47aa6a290/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center bg-gray-900/90 backdrop-blur-md text-white px-8 py-4 rounded-2xl font-bold hover:bg-black hover:scale-105 hover:shadow-2xl transition-all duration-300 border border-white/10"
                    >
                        <LinkedInIcon />
                        LinkedIn
                    </a>
                </div>

                {/* Animated Scroll Indicator */}
                <button 
                    onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                    className="mt-20 animate-slow-bounce text-gray-900/40 hover:text-gray-900/80 transition-colors cursor-pointer outline-none group"
                    aria-label="Scroll to projects"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-[3px] transition-all">
                        <path d="m7 13 5 5 5-5"/><path d="m7 6 5 5 5-5"/>
                    </svg>
                </button>
            </div>
        </section>
    );
}

export default Hero