require("dotenv").config();
import { ApolloServer, gql } from "apollo-server";
import { PrismaClient } from '@prisma/client'
import { typeDefs, resolvers } from "./schema";

const prisma = new PrismaClient();


const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }:{url:string}) => {
  console.log(`🚀  Server ready at http://localhost:${process.env.PORT}`);
});