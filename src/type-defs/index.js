const { gql } = require('apollo-server');

module.exports = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    createdAt: String!
    updatedAt: String!
  }

  input UserUniqueWhereInput {
    id: String
    email: String
  }

  input UserCreateInput {
    name: String!
    email: String!
    password: String!
    confirmPassword: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type Query {
    hello(name: String): String!
    users(limt: Int, offset: Int): [User!]!
    user(where: UserUniqueWhereInput!): User
    me: User
  }

  type Mutation {
    register(input: UserCreateInput!): User
    login(input: LoginInput!): User
  }
`;
