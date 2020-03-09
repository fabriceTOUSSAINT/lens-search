export default {
    Query: {
        photosShotWith: async (_: any, { lensName = '' }, { dataSources }: any) => {
           const photosShotWithLens = await dataSources.searchPhotosAPI.findPhotosShotWithLens(lensName);
           return photosShotWithLens;
        },
        allLens: async (_: any, args: any, { dataSources }: any) => {
            const listOfAllLens = await dataSources.lensAPI.getAllLens();
            return listOfAllLens;
        },        
        getLens: async (_: any, args: any, { dataSources }: any) => {
            const listOfAllLens = await dataSources.lensAPI.getLens(args.lensName);
            return listOfAllLens;
        },
        allLensName: async (_: any, args: any, { dataSources }: any) => {
            const listOfAllLens = await dataSources.lensAPI.getAllLensName();
            return listOfAllLens;
        }
    }
}