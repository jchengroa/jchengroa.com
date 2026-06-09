import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import { docsList, docsSections } from "../data/docs";
import DocsOutline from "./docsOutline";

const iconLibrary = {
  rocket:   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>,
  package:  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.89 1.45 21 5.95v12.1l-8.11 4.5-8.11-4.5V5.95Z"/><path d="m3 5.95 9 4.5"/><path d="m21 5.95-9 4.5"/><path d="M12 10.45v11.1"/></svg>,
  wrench:   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
  folder:   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/></svg>,
  layers:   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a2 2 0 0 0 0 3.64l8.57 3.91a2 2 0 0 0 1.66 0l8.57-3.9a2 2 0 0 0 0-3.64Z"/><path d="m22 12.5-8.57 3.91a2 2 0 0 1-1.66 0L3.17 12.5"/><path d="m22 18-8.57 3.9a2 2 0 0 1-1.66 0L3.17 18"/></svg>,
  chart:    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>,
  book:     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 5h10"/><path d="M6 9h10"/><path d="M6 13h6"/></svg>,
  shield:   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.06 1.06 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>,
  code:     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  zap:      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  globe:    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>,
  puzzle:   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.611a2.404 2.404 0 0 1-1.705.706 2.404 2.404 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.404 2.404 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.315 8.685a.98.98 0 0 1 .837-.276c.47.07.802.48.968.925a2.501 2.501 0 1 0 3.214-3.214c-.446-.166-.855-.497-.925-.968a.979.979 0 0 1 .276-.837l1.61-1.611a2.404 2.404 0 0 1 1.705-.706c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.967 1.02Z"/></svg>,
  git:      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><path d="M18 9v2a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9"/><path d="M12 12v3"/></svg>,
  server:   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/></svg>,
  cloud:    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>,
  cpu:      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></svg>,
  database: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/></svg>,
  terminal: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/></svg>
};

const iconColorMap = {
  blue:   "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400",
  green:  "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400",
  amber:  "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400",
  purple: "bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400",
  indigo: "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400",
  red:    "bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400",
  pink:   "bg-pink-50 text-pink-600 dark:bg-pink-950/40 dark:text-pink-400",
  orange: "bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400",
  sky:    "bg-sky-50 text-sky-600 dark:bg-sky-950/40 dark:text-sky-400",
  violet: "bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-400",
  slate:  "bg-slate-50 text-slate-600 dark:bg-slate-950/40 dark:text-slate-400"
};

function CodeBlock({ code, language }) {
  const [copied, setCopied] = useState(false);
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-gray-950 dark:bg-black relative group shadow-lg">
      <div className="flex items-center justify-between px-5 py-2.5 bg-gray-900/80 dark:bg-zinc-900/80 border-b border-gray-900 dark:border-zinc-900">
        <span className="text-[10px] font-black uppercase text-gray-500 tracking-wider font-mono">{language || 'code'}</span>
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-1.5 px-3 py-1 bg-gray-900 dark:bg-zinc-900 hover:bg-gray-800 dark:hover:bg-zinc-800 text-gray-400 hover:text-white rounded-lg text-xs font-bold transition-all"
        >
          {copied ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-5 overflow-x-auto text-sm font-mono text-zinc-100 leading-relaxed text-left">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function renderDocText(text) {
  if (!text) return null;
  const parts = text.split(/```/g);
  return parts.map((part, index) => {
    if (index % 2 === 1) {
      const lines = part.split('\n');
      let language = "";
      let codeContent = part;
      if (lines[0] && !lines[0].includes(' ') && lines[0].length < 15) {
        language = lines[0];
        codeContent = lines.slice(1).join('\n');
      }
      return (
        <CodeBlock key={index} code={codeContent.trim()} language={language} />
      );
    } else {
      const inlineParts = part.split(/`([^`]+)`/g);
      return (
        <span key={index}>
          {inlineParts.map((inlinePart, inlineIndex) => {
            if (inlineIndex % 2 === 1) {
              return (
                <code key={inlineIndex} className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 text-rose-600 dark:text-rose-400 font-mono text-xs rounded border border-gray-200 dark:border-gray-700">
                  {inlinePart}
                </code>
              );
            }
            return inlinePart;
          })}
        </span>
      );
    }
  });
}

