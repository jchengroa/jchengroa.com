import { Link } from "react-router-dom";

export default function WorkNotFound({ 
    title = "Item Not Found", 
    description = "The requested work details could not be found or have been moved.", 
    returnHomeText = "Return Home",
    backLink = "/"
}) {
    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center p-6 text-center bg-transparent overflow-x-hidden">
            <div className="relative z-10">
                <h1 className="text-4xl font-black mb-4 tracking-tighter text-gray-900 dark:text-white">
                    {title}
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
                    {description}
                </p>
                <Link 
                    to={backLink} 
                    className="px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl font-bold hover:bg-black dark:hover:bg-gray-100 transition-all shadow-md inline-block"
                >
                    {returnHomeText}
                </Link>
            </div>
        </div>
    );
}

export { WorkNotFound };
