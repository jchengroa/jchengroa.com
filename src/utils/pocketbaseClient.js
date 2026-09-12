import PocketBase from 'pocketbase';

const pbUrl = import.meta.env.VITE_POCKETBASE_URL || 'http://194.163.186.135:8090';

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
    pb.collection('projects').getFullList({ sort: 'created' }),
    pb.collection('research').getFullList({ sort: 'created' }),
    pb.collection('recognition').getFullList({ sort: 'created' }),
    pb.collection('contacts').getFullList({ sort: 'created' }),
    pb.collection('socials').getFullList({ sort: 'created' }),
    pb.collection('changelogs').getFullList({ sort: 'created' }),
    pb.collection('site_content').getFullList()
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
