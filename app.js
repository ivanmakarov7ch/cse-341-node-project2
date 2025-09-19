const express = require('express');
const connectDB = require('./db/connection');
require('dotenv').config();

const consumersRouter = require('./routes/consumers');
const cakesRouter = require('./routes/cakes');

const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/consumers', consumersRouter);
app.use('/api/cakes', cakesRouter);

// Test route
app.get('/', (req, res) => {
  res.send('Hello World, This is Node!');
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Server running on port ' + port);
});
