import { ApolloServer } from 'apollo-server';
import { makeExecutableSchema } from '@graphql-tools/schema';
import types from './typeDefs';
import resolvers from './resolvers';
import { typeDefs as scalarsTypedefs, resolvers as scalarsResolvers } from 'graphql-scalars';
import { decodedToken } from './decodedToken';
import { prisma } from './prismaclient'
import { main } from './forgottenPassword';
import {ApolloServerPluginLandingPageLocalDefault} from 'apollo-server-core';

const schema = makeExecutableSchema({
  typeDefs: [types, ...scalarsTypedefs],
  resolvers: { ...resolvers, ...scalarsResolvers },
});
const server = new ApolloServer({
  schema,
  csrfPrevention: true,
  context: async ({ req }) => {
    // Get the user token from the headers.
    const payload = decodedToken(req);

    let user;

    if (payload) {
      user = await prisma.user.findUnique({
        where: {
          email: payload.email,
        },
      });
    }

    // Add the user to the context
    return { user };
  },
  plugins: [ApolloServerPluginLandingPageLocalDefault({embed: true})] //obligatoire pour voir votre studio 
});

server.listen({ port: 4000 }, () => {
  console.log('connected');
});
