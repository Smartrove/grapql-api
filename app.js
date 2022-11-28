const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const mongoose = require("mongoose");
const dotenv = require("dotenv/config");

async function startServer() {
  const port = process.env.PORT;
  const app = express();
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app: app });

  app.use((req, res) => {
    res.send("Hello, world!");
  });

  const connection = await mongoose
    .connect(process.env.gql_db)
    .then(() => console.log(`database connected successfully`))
    .catch((err) => {
      console.log(err);
    });

  app.listen(port, () => console.log(`server started on port ${port}`));
}
startServer();
