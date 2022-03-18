const { ApolloServer } = require('apollo-server-express');
const Express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require('apollo-server-core');
const cookieParser = require('cookie-parser');

const typeDefs = require('./type-defs');
const resolvers = require('./resolvers');
const utils = require('./utils');

async function main() {
  const dbUri = config.get('databaseUri');
  const app = Express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    context: ({ req, res }) => ({
      request: req,
      response: res,
    }),
  });

  await server.start();

  app.use(cookieParser());

  server.applyMiddleware({
    app,
    cors: true,
  });

  app.listen({ port: 4000 }, async () => {
    await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      dbName: 'jwt-auth-gql_collection',
      autoCreate: true,
    });
    console.log('Database connected!');
    console.log('server running on http://localhost:4000/graphql');
  });
}

main();
