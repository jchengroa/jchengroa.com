import { motion } from 'framer-motion';

const defaultVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

export default function NoResults({ title, subtitle, variants = defaultVariants }) {
    return (
        <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            className="text-center py-20 w-full"
        >
            <h3 className="text-2xl font-black text-gray-400 dark:text-gray-500">{title}</h3>
            {subtitle && (
                <p className="text-gray-500 dark:text-gray-600 mt-2">{subtitle}</p>
            )}
        </motion.div>
    );
}

export { NoResults };
