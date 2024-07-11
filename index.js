const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const userAPI = require('./Routes/userRoutes');

const app = express();
const PORT = 3002;

app.use(express.json());

// MongoDB connection URL with database name
const url = 'mongodb+srv://sanjayketham2004:9K4CwXofhNgPyO5g@cluster0.tdkazkh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('DB connection established');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
  process.exit(1); // Exit process on connection error
});

const server = new ApolloServer({ typeDefs, resolvers });

server.start().then(() => {
  server.applyMiddleware({ app });

  app.use('/users', userAPI);

  app.listen(PORT, () => {
    console.log(`Backend listening at http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('Error starting Apollo Server:', err);
});
