export default {
    Query: {
        photosShotWith: async (_: any, { lensName = '' }, { dataSources }: any) => {
           const photosShotWithLens = await dataSources.searchPhotosAPI.findPhotosShotWithLens(lensName);
           return photosShotWithLens;
        },
        allLens: (_: any, __: any, /** TODO: update this {dataSources} */) => {
            console.log('jawn this hits yo');
            // make a call like /api/datasource/getAllLens()
            // return those results here in resolver back to Query
            return 'lens_db.json file here'
        }
    }
}