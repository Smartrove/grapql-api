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
    getPost: async (_parent, { id }, _context, _info) => {
      return Post.findById(id);
    },
  },

  Mutation: {
    createPost: async (parent, args, context, info) => {
      const { title, description, state } = args.post;
      const post = new Post({ title, description, state });
      await post.save();
      return post;
    },
    deletePost: async (parent, args, context, info) => {
      const { id } = args;
      await Post.findByIdAndDelete(id);
      return "Post deleted successfully";
    },
    updatePost: async (parent, args, context, info) => {
      const { id } = args;
      const { title, description } = args.post;
      const updates = {};
      if (title !== undefined) {
        updates.title = title;
      }
      if (description !== undefined) {
        updates.description = description;
      }
      const post = await Post.findByIdAndUpdate(id, updates, { new: true });
      return "Post updated successfully";
    },
  },
};

module.exports = resolvers;
