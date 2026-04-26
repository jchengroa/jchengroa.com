/* Objects */

function Hero(props) {
    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center justify-center text-center p-5"
            style={{
                backgroundImage: `url(${props.backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>

            <div className="absolute inset-0 bg-white/80"></div>

            <div className="relative z-10 text-black max-w-3xl">
                <h1 className="text-5xl md:text-7xl font-black mb-4">
                    {props.title}
                </h1>
                <p className="text-xl md:text-2xl text-gray-800 mb-8">
                    {props.subtitle}
                </p>
                <div className="flex flex-wrap justify-center gap-2 mt-8">
                    <a
                        href="mailto:johncarlochengroa07@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-800 text-white px-8 py-3 rounded-full font-bold hover:bg-gray-600 transition-all"
                    >
                        Email
                    </a>
                    <a
                        href="https://github.com/jchengroa"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-800 text-white px-8 py-3 rounded-full font-bold hover:bg-gray-600 transition-all"
                    >
                        Github
                    </a>
                    <a
                        href="https://www.linkedin.com/in/john-carlo-cheng-roa-47aa6a290/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-800 text-white px-8 py-3 rounded-full font-bold hover:bg-gray-600 transition-all"
                    >
                        LinkedIn
                    </a>
                </div>
            </div>
        </section>
    );
}

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

function Title(props) {
    return (
        <>
            <div className="p-1- text-center">
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


export { Hero, ProjectCard, Title, SubTitle, NavBar }
