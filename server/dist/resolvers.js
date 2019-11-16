"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    Query: {
        photosShotWith: async (_, { lensName = '' }, { dataSources }) => {
            const photosShotWithLens = await dataSources.searchPhotosAPI.findPhotosShotWithLens(lensName);
            return photosShotWithLens;
        },
        allLens: (_, __) => {
            console.log('jawn this hits yo');
            return 'lens_db.json file here';
        }
    }
};
