import React, { useState } from 'react';
import SectionCardHeader from '../components/SectionCardHeader.jsx';

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
    savedProjectsData = {},
    researchData = {}, 
    onChangeResearchData,
    savedResearchData = {},
    recognitionData = {}, 
    onChangeRecognitionData,
    savedRecognitionData = {},
    contactData = {}, 
    onChangeContactData,
    savedContactData = {},
    socialsData = {}, 
    onChangeSocialsData,
    savedSocialsData = {},
    legalData = {}, 
    onChangeLegalData,
    savedLegalData = {},
    changelogData = {}, 
    onChangeChangelogData,
    savedChangelogData = {},
    onSaveKey,
    saving = false
}) {
    const [activeSubTab, setActiveSubTab] = useState('projects');

    const projectSections = projectsData.sections || {};

    const isProjectsChanged = JSON.stringify(projectsData) !== JSON.stringify(savedProjectsData);
    const isResearchChanged = JSON.stringify(researchData) !== JSON.stringify(savedResearchData);
    const isRecognitionChanged = JSON.stringify(recognitionData) !== JSON.stringify(savedRecognitionData);
    const isContactChanged = JSON.stringify(contactData) !== JSON.stringify(savedContactData);
    const isSocialsChanged = JSON.stringify(socialsData) !== JSON.stringify(savedSocialsData);
    const isLegalChanged = JSON.stringify(legalData) !== JSON.stringify(savedLegalData);
    const isChangelogChanged = JSON.stringify(changelogData) !== JSON.stringify(savedChangelogData);

    const hasSubtabUnsaved = (id) => {
        if (id === 'projects') return isProjectsChanged;
        if (id === 'research') return isResearchChanged;
        if (id === 'recognition') return isRecognitionChanged;
        if (id === 'contact') return isContactChanged || isSocialsChanged;
        if (id === 'legal') return isLegalChanged;
        if (id === 'changelog') return isChangelogChanged;
        return false;
    };

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
        <div className="space-y-5 sm:space-y-6">
            {/* Sub navigation pills */}
            <div className="flex gap-1.5 p-1.5 bg-gray-100 dark:bg-gray-800/60 rounded-xl sm:rounded-2xl overflow-x-auto no-scrollbar">
                {PAGE_SECTIONS.map(tab => (
                    <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveSubTab(tab.id)}
                        className={`px-3.5 py-2.5 sm:py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                            activeSubTab === tab.id
                                ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-xs'
                                : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                        }`}
                    >
                        <span>{tab.label}</span>
                        {hasSubtabUnsaved(tab.id) && (
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                        )}
                    </button>
                ))}
            </div>

            {/* PROJECTS PAGE PROMPTS */}
            {activeSubTab === 'projects' && (
                <div className="p-4 sm:p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm space-y-5 sm:space-y-6">
                    <SectionCardHeader
                        title="Projects Page Headings & Categories"
                        keyBadge="key: projects"
                        description="Main title, subtitle, and hardware/software section categories for /projects."
                        hasUnsaved={isProjectsChanged}
                        onUpload={() => onSaveKey && onSaveKey('projects', projectsData)}
                        isSaving={saving}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                                Page Main Title
                            </label>
                            <input
                                type="text"
                                value={projectsData.title || ''}
                                onChange={(e) => onChangeProjectsData({ ...projectsData, title: e.target.value })}
                                placeholder="Projects"
                                className="w-full px-3.5 py-2.5 sm:py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm sm:text-xs font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
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
                                className="w-full px-3.5 py-2.5 sm:py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm sm:text-xs font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>
                    </div>

                    {/* Section Categories */}
                    <div className="pt-2">
                        <label className="block text-xs font-black uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2 sm:mb-3">
                            Category Section Headings (Sections)
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                            <div>
                                <span className="text-[11px] font-mono text-gray-400 block mb-1">sections.embedded</span>
                                <input
                                    type="text"
                                    value={projectSections.embedded || ''}
                                    onChange={(e) => handleProjectSectionChange('embedded', e.target.value)}
                                    placeholder="Embedded Systems"
                                    className="w-full px-3.5 py-2.5 sm:py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm sm:text-xs font-bold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                                />
                            </div>
                            <div>
                                <span className="text-[11px] font-mono text-gray-400 block mb-1">sections.software</span>
                                <input
                                    type="text"
                                    value={projectSections.software || ''}
                                    onChange={(e) => handleProjectSectionChange('software', e.target.value)}
                                    placeholder="Software & Web Applications"
                                    className="w-full px-3.5 py-2.5 sm:py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm sm:text-xs font-bold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                                />
                            </div>
                            <div>
                                <span className="text-[11px] font-mono text-gray-400 block mb-1">sections.hardware</span>
                                <input
                                    type="text"
                                    value={projectSections.hardware || ''}
                                    onChange={(e) => handleProjectSectionChange('hardware', e.target.value)}
                                    placeholder="Hardware & IoT"
                                    className="w-full px-3.5 py-2.5 sm:py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm sm:text-xs font-bold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* RESEARCH PAGE PROMPTS */}
            {activeSubTab === 'research' && (
                <div className="p-4 sm:p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm space-y-5 sm:space-y-6">
                    <SectionCardHeader
                        title="Research Page Headings"
                        keyBadge="key: research"
                        description="Page title and subtitle displayed on the research index."
                        hasUnsaved={isResearchChanged}
                        onUpload={() => onSaveKey && onSaveKey('research', researchData)}
                        isSaving={saving}
                    />

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                                Page Main Title
                            </label>
                            <input
                                type="text"
                                value={researchData.title || ''}
                                onChange={(e) => onChangeResearchData({ ...researchData, title: e.target.value })}
                                placeholder="Research"
                                className="w-full px-3.5 py-2.5 sm:py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm sm:text-xs font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                                Page Subtitle / Tagline
                            </label>
                            <textarea
                                rows={3}
                                value={researchData.subtitle || ''}
                                onChange={(e) => onChangeResearchData({ ...researchData, subtitle: e.target.value })}
                                placeholder="Academic papers, conference proceedings, and engineering inquiries."
                                className="w-full px-3.5 py-2.5 sm:py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm sm:text-xs font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* RECOGNITION PAGE PROMPTS */}
            {activeSubTab === 'recognition' && (
                <div className="p-4 sm:p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm space-y-5 sm:space-y-6">
                    <SectionCardHeader
                        title="Awards & Recognition Page Headings"
                        keyBadge="key: recognition"
                        description="Page title and subtitle displayed on the awards section."
                        hasUnsaved={isRecognitionChanged}
                        onUpload={() => onSaveKey && onSaveKey('recognition', recognitionData)}
                        isSaving={saving}
                    />

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
                                className="w-full px-3.5 py-2.5 sm:py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm sm:text-xs font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
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
                                className="w-full px-3.5 py-2.5 sm:py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm sm:text-xs font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* CONTACT & SOCIALS PAGE PROMPTS */}
            {activeSubTab === 'contact' && (
                <div className="space-y-6">
                    {/* Contact Prompts */}
                    <div className="p-4 sm:p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm space-y-5">
                        <SectionCardHeader
                            title="Contact Page Prompts"
                            keyBadge="key: contact"
                            description="Headings and microcopy for the main contact form."
                            hasUnsaved={isContactChanged}
                            onUpload={() => onSaveKey && onSaveKey('contact', contactData)}
                            isSaving={saving}
                        />

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                                    Contact Page Title
                                </label>
                                <input
                                    type="text"
                                    value={contactData.title || ''}
                                    onChange={(e) => onChangeContactData({ ...contactData, title: e.target.value })}
                                    placeholder="Get In Touch"
                                    className="w-full px-3.5 py-2.5 sm:py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm sm:text-xs font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                                    Contact Subtitle Prompt
                                </label>
                                <textarea
                                    rows={2}
                                    value={contactData.subtitle || ''}
                                    onChange={(e) => onChangeContactData({ ...contactData, subtitle: e.target.value })}
                                    placeholder="Have a question or want to collaborate? Send a message or connect through any channel below."
                                    className="w-full px-3.5 py-2.5 sm:py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm sm:text-xs font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Socials Prompts */}
                    <div className="p-4 sm:p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm space-y-5">
                        <SectionCardHeader
                            title="Socials Section Prompts"
                            keyBadge="key: socials"
                            description="Headings and descriptions for external profiles."
                            hasUnsaved={isSocialsChanged}
                            onUpload={() => onSaveKey && onSaveKey('socials', socialsData)}
                            isSaving={saving}
                        />

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                                    Socials Section Title
                                </label>
                                <input
                                    type="text"
                                    value={socialsData.title || ''}
                                    onChange={(e) => onChangeSocialsData({ ...socialsData, title: e.target.value })}
                                    placeholder="Socials"
                                    className="w-full px-3.5 py-2.5 sm:py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm sm:text-xs font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                                    Socials Subtitle Prompt
                                </label>
                                <textarea
                                    rows={2}
                                    value={socialsData.subtitle || ''}
                                    onChange={(e) => onChangeSocialsData({ ...socialsData, subtitle: e.target.value })}
                                    placeholder="Find and follow me on various platforms across the web."
                                    className="w-full px-3.5 py-2.5 sm:py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm sm:text-xs font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* LEGAL PAGE PROMPTS */}
            {activeSubTab === 'legal' && (
                <div className="p-4 sm:p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm space-y-5 sm:space-y-6">
                    <SectionCardHeader
                        title="Domain & Legal Information"
                        keyBadge="key: legal"
                        description="Legal notice and disclaimer text on /legal."
                        hasUnsaved={isLegalChanged}
                        onUpload={() => onSaveKey && onSaveKey('legal', legalData)}
                        isSaving={saving}
                    />

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
                                className="w-full px-3.5 py-2.5 sm:py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm sm:text-xs font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
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
                                className="w-full px-3.5 py-2.5 sm:py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-mono text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* CHANGELOG PAGE PROMPTS */}
            {activeSubTab === 'changelog' && (
                <div className="p-4 sm:p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm space-y-5 sm:space-y-6">
                    <SectionCardHeader
                        title="Changelog Page Headings"
                        keyBadge="key: changelog"
                        description="Main title and subtitle displayed on /changelog."
                        hasUnsaved={isChangelogChanged}
                        onUpload={() => onSaveKey && onSaveKey('changelog', changelogData)}
                        isSaving={saving}
                    />

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
                                className="w-full px-3.5 py-2.5 sm:py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm sm:text-xs font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
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
                                className="w-full px-3.5 py-2.5 sm:py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm sm:text-xs font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
