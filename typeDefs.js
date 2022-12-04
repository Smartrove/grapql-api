const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Post {
    id: ID
    title: String
    description: String
    state: String
  }

  type Query {
    hello: String
    getAllPosts: [Post]
    getPost(id: ID): Post
  }
  input PostInput {
    title: String
    description: String
  }
  type Mutation {
    createPost(post: PostInput): Post
    deletePost(id: ID): String
    updatePost(id: ID, post: PostInput): String
  }
`;

module.exports = typeDefs;
