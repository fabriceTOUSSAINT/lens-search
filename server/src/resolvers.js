module.exports = {
    Query: {
        photosShotWith: async (_, { lensName = '' }, { dataSources }) => {
           const photosShotWithLens = await dataSources.searchPhotosAPI.findPhotosShotWithLens(lensName);
           return photosShotWithLens;
        },
        allLens: (_, __, /** TODO: update this {dataSources} */) => {
            console.log('jawn this hits yo');
            // make a call like /api/datasource/getAllLens()
            // return those results here in resolver back to Query
            return 'lens_db.json file here'
        }
    }
}