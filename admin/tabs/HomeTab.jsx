import React from 'react';
import SectionCardHeader from '../components/SectionCardHeader.jsx';
import { LuUpload, LuCheck } from 'react-icons/lu';

export default function HomeTab({ 
    homeData = {}, 
    onChangeHomeData, 
    savedHomeData = {}, 
    onSaveSection,
    saving = false 
}) {
    const hero = homeData.hero || {};
    const featuredProjects = homeData.featuredProjects || {};
    const featuredResearch = homeData.featuredResearch || {};
    const featuredRecognition = homeData.featuredRecognition || {};

    const savedHero = savedHomeData.hero || {};
    const savedProjects = savedHomeData.featuredProjects || {};
    const savedResearch = savedHomeData.featuredResearch || {};
    const savedRecognition = savedHomeData.featuredRecognition || {};

    const isHeroChanged = JSON.stringify(hero) !== JSON.stringify(savedHero);
    const isProjectsChanged = JSON.stringify(featuredProjects) !== JSON.stringify(savedProjects);
    const isResearchChanged = JSON.stringify(featuredResearch) !== JSON.stringify(savedResearch);
    const isRecognitionChanged = JSON.stringify(featuredRecognition) !== JSON.stringify(savedRecognition);

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
        <div className="space-y-6 sm:space-y-8">
            {/* HERO SECTION PROMPTS */}
            <div className="p-4 sm:p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm space-y-5 sm:space-y-6">
                <SectionCardHeader
                    title="Hero Main Section Prompts"
                    keyBadge="home.hero"
                    description="Edit the primary introduction, tagline, bio dialogue, and call to action on the home screen."
                    hasUnsaved={isHeroChanged}
                    onUpload={() => onSaveSection && onSaveSection('hero', hero)}
                    isSaving={saving}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                            Hero Title / Name Heading
                        </label>
                        <input
                            type="text"
                            value={hero.title || ''}
                            onChange={(e) => handleHeroChange('title', e.target.value)}
                            placeholder="John Carlo Cheng Roa"
                            className="w-full px-3.5 py-2.5 sm:py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
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
                            className="w-full px-3.5 py-2.5 sm:py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
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
                            className="w-full px-3.5 py-2.5 sm:py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
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
                            className="w-full px-3.5 py-2.5 sm:py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
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
                            className="w-full px-3.5 py-2.5 sm:py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>
                </div>
            </div>

            {/* FEATURED SECTIONS PROMPTS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                {/* Featured Projects Card */}
                <div className="p-4 sm:p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm space-y-4">
                    <div className="border-b border-gray-100 dark:border-gray-800 pb-3 flex items-center justify-between gap-2">
                        <div>
                            <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                                Home Section
                            </span>
                            <h3 className="text-sm sm:text-base font-extrabold text-gray-900 dark:text-white">
                                Featured Projects
                            </h3>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                            {isProjectsChanged ? (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/60 text-amber-700 dark:text-amber-300 text-[10px] font-bold">
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                                    Unsaved
                                </span>
                            ) : (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 text-[10px] font-semibold">
                                    <LuCheck size={10} strokeWidth={3} className="text-emerald-500" />
                                    Saved
                                </span>
                            )}
                            <button
                                type="button"
                                onClick={() => onSaveSection && onSaveSection('featuredProjects', featuredProjects)}
                                disabled={!isProjectsChanged || saving}
                                className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                    isProjectsChanged
                                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                                        : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed opacity-50'
                                }`}
                                title="Upload Featured Projects changes"
                            >
                                <LuUpload size={13} strokeWidth={2.5} />
                            </button>
                        </div>
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
                                className="w-full px-3.5 py-2.5 sm:py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm sm:text-xs font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
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
                                className="w-full px-3.5 py-2.5 sm:py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm sm:text-xs font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
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
                                className="w-full px-3.5 py-2.5 sm:py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm sm:text-xs font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>
                    </div>
                </div>

                {/* Featured Research Card */}
                <div className="p-4 sm:p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm space-y-4">
                    <div className="border-b border-gray-100 dark:border-gray-800 pb-3 flex items-center justify-between gap-2">
                        <div>
                            <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                                Home Section
                            </span>
                            <h3 className="text-sm sm:text-base font-extrabold text-gray-900 dark:text-white">
                                Featured Research
                            </h3>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                            {isResearchChanged ? (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/60 text-amber-700 dark:text-amber-300 text-[10px] font-bold">
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                                    Unsaved
                                </span>
                            ) : (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 text-[10px] font-semibold">
                                    <LuCheck size={10} strokeWidth={3} className="text-emerald-500" />
                                    Saved
                                </span>
                            )}
                            <button
                                type="button"
                                onClick={() => onSaveSection && onSaveSection('featuredResearch', featuredResearch)}
                                disabled={!isResearchChanged || saving}
                                className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                    isResearchChanged
                                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                                        : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed opacity-50'
                                }`}
                                title="Upload Featured Research changes"
                            >
                                <LuUpload size={13} strokeWidth={2.5} />
                            </button>
                        </div>
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
                                className="w-full px-3.5 py-2.5 sm:py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm sm:text-xs font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
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
                                className="w-full px-3.5 py-2.5 sm:py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm sm:text-xs font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
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
                                className="w-full px-3.5 py-2.5 sm:py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm sm:text-xs font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>
                    </div>
                </div>

                {/* Featured Recognition Card */}
                <div className="p-4 sm:p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm space-y-4">
                    <div className="border-b border-gray-100 dark:border-gray-800 pb-3 flex items-center justify-between gap-2">
                        <div>
                            <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                                Home Section
                            </span>
                            <h3 className="text-sm sm:text-base font-extrabold text-gray-900 dark:text-white">
                                Featured Recognition
                            </h3>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                            {isRecognitionChanged ? (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/60 text-amber-700 dark:text-amber-300 text-[10px] font-bold">
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                                    Unsaved
                                </span>
                            ) : (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 text-[10px] font-semibold">
                                    <LuCheck size={10} strokeWidth={3} className="text-emerald-500" />
                                    Saved
                                </span>
                            )}
                            <button
                                type="button"
                                onClick={() => onSaveSection && onSaveSection('featuredRecognition', featuredRecognition)}
                                disabled={!isRecognitionChanged || saving}
                                className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                    isRecognitionChanged
                                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                                        : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed opacity-50'
                                }`}
                                title="Upload Featured Recognition changes"
                            >
                                <LuUpload size={13} strokeWidth={2.5} />
                            </button>
                        </div>
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
                                className="w-full px-3.5 py-2.5 sm:py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm sm:text-xs font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
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
                                className="w-full px-3.5 py-2.5 sm:py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm sm:text-xs font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
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
                                className="w-full px-3.5 py-2.5 sm:py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm sm:text-xs font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
