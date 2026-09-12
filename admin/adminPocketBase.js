import PocketBase from 'pocketbase';

const pbUrl = import.meta.env.VITE_POCKETBASE_URL || 'https://pb.jchengroa.com';

export const pb = new PocketBase(pbUrl);

// Helper to get auth state
export const getAdminAuth = () => {
    return {
        isValid: pb.authStore.isValid,
        token: pb.authStore.token,
        record: pb.authStore.record || pb.authStore.model
    };
};

// ----------------------------------------------------
// READ: Fetch all 7 collections
// ----------------------------------------------------
export async function loadAllCollections() {
    const [
        siteContentRows,
        projects,
        research,
        recognition,
        contacts,
        socials,
        changelogs
    ] = await Promise.all([
        pb.collection('site_content').getFullList({ sort: '' }),
        pb.collection('projects').getFullList({ sort: '' }),
        pb.collection('research').getFullList({ sort: '' }),
        pb.collection('recognition').getFullList({ sort: '' }),
        pb.collection('contacts').getFullList({ sort: '' }),
        pb.collection('socials').getFullList({ sort: '' }),
        pb.collection('changelogs').getFullList({ sort: '' })
    ]);

    const normalize = (items) => items.map(item => ({
        ...item,
        id: item.orig_id || item.id
    }));

    return {
        siteContentRows,
        projects: normalize(projects),
        research: normalize(research),
        recognition: normalize(recognition),
        contacts: normalize(contacts),
        socials: normalize(socials),
        changelogs: changelogs.map(c => ({ ...c, version: c.version }))
    };
}

// ----------------------------------------------------
// SITE CONTENT HELPERS
// ----------------------------------------------------
export async function getSiteContentValue(key) {
    try {
        const record = await pb.collection('site_content').getFirstListItem(`key = "${key}"`);
        return record.value;
    } catch (e) {
        return null;
    }
}

export async function upsertSiteContent(key, value) {
    try {
        const existing = await pb.collection('site_content').getFirstListItem(`key = "${key}"`);
        return await pb.collection('site_content').update(existing.id, { value });
    } catch (e) {
        return await pb.collection('site_content').create({ key, value });
    }
}

export async function saveAllSiteContentRows(contentObject) {
    const promises = Object.entries(contentObject).map(([key, value]) => upsertSiteContent(key, value));
    return await Promise.all(promises);
}

// ----------------------------------------------------
// GENERIC COLLECTION CRUD (Projects, Research, etc.)
// ----------------------------------------------------
export async function saveCollectionItem(collectionName, item) {
    const payload = { ...item };
    const customId = item.id || item.orig_id;
    if (customId) payload.orig_id = customId;

    // Check if record with this orig_id exists
    try {
        const existing = await pb.collection(collectionName).getFirstListItem(`orig_id = "${customId}"`);
        delete payload.id; // Do not overwrite PB internal id
        return await pb.collection(collectionName).update(existing.id, payload);
    } catch (e) {
        delete payload.id;
        return await pb.collection(collectionName).create(payload);
    }
}

export async function deleteCollectionItem(collectionName, customId) {
    try {
        const existing = await pb.collection(collectionName).getFirstListItem(`orig_id = "${customId}"`);
        return await pb.collection(collectionName).delete(existing.id);
    } catch (e) {
        // Fallback: try by internal PB id
        return await pb.collection(collectionName).delete(customId);
    }
}

// ----------------------------------------------------
// CHANGELOGS CRUD (by version)
// ----------------------------------------------------
export async function saveChangelogItem(clItem) {
    const payload = { ...clItem };
    try {
        const existing = await pb.collection('changelogs').getFirstListItem(`version = "${clItem.version}"`);
        return await pb.collection('changelogs').update(existing.id, payload);
    } catch (e) {
        return await pb.collection('changelogs').create(payload);
    }
}

export async function deleteChangelogItem(version) {
    try {
        const existing = await pb.collection('changelogs').getFirstListItem(`version = "${version}"`);
        return await pb.collection('changelogs').delete(existing.id);
    } catch (e) {
        return await pb.collection('changelogs').delete(version);
    }
}
