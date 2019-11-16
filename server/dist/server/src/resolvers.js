"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    Query: {
        photosShotWith: async (_, { lensName = '' }, { dataSources }) => {
            const photosShotWithLens = await dataSources.searchPhotosAPI.findPhotosShotWithLens(lensName);
            return photosShotWithLens;
        },
        allLens: async (_, __, { dataSources }) => {
            const listOfAllLens = await dataSources.lens.getAllLensName();
            return listOfAllLens;
        }
    }
};
