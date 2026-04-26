import { Title, ContactCard } from "./components.jsx";

function Contact() {
    return (
        <section
            id="contact"
            className="relative min-h-screen flex flex-col justify-center items-center p-5 gap-10"
        >
            <div className="pt-20">
                <Title
                    title="Contact"
                />
            </div>

            <div className="flex flex-wrap justify-center gap-2 mt-8">
                <a
                    href="https://www.facebook.com/@jchengroa/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800 text-white px-6 py-2 rounded-full font-bold hover:bg-gray-600 transition-all self-end"
                >
                    Facebook
                </a>
                <a
                    href="https://github.com/jchengroa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800 text-white px-6 py-2 rounded-full font-bold hover:bg-gray-600 transition-all self-end"
                >
                    Github
                </a>
                <a
                    href="https://www.linkedin.com/in/john-carlo-cheng-roa-47aa6a290/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800 text-white px-6 py-2 rounded-full font-bold hover:bg-gray-600 transition-all self-end"
                >
                    LinkedIn
                </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-5">
                <ContactCard
                    info="directed at johncarlochengroa07@gmail.com"
                />
            </div>
        </section>
    );
}

export default Contact;