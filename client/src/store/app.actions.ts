import { makeVar } from '@apollo/client';

// Reactive Variables
const selectedLens = makeVar<any>({});

/**
 * Actions
 */

export const AppStoreActions: {
  setSelectedLens: (_selectedLens: any) => any;
} = {
  setSelectedLens: (_selectedLens) => selectedLens(_selectedLens),
};

export const AppTypePolicies = {
  Query: {
    fields: {
      getSelectedLens: {
        read() {
          return {
            ...selectedLens(),
          };
        },
      },
    },
  },
};