export default function DocDetail() {
  const { id } = useParams();
  const doc = docsList.find(d => d.id === id);
  const [feedback, setFeedback] = useState(null);
  const [shared, setShared] = useState(false);
  const [activeHeading, setActiveHeading] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      if (!doc || !doc.outline) return;
      const ids = [];
      doc.outline.forEach((h, idx) => {
        ids.push(`doc-${doc.id}--${h.id || idx}`);
        if (h.sub) {
          h.sub.forEach((_, si) => {
            ids.push(`doc-${doc.id}--${h.id || idx}--${si}`);
          });
        }
      });

      let bestId = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 160 && rect.bottom > 0) {
          bestId = id;
        }
      }
      if (bestId) {
        setActiveHeading(bestId);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [doc]);

  if (!doc) {
    return (
      <section className="min-h-screen pt-32 pb-20 px-6 flex flex-col items-center bg-gray-50/50 dark:bg-gray-950">
        <div className="text-center py-20">
          <h2 className="text-3xl font-black text-gray-400 dark:text-gray-500 mb-2">Documentation Not Found</h2>
          <p className="text-gray-500 dark:text-gray-600 mb-8">The documentation you're looking for doesn't exist.</p>
          <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl font-black text-sm hover:scale-105 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            Back to Documentation
          </Link>
        </div>
      </section>
    );
  }

  const iconEl = iconLibrary[doc.icon] || iconLibrary.book;
  const colorClasses = iconColorMap[doc.iconColor] || iconColorMap.blue;
  const sectionName = docsSections.find(s => s.id === doc.section)?.title || doc.section;
  const content = doc.content || { intro: "", sections: [] };

  const prevDoc = docsList[docsList.indexOf(doc) - 1];
  const nextDoc = docsList[docsList.indexOf(doc) + 1];

  const words = JSON.stringify(doc.content).split(/\s+/).length;
  const readTime = Math.ceil(words / 200);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  return (
    <div className="flex w-full min-h-[calc(100vh-64px)] items-start">
      <DocsOutline sections={docsSections} docs={docsList} />

      <section
        id="doc-detail"
        className="flex-1 min-w-0 relative flex flex-col items-center pt-16 pb-20 px-6 overflow-hidden"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none opacity-20 dark:opacity-10">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-emerald-200 dark:bg-emerald-900 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-700"></div>
        </div>

        <div className="w-full z-10 flex items-start justify-center max-w-6xl mx-auto gap-10">
          {/* Main Content Column */}
          <div className="flex-1 min-w-0 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full"
            >
              {/* Breadcrumb & Actions */}
              <div className="flex items-center justify-between mb-6">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 text-base font-black text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-0.5 transition-transform"><path d="m15 18-6-6 6-6"/></svg>
                  Documentation
                </Link>

                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-gray-900 border-2 border-gray-150 dark:border-gray-800 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500 dark:hover:border-blue-500 font-black text-sm rounded-2xl shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  {shared ? (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      <span className="text-emerald-500 font-black">Link Copied!</span>
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" x2="12" y1="2" y2="15"/></svg>
                      <span>Share Page</span>
                    </>
                  )}
                </button>
              </div>

              {/* Header */}
              <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-10 shadow-sm mb-12">
                <div className="flex items-start gap-5">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl flex-shrink-0 ${colorClasses}`}>
                    {iconEl}
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-black tracking-[0.2em] text-blue-600 dark:text-blue-400 uppercase mb-2 block">{sectionName}</span>
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tighter leading-tight mb-4">{doc.title}</h1>
                    <p className="text-lg text-gray-500 dark:text-gray-400 font-medium leading-relaxed">{doc.description}</p>
                    <div className="flex flex-wrap items-center gap-2.5 mt-6">
                      {doc.tech && doc.tech.map((t, idx) => (
                        <span key={idx} className="px-3.5 py-1.5 bg-gray-50 dark:bg-gray-800/50 border border-gray-150 dark:border-gray-750 rounded-xl text-[11px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-wider">{t}</span>
                      ))}
                      <span className="px-3.5 py-1.5 bg-blue-50/50 dark:bg-blue-950/20 border border-blue-150 dark:border-blue-900 rounded-xl text-[11px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        {readTime} min read
                      </span>
                      {doc.lastUpdated && (
                        <span className="px-3.5 py-1.5 bg-amber-50/50 dark:bg-amber-950/20 border border-amber-150 dark:border-amber-900 rounded-xl text-[11px] font-black text-amber-600 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                          Updated {new Date(doc.lastUpdated).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Sections */}
              <div className="space-y-12">
                {content.intro && content.intro !== "Temporary" && (
                  <div className="bg-white dark:bg-gray-900 rounded-[2rem] p-10 shadow-sm">
                    <p className="text-lg text-gray-600 dark:text-gray-300 font-medium leading-relaxed">{renderDocText(content.intro)}</p>
                  </div>
                )}

                {content.sections.map((section, idx) => (
                  <motion.div
                    key={idx}
                    id={`doc-${doc.id}--${doc.outline?.[idx]?.id || idx}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="bg-white dark:bg-gray-900 rounded-[2rem] p-10 shadow-sm scroll-mt-36"
                  >
                    {section.subheading && section.subheading !== "Temporary" && (
                      <span className="text-xs font-black tracking-[0.2em] text-blue-600 dark:text-blue-400 uppercase mb-3 block">{section.subheading}</span>
                    )}
                    <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tight mb-6">{section.heading}</h2>
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                      <div className="text-gray-600 dark:text-gray-300 font-medium leading-relaxed text-lg whitespace-pre-line">
                        {renderDocText(section.text)}
                      </div>
                    </div>

                    {doc.outline?.[idx]?.sub && doc.outline[idx].sub.length > 0 && (
                      <div className="mt-10 space-y-6">
                        {doc.outline[idx].sub.map((sub, si) => {
                          const subId = `doc-${doc.id}--${doc.outline?.[idx]?.id}--${si}`;
                          return (
                            <div key={si} id={subId} className="border-l-2 border-gray-200 dark:border-gray-800/80 pl-5 scroll-mt-36">
                              <h3 className="text-base font-black text-gray-900 dark:text-white mb-2">{sub}</h3>
                              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">Refer to the implementation codebase details outlined above under this sub-topic.</p>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Feedback Widget */}
              <div className="bg-white dark:bg-gray-900 rounded-[2rem] p-8 shadow-sm mt-16 text-center">
                <AnimatePresence mode="wait">
                  {feedback === null ? (
                    <motion.div
                      key="feedback-prompt"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex flex-col sm:flex-row items-center justify-between gap-4"
                    >
                      <span className="text-base font-black text-gray-800 dark:text-gray-200 tracking-tight">Was this page helpful? Let us know.</span>
                      <div className="flex gap-4">
                        <button
                          onClick={() => setFeedback('helpful')}
                          className="px-8 py-3.5 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/20 dark:hover:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-2xl font-black text-sm transition-all hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer border border-emerald-250 dark:border-emerald-900/50 shadow-sm"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>
                          Yes
                        </button>
                        <button
                          onClick={() => setFeedback('unhelpful')}
                          className="px-8 py-3.5 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/20 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-400 rounded-2xl font-black text-sm transition-all hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer border border-rose-250 dark:border-rose-900/50 shadow-sm"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm10-13h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-3"/></svg>
                          No
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="feedback-thanks"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-sm font-black text-blue-600 dark:text-blue-400 flex items-center justify-center gap-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
                      Thank you for your feedback!
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Prev / Next Navigation */}
              <div className="flex justify-between mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
                {prevDoc ? (
                  <Link
                    to={`/${prevDoc.id}`}
                    className="group flex items-center gap-3 text-left hover:-translate-x-1 transition-transform"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300 dark:text-gray-600 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"><path d="m15 18-6-6 6-6"/></svg>
                    <div>
                      <span className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest block">Previous</span>
                      <span className="text-sm font-bold text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">{prevDoc.title}</span>
                    </div>
                  </Link>
                ) : <div />}

                {nextDoc ? (
                  <Link
                    to={`/${nextDoc.id}`}
                    className="group flex items-center gap-3 text-right hover:translate-x-1 transition-transform"
                  >
                    <div>
                      <span className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest block">Next</span>
                      <span className="text-sm font-bold text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">{nextDoc.title}</span>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300 dark:text-gray-600 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"><path d="m9 18 6-6-6-6"/></svg>
                  </Link>
                ) : <div />}
              </div>
            </motion.div>
          </div>

          {/* Right Sidebar: On This Page */}
          {doc.outline && doc.outline.length > 0 && (
            <aside className="hidden lg:block w-56 shrink-0 sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-1">
              <span className="text-[10px] font-black tracking-widest uppercase text-gray-400 dark:text-gray-500 block mb-4">On this page</span>
              <ul className="space-y-3 border-l border-gray-150 dark:border-gray-800 pl-3">
                {doc.outline.map((h, hIdx) => {
                  const headingId = `doc-${doc.id}--${h.id || hIdx}`;
                  const isHeadingActive = activeHeading === headingId || activeHeading.startsWith(headingId + "--");
                  return (
                    <li key={hIdx} className="space-y-2">
                      <button
                        onClick={() => {
                          const el = document.getElementById(headingId);
                          if (el) {
                            const y = el.getBoundingClientRect().top + window.pageYOffset - 120;
                            window.scrollTo({ top: y, behavior: 'smooth' });
                          }
                        }}
                        className={`text-xs text-left font-bold block transition-colors cursor-pointer ${isHeadingActive ? 'text-blue-600 dark:text-blue-400 font-black' : 'text-gray-500 dark:text-gray-500 hover:text-gray-800 dark:hover:text-gray-300'}`}
                      >
                        {h.label}
                      </button>
                      {h.sub && h.sub.length > 0 && (
                        <ul className="pl-3 space-y-2 border-l border-gray-100 dark:border-gray-900/60">
                          {h.sub.map((sub, si) => {
                            const subId = `${headingId}--${si}`;
                            const isSubActive = activeHeading === subId;
                            return (
                              <li key={si}>
                                <button
                                  onClick={() => {
                                    const el = document.getElementById(subId);
                                    if (el) {
                                      const y = el.getBoundingClientRect().top + window.pageYOffset - 120;
                                      window.scrollTo({ top: y, behavior: 'smooth' });
                                    }
                                  }}
                                  className={`text-[11px] text-left font-semibold block transition-colors cursor-pointer ${isSubActive ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-gray-400 dark:text-gray-500 hover:text-gray-750 dark:hover:text-gray-300'}`}
                                >
                                  {sub}
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </aside>
          )}
        </div>
      </section>
    </div>
  );
}
