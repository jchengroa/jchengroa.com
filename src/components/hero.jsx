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

            <div className="absolute inset-0 bg-white/60"></div>

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

export default Hero