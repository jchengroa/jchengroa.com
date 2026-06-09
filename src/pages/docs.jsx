import { useState } from "react";
import { Link } from "react-router-dom";
import { Title, SearchBar, ViewSwitcherButton, UniversalListCard, SubheaderToggleButton, useSubheaderToggle } from "../components/components.jsx";
import { motion, AnimatePresence } from 'framer-motion';
import { docsList, docsSections, docsPageContent } from "../data/docs";
import { useViewSwitcher } from "../utils/viewSwitcher";
import DocsOutline from "../components/docsOutline";
import Fuse from 'fuse.js';

const iconLibrary = {
  rocket:   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>,
  package:  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.89 1.45 21 5.95v12.1l-8.11 4.5-8.11-4.5V5.95Z"/><path d="m3 5.95 9 4.5"/><path d="m21 5.95-9 4.5"/><path d="M12 10.45v11.1"/></svg>,
  wrench:   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
  folder:   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/></svg>,
  layers:   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a2 2 0 0 0 0 3.64l8.57 3.91a2 2 0 0 0 1.66 0l8.57-3.9a2 2 0 0 0 0-3.64Z"/><path d="m22 12.5-8.57 3.91a2 2 0 0 1-1.66 0L3.17 12.5"/><path d="m22 18-8.57 3.9a2 2 0 0 1-1.66 0L3.17 18"/></svg>,
  chart:    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>,
  book:     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 5h10"/><path d="M6 9h10"/><path d="M6 13h6"/></svg>,
  shield:   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.06 1.06 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>,
  code:     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  zap:      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  globe:    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>,
  puzzle:   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.611a2.404 2.404 0 0 1-1.705.706 2.404 2.404 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.404 2.404 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.315 8.685a.98.98 0 0 1 .837-.276c.47.07.802.48.968.925a2.501 2.501 0 1 0 3.214-3.214c-.446-.166-.855-.497-.925-.968a.979.979 0 0 1 .276-.837l1.61-1.611a2.404 2.404 0 0 1 1.705-.706c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.967 1.02Z"/></svg>,
  git:      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><path d="M18 9v2a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9"/><path d="M12 12v3"/></svg>,
  server:   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/></svg>,
  cloud:    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>,
  cpu:      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></svg>,
  database: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/></svg>,
  terminal: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/></svg>
};

const iconColorMap = {
  blue:   "from-blue-500 to-blue-700 bg-blue-50 text-blue-600 dark:from-blue-400 dark:to-blue-600 dark:bg-blue-950/40 dark:text-blue-400",
  green:  "from-emerald-500 to-emerald-700 bg-emerald-50 text-emerald-600 dark:from-emerald-400 dark:to-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400",
  amber:  "from-amber-500 to-amber-700 bg-amber-50 text-amber-600 dark:from-amber-400 dark:to-amber-600 dark:bg-amber-950/40 dark:text-amber-400",
  purple: "from-purple-500 to-purple-700 bg-purple-50 text-purple-600 dark:from-purple-400 dark:to-purple-600 dark:bg-purple-950/40 dark:text-purple-400",
  indigo: "from-indigo-500 to-indigo-700 bg-indigo-50 text-indigo-600 dark:from-indigo-400 dark:to-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400",
  red:    "from-red-500 to-red-700 bg-red-50 text-red-600 dark:from-red-400 dark:to-red-600 dark:bg-red-950/40 dark:text-red-400",
  pink:   "from-pink-500 to-pink-700 bg-pink-50 text-pink-600 dark:from-pink-400 dark:to-pink-600 dark:bg-pink-950/40 dark:text-pink-400",
  orange: "from-orange-500 to-orange-700 bg-orange-50 text-orange-600 dark:from-orange-400 dark:to-orange-600 dark:bg-orange-950/40 dark:text-orange-400",
  sky:    "from-sky-500 to-sky-700 bg-sky-50 text-sky-600 dark:from-sky-400 dark:to-sky-600 dark:bg-sky-950/40 dark:text-sky-400",
  violet: "from-violet-500 to-violet-700 bg-violet-50 text-violet-600 dark:from-violet-400 dark:to-violet-600 dark:bg-violet-950/40 dark:text-violet-400",
  slate:  "from-slate-500 to-slate-700 bg-slate-50 text-slate-600 dark:from-slate-400 dark:to-slate-600 dark:bg-slate-950/40 dark:text-slate-400"
};

