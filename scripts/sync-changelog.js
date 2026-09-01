import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const README_PATH = path.join(__dirname, '../README.md');
const PACKAGE_PATH = path.join(__dirname, '../package.json');
const ENV_PATH = path.join(__dirname, '../.env');

// Helper to manually parse .env variables
function getEnvConfig() {
    if (!fs.existsSync(ENV_PATH)) return {};
    const content = fs.readFileSync(ENV_PATH, 'utf8');
    const config = {};
    content.split(/\r?\n/).forEach(line => {
        const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
        if (match) {
            let value = match[2] ? match[2].trim() : '';
            // Remove wrapping quotes if present
            if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
            if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
            config[match[1]] = value;
        }
    });
    return config;
}

function parseChangelog(markdown) {
    const parts = markdown.split(/^## Changelog:$/im);
    const changelogSection = parts[parts.length - 1];
    if (!changelogSection || parts.length < 2) return [];

    const entries = [];
    const lines = changelogSection.split(/\r?\n/);
    let currentEntry = null;

    for (let line of lines) {
        const trimmedLine = line.trim();
        if (!trimmedLine) continue;

        const headerMatch = trimmedLine.match(/^- \[(.*?)\] - (.*)$/);
        
        if (headerMatch) {
            if (currentEntry) entries.push(currentEntry);
            currentEntry = {
                version: headerMatch[1].trim(),
                date: headerMatch[2].trim(),
                content: []
            };
        } else if (currentEntry) {
            const contentLine = trimmedLine.replace(/^- /, '').trim();
            if (contentLine) {
                currentEntry.content.push(contentLine);
            }
        }
    }

    if (currentEntry) entries.push(currentEntry);
    return entries;
}

async function sync() {
    try {
        const markdown = fs.readFileSync(README_PATH, 'utf8');
        const entries = parseChangelog(markdown);
        
        if (entries.length === 0) {
            console.warn('⚠️ No changelog entries found in README.md.');
            return;
        }

        // 1. Sync latest version to package.json
        const latestEntry = entries[entries.length - 1];
        if (latestEntry && latestEntry.version && fs.existsSync(PACKAGE_PATH)) {
            const pkgData = JSON.parse(fs.readFileSync(PACKAGE_PATH, 'utf8'));
            if (pkgData.version !== latestEntry.version) {
                pkgData.version = latestEntry.version;
                fs.writeFileSync(PACKAGE_PATH, JSON.stringify(pkgData, null, 2) + '\n');
                console.log(`📦 package.json version synced to ${latestEntry.version}`);
            }
        }

        // 2. Sync to Supabase Online Database
        const env = getEnvConfig();
        const supabaseUrl = env.VITE_SUPABASE_URL;
        const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY;

        if (supabaseUrl && supabaseAnonKey) {
            console.log('Connecting to Supabase...');
            const supabase = createClient(supabaseUrl, supabaseAnonKey);

            // Push each entry to the DB using upsert
            const { error } = await supabase
                .from('changelogs')
                .upsert(entries, { onConflict: 'version' });

            if (error) {
                throw error;
            }
            console.log(`✅ Supabase Database updated! Synced ${entries.length} entries successfully.`);
        } else {
            console.warn('⚠️ Supabase credentials missing in .env. Skipping online sync.');
        }

    } catch (error) {
        console.error('❌ Error syncing changelog:', error.message || error);
    }
}

sync();
