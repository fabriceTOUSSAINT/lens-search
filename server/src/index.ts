import express from 'express'
import { createServer } from 'http'
import { ApolloServer } from 'apollo-server-express'
import bodyParser from 'body-parser'
import knexConfig from './knex'

// Apollo
import typeDefs from './schema'
import resolvers from './resolvers'
import SearchPhotosAPI from './datasource/searchPhotos'
import Lens from './datasource/lens'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.text({ type: 'application/graphql' }))
const httpServer = createServer(app)
const PORT = process.env.PORT || 4000

const dataSources = () => ({
  searchPhotosAPI: new SearchPhotosAPI(),
  //@ts-ignore
  lens: new Lens(knexConfig),
})

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
})

server.applyMiddleware({ app, path: '/' })
server.installSubscriptionHandlers(httpServer)

httpServer.listen(PORT, () => {
  console.log(
    `Server is ready at http://localhost:${PORT}${server.graphqlPath}`,
  )
})

// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept()
  // @ts-ignore
  module.hot.dispose(() => httpServer.close())
}
