const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const port = process.env.PORT || 6000;

const server = new ApolloServer({ 
    typeDefs,
    resolvers
});

server.listen().then(({ url }) => {
    console.log(`Server is ready at ${url}`);
});