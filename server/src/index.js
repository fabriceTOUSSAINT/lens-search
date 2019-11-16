const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const searchPhotosAPI = require('./api/searchPhotos');

const dataSources = () => ({
    searchPhotosAPI: new searchPhotosAPI()
})
const port = process.env.PORT || 6000;

const server = new ApolloServer({ 
    typeDefs,
    resolvers,
    dataSources
});

server.listen().then(({ url }) => {
    console.log(`Server is ready at ${url}`);
});