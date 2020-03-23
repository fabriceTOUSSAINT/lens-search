"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    Query: {
        photosShotWith: async (_, args, { dataSources }) => {
            console.log(args, '<<< ARGS IN RESOLVER');
            const photosShotWithLens = await dataSources.searchPhotosAPI.photosShotWith(args.lens);
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
