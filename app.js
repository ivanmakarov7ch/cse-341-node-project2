const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db/connection');

dotenv.config();

const app = express();
app.use(express.json()); // parse JSON requests

// Connect to MongoDB
connectDB();

// Root route (your Hello World)
app.get('/', (req, res) => {
  res.send('Hello World, This is Node!');
});

// Routes
const consumerRoutes = require('./routes/consumers');
const cakeRoutes = require('./routes/cakes');

app.use('/api/consumers', consumerRoutes);
app.use('/api/cakes', cakeRoutes);

// Port setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Web Server is listening at port ${PORT}`);
});
