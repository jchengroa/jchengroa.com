import { Link } from "react-router-dom";
import { useEffect } from "react";

function Legal() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-white text-gray-900 pt-32 pb-20 px-6">
            <div className="max-w-4xl mx-auto">


                <div className="animate-fade-up">
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
                                <ul className="space-y-6 font-medium text-gray-600">
                                    <li>
                                        <p className="text-gray-900 font-bold mb-1">Architecture & Code</p>
                                        Built by John Carlo Cheng Roa using React, Vite, and Tailwind CSS. Deployed using Vercel. Built with the help of Google Antigravity & Gemini, as a vibe coding project.
                                    </li>
                                    <li>
                                        <p className="text-gray-900 font-bold mb-1">Typography</p>
                                        Inter & System Fonts for maximum performance and readability.
                                    </li>
                                    <li>
                                        <p className="text-gray-900 font-bold mb-1">Icons</p>
                                        Lucide Icons & custom SVG paths.
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-xs font-black tracking-[0.2em] uppercase text-gray-400 mb-8">Legal & Privacy</h2>
                                <ul className="space-y-6 font-medium text-gray-600">
                                    <li>
                                        <p className="text-gray-900 font-bold mb-1">Copyright</p>
                                        &copy; 2026 John Carlo Cheng Roa. All rights reserved.
                                    </li>
                                    <li>
                                        <p className="text-gray-900 font-bold mb-1">Privacy Policy</p>
                                        This site does not use cookies for tracking. We use Vercel Analytics for anonymous traffic data to improve the user experience.
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
                </div>
            </div>
        </div>
    );
}

export default Legal;
