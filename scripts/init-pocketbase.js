import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import PocketBase from 'pocketbase';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ENV_PATH = path.join(__dirname, '../.env');
const BACKUP_FILE = path.join(__dirname, '../backup_data/supabase_export.json');

// Helper to manually parse .env variables if present
function getEnvConfig() {
    if (!fs.existsSync(ENV_PATH)) return {};
    const content = fs.readFileSync(ENV_PATH, 'utf8');
    const config = {};
    content.split(/\r?\n/).forEach(line => {
        const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
        if (match) {
            let value = match[2] ? match[2].trim() : '';
            if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
            if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
            config[match[1]] = value;
        }
    });
    return config;
}

const env = getEnvConfig();
const PB_URL = process.env.PB_URL || process.env.VITE_POCKETBASE_URL || env.VITE_POCKETBASE_URL || env.PB_URL || 'https://pb.jchengroa.com';
const PB_EMAIL = process.env.PB_EMAIL || env.PB_EMAIL;
const PB_PASSWORD = process.env.PB_PASSWORD || env.PB_PASSWORD;

console.log('====================================================');
console.log('🚀 PocketBase Database Setup & Initialization Script');
console.log('====================================================\n');

if (!PB_EMAIL || !PB_PASSWORD) {
    console.error('❌ Error: PocketBase credentials (PB_EMAIL and PB_PASSWORD) are required.');
    console.log('\nPlease set them in your .env file:');
    console.log('  PB_EMAIL=your-admin@email.com');
    console.log('  PB_PASSWORD=your-admin-password\n');
    console.log('Or provide them in the terminal before running:');
    console.log('  $env:PB_EMAIL="admin@email.com"; $env:PB_PASSWORD="password"; npm run init-db\n');
    process.exit(1);
}

const collectionSchemas = [
    {
        name: 'projects',
        type: 'base',
        listRule: '',
        viewRule: '',
        fields: [
            { name: 'orig_id', type: 'text' },
            { name: 'category', type: 'text' },
            { name: 'title', type: 'text' },
            { name: 'subtitle', type: 'text' },
            { name: 'description', type: 'text' },
            { name: 'info', type: 'text' },
            { name: 'tech', type: 'json' },
            { name: 'keywords', type: 'json' },
            { name: 'links', type: 'json' },
            { name: 'images', type: 'json' }
        ]
    },
    {
        name: 'research',
        type: 'base',
        listRule: '',
        viewRule: '',
        fields: [
            { name: 'orig_id', type: 'text' },
            { name: 'category', type: 'text' },
            { name: 'title', type: 'text' },
            { name: 'summary', type: 'text' },
            { name: 'description', type: 'text' },
            { name: 'tech', type: 'json' },
            { name: 'keywords', type: 'json' },
            { name: 'stats', type: 'json' },
            { name: 'info', type: 'text' },
            { name: 'links', type: 'json' },
            { name: 'images', type: 'json' }
        ]
    },
    {
        name: 'recognition',
        type: 'base',
        listRule: '',
        viewRule: '',
        fields: [
            { name: 'orig_id', type: 'text' },
            { name: 'category', type: 'text' },
            { name: 'title', type: 'text' },
            { name: 'subtitle', type: 'text' },
            { name: 'info', type: 'text' },
            { name: 'description', type: 'text' },
            { name: 'facebookUrl', type: 'text' },
            { name: 'tech', type: 'json' },
            { name: 'keywords', type: 'json' },
            { name: 'stats', type: 'json' },
            { name: 'links', type: 'json' },
            { name: 'images', type: 'json' }
        ]
    },
    {
        name: 'contacts',
        type: 'base',
        listRule: '',
        viewRule: '',
        fields: [
            { name: 'orig_id', type: 'text' },
            { name: 'title', type: 'text' },
            { name: 'username', type: 'text' },
            { name: 'linkUrl', type: 'text' },
            { name: 'description', type: 'text' },
            { name: 'category', type: 'text' }
        ]
    },
    {
        name: 'socials',
        type: 'base',
        listRule: '',
        viewRule: '',
        fields: [
            { name: 'orig_id', type: 'text' },
            { name: 'title', type: 'text' },
            { name: 'username', type: 'text' },
            { name: 'linkUrl', type: 'text' },
            { name: 'description', type: 'text' },
            { name: 'category', type: 'text' }
        ]
    },
    {
        name: 'changelogs',
        type: 'base',
        listRule: '',
        viewRule: '',
        fields: [
            { name: 'version', type: 'text' },
            { name: 'date', type: 'text' },
            { name: 'content', type: 'json' }
        ]
    },
    {
        name: 'site_content',
        type: 'base',
        listRule: '',
        viewRule: '',
        fields: [
            { name: 'key', type: 'text' },
            { name: 'value', type: 'json' }
        ]
    }
];

