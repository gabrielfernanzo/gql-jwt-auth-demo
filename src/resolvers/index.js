module.exports = {
  Query: {
    hello(_, { name }) {
      return `Hello ${name || 'World!'}`;
    },  
  },
};
