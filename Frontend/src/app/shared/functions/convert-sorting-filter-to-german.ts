import { T_ListSortingItem } from '../types-and-interfaces/list-sorting.type';

export const convertSortingFilterToGerman = (filter: T_ListSortingItem): string => {
    switch (filter) {
        case 'ALPHABET':
            return 'Nach Alphabet (A-Z)';
        case 'ALPHABET_INVERTED':
            return 'Nach Alphabet (Z-A)';
        case 'CREATION_DATE':
            return 'Nach Erstellungsdatum';
    }
};
