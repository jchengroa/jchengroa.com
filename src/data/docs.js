import { docsList, docsSections } from './docsList';

export const docsPageContent = {
    title: "Temporary",
    subtitle: "Temporary",
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
