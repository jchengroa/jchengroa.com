import { createRoot } from 'react-dom/client'
import './index.css'

/* Vercel Analytics */
import { inject } from '@vercel/analytics'
inject()

import { Hero, ProjectCard, Title, SubTitle, NavBar } from './components.jsx'

/* Main Application */
function App() {
    return (
        <div className="p-2.5">
            <div id="navbar">
                <NavBar
                    name="jchengroa"
                />
            </div>

            <div id="home">
                <Hero
                    title="John Carlo Cheng Roa"
                    subtitle="Computer Engineering Student"
                    backgroundImage="https://scontent.fmnl4-7.fna.fbcdn.net/v/t39.30808-6/651281765_1381485553993509_2243367830554777873_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=dd6889&_nc_eui2=AeFbS55SsVQQzM8C4n32huhbZYXss3fQLKdlheyzd9AspxemzTpjTg2YaLAq5ja0XKMGnO24BzArWAUsCdaTWQAc&_nc_ohc=QGFfFc5ECO4Q7kNvwH0R8wi&_nc_oc=AdqECzu4_uCRMBwze3ktesNksbZT7MRq3v2Lt_Kv2vE7VTpq87Vi4-PGxtHoxEBTlA6HCER40yklbbtRvtUlSS1V&_nc_zt=23&_nc_ht=scontent.fmnl4-7.fna&_nc_gid=Tn5QBxmPi65KVzFuOjAexg&_nc_ss=7b2a8&oh=00_Af1UuLBr1b6fSi3gZn00l8eykWD_tFNdUyzBLSys2yowKA&oe=69F3B76B"
                />
            </div>

            <div id="projects">
                <Title
                    title="Projects"
                />
                <ProjectCard
                    title="jchengroa.com"
                    info="Personal Website"
                    linkName="GitHub"
                    linkPicture="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                    linkURL="https://github.com/jchengroa/jchengroa.com"
                    description="This is currently a work in progress.  Built with Vite, React.js, and Tailwind CSS"
                />
                <ProjectCard
                    title="CloudBased"
                    info="Multi-Warehouse Cloud-Based Inventory Management System"
                    linkName="GitHub"
                    linkPicture="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                    linkURL="https://github.com/jchengroa/CloudBased"
                    description="This project centralizes multisite inventory tracking and vendor details into a robust platform, 
                solving data fragmentation. Developed following the Software Development Life Cycle (SDLC), the solution evolved 
                from gathering these specific user pain points to systematically designing, implementing, and testing a centralized 
                web application."
                />
            </div>

            <div id="contact">
                <Title
                    title="Contact"
                />
            </div>

            <div id="footer" className="p-5 text-center">
                <p className="text-sm"><b>DOMAIN NOT FOR SALE</b></p>
                <p className="text-gray-500 text-sm">Version 0.0.6 | Last Updated: April 26, 2026</p>
            </div>
        </div>
    );
}

createRoot(document.getElementById('root')).render(<App />)