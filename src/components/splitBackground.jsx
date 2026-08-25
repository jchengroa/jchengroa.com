export default function SplitBackground() {
    return (
        <>
            {/* Split Left Background (Desktop Only) */}
            <div className="absolute left-0 top-0 bottom-0 w-full md:w-[48%] bg-white dark:bg-gray-950 z-0 transition-colors duration-300" />
            
            {/* Wave Divider SVG (Desktop Only) */}
            <div className="absolute left-[48%] top-0 bottom-0 w-[100px] h-full z-0 hidden md:block text-white dark:text-gray-950 fill-current transition-colors duration-300">
                <svg viewBox="0 0 100 1000" preserveAspectRatio="none" className="w-full h-full">
                    <path d="M0,0 Q60,250 30,500 Q0,750 50,1000 L0,1000 Z" />
                </svg>
            </div>
        </>
    );
}

export { SplitBackground };
