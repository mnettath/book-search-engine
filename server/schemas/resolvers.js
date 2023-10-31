const { User } = require("../models");

const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (!context.user) {
        throw AuthenticationError;
      }
      return await User.findById(context.user._id);
    },
  },
  Mutation: {
    login: async (parent, { email, password }, context) => {
      try {
        const user = await User.findOne({
          $or: [{ email }],
        });

        if (!user) {
          throw new Error("Can't find this user!");
        }

        const correctPw = await user.isCorrectPassword(password);

        if (!correctPw) {
          throw new Error("Wrong password!");
        }

        const token = signToken(user);
        return { token, user };
      } catch (error) {
        throw AuthenticationError;
      }
    },

    addUser: async (parent, { username, email, password }, context) => {
      try {
        const user = await User.create({ username, email, password });

        if (!user) {
          throw new Error("Something went wrong!");
        }

        const token = signToken(user);
        return { token, user };
      } catch (error) {
        throw AuthenticationError;
      }
    },

    saveBook: async (parent, { input }, context) => {
      if (!context.user) {
        throw new Error("Authentication required");
      }

      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: input } },
          { new: true, runValidators: true }
        );

        if (!updatedUser) {
          throw new Error("Couldn't update user");
        }

        return updatedUser;
      } catch (error) {
        throw AuthenticationError;
      }
    },

    removeBook: async (parent, { bookId }, context) => {
      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );

        return updatedUser;
      } catch (error) {
        throw AuthenticationError;
      }
    },
  },
};

module.exports = resolvers;
