import { Link } from "react-router-dom";
import { useState } from "react";
import { shortenKeyword } from "../utils/keywordEngine";
import { siteContent } from "../data/siteContent";
import { FormattedText } from "./typography.jsx";

function WorkCard(props) {
    const { common } = siteContent;
    const linkTo = props.linkTo || `/project/${props.id}`;
    return (
        <Link to={linkTo} className="block group h-full">
            <div className="bg-white dark:bg-gray-900 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-3xl transition-all duration-500 h-full flex flex-col justify-between overflow-hidden relative">
                {/* Subtle Gradient Glow on Hover */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2rem] md:rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 transition duration-500"></div>

                <div className="relative z-10 flex-grow">
                    {props.image && (
                        <div className="mb-8 rounded-2xl overflow-hidden aspect-[16/10] bg-gray-50 border border-gray-100 group-hover:shadow-lg transition-all duration-500">
                            <img
                                src={props.image}
                                alt={props.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    )}

                    <span className="text-xs font-black tracking-[0.2em] text-blue-600 uppercase mb-4 block">
                        {props.info}
                    </span>
                    <h2 className="text-2xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 md:mb-6 tracking-tighter leading-tight">
                        <span className="bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-gray-900 dark:group-hover:from-white group-hover:via-blue-800 dark:group-hover:via-blue-400 group-hover:to-indigo-900 dark:group-hover:to-blue-600 transition-all duration-500">
                            {props.title}
                        </span>
                    </h2>
                    <p className="text-gray-500 text-sm md:text-lg font-medium leading-relaxed mb-6 md:mb-8 opacity-80 group-hover:opacity-100 transition-opacity">
                        <FormattedText text={props.summary || props.description} />
                    </p>

                    {props.stack && (
                        <div className="flex flex-wrap gap-2 mb-8">
                            {props.stack.map((tech, index) => (
                                <span key={index} className="px-4 py-1.5 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-xl text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    {shortenKeyword(tech)}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                <div className="relative z-10 flex items-center text-blue-600 font-black text-lg group-hover:translate-x-2 transition-transform duration-300">
                    {common.learnMore}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="ml-2"><path d="m9 18 6-6-6-6" /></svg>
                </div>
            </div>
        </Link>
    );
}

function RecognitionCard(props) {
    const { facebookUrl, title, info, description, tech, id } = props;
    const { common } = siteContent;
    const encodedUrl = encodeURIComponent(facebookUrl);
    const iframeSrc = `https://www.facebook.com/plugins/post.php?href=${encodedUrl}&show_text=true&width=auto`;

    return (
        <div className="bg-white dark:bg-gray-900 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-3xl transition-all duration-500 h-full flex flex-col overflow-hidden relative group">
            {/* Subtle Gradient Glow on Hover */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2rem] md:rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 transition duration-500"></div>

            <div className="relative z-10 flex-grow flex flex-col">
                <div className="mb-6">
                    <span className="text-xs font-black tracking-[0.2em] text-blue-600 uppercase mb-3 block">
                        {info}
                    </span>
                    <Link to={`/project/${id}`} className="block group/link">
                        <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4 tracking-tighter leading-tight group-hover/link:text-blue-600 dark:group-hover/link:text-blue-400 transition-colors duration-300">
                            {title}
                        </h2>
                    </Link>
                    <p className="text-gray-500 text-base font-medium leading-relaxed mb-6 opacity-80">
                        <FormattedText text={description} />
                    </p>

                    {tech && (
                        <div className="flex flex-wrap gap-2 mb-6">
                            {tech.map((t, index) => (
                                <span key={index} className="px-3 py-1 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-lg text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    {shortenKeyword(t)}
                                </span>
                            ))}
                        </div>
                    )}

                    <div className="mb-2">
                        <Link to={`/project/${id}`} className="inline-flex items-center text-blue-600 font-black text-lg hover:translate-x-2 transition-transform duration-300">
                            {common.learnMore}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="ml-2"><path d="m9 18 6-6-6-6" /></svg>
                        </Link>
                    </div>
                </div>

                {/* Facebook Embed Container */}
                <div className="mt-auto rounded-2xl overflow-hidden bg-gray-50 dark:bg-gray-800/30 border border-gray-100 dark:border-gray-700 flex items-center justify-center min-h-[400px]">
                    <iframe
                        src={iframeSrc}
                        width="100%"
                        height="500"
                        style={{ border: 'none', overflow: 'hidden' }}
                        scrolling="no"
                        frameBorder="0"
                        allowFullScreen={true}
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                        title={title}
                        className="max-w-full"
                    ></iframe>
                </div>
            </div>
        </div>
    );
}

function ContactCard(props) {
    const { common, home } = siteContent;
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSend = () => {
        const { name, email, message } = formData;
        const recipient = home.hero.email;
        const subject = encodeURIComponent(`Portfolio Message from ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

        window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
    };

    return (
        <div className="bg-white dark:bg-gray-900 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-12 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col gap-6 md:gap-8 h-full w-full max-w-4xl mx-auto relative overflow-hidden group">
            {/* Subtle Gradient Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2rem] md:rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-[0.03] transition duration-500 pointer-events-none"></div>

            <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">Send a Message</h2>
                <p className="text-gray-500 dark:text-gray-400 font-medium text-lg mb-4">{props.info}</p>
            </div>

            <div className="relative z-10 flex-grow space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        className="w-full p-5 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/20 focus:bg-white dark:focus:bg-gray-900 focus:border-blue-600 outline-none transition-all font-medium text-gray-700 dark:text-gray-200"
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your Email"
                        className="w-full p-5 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/20 focus:bg-white dark:focus:bg-gray-900 focus:border-blue-600 outline-none transition-all font-medium text-gray-700 dark:text-gray-200"
                    />
                </div>
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full p-5 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/20 focus:bg-white dark:focus:bg-gray-900 focus:border-blue-600 outline-none transition-all resize-none text-gray-700 dark:text-gray-200 font-medium"
                    rows="6"
                    placeholder="Tell me about your project..."
                ></textarea>
            </div>

            <div className="relative z-10 flex justify-end">
                <button
                    onClick={handleSend}
                    className="group flex items-center bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-10 py-4 rounded-2xl font-black text-lg hover:bg-black dark:hover:bg-gray-100 hover:scale-105 hover:shadow-2xl dark:hover:shadow-none transition-all duration-300"
                >
                    {common.sendMessage}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="ml-2 group-hover:translate-x-1 transition-transform"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg>
                </button>
            </div>
        </div>
    );
}

function UniversalListCard(props) {
    const { id, title, info, description, tech, linkURL, linkName, facebookUrl } = props;
    const { common } = siteContent;
    const linkTo = props.linkTo || (id ? `/project/${id}` : undefined);

    return (
        <div className="bg-white dark:bg-gray-900 rounded-[1.5rem] p-6 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6 group relative overflow-hidden">
            {/* Subtle Gradient Glow on Hover */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[1.5rem] blur-xl opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 transition duration-500 pointer-events-none"></div>

            <div className="flex-grow min-w-0 relative z-10">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="text-[10px] font-black tracking-[0.2em] text-blue-600 uppercase">
                        {info}
                    </span>
                </div>

                {linkTo ? (
                    <Link to={linkTo} className="block group/link mb-2 truncate">
                        <h3 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white tracking-tight group-hover/link:text-blue-600 dark:group-hover/link:text-blue-400 transition-colors truncate">
                            {title}
                        </h3>
                    </Link>
                ) : (
                    <h3 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white tracking-tight mb-2 truncate">
                        {title}
                    </h3>
                )}

                <p className="text-gray-500 text-sm font-medium leading-relaxed mb-4 line-clamp-2 opacity-80 max-w-3xl">
                    <FormattedText text={description} />
                </p>

                {tech && tech.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                        {tech.map((t, index) => (
                            <span key={index} className="px-2.5 py-0.5 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-md text-[9px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                {shortenKeyword(t)}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            <div className="flex flex-wrap items-center gap-4 flex-shrink-0 relative z-10 pt-4 md:pt-0 border-t md:border-t-0 border-gray-100 dark:border-gray-800">
                {linkURL && (
                    <a
                        href={linkURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl text-xs font-bold transition-colors border border-gray-200 dark:border-gray-700"
                    >
                        {linkName || "Visit"}
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                    </a>
                )}

                {facebookUrl && (
                    <a
                        href={facebookUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-xl text-xs font-bold transition-colors border border-blue-200 dark:border-blue-800"
                    >
                        Facebook Post
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                    </a>
                )}

                {linkTo && (
                    <Link to={linkTo} className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 font-black text-xs hover:translate-x-1 transition-transform py-2">
                        {common.learnMore}
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                    </Link>
                )}
            </div>
        </div>
    );
}

export { WorkCard, RecognitionCard, ContactCard, UniversalListCard };
