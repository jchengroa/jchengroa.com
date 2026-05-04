
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const README_PATH = path.join(__dirname, '../README.md');
const DATA_PATH = path.join(__dirname, '../src/data/changelog.js');

function parseChangelog(markdown) {
    // Use a more specific split to avoid matching the instructions section
    const parts = markdown.split(/^## Changelog:$/im);
    const changelogSection = parts[parts.length - 1];
    if (!changelogSection || parts.length < 2) return [];

    const entries = [];
    const lines = changelogSection.split(/\r?\n/);
    let currentEntry = null;

    for (let line of lines) {
        const trimmedLine = line.trim();
        if (!trimmedLine) continue;

        // Check if line is a version header: - [version] - date
        const headerMatch = trimmedLine.match(/^- \[(.*?)\] - (.*)$/);
        
        if (headerMatch) {
            if (currentEntry) entries.push(currentEntry);
            currentEntry = {
                version: headerMatch[1].trim(),
                date: headerMatch[2].trim(),
                content: []
            };
        } else if (currentEntry) {
            // It's a content line for the current version
            // Clean up bullet points but keep everything else "word for word"
            const contentLine = trimmedLine.replace(/^- /, '').trim();
            if (contentLine) {
                currentEntry.content.push(contentLine);
            }
        }
    }

    // Don't forget the last entry
    if (currentEntry) entries.push(currentEntry);

    return entries;
}

try {
    const markdown = fs.readFileSync(README_PATH, 'utf8');
    const entries = parseChangelog(markdown);
    
    if (entries.length === 0) {
        console.warn('⚠️ No changelog entries found. Check your README.md format.');
    }
    
    const jsContent = `export const changelogData = ${JSON.stringify(entries, null, 2)};`;
    
    fs.writeFileSync(DATA_PATH, jsContent);
    console.log(`✅ Changelog synced successfully! Found ${entries.length} entries.`);
} catch (error) {
    console.error('❌ Error syncing changelog:', error);
}
