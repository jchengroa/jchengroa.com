import fs from 'fs';
import path from 'path';

const PB_URL = process.env.PB_URL || 'https://pb.jchengroa.com';
const PB_EMAIL = process.env.PB_EMAIL;
const PB_PASSWORD = process.env.PB_PASSWORD;

if (!PB_EMAIL || !PB_PASSWORD) {
  console.error('Error: PB_EMAIL and PB_PASSWORD environment variables are required.');
  console.log('Usage:');
  console.log('  $env:PB_EMAIL="your-email@gmail.com"; $env:PB_PASSWORD="yourpassword"; node scripts/migrate-to-pocketbase.js');
  process.exit(1);
}

async function run() {
  console.log(`Connecting to PocketBase at ${PB_URL}...`);

  // 1. Authenticate as superuser
  let authRes = await fetch(`${PB_URL}/api/collections/_superusers/auth-with-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identity: PB_EMAIL, password: PB_PASSWORD })
  });

  // Fallback for older PocketBase versions where superusers were admins
  if (!authRes.ok) {
    authRes = await fetch(`${PB_URL}/api/admins/auth-with-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identity: PB_EMAIL, password: PB_PASSWORD })
    });
  }

  if (!authRes.ok) {
    const errText = await authRes.text();
    console.error('Authentication failed:', errText);
    process.exit(1);
  }

  const authData = await authRes.json();
  const token = authData.token;
  console.log('Authenticated successfully as superuser!');

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': token
  };

  // 2. Fetch existing collections
  const collectionsRes = await fetch(`${PB_URL}/api/collections?page=1&perPage=100`, { headers });
  const existingCollections = (await collectionsRes.json()).items || [];
  const existingCollectionNames = new Set(existingCollections.map(c => c.name));

  // 3. Define the collection schemas
  // Note: We leave listRule and viewRule as "" (empty string) so anyone can read them publicly without auth!
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

  // 4. Create missing collections
  for (const col of collectionSchemas) {
    if (!existingCollectionNames.has(col.name)) {
      console.log(`Creating collection '${col.name}'...`);
      const createRes = await fetch(`${PB_URL}/api/collections`, {
        method: 'POST',
        headers,
        body: JSON.stringify(col)
      });
      if (!createRes.ok) {
        console.error(`Failed to create collection '${col.name}':`, await createRes.text());
      } else {
        console.log(`Created collection '${col.name}' successfully!`);
      }
    } else {
      console.log(`Collection '${col.name}' already exists.`);
    }
  }

  // 5. Load exported data
  const backupFile = path.join(process.cwd(), 'backup_data', 'supabase_export.json');
  if (!fs.existsSync(backupFile)) {
    console.error(`Backup file not found at ${backupFile}`);
    process.exit(1);
  }

  const data = JSON.parse(fs.readFileSync(backupFile, 'utf8'));

  // 6. Insert data for each table
  for (const [collectionName, rows] of Object.entries(data)) {
    console.log(`\nImporting ${rows.length} rows into '${collectionName}'...`);
    
    // Check existing records to avoid duplicates
    const getRecordsRes = await fetch(`${PB_URL}/api/collections/${collectionName}/records?page=1&perPage=500`, { headers });
    let existingItems = [];
    if (getRecordsRes.ok) {
      existingItems = (await getRecordsRes.json()).items || [];
    }

    for (const row of rows) {
      // Map row to PB record format
      const record = { ...row };
      
      // In Supabase, 'id' could be string like 'cloudbased'. In PocketBase, 'id' is a 15-char alphanumeric string.
      // We store the original id as 'orig_id' and 'id' if compatible, or just keep orig_id.
      if (record.id) {
        record.orig_id = record.id;
        // Don't override PB id unless it matches PB 15-character format
        if (record.id.length !== 15) {
          delete record.id;
        }
      }
      delete record.created_at; // PB generates its own created timestamp

      // Check duplicate check by key or orig_id or version
      let isDuplicate = false;
      if (collectionName === 'site_content') {
        isDuplicate = existingItems.some(item => item.key === record.key);
      } else if (collectionName === 'changelogs') {
        isDuplicate = existingItems.some(item => item.version === record.version);
      } else if (record.orig_id) {
        isDuplicate = existingItems.some(item => item.orig_id === record.orig_id);
      }

      if (isDuplicate) {
        continue;
      }

      const postRes = await fetch(`${PB_URL}/api/collections/${collectionName}/records`, {
        method: 'POST',
        headers,
        body: JSON.stringify(record)
      });

      if (!postRes.ok) {
        console.error(`Error inserting into ${collectionName}:`, await postRes.text());
      }
    }
    console.log(`Finished '${collectionName}'!`);
  }

  console.log('\nMigration to PocketBase complete!');
}

run().catch(err => {
  console.error('Migration failed:', err);
});
