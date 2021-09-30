require("dotenv").config();

import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express';
import http from 'http';

import { typeDefs, resolvers } from "./schema";
import { getUser } from "./user/user.utils";
import { makeExecutableSchema } from '@graphql-tools/schema';
import { graphqlUploadExpress } from 'graphql-upload';

const schema = makeExecutableSchema({typeDefs, resolvers});

const startApolloServer = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    schema,
    context: async({req}) => {
      return{
        isLoggedIn: await getUser(req.headers.token as string)
      }
    },
    plugins: [ApolloServerPluginDrainHttpServer({httpServer})],
  });

  await server.start();
  
  app.use("/static", express.static("uploads"));
  app.use(graphqlUploadExpress());

  server.applyMiddleware({app});

  await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  return { server, app };
}
startApolloServer();