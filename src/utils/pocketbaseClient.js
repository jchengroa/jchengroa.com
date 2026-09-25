import PocketBase from 'pocketbase';

const pbUrl = import.meta.env.VITE_POCKETBASE_URL || 'https://pb.jchengroa.com';

export const pb = new PocketBase(pbUrl);

// Helper function to query PocketBase collections in the same shape as your dataContext expects
export async function fetchPocketBaseData() {
  const [
    projects,
    research,
    recognition,
    contacts,
    socials,
    changelogs,
    siteContentRows
  ] = await Promise.all([
    pb.collection('projects').getFullList({ sort: '', requestKey: null }),
    pb.collection('research').getFullList({ sort: '', requestKey: null }),
    pb.collection('recognition').getFullList({ sort: '', requestKey: null }),
    pb.collection('contacts').getFullList({ sort: '', requestKey: null }),
    pb.collection('socials').getFullList({ sort: '', requestKey: null }),
    pb.collection('changelogs').getFullList({ sort: '', requestKey: null }),
    pb.collection('site_content').getFullList({ sort: '', requestKey: null })
  ]);

  // Normalize records so orig_id maps to id (matching React app's keys & detail routing)
  const normalize = (items) => items.map(item => ({
    ...item,
    id: item.orig_id || item.id
  }));

  return {
    projects: normalize(projects),
    research: normalize(research),
    recognition: normalize(recognition),
    contacts: normalize(contacts),
    socials: normalize(socials),
    changelogs: changelogs.map(c => ({ ...c, version: c.version })),
    siteContentRows
  };
}
