import { useState, useEffect } from 'react';
import { LuFolder, LuBookOpen, LuAward } from 'react-icons/lu';
import { useData } from '../context/dataContext.jsx';
import { SectionIndicator } from '../components/sectionIndicator.jsx';
import { HeroSection } from '../components/home/heroSection.jsx';
import { FeaturedSection } from '../components/home/featuredSection.jsx';
import { HomeContactSection } from '../components/home/homeContactSection.jsx';

const SECTIONS_CONFIG = [
    { id: "home", label: "Home" },
    { id: "featured-projects", label: "Projects" },
    { id: "featured-research", label: "Research" },
    { id: "featured-recognition", label: "Awards" },
    { id: "contact", label: "Contact" }
];

export default function Home() {
    const { projects, research, recognition, siteContent } = useData();
    const { hero, featuredProjects, featuredResearch, featuredRecognition } = siteContent.home || {};
    const socials = siteContent.contact?.socials || {};
    const [activeSection, setActiveSection] = useState("home");

    useEffect(() => {
        const sections = ["home", "featured-projects", "featured-research", "featured-recognition", "contact"];
        const observerOptions = {
            root: null,
            rootMargin: "-25% 0px -25% 0px", // Trigger when in center area of viewport
            threshold: 0.2
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, observerOptions);

        sections.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => {
            sections.forEach((id) => {
                const el = document.getElementById(id);
                if (el) observer.unobserve(el);
            });
        };
    }, []);

    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="h-dvh w-full overflow-y-auto snap-y snap-mandatory scroll-smooth no-scrollbar flex flex-col relative">
            {/* Fluid Section Indicator (Desktop Only) */}
            <SectionIndicator
                sectionsConfig={SECTIONS_CONFIG}
                activeSection={activeSection}
                scrollToSection={scrollToSection}
            />
            
            {/* Section 1: Hero Section */}
            {hero && (
                <HeroSection
                    hero={hero}
                    socials={socials}
                    projectsCount={projects?.length || 0}
                    researchCount={research?.length || 0}
                    recognitionCount={recognition?.length || 0}
                />
            )}

            {/* Section 2: Featured Projects Snapping Slide */}
            {featuredProjects && (
                <FeaturedSection
                    id="featured-projects"
                    title={featuredProjects.title}
                    items={projects}
                    icon={LuFolder}
                />
            )}

            {/* Section 3: Featured Research Snapping Slide */}
            {featuredResearch && (
                <FeaturedSection
                    id="featured-research"
                    title={featuredResearch.title}
                    items={research}
                    isResearch={true}
                    icon={LuBookOpen}
                />
            )}

            {/* Section 4: Featured Recognition Snapping Slide */}
            {featuredRecognition && (
                <FeaturedSection
                    id="featured-recognition"
                    title={featuredRecognition.title}
                    items={recognition}
                    icon={LuAward}
                />
            )}

            {/* Section 5: Snapping Contact & Footer Page */}
            <HomeContactSection />
        </div>
    );
}
