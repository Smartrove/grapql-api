const Post = require("./models/PostModel");

const { gql } = require("apollo-server-express");
const resolvers = {
  Query: {
    hello: () => {
      return "Hello World";
    },
    getAllPosts: async () => {
      //first method
      // const post = await Post.find();
      // return post;

      //second method
      return await Post.find();
    },
  },

  Mutation: {
    createPost: async (parent, args, context, info) => {
      const { title, description } = args.post;
      const post = new Post({ title, description });
      await post.save();
      return post;
    },
  },
};

module.exports = resolvers;
