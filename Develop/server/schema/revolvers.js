const User = require('./server/models/User');

const resolvers = {
  Query: {
    getUser: async (parent, { id }) => {
      try {
        const user = await User.findById(id);
        return user;
      } catch (err) {
        throw new Error(err);
      }
    }
  },
  Mutation: {
    createUser: async (parent, { username, email }) => {
      try {
        const newUser = new User({
          username,
          email
        });
        const user = await newUser.save();
        return user;
      } catch (err) {
        throw new Error(err);
      }
    }
  }
};

module.exports = resolvers;
