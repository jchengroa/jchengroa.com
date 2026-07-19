import fs from 'fs';
import path from 'path';
import { researchList } from '../src/data/researchList.js';
import { recognitionList } from '../src/data/recognitionList.js';
import { socialsList } from '../src/data/socialsList.js';
import { changelogData } from '../src/data/changelog.js';
import { siteContent } from '../src/data/siteContent.js';

let sql = `-- MIGRATION SCRIPT TO SETUP AND POPULATE PORTFOLIO DATABASE --

-- 1. Create Tables
CREATE TABLE IF NOT EXISTS public.research (
  id text PRIMARY KEY,
  category text,
  title text,
  summary text,
  description text,
  tech jsonb DEFAULT '[]'::jsonb,
  keywords jsonb DEFAULT '[]'::jsonb,
  stats jsonb DEFAULT '[]'::jsonb,
  info text,
  links jsonb DEFAULT '[]'::jsonb,
  images jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.recognition (
  id text PRIMARY KEY,
  category text,
  title text,
  subtitle text,
  info text,
  description text,
  "facebookUrl" text,
  tech jsonb DEFAULT '[]'::jsonb,
  keywords jsonb DEFAULT '[]'::jsonb,
  stats jsonb DEFAULT '[]'::jsonb,
  links jsonb DEFAULT '[]'::jsonb,
  images jsonb DEFAULT '[]'::jsonb,
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

-- 2. Configure RLS & Permissions
ALTER TABLE public.research ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recognition ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.socials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.changelogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist, then create
DROP POLICY IF EXISTS "Allow public read access" ON public.research;
DROP POLICY IF EXISTS "Allow public read access" ON public.recognition;
DROP POLICY IF EXISTS "Allow public read access" ON public.socials;
DROP POLICY IF EXISTS "Allow public read access" ON public.changelogs;
DROP POLICY IF EXISTS "Allow public read access" ON public.site_content;

CREATE POLICY "Allow public read access" ON public.research FOR SELECT TO public USING (true);
CREATE POLICY "Allow public read access" ON public.recognition FOR SELECT TO public USING (true);
CREATE POLICY "Allow public read access" ON public.socials FOR SELECT TO public USING (true);
CREATE POLICY "Allow public read access" ON public.changelogs FOR SELECT TO public USING (true);
CREATE POLICY "Allow public read access" ON public.site_content FOR SELECT TO public USING (true);

GRANT SELECT ON public.research TO anon, authenticated;
GRANT SELECT ON public.recognition TO anon, authenticated;
GRANT SELECT ON public.socials TO anon, authenticated;
GRANT SELECT ON public.changelogs TO anon, authenticated;
GRANT SELECT ON public.site_content TO anon, authenticated;

-- 3. Populate Data
`;

function escapeSqlString(str) {
  if (!str) return 'NULL';
  return `'${str.replace(/'/g, "''")}'`;
}

// Populate Research
sql += `\n-- Populate Research\n`;
researchList.forEach(item => {
  sql += `INSERT INTO public.research (id, category, title, summary, description, tech, keywords, stats, info, links, images) VALUES (
    ${escapeSqlString(item.id)},
    ${escapeSqlString(item.category)},
    ${escapeSqlString(item.title)},
    ${escapeSqlString(item.summary)},
    ${escapeSqlString(item.description)},
    ${escapeSqlString(JSON.stringify(item.tech))}::jsonb,
    ${escapeSqlString(JSON.stringify(item.keywords))}::jsonb,
    ${escapeSqlString(JSON.stringify(item.stats))}::jsonb,
    ${escapeSqlString(item.info)},
    ${escapeSqlString(JSON.stringify(item.links))}::jsonb,
    ${escapeSqlString(JSON.stringify(item.images))}::jsonb
  ) ON CONFLICT (id) DO UPDATE SET 
    category = EXCLUDED.category, title = EXCLUDED.title, summary = EXCLUDED.summary, 
    description = EXCLUDED.description, tech = EXCLUDED.tech, keywords = EXCLUDED.keywords, 
    stats = EXCLUDED.stats, info = EXCLUDED.info, links = EXCLUDED.links, images = EXCLUDED.images;\n`;
});

// Populate Recognition
sql += `\n-- Populate Recognition\n`;
recognitionList.forEach(item => {
  sql += `INSERT INTO public.recognition (id, category, title, subtitle, info, description, "facebookUrl", tech, keywords, stats, links, images) VALUES (
    ${escapeSqlString(item.id)},
    ${escapeSqlString(item.category)},
    ${escapeSqlString(item.title)},
    ${escapeSqlString(item.subtitle)},
    ${escapeSqlString(item.info)},
    ${escapeSqlString(item.description)},
    ${escapeSqlString(item.facebookUrl)},
    ${escapeSqlString(JSON.stringify(item.tech))}::jsonb,
    ${escapeSqlString(JSON.stringify(item.keywords))}::jsonb,
    ${escapeSqlString(JSON.stringify(item.stats))}::jsonb,
    ${escapeSqlString(JSON.stringify(item.links))}::jsonb,
    ${escapeSqlString(JSON.stringify(item.images))}::jsonb
  ) ON CONFLICT (id) DO UPDATE SET 
    category = EXCLUDED.category, title = EXCLUDED.title, subtitle = EXCLUDED.subtitle, 
    info = EXCLUDED.info, description = EXCLUDED.description, "facebookUrl" = EXCLUDED."facebookUrl", 
    tech = EXCLUDED.tech, keywords = EXCLUDED.keywords, stats = EXCLUDED.stats, links = EXCLUDED.links, images = EXCLUDED.images;\n`;
});

// Populate Socials
sql += `\n-- Populate Socials\n`;
socialsList.forEach(item => {
  sql += `INSERT INTO public.socials (id, title, username, "linkUrl", description, category) VALUES (
    ${escapeSqlString(item.id)},
    ${escapeSqlString(item.title)},
    ${escapeSqlString(item.username)},
    ${escapeSqlString(item.linkUrl)},
    ${escapeSqlString(item.description)},
    ${escapeSqlString(item.category)}
  ) ON CONFLICT (id) DO UPDATE SET 
    title = EXCLUDED.title, username = EXCLUDED.username, "linkUrl" = EXCLUDED."linkUrl", 
    description = EXCLUDED.description, category = EXCLUDED.category;\n`;
});

// Populate Changelogs
sql += `\n-- Populate Changelogs\n`;
changelogData.forEach(item => {
  sql += `INSERT INTO public.changelogs (version, date, content) VALUES (
    ${escapeSqlString(item.version)},
    ${escapeSqlString(item.date)},
    ${escapeSqlString(JSON.stringify(item.content))}::jsonb
  ) ON CONFLICT (version) DO UPDATE SET 
    date = EXCLUDED.date, content = EXCLUDED.content;\n`;
});

// Populate Site Content
sql += `\n-- Populate Site Content\n`;
Object.entries(siteContent).forEach(([key, val]) => {
  sql += `INSERT INTO public.site_content (key, value) VALUES (
    ${escapeSqlString(key)},
    ${escapeSqlString(JSON.stringify(val))}::jsonb
  ) ON CONFLICT (key) DO UPDATE SET 
    value = EXCLUDED.value;\n`;
});

fs.writeFileSync(path.join(process.cwd(), 'migration.sql'), sql);
console.log('Successfully generated migration.sql!');
