import { createRoot } from 'react-dom/client'
import './index.css'

/* Vercel Analytics */
import { inject } from '@vercel/analytics'
inject()

/* Objects */
function ProjectCard(props) {
    return (
        <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">{props.title}</h2>
            <span className="text-sm text-blue-500 font-medium">{props.info}</span>
            <p className="text-gray-600 mt-2">{props.description}</p>
        </div>
    );
}

function Title(props) {
    return (
        <div className="p-5">
            <h1 className="text-3xl text-shadow-lg font-bold text-gray-900">{props.title}</h1>
        </div>
    );
}

/* Main Application */
function App() {
    return (
        <div className="p-10">
            <Title
                title="John Carlo Cheng Roa"
            />
            <ProjectCard
                title="jchengroa.com"
                info="Version 0.0.3 | Last Updated: April 25, 2026"
                description="This is currently a work in progress. Domain NOT for sale. Built with Vite, React.js, and Tailwind CSS"
            />
        </div>
    );
}

createRoot(document.getElementById('root')).render(<App />)