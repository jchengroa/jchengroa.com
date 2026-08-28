import React from 'react';

export default function HomeTab({ homeData = {}, onChangeHomeData }) {
    const hero = homeData.hero || {};
    const featuredProjects = homeData.featuredProjects || {};
    const featuredResearch = homeData.featuredResearch || {};
    const featuredRecognition = homeData.featuredRecognition || {};

    const handleHeroChange = (field, value) => {
        onChangeHomeData({
            ...homeData,
            hero: {
                ...hero,
                [field]: value
            }
        });
    };

    const handleSectionChange = (sectionKey, field, value) => {
        onChangeHomeData({
            ...homeData,
            [sectionKey]: {
                ...(homeData[sectionKey] || {}),
                [field]: value
            }
        });
    };

    return (
        <div className="space-y-8">
            {/* HERO SECTION PROMPTS */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm space-y-6">
                <div className="border-b border-gray-100 dark:border-gray-800 pb-4">
                    <div className="flex items-center gap-2">
                        <h2 className="text-lg font-black text-gray-900 dark:text-white tracking-tight">
                            Hero Main Section Prompts
                        </h2>
                        <code className="text-[11px] font-mono bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-md">
                            home.hero
                        </code>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Edit the primary introduction, tagline, bio dialogue, and call to action on the home screen.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                            Hero Title / Name Heading
                        </label>
                        <input
                            type="text"
                            value={hero.title || ''}
                            onChange={(e) => handleHeroChange('title', e.target.value)}
                            placeholder="John Carlo Cheng Roa"
                            className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                            Hero Subtitle / Tagline
                        </label>
                        <input
                            type="text"
                            value={hero.subtitle || ''}
                            onChange={(e) => handleHeroChange('subtitle', e.target.value)}
                            placeholder="Computer Engineer & Full-Stack Developer"
                            className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                            Hero Description / Bio Dialogue
                        </label>
                        <textarea
                            rows={3}
                            value={hero.description || ''}
                            onChange={(e) => handleHeroChange('description', e.target.value)}
                            placeholder="Brief description about what you do, build, and specialize in..."
                            className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                            Primary CTA Button Label
                        </label>
                        <input
                            type="text"
                            value={hero.cta || ''}
                            onChange={(e) => handleHeroChange('cta', e.target.value)}
                            placeholder="Get In Touch"
                            className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                            Direct Contact Email
                        </label>
                        <input
                            type="email"
                            value={hero.email || ''}
                            onChange={(e) => handleHeroChange('email', e.target.value)}
                            placeholder="johncarloproa@gmail.com"
                            className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>
                </div>
            </div>

            {/* FEATURED SECTIONS PROMPTS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Featured Projects Card */}
                <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm space-y-4">
                    <div className="border-b border-gray-100 dark:border-gray-800 pb-3">
                        <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
                            Home Section
                        </span>
                        <h3 className="text-base font-extrabold text-gray-900 dark:text-white">
                            Featured Projects
                        </h3>
                    </div>

                    <div className="space-y-3">
                        <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
                                Section Title
                            </label>
                            <input
                                type="text"
                                value={featuredProjects.title || ''}
                                onChange={(e) => handleSectionChange('featuredProjects', 'title', e.target.value)}
                                placeholder="Featured Projects"
                                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>
                        <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
                                Section Subtitle
                            </label>
                            <input
                                type="text"
                                value={featuredProjects.subtitle || ''}
                                onChange={(e) => handleSectionChange('featuredProjects', 'subtitle', e.target.value)}
                                placeholder="Select software & engineering builds"
                                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>
                        <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
                                Action Button Text
                            </label>
                            <input
                                type="text"
                                value={featuredProjects.button || ''}
                                onChange={(e) => handleSectionChange('featuredProjects', 'button', e.target.value)}
                                placeholder="Explore All Projects"
                                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>
                    </div>
                </div>

                {/* Featured Research Card */}
                <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm space-y-4">
                    <div className="border-b border-gray-100 dark:border-gray-800 pb-3">
                        <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
                            Home Section
                        </span>
                        <h3 className="text-base font-extrabold text-gray-900 dark:text-white">
                            Featured Research
                        </h3>
                    </div>

                    <div className="space-y-3">
                        <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
                                Section Title
                            </label>
                            <input
                                type="text"
                                value={featuredResearch.title || ''}
                                onChange={(e) => handleSectionChange('featuredResearch', 'title', e.target.value)}
                                placeholder="Featured Research"
                                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>
                        <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
                                Section Subtitle
                            </label>
                            <input
                                type="text"
                                value={featuredResearch.subtitle || ''}
                                onChange={(e) => handleSectionChange('featuredResearch', 'subtitle', e.target.value)}
                                placeholder="Academic publications & findings"
                                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>
                        <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
                                Action Button Text
                            </label>
                            <input
                                type="text"
                                value={featuredResearch.button || ''}
                                onChange={(e) => handleSectionChange('featuredResearch', 'button', e.target.value)}
                                placeholder="View All Publications"
                                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>
                    </div>
                </div>

                {/* Featured Recognition Card */}
                <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm space-y-4">
                    <div className="border-b border-gray-100 dark:border-gray-800 pb-3">
                        <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
                            Home Section
                        </span>
                        <h3 className="text-base font-extrabold text-gray-900 dark:text-white">
                            Featured Recognition
                        </h3>
                    </div>

                    <div className="space-y-3">
                        <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
                                Section Title
                            </label>
                            <input
                                type="text"
                                value={featuredRecognition.title || ''}
                                onChange={(e) => handleSectionChange('featuredRecognition', 'title', e.target.value)}
                                placeholder="Featured Recognition"
                                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>
                        <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
                                Section Subtitle
                            </label>
                            <input
                                type="text"
                                value={featuredRecognition.subtitle || ''}
                                onChange={(e) => handleSectionChange('featuredRecognition', 'subtitle', e.target.value)}
                                placeholder="Honors, awards, and milestones"
                                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>
                        <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
                                Action Button Text
                            </label>
                            <input
                                type="text"
                                value={featuredRecognition.button || ''}
                                onChange={(e) => handleSectionChange('featuredRecognition', 'button', e.target.value)}
                                placeholder="View All Awards"
                                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
