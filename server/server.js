const http = require('http');
const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const { importSchema } = require('graphql-import');
const depthLimit = require('graphql-depth-limit');


//function import
const connectDB = require('./db/connection');
const formatGraphQlErrors = require('./helpers/formatGraphQlErrors');
const { verifyToken } = require('./helpers/jwt');

//Models
const User = require('./models/user');
const Product = require('./models/product');
const Order = require('./models/order');

//env
dotenv.config({ path: "./config/config.env" });
//DB
connectDB();


//graphql server
const resolvers = require('./graphql/resolver/index');
const typeDefs = importSchema('./graphql/schema.graphql');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: formatGraphQlErrors,  
  context: ({ req }) => ({
    User,
    Product,
    Order,
    isAuthorization: verifyToken(req, req.headers.authorization),
    activeUser: req ? req.activeUser : null
  }),  
  introspection: true,
  validationRules: [depthLimit(7)]
});


const app = express();
app.use(express.json());

//helmet
app.use(
  helmet({
    contentSecurityPolicy:
      process.env.NODE_ENV === "production" ? undefined : false,
    crossOriginEmbedderPolicy:
      process.env.NODE_ENV === "production" ? undefined : false,
  })
);

//cors
app.use(
    cors({
        origin: (origin, cb) => cb(null, true),
        credentials: true
    })
);

const serverStartup = async () => {
  await server.start();
  server.applyMiddleware({ app,  cors: true, path: "/graphql"});
  return app;
}

serverStartup();
const httpServer = http.createServer(app);
httpServer.listen(process.env.PORT || 1905, () => console.log(`🚀 Server ready at http://localhost:1905${server.graphqlPath}`));
