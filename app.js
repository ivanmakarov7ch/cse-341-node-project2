require('dotenv').config();
const express = require('express');
const connectDB = require('./db/connection');
const passport = require('./auth'); // our passport config
const session = require('express-session');
const cors = require('cors');

const consumersRouter = require('./routes/consumers');
const cakesRouter = require('./routes/cakes');
const swaggerDocs = require('./swagger');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'supersecret',
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
connectDB();

// --- OAuth Routes ---
app.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

app.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/protected');
  }
);

app.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect('/');
  });
});

// Middleware to protect routes
function ensureAuth(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ message: 'Unauthorized' });
}

// Routes
app.use('/api/consumers', consumersRouter);
app.use('/api/cakes', cakesRouter);

// Test route
app.get('/', (req, res) => {
  res.send('Hello World, This is Node! Try /auth/github to log in.');
});

// Protected test route
app.get('/protected', ensureAuth, (req, res) => {
  res.json({
    message: 'You are logged in!',
    user: req.user,
  });
});

// Swagger setup
swaggerDocs(app);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Server running on port ' + port);
});


