import { motion, AnimatePresence } from 'framer-motion';
import { Title } from './typography.jsx';
import { SearchBar, FilterList, ViewSwitcherButton, SubheaderToggleButton } from './controls.jsx';
import { filterCollapseVariants } from '../animations/components.js';

export default function WorkPageHeader({
    title,
    subtitle,
    icon,
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
    filters = [],
    headerVariants,
    controlsVariants,
    showControls = true,
}) {
    const isSearchingText = searchQuery ? searchQuery.trim() !== "" : false;

    return (
        <motion.div
            variants={headerVariants}
            initial="hidden"
            animate="visible"
            className="w-full mb-6 lg:mb-10"
        >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
                {/* Left Column: Title and description */}
                <div className="lg:col-span-5 text-left">
                    <Title
                        title={title}
                        subtitle={subtitle}
                        icon={icon}
                        align="left"
                        className="!mb-0"
                    />
                </div>

                {/* Right Column: Search, filters, switcher & toggle */}
                {showControls && (
                    <motion.div
                        variants={controlsVariants}
                        className="lg:col-span-7 flex flex-col items-center lg:items-end gap-2.5 sm:gap-3 w-full"
                    >
                        <SearchBar
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                        />
                        <AnimatePresence>
                            {!isSearchingText && filters.length > 0 && (
                                <motion.div
                                    key="filters"
                                    variants={filterCollapseVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    className="flex flex-col items-center lg:items-end gap-2.5 sm:gap-3 w-full"
                                >
                                    <FilterList
                                        activeFilter={activeFilter}
                                        setActiveFilter={setActiveFilter}
                                        filters={filters}
                                    />
                                    <div className="flex items-center justify-center lg:justify-end gap-2.5 w-full">
                                        <ViewSwitcherButton />
                                        <SubheaderToggleButton />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
}

export { WorkPageHeader };
