import { makeExecutableSchema } from '@graphql-tools/schema';
const { loadFilesSync } = require('@graphql-tools/load-files');
const { mergeTypeDefs, mergeResolvers  } = require('@graphql-tools/merge');

export const typeDefs = mergeTypeDefs(loadFilesSync(`${__dirname}/**/*.typeDefs.ts`));
export const resolvers = mergeResolvers(loadFilesSync(`${__dirname}/**/*.resolvers.ts`));

export const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})