import { useState } from 'react';
import { useData } from '../context/DataContext.jsx';

export function ContactCard(props) {
    const { siteContent } = useData();
    const { common, home } = siteContent;
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
        botcheck: ""
    });
    const [status, setStatus] = useState({ loading: false, success: false, error: null });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
        if (status.error) setStatus(prev => ({ ...prev, error: null }));
    };

    const handleSend = async (e) => {
        if (e) e.preventDefault();
        const { name, email, message, botcheck } = formData;

        // 1. Honeypot check for automated spam bots
        if (botcheck) {
            // Silently drop bot submission
            setStatus({ loading: false, success: true, error: null });
            setFormData({ name: "", email: "", message: "", botcheck: "" });
            return;
        }

        // 2. Basic validation
        if (!name.trim() || !email.trim() || !message.trim()) {
            setStatus({ loading: false, success: false, error: "Please fill out all fields before sending." });
            return;
        }

        if (message.trim().length < 10) {
            setStatus({ loading: false, success: false, error: "Please enter a message with at least 10 characters." });
            return;
        }

        // 3. Rate-limiting check (3-minute cooldown between submissions per device)
        const lastSent = localStorage.getItem("jchengroa_last_contact_sent");
        if (lastSent) {
            const timeDiff = Date.now() - parseInt(lastSent, 10);
            const cooldownMs = 3 * 60 * 1000; // 3 minutes
            if (timeDiff < cooldownMs) {
                const remainingSecs = Math.ceil((cooldownMs - timeDiff) / 1000);
                setStatus({ 
                    loading: false, 
                    success: false, 
                    error: `You recently sent a message. Please wait ${remainingSecs} seconds before sending another.` 
                });
                return;
            }
        }

        setStatus({ loading: true, success: false, error: null });

        const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

        try {
            if (accessKey) {
                const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({
                        access_key: accessKey,
                        name,
                        email,
                        message,
                        botcheck: false,
                        subject: `Portfolio Contact Form: ${name}`,
                        from_name: `${name} (Portfolio Contact)`
                    })
                });

                const result = await response.json();
                if (result.success) {
                    localStorage.setItem("jchengroa_last_contact_sent", Date.now().toString());
                    setStatus({ loading: false, success: true, error: null });
                    setFormData({ name: "", email: "", message: "", botcheck: "" });
                    setTimeout(() => {
                        setStatus({ loading: false, success: false, error: null });
                    }, 6000);
                    return;
                } else {
                    throw new Error(result.message || "Failed to submit message.");
                }
            }

            // Fallback to mailto if access key is omitted
            const recipient = home?.hero?.email || "johncarlochengroa07@gmail.com";
            const subject = encodeURIComponent(`Portfolio Message from ${name}`);
            const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
            window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
            setStatus({ loading: false, success: true, error: null });
        } catch (err) {
            console.error("Message submission error:", err);
            const recipient = home?.hero?.email || "johncarlochengroa07@gmail.com";
            const subject = encodeURIComponent(`Portfolio Message from ${name}`);
            const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
            window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
            setStatus({ loading: false, success: false, error: "Opening mail client fallback..." });
        }
    };

    return (
        <form onSubmit={handleSend} className="bg-white dark:bg-gray-900 rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col gap-4 md:gap-6 h-full w-full max-w-4xl mx-auto relative overflow-hidden group">
            {/* Invisible Honeypot Field for Bot Spam Prevention */}
            <input 
                type="checkbox" 
                name="botcheck" 
                className="hidden" 
                style={{ display: "none" }} 
                tabIndex={-1} 
                autoComplete="off"
                checked={!!formData.botcheck}
                onChange={handleChange} 
            />

            {/* Subtle Gradient Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[1.5rem] md:rounded-[2rem] blur-xl opacity-0 group-hover:opacity-[0.03] transition duration-500 pointer-events-none"></div>

            <div className="relative z-10">
                <h2 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white mb-1 tracking-tight">Send a Message</h2>
                <p className="text-gray-500 dark:text-gray-400 font-medium text-xs md:text-sm">{props.info || "Fill out the form below to send a message directly to my inbox."}</p>
            </div>

            {status.success && (
                <div className="relative z-10 p-4 bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800/40 rounded-2xl text-green-700 dark:text-green-300 text-xs font-bold flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="M20 6 9 17l-5-5"/></svg>
                    <span>Thank you! Your message has been sent successfully. I will get back to you soon.</span>
                </div>
            )}

            {status.error && (
                <div className="relative z-10 p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/40 rounded-2xl text-amber-700 dark:text-amber-300 text-xs font-bold flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    <span>{status.error}</span>
                </div>
            )}

            <div className="relative z-10 flex-grow space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        required
                        className="w-full p-4 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/20 focus:bg-white dark:focus:bg-gray-900 focus:border-blue-600 outline-none transition-all font-medium text-xs sm:text-sm text-gray-700 dark:text-gray-200"
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your Email"
                        required
                        className="w-full p-4 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/20 focus:bg-white dark:focus:bg-gray-900 focus:border-blue-600 outline-none transition-all font-medium text-xs sm:text-sm text-gray-700 dark:text-gray-200"
                    />
                </div>
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full p-4 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/20 focus:bg-white dark:focus:bg-gray-900 focus:border-blue-600 outline-none transition-all resize-none text-xs sm:text-sm text-gray-700 dark:text-gray-200 font-medium"
                    rows="4"
                    placeholder="Tell me about your project or inquiry..."
                ></textarea>
            </div>

            <div className="relative z-10 flex justify-end">
                <button
                    type="submit"
                    disabled={status.loading}
                    className="group flex items-center justify-center bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-7 py-3 rounded-xl font-black text-xs sm:text-sm hover:bg-black dark:hover:bg-gray-100 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 min-w-[150px]"
                >
                    {status.loading ? (
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                            <span>Sending...</span>
                        </div>
                    ) : (
                        <>
                            <span>{common?.sendMessage || "Send Message"}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="ml-2 group-hover:translate-x-1 transition-transform"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg>
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}

export default ContactCard;
