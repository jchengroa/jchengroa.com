import { Link } from "react-router-dom";
import { useState } from "react";

/* Objects */

function WorkCard(props) {
    const linkTo = props.linkTo || `/project/${props.id}`;
    return (
        <Link to={linkTo} className="block group h-full">
            <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-3xl transition-all duration-500 h-full flex flex-col justify-between overflow-hidden relative">
                {/* Subtle Gradient Glow on Hover */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-5 transition duration-500"></div>

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
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tighter leading-tight">
                        <span className="bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:via-blue-800 group-hover:to-indigo-900 transition-all duration-500">
                            {props.title}
                        </span>
                    </h2>
                    <p className="text-gray-500 text-lg font-medium leading-relaxed mb-8 opacity-80 group-hover:opacity-100 transition-opacity">
                        {props.summary || props.description}
                    </p>

                    {props.stack && (
                        <div className="flex flex-wrap gap-2 mb-8">
                            {props.stack.map((tech, index) => (
                                <span key={index} className="px-4 py-1.5 bg-gray-50 border border-gray-100 rounded-xl text-xs font-black text-gray-500 uppercase tracking-wider">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                <div className="relative z-10 flex items-center text-blue-600 font-black text-lg group-hover:translate-x-2 transition-transform duration-300">
                    Learn more
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="ml-2"><path d="m9 18 6-6-6-6" /></svg>
                </div>
            </div>
        </Link>
    );
}

function ContactCard(props) {
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
        const recipient = "johncarlochengroa07@gmail.com";
        const subject = encodeURIComponent(`Portfolio Message from ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
        
        window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
    };

    return (
        <div className="bg-white rounded-[2.5rem] p-12 border border-gray-100 shadow-sm flex flex-col gap-8 h-full w-full max-w-4xl mx-auto relative overflow-hidden group">
            {/* Subtle Gradient Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-[0.03] transition duration-500 pointer-events-none"></div>

            <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-2 tracking-tight">Send a Message</h2>
                <p className="text-gray-500 font-medium text-lg mb-4">{props.info}</p>
            </div>

            <div className="relative z-10 flex-grow space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        className="w-full p-5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:bg-white focus:border-blue-600 outline-none transition-all font-medium text-gray-700"
                    />
                    <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your Email"
                        className="w-full p-5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:bg-white focus:border-blue-600 outline-none transition-all font-medium text-gray-700"
                    />
                </div>
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full p-5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:bg-white focus:border-blue-600 outline-none transition-all resize-none text-gray-700 font-medium"
                    rows="6"
                    placeholder="Tell me about your project..."
                ></textarea>
            </div>

            <div className="relative z-10 flex justify-end">
                <button
                    onClick={handleSend}
                    className="group flex items-center bg-gray-900 text-white px-10 py-4 rounded-2xl font-black text-lg hover:bg-black hover:scale-105 hover:shadow-2xl transition-all duration-300"
                >
                    Send Message
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="ml-2 group-hover:translate-x-1 transition-transform"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg>
                </button>
            </div>
        </div>
    );
}

function Title(props) {
    return (
        <>
            <div className="p-10 text-center">
                <h1 className="text-3xl font-bold text-black">
                    {props.title}
                </h1>
            </div>
        </>

    );
}

function SubTitle(props) {
    return (
        <>
            <div className="p-2 text-center">
                <h2 className="text-2xl font-bold text-black">{props.title}</h2>
            </div>
            {/* Spacing */}
            <div className="mx-auto rounded-full mt-5 mb-5"></div>
        </>
    );
}

function NavBar(props) {
    return (
        <>
            <div className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
                <div className="mx-auto mt-4 px-4 max-w-7xl">
                    <div className="bg-white/80 backdrop-blur-lg border border-white/20 shadow-lg rounded-2xl p-4 flex justify-between items-center">
                        <Link to="/" className="text-xl text-black hover:text-gray-800 font-black tracking-tight transition" onClick={() => {
                            setTimeout(() => {
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }, 100);
                        }}>{props.name}</Link>
                        <div className="flex gap-8 items-center font-medium">
                            <Link to="/projects" className="text-gray-600 hover:text-black transition">Projects</Link>
                            <Link to="/research" className="text-gray-600 hover:text-black transition">Research</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function SearchFilter({ searchQuery, setSearchQuery, activeFilter, setActiveFilter, filters }) {
    return (
        <div className="w-full max-w-3xl mx-auto mb-16 space-y-8 z-20 relative">
            <div className="relative group">
                {/* Colorful Icon */}
                <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none z-20">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="url(#search-gradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-focus-within:scale-110 transition-transform duration-300">
                        <defs>
                            <linearGradient id="search-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#3b82f6" className="group-focus-within:stopColor-[#2563eb]" />
                                <stop offset="100%" stopColor="#8b5cf6" className="group-focus-within:stopColor-[#7c3aed]" />
                            </linearGradient>
                        </defs>
                        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
                    </svg>
                </div>
                
                {/* Gradient Border Wrapper */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300 opacity-60 group-focus-within:opacity-100 group-focus-within:from-blue-500 group-focus-within:via-indigo-500 group-focus-within:to-purple-500 transition-all duration-500 p-[3px] shadow-lg group-focus-within:shadow-blue-500/25">
                    <div className="w-full h-full bg-blue-50/95 backdrop-blur-md rounded-[calc(1.5rem-3px)] group-focus-within:bg-white transition-colors duration-500"></div>
                </div>

                <input
                    type="text"
                    placeholder="Search by keyword, technology, or title..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="relative w-full pl-16 pr-6 py-5 bg-transparent outline-none font-black text-gray-800 text-lg placeholder:text-indigo-300/80 transition-all z-10"
                />
            </div>
            
            {filters && filters.length > 0 && (
                <div className="flex flex-wrap gap-3 justify-center">
                    {filters.map(filter => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 ${activeFilter === filter ? 'bg-gray-900 text-white shadow-lg scale-105' : 'bg-white/80 border border-gray-100 text-gray-500 hover:bg-gray-100 hover:text-gray-900'}`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export { WorkCard, ContactCard, Title, SubTitle, NavBar, SearchFilter }
export default NavBar