async function initialize() {
    console.log(`📡 Connecting to PocketBase at: ${PB_URL}...`);
    const pb = new PocketBase(PB_URL);

    // 1. Authenticate as superuser / admin
    let authenticated = false;
    try {
        await pb.collection('_superusers').authWithPassword(PB_EMAIL, PB_PASSWORD);
        authenticated = true;
    } catch (err) {
        if (pb.admins && typeof pb.admins.authWithPassword === 'function') {
            await pb.admins.authWithPassword(PB_EMAIL, PB_PASSWORD);
            authenticated = true;
        } else {
            console.error('❌ Authentication failed:', err.message || err);
            process.exit(1);
        }
    }

    if (!authenticated || !pb.authStore.isValid) {
        console.error('❌ Failed to authenticate with provided PocketBase credentials.');
        process.exit(1);
    }
    console.log('✅ Authenticated successfully as superuser!\n');

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': pb.authStore.token
    };

    // 2. Fetch existing collections
    console.log('🔍 Checking database collections...');
    const collectionsRes = await fetch(`${PB_URL}/api/collections?page=1&perPage=100`, { headers });
    const existingCollections = (await collectionsRes.json()).items || [];
    const existingNames = new Set(existingCollections.map(c => c.name));

    // 3. Create any missing collections
    for (const col of collectionSchemas) {
        if (!existingNames.has(col.name)) {
            console.log(`  ➕ Creating collection '${col.name}'...`);
            const createRes = await fetch(`${PB_URL}/api/collections`, {
                method: 'POST',
                headers,
                body: JSON.stringify(col)
            });
            if (!createRes.ok) {
                console.error(`  ❌ Failed to create collection '${col.name}':`, await createRes.text());
            } else {
                console.log(`  ✨ Created collection '${col.name}' successfully!`);
            }
        } else {
            console.log(`  ✓ Collection '${col.name}' already exists.`);
        }
    }

    // 4. Populate collections with initial data from backup if available
    if (fs.existsSync(BACKUP_FILE)) {
        console.log(`\n📦 Initializing collections with default data from backup...`);
        const backupData = JSON.parse(fs.readFileSync(BACKUP_FILE, 'utf8'));

        for (const [colName, rows] of Object.entries(backupData)) {
            if (!Array.isArray(rows) || rows.length === 0) continue;

            const existingRecordsRes = await fetch(`${PB_URL}/api/collections/${colName}/records?page=1&perPage=500`, { headers });
            let existingItems = [];
            if (existingRecordsRes.ok) {
                existingItems = (await existingRecordsRes.json()).items || [];
            }

            let inserted = 0;
            for (const row of rows) {
                const record = { ...row };
                if (record.id) {
                    record.orig_id = record.id;
                    if (record.id.length !== 15) {
                        delete record.id;
                    }
                }
                delete record.created_at;

                // Avoid duplicating records
                let isDuplicate = false;
                if (colName === 'site_content') {
                    isDuplicate = existingItems.some(i => i.key === record.key);
                } else if (colName === 'changelogs') {
                    isDuplicate = existingItems.some(i => i.version === record.version);
                } else if (record.orig_id) {
                    isDuplicate = existingItems.some(i => i.orig_id === record.orig_id);
                }

                if (isDuplicate) continue;

                const postRes = await fetch(`${PB_URL}/api/collections/${colName}/records`, {
                    method: 'POST',
                    headers,
                    body: JSON.stringify(record)
                });

                if (postRes.ok) inserted++;
            }
            console.log(`  ✓ '${colName}': ${inserted} new records imported (${existingItems.length} already existed).`);
        }
    }

    console.log('\n🎉 PocketBase initialization is complete! Your database is ready.');
}

initialize().catch(err => {
    console.error('\n❌ Initialization error:', err.message || err);
    process.exit(1);
});
