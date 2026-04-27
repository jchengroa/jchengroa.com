import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { projectData } from "../data/projects";

function ProjectDetail() {
    const { id } = useParams();
    const project = projectData[id];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!project) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
                <h1 className="text-4xl font-black mb-4 tracking-tighter">Project not found</h1>
                <p className="text-gray-500 mb-8">The project you're looking for doesn't exist or has been moved.</p>
                <Link to="/" className="px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black transition-all">
                    Return Home
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-gray-900 pt-32 pb-20 px-6">
            <div className="max-w-5xl mx-auto">
                <Link to="/" className="inline-flex items-center text-blue-600 font-bold mb-12 hover:translate-x-[-4px] transition-all group">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="mr-2 group-hover:stroke-blue-700"><path d="m15 18-6-6 6-6"/></svg>
                    Back to Portfolio
                </Link>

                <div className="animate-fade-up">
                    <header className="mb-20">
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 text-gray-900 leading-none">
                            {project.title}
                        </h1>
                        <p className="text-2xl md:text-3xl font-bold text-blue-600 tracking-tight">
                            {project.subtitle}
                        </p>
                    </header>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                        <div className="lg:col-span-2 space-y-16">
                            <section>
                                <h3 className="text-xs font-black tracking-[0.2em] uppercase text-gray-400 mb-6">The Challenge & Solution</h3>
                                <p className="text-2xl text-gray-600 leading-relaxed font-medium">
                                    {project.description}
                                </p>
                            </section>

                            <section>
                                <h3 className="text-xs font-black tracking-[0.2em] uppercase text-gray-400 mb-8">Visual Gallery</h3>
                                <div className="grid grid-cols-1 gap-8">
                                    {project.images.map((img, i) => (
                                        <div key={i} className="group relative aspect-video bg-gray-50 rounded-[2.5rem] overflow-hidden flex flex-col items-center justify-center text-gray-300 border border-gray-100 transition-all hover:shadow-2xl">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-4 opacity-50"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                                            <span className="font-bold tracking-widest uppercase text-xs">Screenshot Placeholder</span>
                                            {/* In a real scenario, <img src={img} /> would go here */}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>

                        <aside className="space-y-12">
                            <div>
                                <h3 className="text-xs font-black tracking-[0.2em] uppercase text-gray-400 mb-6">Stack</h3>
                                <div className="flex flex-wrap gap-3">
                                    {project.tech.map(t => (
                                        <span key={t} className="px-5 py-2.5 bg-gray-50 rounded-2xl text-sm font-bold text-gray-700 border border-gray-100">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xs font-black tracking-[0.2em] uppercase text-gray-400 mb-6">Resources</h3>
                                <div className="flex flex-col gap-4">
                                    {project.links.map(link => (
                                        <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-5 bg-gray-900 text-white rounded-[1.5rem] font-bold hover:bg-black hover:scale-[1.02] transition-all">
                                            <span>{link.name}</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                                        </a>
                                    ))}
                                </div>
                            </div>

                            <div className="p-8 bg-blue-50 rounded-[2rem] border border-blue-100">
                                <h4 className="font-black text-blue-900 mb-2 italic">Pro Tip</h4>
                                <p className="text-blue-800/70 text-sm leading-relaxed font-medium">
                                    This project is part of my ongoing commitment to building scalable, user-centric software solutions.
                                </p>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectDetail;
