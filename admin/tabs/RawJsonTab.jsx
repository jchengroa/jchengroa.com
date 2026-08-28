import React, { useState } from 'react';

export const FULL_DATABASE_SETUP_SQL = `-- ==========================================================
-- SUPABASE SECURE DATABASE SETUP & RLS AUTH POLICIES
-- Run this script in your Supabase SQL Editor
-- ==========================================================

-- 1. Create Tables
CREATE TABLE IF NOT EXISTS public.projects (
  id text PRIMARY KEY,
  category text,
  title text,
  subtitle text,
  info text,
  summary text,
  description text,
  image text,
  images jsonb DEFAULT '[]'::jsonb,
  tech jsonb DEFAULT '[]'::jsonb,
  keywords jsonb DEFAULT '[]'::jsonb,
  stats jsonb DEFAULT '[]'::jsonb,
  links jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.research (
  id text PRIMARY KEY,
  category text,
  title text,
  info text,
  summary text,
  description text,
  image text,
  images jsonb DEFAULT '[]'::jsonb,
  tech jsonb DEFAULT '[]'::jsonb,
  keywords jsonb DEFAULT '[]'::jsonb,
  stats jsonb DEFAULT '[]'::jsonb,
  links jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.recognition (
  id text PRIMARY KEY,
  category text,
  title text,
  subtitle text,
  info text,
  description text,
  image text,
  images jsonb DEFAULT '[]'::jsonb,
  "facebookUrl" text,
  tech jsonb DEFAULT '[]'::jsonb,
  keywords jsonb DEFAULT '[]'::jsonb,
  stats jsonb DEFAULT '[]'::jsonb,
  links jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.contacts (
  id text PRIMARY KEY,
  title text,
  username text,
  "linkUrl" text,
  description text,
  category text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.socials (
  id text PRIMARY KEY,
  title text,
  username text,
  "linkUrl" text,
  description text,
  category text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.changelogs (
  version text PRIMARY KEY,
  date text,
  content jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.site_content (
  key text PRIMARY KEY,
  value jsonb,
  created_at timestamptz DEFAULT now()
);

-- 2. Enable Row Level Security (RLS) on all tables
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recognition ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.socials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.changelogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- 3. Clean existing policies
DROP POLICY IF EXISTS "Allow public read access" ON public.projects;
DROP POLICY IF EXISTS "Allow authenticated full write access" ON public.projects;
DROP POLICY IF EXISTS "Allow anon all access" ON public.projects;

DROP POLICY IF EXISTS "Allow public read access" ON public.research;
DROP POLICY IF EXISTS "Allow authenticated full write access" ON public.research;
DROP POLICY IF EXISTS "Allow anon all access" ON public.research;

DROP POLICY IF EXISTS "Allow public read access" ON public.recognition;
DROP POLICY IF EXISTS "Allow authenticated full write access" ON public.recognition;
DROP POLICY IF EXISTS "Allow anon all access" ON public.recognition;

DROP POLICY IF EXISTS "Allow public read access" ON public.contacts;
DROP POLICY IF EXISTS "Allow authenticated full write access" ON public.contacts;
DROP POLICY IF EXISTS "Allow anon all access" ON public.contacts;

DROP POLICY IF EXISTS "Allow public read access" ON public.socials;
DROP POLICY IF EXISTS "Allow authenticated full write access" ON public.socials;
DROP POLICY IF EXISTS "Allow anon all access" ON public.socials;

DROP POLICY IF EXISTS "Allow public read access" ON public.changelogs;
DROP POLICY IF EXISTS "Allow authenticated full write access" ON public.changelogs;
DROP POLICY IF EXISTS "Allow anon all access" ON public.changelogs;

DROP POLICY IF EXISTS "Allow public read access" ON public.site_content;
DROP POLICY IF EXISTS "Allow authenticated full write access" ON public.site_content;
DROP POLICY IF EXISTS "Allow anon all access" ON public.site_content;

-- 4. PUBLIC READ POLICIES (Allows visitors to view website data)
CREATE POLICY "Allow public read access" ON public.projects FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow public read access" ON public.research FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow public read access" ON public.recognition FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow public read access" ON public.contacts FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow public read access" ON public.socials FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow public read access" ON public.changelogs FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow public read access" ON public.site_content FOR SELECT TO anon, authenticated USING (true);

-- 5. AUTHENTICATED WRITE POLICIES (Restricts INSERT/UPDATE/DELETE to logged-in admin)
CREATE POLICY "Allow authenticated full write access" ON public.projects FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated full write access" ON public.research FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated full write access" ON public.recognition FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated full write access" ON public.contacts FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated full write access" ON public.socials FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated full write access" ON public.changelogs FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated full write access" ON public.site_content FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 6. Grant Permissions
GRANT SELECT ON public.projects, public.research, public.recognition, public.contacts, public.socials, public.changelogs, public.site_content TO anon;
GRANT ALL ON public.projects, public.research, public.recognition, public.contacts, public.socials, public.changelogs, public.site_content TO authenticated;

-- 7. Populate initial site_content defaults
INSERT INTO public.site_content (key, value) VALUES
  ('site_active', 'true'::jsonb),
  ('default_theme_mode', '"light"'::jsonb),
  ('default_accent_color', '"blue"'::jsonb),
  ('custom_accent_hex', '"#2563eb"'::jsonb),
  ('navbar', '{"name":"jchengroa","links":[{"name":"Projects","to":"/projects"},{"name":"Research","to":"/research"},{"name":"Recognition","to":"/recognition"},{"name":"Contact","to":"/contact"}]}'::jsonb),
  ('navigation_data', '{"subLinks":{"more":[{"name":"Socials","to":"/socials"},{"name":"Changelog","to":"/changelog"},{"name":"Legal","to":"/legal"}]}}'::jsonb),
  ('home', '{"hero":{"title":"John Carlo Cheng Roa","subtitle":"Computer Engineer & Full-Stack Developer","description":"Building robust software systems, embedded solutions, and research-driven applications.","cta":"Get In Touch","email":"johncarloproa@gmail.com"},"featuredProjects":{"title":"Featured Projects","subtitle":"Select software and engineering builds","button":"Explore All Projects"},"featuredResearch":{"title":"Featured Research","subtitle":"Academic publications and findings","button":"View All Publications"},"featuredRecognition":{"title":"Featured Recognition","subtitle":"Honors, awards, and milestones","button":"View All Awards"}}'::jsonb),
  ('projects', '{"title":"Projects","subtitle":"A collection of hardware, software, and research engineering projects.","sections":{"embedded":"Embedded Systems","software":"Software Applications","hardware":"Hardware Engineering"}}'::jsonb),
  ('research', '{"title":"Research","subtitle":"A multidisciplinary overview of research papers, investigations, and applied technical studies."}'::jsonb),
  ('recognition', '{"title":"Recognition","subtitle":"Achievements, awards, milestones, and community accolades."}'::jsonb),
  ('contact', '{"title":"Get In Touch","subtitle":"Have a question or want to work together? Send a direct message or connect via any platform below."}'::jsonb),
  ('socials', '{"title":"Socials","subtitle":"Find and follow me on various platforms across the web."}'::jsonb),
  ('legal', '{"title":"Domain & Legal Information","content":"All rights reserved. Domain information and legal disclaimer statement."}'::jsonb),
  ('changelog', '{"title":"Changelog","subtitle":"A detailed chronicle of updates, feature enhancements, and system improvements."}'::jsonb),
  ('footer', '{"legalLink":"Domain & Legal Information","versionPrefix":"Version","updatedPrefix":"Last Updated"}'::jsonb),
  ('common', '{"awesome":"Awesome!","whatsNew":"What''s New","searchPlaceholder":"Search projects, research...","viewDetails":"View Details","learnMore":"Learn More","backToHome":"Back to Home"}'::jsonb)
ON CONFLICT (key) DO NOTHING;
`;

