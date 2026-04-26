/* Objects */

function ProjectCard(props) {
    return (
        <div className="bg-white rounded-xl p-8 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">{props.title}</h2>
            <span className="text-sm text-blue-500 font-medium">{props.info}</span>

            <p className="text-gray-600">
                <a
                    href={props.linkURL}
                    className="inline-block w-fit text-blue-600 hover:text-blue-800 font-medium underline"
                    target="_blank"
                    rel="noopener noreferrer">
                    <img src={props.linkPicture} alt={props.linkName} className="w-4 h-4 object-contain mt-2 mb-2" />
                </a>
            </p>

            <p className="text-gray-600 mt-2">{props.description}</p>
        </div>
    );
}

function ContactCard(props) {
    return (
        <div className="bg-white rounded-xl p-8 border border-gray-200 flex flex-col gap-4 h-full w-full max-w-3xl mx-auto">
            <h2 className="text-xl font-bold text-gray-800">Send Message</h2>
            <p className="text-gray-500 -mt-2">{props.info}</p>

            <div className="flex-grow">
                <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent outline-none transition-all resize-none text-gray-700"
                    rows="8"
                    placeholder="Write your message here..."
                ></textarea>
            </div>

            <button
                className="bg-gray-800 text-white px-6 py-2 rounded-full font-bold hover:bg-gray-600 transition-all self-end"
            >
                Send Message
            </button>
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
            <div className="fixed top-0 left-0 w-full z-50 p-4 mt-1 mb-10">
                {/* Desktop Menu */}
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                    <a href="#home" className="text-xl text-black hover:text-gray-800 font-bold transition">{props.name}</a>
                    <div className="flex gap-6 items-center">
                        <a href="#projects" className="text-gray-600 hover:text-black transition">Projects</a>
                        <a href="#contact" className="text-gray-600 hover:text-black transition">Contact</a>
                    </div>
                </div>
            </div>
        </>
    );
}


export { ProjectCard, ContactCard, Title, SubTitle, NavBar }
export default NavBar
