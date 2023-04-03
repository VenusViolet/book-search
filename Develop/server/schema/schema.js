const { gql } = require('apollo-server-express');

// Define your typeDefs
const typeDefs = gql`
  type Book {
    _id: ID
    title: String
    authors: [String]
    description: String
    image: String
    link: String
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }

  input BookInput {
    _id: ID
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(input: BookInput!): User
    removeBook(bookId: ID!): User
  }
`;

// Define your resolvers
const resolvers = {
  Query: {
    me: () => {
      // ...
    },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      // ...
    },
    addUser: async (parent, { username, email, password }) => {
      // ...
    },
    saveBook: async (parent, { input }, context) => {
      // ...
    },
    removeBook: async (parent, { bookId }, context) => {
      // ...
    },
  },
};

module.exports = { typeDefs, resolvers };