export default function RawJsonTab({ allSiteContent = {}, onChangeAllSiteContent, onShowToast }) {
    const keys = Object.keys(allSiteContent).sort();
    const [selectedKey, setSelectedKey] = useState(keys[0] || 'site_active');
    const [rawText, setRawText] = useState(() => {
        const val = allSiteContent[keys[0] || 'site_active'];
        return typeof val === 'object' ? JSON.stringify(val, null, 2) : String(val ?? '');
    });
    const [errorMsg, setErrorMsg] = useState(null);
    const [copiedSql, setCopiedSql] = useState(false);

    const handleSelectKey = (key) => {
        setSelectedKey(key);
        setErrorMsg(null);
        const val = allSiteContent[key];
        setRawText(typeof val === 'object' ? JSON.stringify(val, null, 2) : String(val ?? ''));
    };

    const handleFormat = () => {
        try {
            const parsed = JSON.parse(rawText);
            setRawText(JSON.stringify(parsed, null, 2));
            setErrorMsg(null);
        } catch {
            setErrorMsg('Invalid JSON format. Cannot beautify.');
        }
    };

    const handleApplyCurrentKey = () => {
        try {
            let parsed;
            try {
                parsed = JSON.parse(rawText);
            } catch {
                if (rawText.trim() === 'true') parsed = true;
                else if (rawText.trim() === 'false') parsed = false;
                else parsed = rawText;
            }

            onChangeAllSiteContent({
                ...allSiteContent,
                [selectedKey]: parsed
            });
            setErrorMsg(null);
            if (onShowToast) onShowToast('success', `Updated local key "${selectedKey}"!`);
        } catch (e) {
            setErrorMsg(`Parsing error: ${e.message}`);
        }
    };

    const handleCopySql = () => {
        navigator.clipboard.writeText(FULL_DATABASE_SETUP_SQL);
        setCopiedSql(true);
        if (onShowToast) onShowToast('success', 'Secure Supabase Auth SQL script copied to clipboard!');
        setTimeout(() => setCopiedSql(false), 3000);
    };

    return (
        <div className="space-y-8">
            {/* RAW KEY-VALUE / JSON EDITOR */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm space-y-6">
                <div className="border-b border-gray-100 dark:border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                        <h2 className="text-lg font-black text-gray-900 dark:text-white tracking-tight">
                            Raw JSON & Key-Value Inspector
                        </h2>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            Directly inspect, edit, and validate any underlying document in `site_content`.
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={handleFormat}
                            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
                        >
                            Format JSON
                        </button>
                        <button
                            type="button"
                            onClick={handleApplyCurrentKey}
                            className="px-4 py-1.5 rounded-xl text-xs font-black text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/20 transition-all"
                        >
                            Apply to Key
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
                    <div className="lg:col-span-1 space-y-1.5">
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">
                            Select Key ({keys.length})
                        </label>
                        <div className="max-h-96 overflow-y-auto space-y-1 pr-1 no-scrollbar">
                            {keys.map(k => (
                                <button
                                    key={k}
                                    type="button"
                                    onClick={() => handleSelectKey(k)}
                                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-mono font-bold truncate transition-all ${
                                        selectedKey === k
                                            ? 'bg-blue-600 text-white shadow-sm'
                                            : 'bg-gray-50 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                    }`}
                                >
                                    {k}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-3 space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                                Editing: site_content['{selectedKey}']
                            </span>
                            {errorMsg && (
                                <span className="text-xs font-bold text-rose-500">{errorMsg}</span>
                            )}
                        </div>
                        <textarea
                            rows={16}
                            value={rawText}
                            onChange={(e) => setRawText(e.target.value)}
                            className="w-full p-4 rounded-2xl bg-gray-900 text-green-400 font-mono text-xs leading-relaxed border border-gray-800 outline-none focus:ring-2 focus:ring-blue-600 shadow-inner"
                        />
                    </div>
                </div>
            </div>

            {/* COMPLETE SUPABASE SQL SCRIPT UTILITY */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm space-y-5">
                <div className="border-b border-gray-100 dark:border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                        <div className="flex items-center gap-2">
                            <h3 className="text-base font-extrabold text-gray-900 dark:text-white">
                                Supabase Auth & Security SQL Script
                            </h3>
                            <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                                RLS + Auth Protected
                            </span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Grants public read (`SELECT`) access to portfolio visitors, while strictly requiring Supabase authentication for all write, edit, and delete operations.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleCopySql}
                        className="px-4 py-2 rounded-xl text-xs font-black text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/20 transition-all flex items-center gap-1.5"
                    >
                        {copiedSql ? '✓ Copied SQL' : 'Copy Auth SQL Script'}
                    </button>
                </div>

                <div className="p-4 rounded-2xl bg-gray-900 border border-gray-800">
                    <pre className="text-xs font-mono text-gray-300 overflow-x-auto whitespace-pre leading-relaxed max-h-96">
                        {FULL_DATABASE_SETUP_SQL}
                    </pre>
                </div>
            </div>
        </div>
    );
}
