const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema/typeDef');
const revolvers = require('./schema/revolvers');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(routes);

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.applyMiddleware({ app });

db.once('open', () => {
  app.listen({ port: 3001 }, () => {
    console.log(`Server running at http://localhost:3001${server.graphqlPath}`);
  });
});
