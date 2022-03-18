const { ApolloError, ForbiddenError } = require('apollo-server');

const { genTokens, comparePasswords, authCheck } = require('../utils');
const models = require('../schemas/');

module.exports = {
  User: {
    id(root) {
      return root._id.toString();
    },
    createdAt(root) {
      return new Date(root.createdAt).toISOString();
    },
    updatedAt(root) {
      return new Date(root.createdAt).toISOString();
    },
  },

  Query: {
    hello(_, { name }) {
      return `Hello ${name || 'World!'}`;
    },
    async users(_, { limit = 20, offset = 0 }) {
      return (await models.UserModel.find().limit(limit).skip(offset)) || [];
    },
    async user(_, { where }) {
      return await models.UserModel.findOne({ $where: where });
    },

    //
    async me(_, __, ctx) {
      const token = ctx.request.cookies['access-token'];

      if (!token) return new ForbiddenError('Login is required');

      const user = authCheck();

      return await models.UserModel.findById(user.userId);
    },
  },

  Mutation: {
    register(_, { input }, ctx) {
      return models.UserModel.create(input).then((user) => {
        const [accessToken] = genTokens({ userId: user._id });

        ctx.response.cookie('access-token', accessToken, {
          expires: new Date(Date.now() + 1000 * 60 * 3),
          httpOnly: true,
          secure: true,
        });

        return user;
      });
    },

    async login(_, { input }, ctx) {
      try {
        const user = await models.UserModel.findOne({ email: input.email });

        const isMatch = comparePasswords(input.password, user.password);

        if (!isMatch) return new ForbiddenError('incorrect password');

        const [accessToken] = genTokens({
          userId: user._id,
        });

        ctx.response.cookie('access-token', accessToken, {
          expires: new Date(Date.now() + 1000 * 60 * 3),
          httpOnly: true,
          secure: true,
        });

        return user;
      } catch (error) {
        return new ApolloError(error);
      }
    },
  },
};
