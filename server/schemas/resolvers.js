const { User } = require("../models");

const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: {},
  },
  Mutation: {
    login: {},
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    saveBook: {},
    removeBook: {},
  },
};

module.exports = resolvers;
