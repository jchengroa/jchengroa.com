import React, { useState } from 'react';

const PAGE_SECTIONS = [
    { id: 'projects', label: 'Projects Page' },
    { id: 'research', label: 'Research Page' },
    { id: 'recognition', label: 'Recognition Page' },
    { id: 'contact', label: 'Contact & Socials' },
    { id: 'legal', label: 'Legal Page' },
    { id: 'changelog', label: 'Changelog Page' }
];

export default function PagesTab({ 
    projectsData = {}, 
    onChangeProjectsData,
    researchData = {}, 
    onChangeResearchData,
    recognitionData = {}, 
    onChangeRecognitionData,
    contactData = {}, 
    onChangeContactData,
    socialsData = {}, 
    onChangeSocialsData,
    legalData = {}, 
    onChangeLegalData,
    changelogData = {}, 
    onChangeChangelogData
}) {
    const [activeSubTab, setActiveSubTab] = useState('projects');

    const projectSections = projectsData.sections || {};

    const handleProjectSectionChange = (key, val) => {
        onChangeProjectsData({
            ...projectsData,
            sections: {
                ...projectSections,
                [key]: val
            }
        });
    };

    return (
        <div className="space-y-6">
            {/* Sub navigation pills */}
            <div className="flex gap-1.5 p-1.5 bg-gray-100 dark:bg-gray-800/60 rounded-2xl overflow-x-auto no-scrollbar">
                {PAGE_SECTIONS.map(tab => (
                    <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveSubTab(tab.id)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                            activeSubTab === tab.id
                                ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                                : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* PROJECTS PAGE PROMPTS */}
            {activeSubTab === 'projects' && (
                <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm space-y-6">
                    <div className="border-b border-gray-100 dark:border-gray-800 pb-4">
                        <div className="flex items-center gap-2">
                            <h3 className="text-base font-extrabold text-gray-900 dark:text-white">
                                Projects Page Headings & Category Prompts
                            </h3>
                            <code className="text-[11px] font-mono bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-md">
                                key: projects
                            </code>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                                Page Main Title
                            </label>
                            <input
                                type="text"
                                value={projectsData.title || ''}
                                onChange={(e) => onChangeProjectsData({ ...projectsData, title: e.target.value })}
                                placeholder="Projects"
                                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                                Page Subtitle / Tagline
                            </label>
                            <input
                                type="text"
                                value={projectsData.subtitle || ''}
                                onChange={(e) => onChangeProjectsData({ ...projectsData, subtitle: e.target.value })}
                                placeholder="A collection of hardware, software, and research engineering projects."
                                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>
                    </div>

                    {/* Section Categories */}
                    <div className="pt-2">
                        <label className="block text-xs font-black uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">
                            Category Section Headings (Sections)
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <span className="text-[11px] font-mono text-gray-400 block mb-1">sections.embedded</span>
                                <input
                                    type="text"
                                    value={projectSections.embedded || ''}
                                    onChange={(e) => handleProjectSectionChange('embedded', e.target.value)}
                                    placeholder="Embedded Systems"
                                    className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-bold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                                />
                            </div>
                            <div>
                                <span className="text-[11px] font-mono text-gray-400 block mb-1">sections.software</span>
                                <input
                                    type="text"
                                    value={projectSections.software || ''}
                                    onChange={(e) => handleProjectSectionChange('software', e.target.value)}
                                    placeholder="Software & Web Applications"
                                    className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-bold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                                />
                            </div>
                            <div>
                                <span className="text-[11px] font-mono text-gray-400 block mb-1">sections.hardware</span>
                                <input
                                    type="text"
                                    value={projectSections.hardware || ''}
                                    onChange={(e) => handleProjectSectionChange('hardware', e.target.value)}
                                    placeholder="Hardware & IoT"
                                    className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-bold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* RESEARCH PAGE PROMPTS */}
            {activeSubTab === 'research' && (
                <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm space-y-6">
                    <div className="border-b border-gray-100 dark:border-gray-800 pb-4">
                        <div className="flex items-center gap-2">
                            <h3 className="text-base font-extrabold text-gray-900 dark:text-white">
                                Research Page Headings
                            </h3>
                            <code className="text-[11px] font-mono bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-md">
                                key: research
                            </code>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                                Page Title
                            </label>
                            <input
                                type="text"
                                value={researchData.title || ''}
                                onChange={(e) => onChangeResearchData({ ...researchData, title: e.target.value })}
                                placeholder="Research"
                                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                                Page Subtitle / Description Prompt
                            </label>
                            <textarea
                                rows={3}
                                value={researchData.subtitle || ''}
                                onChange={(e) => onChangeResearchData({ ...researchData, subtitle: e.target.value })}
                                placeholder="A multidisciplinary overview of research papers, investigations, and applied technical studies."
                                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* RECOGNITION PAGE PROMPTS */}
            {activeSubTab === 'recognition' && (
                <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm space-y-6">
                    <div className="border-b border-gray-100 dark:border-gray-800 pb-4">
                        <div className="flex items-center gap-2">
                            <h3 className="text-base font-extrabold text-gray-900 dark:text-white">
                                Recognition & Awards Page Headings
                            </h3>
                            <code className="text-[11px] font-mono bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-md">
                                key: recognition
                            </code>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                                Page Title
                            </label>
                            <input
                                type="text"
                                value={recognitionData.title || ''}
                                onChange={(e) => onChangeRecognitionData({ ...recognitionData, title: e.target.value })}
                                placeholder="Recognition"
                                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                                Page Subtitle / Tagline
                            </label>
                            <textarea
                                rows={3}
                                value={recognitionData.subtitle || ''}
                                onChange={(e) => onChangeRecognitionData({ ...recognitionData, subtitle: e.target.value })}
                                placeholder="Achievements, awards, milestones, and community accolades."
                                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* CONTACT & SOCIALS PAGE PROMPTS */}
            {activeSubTab === 'contact' && (
                <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm space-y-6">
                    <div className="border-b border-gray-100 dark:border-gray-800 pb-4">
                        <div className="flex items-center gap-2">
                            <h3 className="text-base font-extrabold text-gray-900 dark:text-white">
                                Contact & Socials Page Prompts
                            </h3>
                            <code className="text-[11px] font-mono bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-md">
                                keys: contact & socials
                            </code>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                                Contact Page Title
                            </label>
                            <input
                                type="text"
                                value={contactData.title || ''}
                                onChange={(e) => onChangeContactData({ ...contactData, title: e.target.value })}
                                placeholder="Get In Touch"
                                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                                Socials Section Title
                            </label>
                            <input
                                type="text"
                                value={socialsData.title || ''}
                                onChange={(e) => onChangeSocialsData({ ...socialsData, title: e.target.value })}
                                placeholder="Socials"
                                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                                Contact Subtitle Prompt
                            </label>
                            <textarea
                                rows={2}
                                value={contactData.subtitle || ''}
                                onChange={(e) => onChangeContactData({ ...contactData, subtitle: e.target.value })}
                                placeholder="Have a question or want to collaborate? Send a message or connect through any channel below."
                                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                                Socials Subtitle Prompt
                            </label>
                            <textarea
                                rows={2}
                                value={socialsData.subtitle || ''}
                                onChange={(e) => onChangeSocialsData({ ...socialsData, subtitle: e.target.value })}
                                placeholder="Find and follow me on various platforms across the web."
                                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* LEGAL PAGE PROMPTS */}
            {activeSubTab === 'legal' && (
                <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm space-y-6">
                    <div className="border-b border-gray-100 dark:border-gray-800 pb-4">
                        <div className="flex items-center gap-2">
                            <h3 className="text-base font-extrabold text-gray-900 dark:text-white">
                                Domain & Legal Information
                            </h3>
                            <code className="text-[11px] font-mono bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-md">
                                key: legal
                            </code>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                                Legal Page Title
                            </label>
                            <input
                                type="text"
                                value={legalData.title || ''}
                                onChange={(e) => onChangeLegalData({ ...legalData, title: e.target.value })}
                                placeholder="Domain & Legal Information"
                                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                                Legal Content (Text / JSON)
                            </label>
                            <textarea
                                rows={6}
                                value={typeof legalData.content === 'string' ? legalData.content : JSON.stringify(legalData.content || {}, null, 2)}
                                onChange={(e) => {
                                    let val = e.target.value;
                                    try {
                                        const parsed = JSON.parse(val);
                                        onChangeLegalData({ ...legalData, content: parsed });
                                    } catch {
                                        onChangeLegalData({ ...legalData, content: val });
                                    }
                                }}
                                placeholder="Copyright notice, domain details, disclaimer statement..."
                                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-mono text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* CHANGELOG PAGE PROMPTS */}
            {activeSubTab === 'changelog' && (
                <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm space-y-6">
                    <div className="border-b border-gray-100 dark:border-gray-800 pb-4">
                        <div className="flex items-center gap-2">
                            <h3 className="text-base font-extrabold text-gray-900 dark:text-white">
                                Changelog Page Headings
                            </h3>
                            <code className="text-[11px] font-mono bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-md">
                                key: changelog
                            </code>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                                Changelog Page Title
                            </label>
                            <input
                                type="text"
                                value={changelogData.title || ''}
                                onChange={(e) => onChangeChangelogData({ ...changelogData, title: e.target.value })}
                                placeholder="Changelog"
                                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                                Changelog Page Subtitle Prompt
                            </label>
                            <textarea
                                rows={2}
                                value={changelogData.subtitle || ''}
                                onChange={(e) => onChangeChangelogData({ ...changelogData, subtitle: e.target.value })}
                                placeholder="A detailed chronicle of updates, feature enhancements, and system improvements."
                                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
