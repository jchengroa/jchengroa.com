import React from 'react';

/* Icons */
const MailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 group-hover:animate-pulse">
        <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
);

const GitHubIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 group-hover:rotate-12 transition-transform">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-4.51-2-7-2" />
    </svg>
);

const LinkedInIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 group-hover:scale-110 transition-transform">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" />
    </svg>
);

function Hero(props) {
    const [currentImage, setCurrentImage] = React.useState(0);
    const images = [
        '/hero_background_1.jpg',
        '/hero_background_2.jpg',
        '/hero_background_3.jpg'
    ];

    React.useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    const highlights = [
        { label: "Major", value: "CompEng", detail: "DLSU 2nd Year" },
        { label: "Core", value: "Java/Python", detail: "OOP & Algorithms" },
        { label: "DevOps", value: "TrueNAS & Nginx", detail: "Homelab & Reverse Proxy" },
        { label: "Cloud", value: "ERPNext", detail: "Enterprise Management" }
    ];

    return (
        <section
            id="home"
            className="relative min-h-[90vh] flex items-center justify-center text-center p-5 rounded-[3rem] overflow-hidden shadow-2xl transition-all duration-700 hover:shadow-3xl mt-24 mx-2 bg-white border border-gray-100 isolate"
        >
            {/* Cross-fading Background Images */}
            {images.map((img, i) => (
                <div
                    key={i}
                    className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${i === currentImage ? 'opacity-100' : 'opacity-0'}`}
                    style={{
                        backgroundImage: `url(${img})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center 40%'
                    }}
                />
            ))}

            {/* Glassmorphic Overlay for Readability */}
            <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] pointer-events-none"></div>

            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-blue-50/20 to-transparent pointer-events-none"></div>

            <div className="relative z-10 text-black max-w-5xl px-4 flex flex-col items-center">
                <div className="animate-fade-up">
                    <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tight text-gray-900 drop-shadow-sm">
                        {props.title}
                    </h1>

                    <div className="max-w-3xl mx-auto space-y-6 mb-12">
                        <p className="text-xl md:text-2xl text-gray-700 font-bold leading-relaxed">
                            I am a 2nd-year Computer Engineering student at De La Salle University with a passion for building robust digital systems from the ground up.
                        </p>
                        <p className="text-lg text-gray-500 font-medium leading-relaxed">
                            While my academic focus lies in Object-Oriented Programming and Data Structures and Algorithms, my real-world curiosity drives me toward systems administration and DevOps. Currently maintaining cloud-hosted ERPNext instances and managing secure infrastructure reliability.
                        </p>
                    </div>
                </div>

                {/* Keyword Summaries / Highlights */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mb-12 animate-fade-up [animation-delay:200ms]">
                    {highlights.map((item, i) => (
                        <div key={i} className="p-6 bg-white/50 backdrop-blur-md rounded-3xl border border-white/50 shadow-sm hover:bg-white hover:shadow-xl transition-all group">
                            <div className="text-2xl font-black text-blue-600 mb-1 tracking-tighter group-hover:scale-105 transition-transform">
                                {item.value}
                            </div>
                            <div className="text-[10px] font-black text-gray-900 uppercase tracking-[0.2em] mb-1">
                                {item.label}
                            </div>
                            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                {item.detail}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex flex-wrap justify-center gap-4 animate-fade-up [animation-delay:400ms]">
                    <a
                        href="mailto:johncarlochengroa07@gmail.com"
                        className="group flex items-center bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-black hover:scale-105 hover:shadow-2xl transition-all duration-300"
                    >
                        <MailIcon />
                        Email
                    </a>
                    <a
                        href="https://github.com/jchengroa"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center bg-white/80 backdrop-blur-md text-gray-900 px-8 py-4 rounded-2xl font-bold hover:scale-105 hover:shadow-xl transition-all duration-300 border border-white/50"
                    >
                        <GitHubIcon />
                        GitHub
                    </a>
                    <a
                        href="https://www.linkedin.com/in/john-carlo-cheng-roa-47aa6a290/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center bg-white/80 backdrop-blur-md text-gray-900 px-8 py-4 rounded-2xl font-bold hover:scale-105 hover:shadow-xl transition-all duration-300 border border-white/50"
                    >
                        <LinkedInIcon />
                        LinkedIn
                    </a>
                </div>

                {/* Animated Scroll Indicator */}
                <button
                    onClick={() => document.getElementById('featured-projects')?.scrollIntoView({ behavior: 'smooth' })}
                    className="mt-16 animate-slow-bounce text-gray-900/40 hover:text-gray-900/80 transition-colors cursor-pointer outline-none group"
                    aria-label="Scroll to projects"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-[3px] transition-all">
                        <path d="m7 13 5 5 5-5" /><path d="m7 6 5 5 5-5" />
                    </svg>
                </button>
            </div>
        </section>
    );
}

export default Hero