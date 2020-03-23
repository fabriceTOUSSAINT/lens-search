import { ApolloServer } from 'apollo-server'
import knexConfig from './knex'
import typeDefs from './schema'
import resolvers from './resolvers'
import SearchPhotosAPI from './datasource/searchPhotos'
import Lens from './datasource/lens'

const dataSources = () => ({
  searchPhotosAPI: new SearchPhotosAPI(),
  //@ts-ignore
  lens: new Lens(knexConfig),
})

const port = process.env.PORT || 6000

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
})

server.listen().then(({ url }: any) => {
  console.log(`Server is ready at ${url}`)
})
