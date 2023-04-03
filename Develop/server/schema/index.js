const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const { typeDefs, resolvers } = require('./schema');

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app });

app.listen({ port: 3001 }, () => {
  console.log(`🚀 Server ready at http://localhost:3001${server.graphqlPath}`);
});
