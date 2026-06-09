import { docsList, docsSections } from './docsList';

export const docsPageContent = {
    title: "Documentation",
    subtitle: "Explore the technical architecture, custom design components, algorithm engines, and deployment structures of this portfolio.",
    sections: docsSections.reduce((acc, section) => {
        acc[section.id] = section;
        return acc;
    }, {}),
    noResults: {
        title: "No documentation found",
        subtitle: "Try adjusting your search or filters."
    }
};

export { docsList, docsSections };
