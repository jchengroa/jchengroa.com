import { Link } from "react-router-dom";
import { useState } from "react";

/* Objects */

function ProjectCard(props) {
    return (
        <Link to={`/project/${props.id}`} className="block group h-full">
            <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-3xl transition-all duration-500 h-full flex flex-col justify-between overflow-hidden relative">
                {/* Subtle Gradient Glow on Hover */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-5 transition duration-500"></div>

                <div className="relative z-10 flex-grow">
                    <span className="text-xs font-black tracking-[0.2em] text-blue-600 uppercase mb-4 block">
                        {props.info}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tighter leading-tight">
                        <span className="bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:via-blue-800 group-hover:to-indigo-900 transition-all duration-500">
                            {props.title}
                        </span>
                    </h2>
                    <p className="text-gray-500 text-lg font-medium leading-relaxed mb-8 opacity-80 group-hover:opacity-100 transition-opacity">
                        {props.description}
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
                            <Link to="/" className="text-gray-600 hover:text-black transition" onClick={() => {
                                setTimeout(() => {
                                    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                                }, 100);
                            }}>Projects</Link>
                            <Link to="/" className="text-gray-600 hover:text-black transition" onClick={() => {
                                setTimeout(() => {
                                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                                }, 100);
                            }}>Contact</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


export { ProjectCard, ContactCard, Title, SubTitle, NavBar }
export default NavBar
