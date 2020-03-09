"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    Query: {
        photosShotWith: async (_, { lensName = '' }, { dataSources }) => {
            const photosShotWithLens = await dataSources.searchPhotosAPI.findPhotosShotWithLens(lensName);
            return photosShotWithLens;
        },
        allLens: async (_, args, { dataSources }) => {
            const listOfAllLens = await dataSources.lensAPI.getAllLens();
            return listOfAllLens;
        },
        getLens: async (_, args, { dataSources }) => {
            const listOfAllLens = await dataSources.lensAPI.getLens(args.lensName);
            return listOfAllLens;
        },
        allLensName: async (_, args, { dataSources }) => {
            const listOfAllLens = await dataSources.lensAPI.getAllLensName();
            return listOfAllLens;
        }
    }
};
