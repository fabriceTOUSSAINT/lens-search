import { ApolloServer } from 'apollo-server';
import typeDefs from './schema';
import resolvers from './resolvers';
import searchPhotosAPI from './api/searchPhotos';
import {FlickrModel} from './api/models';

const dataSources = () => ({
    searchPhotosAPI: new searchPhotosAPI(),
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