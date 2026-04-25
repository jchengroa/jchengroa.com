import { createRoot } from 'react-dom/client'
import './index.css'

function App() {
    return (
        <div className="bg-red-500 text-white p-10 text-5xl">
            <h1>Hello World!</h1>
        </div>
    )
}

createRoot(document.getElementById('root')).render(<App />)