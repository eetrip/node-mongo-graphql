import { ApolloServer, gql } from 'apollo-server-express';
import express from 'express';
import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';
import db from './db';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.PORT;

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.applyMiddleware({ app });

const startServer = async () => app.listen(
    { port },
    () => new db.Database().createConnection().then(
        () => console.log(
            `server at http://localhost:${port}${server.graphqlPath}`
        )
    )
);

startServer();