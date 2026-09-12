import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import PocketBase from 'pocketbase';

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

        // 2. Sync to PocketBase Database
        const env = getEnvConfig();
        const pbUrl = process.env.PB_URL || env.VITE_POCKETBASE_URL || env.PB_URL || 'https://pb.jchengroa.com';
        const pbEmail = process.env.PB_EMAIL || env.PB_EMAIL;
        const pbPassword = process.env.PB_PASSWORD || env.PB_PASSWORD;

        if (!pbEmail || !pbPassword) {
            console.warn('⚠️ PB_EMAIL and PB_PASSWORD not set in environment or .env file. Skipping PocketBase sync.');
            console.log('To sync changelogs to PocketBase, set PB_EMAIL and PB_PASSWORD in .env or run:');
            console.log('  $env:PB_EMAIL="admin@email.com"; $env:PB_PASSWORD="password"; npm run sync-changelog');
            return;
        }

        console.log(`Connecting to PocketBase at ${pbUrl}...`);
        const pb = new PocketBase(pbUrl);

        // Authenticate as superuser / admin
        let authenticated = false;
        try {
            await pb.collection('_superusers').authWithPassword(pbEmail, pbPassword);
            authenticated = true;
        } catch (superErr) {
            if (pb.admins && typeof pb.admins.authWithPassword === 'function') {
                await pb.admins.authWithPassword(pbEmail, pbPassword);
                authenticated = true;
            } else {
                throw superErr;
            }
        }

        if (!authenticated || !pb.authStore.isValid) {
            throw new Error('Authentication to PocketBase failed.');
        }

        console.log('Fetching existing changelogs from PocketBase...');
        const existingRecords = await pb.collection('changelogs').getFullList({ sort: '' });
        const existingMap = new Map();
        for (const item of existingRecords) {
            existingMap.set(item.version, item.id);
        }

        let updatedCount = 0;
        let createdCount = 0;

        for (const entry of entries) {
            const payload = {
                version: entry.version,
                date: entry.date,
                content: entry.content
            };

            const existingId = existingMap.get(entry.version);
            if (existingId) {
                await pb.collection('changelogs').update(existingId, payload);
                updatedCount++;
            } else {
                await pb.collection('changelogs').create(payload);
                createdCount++;
            }
        }

        console.log(`✅ PocketBase updated successfully! ${createdCount} created, ${updatedCount} updated (${entries.length} total entries).`);

    } catch (error) {
        console.error('❌ Error syncing changelog:', error.message || error);
    }
}

sync();

