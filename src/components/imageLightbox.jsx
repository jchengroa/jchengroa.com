import { useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import {
    workDetailLightboxBackdrop,
    workDetailLightboxContent
} from '../animations/workDetail.js';

export default function ImageLightbox({ selectedImage, onClose }) {
    // Prevent scrolling when an image is open
    useEffect(() => {
        if (selectedImage) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [selectedImage]);

    // Close on Escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    return (
        <AnimatePresence>
            {selectedImage && (
                <motion.div 
                    variants={workDetailLightboxBackdrop}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-2xl"
                    onClick={onClose}
                >
                    <button 
                        type="button"
                        aria-label="Close image preview"
                        className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-[110]"
                        onClick={(e) => {
                            e.stopPropagation();
                            onClose();
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                    </button>
                    <motion.div 
                        variants={workDetailLightboxContent}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="relative max-w-[90vw] max-h-[90vh] shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img 
                            src={selectedImage} 
                            alt="Full screen preview" 
                            className="w-full h-full object-contain"
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export { ImageLightbox };
