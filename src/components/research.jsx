import { Title, WorkCard } from "./components.jsx";
import { researchList } from "../data/research";

function Research() {
    return (
        <section className="min-h-screen pt-32 pb-20 px-6 bg-gray-50/50 flex flex-col items-center">
            <div className="max-w-6xl w-full">
                <div className="text-center mb-16 animate-fade-up">
                    <Title title="Research" />
                    <p className="text-gray-600 font-medium text-lg mt-4 max-w-3xl mx-auto leading-relaxed">
                        A multidisciplinary exploration of technology and life sciences. My research spans from robotics and computer engineering to biochemical analysis and agricultural innovation, with a current focus on integrating embedded systems into sustainable ecological solutions like aquaponics.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-up" style={{ animationDelay: '100ms' }}>
                    {researchList.map((research) => (
                        <WorkCard
                            key={research.id}
                            id={research.id}
                            title={research.title}
                            info={research.info}
                            stack={research.tech}
                            description={research.summary}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Research;