function DocCard({ doc, id }) {
  const iconEl = iconLibrary[doc.icon] || iconLibrary.book;
  const colorClasses = iconColorMap[doc.iconColor] || iconColorMap.blue;

  return (
    <div id={id} className="block group h-full scroll-mt-36">
      <Link to={`/${doc.id}`} className="block h-full">
        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 shadow-sm hover:shadow-3xl transition-all duration-500 h-full flex flex-col overflow-hidden relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 transition duration-500"></div>

          <div className="relative z-10 flex-grow flex flex-col flex-1">
            <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6 transition-transform duration-300 group-hover:scale-110 ${colorClasses.split(' ').filter(c => c.includes('bg-') || c.includes('text-')).join(' ')}`}>
              {iconEl}
            </div>

            <span className="text-xs font-black tracking-[0.2em] uppercase mb-3 text-gray-400 dark:text-gray-500">
              {docsSections.find(s => s.id === doc.section)?.title || doc.section}
            </span>

            <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-4 tracking-tighter leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {doc.title}
            </h2>

            <p className="text-gray-500 text-base font-medium leading-relaxed mb-8 opacity-80 group-hover:opacity-100 transition-opacity flex-grow">
              {doc.description}
            </p>

            {doc.tech && doc.tech.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {doc.tech.map((t, idx) => (
                  <span key={idx} className="px-3 py-1 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-lg text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {t}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center text-blue-600 font-black text-lg group-hover:translate-x-2 transition-transform duration-300">
              Read docs
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="ml-2"><path d="m9 18 6-6-6-6"/></svg>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

function Docs() {
  const [searchQuery, setSearchQuery] = useState("");
  const { view } = useViewSwitcher();
  const { isVisible } = useSubheaderToggle();

  const isSearchingText = searchQuery.trim() !== "";

  const filterDocs = () => {
    if (searchQuery.trim() === "") return docsList;
    const fuse = new Fuse(docsList, {
      keys: ['title', 'description', 'tech'],
      threshold: 0.3
    });
    return fuse.search(searchQuery).map(result => result.item);
  };

  const filteredDocs = filterDocs();

  return (
    <div className="flex w-full min-h-[calc(100vh-64px)] items-start">
      {!isSearchingText && (
        <DocsOutline sections={docsSections} docs={filteredDocs} />
      )}

      <section
        id="docs"
        className="flex-1 min-w-0 relative flex flex-col items-center pt-16 pb-20 px-6 overflow-hidden"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none opacity-20 dark:opacity-10">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-emerald-200 dark:bg-emerald-900 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-700"></div>
        </div>

        <div className="w-full z-10 flex flex-col items-center max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="relative text-center w-full max-w-4xl mb-16">
            <Title
              title={docsPageContent.title}
              subtitle={docsPageContent.subtitle}
            />

            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            <AnimatePresence>
              {!isSearchingText && (
                <motion.div key="controls" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="flex flex-wrap items-center justify-center gap-4 mt-6">
                  <ViewSwitcherButton />
                  <SubheaderToggleButton />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        <div className="space-y-24">
          {isSearchingText ? (
            <DocSection
              title={`Search Results (${filteredDocs.length})`}
              docs={filteredDocs}
              view={view}
              delay={100}
              hideHeader={false}
              isVisible={true}
            />
          ) : (
            docsSections.map((section, idx) => {
              const sectionDocs = filteredDocs.filter(d => d.section === section.id);
              if (sectionDocs.length === 0) return null;
              return (
                <DocSection
                  key={section.id}
                  id={section.id}
                  title={section.title}
                  description={section.description}
                  docs={sectionDocs}
                  view={view}
                  delay={200 + idx * 150}
                  isVisible={isVisible}
                />
              );
            })
          )}
        </div>

        {filteredDocs.length === 0 && (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="text-center py-20">
            <h3 className="text-2xl font-black text-gray-400 dark:text-gray-500">{docsPageContent.noResults.title}</h3>
            <p className="text-gray-500 dark:text-gray-600 mt-2">{docsPageContent.noResults.subtitle}</p>
          </motion.div>
        )}
        </div>
      </section>
    </div>
  );
}

function DocSection({ id, title, description, docs, view, delay, hideHeader, isVisible }) {
  return (
    <motion.div
      id={`section-${id}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: delay / 1000 }}
      className="w-full max-w-6xl space-y-10 scroll-mt-36"
    >
      {!hideHeader && (
        <div className="border-l-4 border-blue-600 pl-6 mb-8">
          <h3 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight mb-2">{title}</h3>
          <AnimatePresence>
            {isVisible && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="text-gray-500 dark:text-gray-400 font-medium max-w-2xl overflow-hidden mt-1"
              >
                {description}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      )}

      <div className={view === 'list' ? "grid grid-cols-1 gap-4" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"}>
        {docs.map((doc, index) => (
          <div key={doc.id} className="hover:translate-y-[-8px] transition-transform duration-300" style={{ transitionDelay: `${index * 100}ms` }}>
            {view === 'list' ? (
              <UniversalListCard
                id={doc.id}
                title={doc.title}
                info={docsSections.find(s => s.id === doc.section)?.title || doc.section}
                tech={doc.tech}
                description={doc.description}
                linkURL={`/${doc.id}`}
                linkName="View Docs"
                category={doc.section}
                linkTo={`/${doc.id}`}
              />
            ) : (
              <DocCard doc={doc} id={`doc-${doc.id}`} />
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default Docs;
