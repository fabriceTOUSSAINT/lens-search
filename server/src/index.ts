import { ApolloServer } from 'apollo-server';
import typeDefs from './schema';
import resolvers from './resolvers';
import SearchPhotosAPI from './api/searchPhotos';
import LensAPI from './api/lens';

// TODO: figure out how to spin up postgres image to connec to
const knexConfig: any = {
    client: "pg",
    connection: {
      host: 'localhost',
      user: 'postgres',
      password :'',
      database: 'lens_search'
    }
  };
// @ts-ignore
//   const db = new LensAPI(knexConfig);

const dataSources = () => ({
    searchPhotosAPI: new SearchPhotosAPI(),
    // @ts-ignore
    lensAPI: new LensAPI(knexConfig),
})

const port = process.env.PORT || 6000;

const server = new ApolloServer({ 
    typeDefs,
    resolvers,
    dataSources
});

server.listen().then(({ url }: any) => {
    console.log(`Server is ready at ${url}`);
});