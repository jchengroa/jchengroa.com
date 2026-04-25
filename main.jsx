import { createRoot } from 'react-dom/client'
import './index.css'

/* Vercel Analytics */
import { inject } from '@vercel/analytics'
inject()

/* Objects */
function ProjectCard(props) {
    return (
        <>
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
            {/* Spacing */}
            <div className="mx-auto rounded-full mt-5 mb-5"></div>
        </>
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
            {/* Divider */}
            <div className="h-0.25 w-border bg-gray-200 mx-auto rounded-full mt-10 mb-5"></div>
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

/* Main Application */
function App() {
    return (
        <div className="p-10">
            <Title
                title="John Carlo Cheng Roa"
            />
            <SubTitle
                title="Projects"
            />
            <ProjectCard /* Personal Website */
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
            {/* Footer */}
            <div className="p-5 text-center">
                <p className="text-sm"><b>DOMAIN NOT FOR SALE</b></p>
                <p className="text-gray-500 text-sm">Version 0.0.5 | Last Updated: April 25, 2026</p>
            </div>
        </div>
    );
}

createRoot(document.getElementById('root')).render(<App />)