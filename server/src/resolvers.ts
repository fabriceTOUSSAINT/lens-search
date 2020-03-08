export default {
    Query: {
        photosShotWith: async (_: any, { lensName = '' }, { dataSources }: any) => {
           const photosShotWithLens = await dataSources.searchPhotosAPI.findPhotosShotWithLens(lensName);
           return photosShotWithLens;
        },
        allLens: async (_: any, __: any, { dataSources }: any) => {
            const listOfAllLens = await dataSources.lensAPI.getAllLens();
            return listOfAllLens;
        },
        allLensName: async (_: any, __: any, { dataSources }: any) => {
            const listOfAllLens = await dataSources.lensAPI.getAllLensName();
            return listOfAllLens;
        }
    }
}