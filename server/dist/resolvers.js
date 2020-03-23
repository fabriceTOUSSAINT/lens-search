"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    Query: {
        photosShotWith: async (_, args, { dataSources }) => {
            const lens = await dataSources.lens.getLens(args.lensName);
            console.log(lens, '<<<>>>>>', args);
            const photosShotWithLens = await dataSources.searchPhotosAPI.photosShotWith(lens);
            console.log(photosShotWithLens, '<<<< in resolver photosShotWithLens');
            return photosShotWithLens;
        },
        getAllLens: async (_, args, { dataSources }) => {
            const listOfAllLens = await dataSources.lens.getAllLens();
            return listOfAllLens;
        },
        getLens: async (_, args, { dataSources }) => {
            const listOfAllLens = await dataSources.lens.getLens(args.lensName);
            return listOfAllLens;
        },
    },
};
