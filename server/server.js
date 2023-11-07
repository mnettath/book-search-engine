const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { expressMiddleware } = require("@apollo/server/express4");
const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth");
const db = require("./config/connection");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // context: authMiddleware,
});

// Serve up static assets

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use("/graphql", expressMiddleware(server, { context: authMiddleware }));

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));
    // * - can directly navigate to pages that arent the home page without an error
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/dist/index.html"));
    });
  }

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on localhost:${PORT}`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
}

startServer();
