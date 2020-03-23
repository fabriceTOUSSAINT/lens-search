export default {
  Query: {
    photosShotWith: async (_: any, args: any, { dataSources }: any) => {
      console.log(args, '<<< ARGS IN RESOLVER')
      const photosShotWithLens = await dataSources.searchPhotosAPI.photosShotWith(
        args.lens,
      )
      return photosShotWithLens
    },
    getAllLens: async (_: any, args: any, { dataSources }: any) => {
      const listOfAllLens = await dataSources.lens.getAllLens()
      return listOfAllLens
    },
    getLens: async (_: any, args: any, { dataSources }: any) => {
      const listOfAllLens = await dataSources.lens.getLens(args.lensName)
      return listOfAllLens
    },
  },
}
