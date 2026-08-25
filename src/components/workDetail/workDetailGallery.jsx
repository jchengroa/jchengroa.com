export default function WorkDetailGallery({ images, title, onSelectImage, galleryTitle = "Visual Gallery" }) {
    if (!images || images.length === 0) return null;

    return (
        <section id="gallery" className="scroll-mt-36">
            <h3 className="text-xs font-black tracking-[0.2em] uppercase text-gray-400 dark:text-gray-500 mb-4 sm:mb-5">
                {galleryTitle}
            </h3>
            <div className="grid grid-cols-1 gap-6">
                {images.map((img, i) => (
                    <div 
                        key={i} 
                        onClick={() => onSelectImage(img)}
                        className="group relative aspect-video bg-gray-50 dark:bg-gray-900 rounded-[2rem] overflow-hidden border border-gray-100 dark:border-gray-800 transition-all hover:shadow-2xl dark:hover:shadow-black/50 cursor-zoom-in accent-glow-card"
                    >
                        <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-15 dark:group-hover:opacity-25 transition duration-500 pointer-events-none -z-10" />
                        <img 
                            src={img} 
                            alt={`${title} Screenshot ${i + 1}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />

                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm p-3 sm:p-4 rounded-full shadow-2xl scale-50 group-hover:scale-100 transition-all duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-gray-900 dark:text-white"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export { WorkDetailGallery };
