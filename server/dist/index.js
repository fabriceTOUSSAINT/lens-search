"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const schema_1 = __importDefault(require("./schema"));
const resolvers_1 = __importDefault(require("./resolvers"));
const searchPhotos_1 = __importDefault(require("./api/searchPhotos"));
const dataSources = () => ({
    searchPhotosAPI: new searchPhotos_1.default(),
});
const port = process.env.PORT || 6000;
const server = new apollo_server_1.ApolloServer({
    typeDefs: schema_1.default,
    resolvers: resolvers_1.default,
    dataSources
});
server.listen().then(({ url }) => {
    console.log(`Server is ready at ${url}`);
});
