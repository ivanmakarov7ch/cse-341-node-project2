require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const connectDB = require('./db/connection');

const consumersRouter = require('./routes/consumers');
const cakesRouter = require('./routes/cakes');
const swaggerDocs = require('./swagger');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secretkey',
    resave: false,
    saveUninitialized: false,
  })
);

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL || 'http://localhost:3000/auth/github/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      // Here you could save the user to DB if you want
      return done(null, profile);
    }
  )
);

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/consumers', consumersRouter);
app.use('/api/cakes', cakesRouter);

// OAuth routes
app.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

app.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/protected'); // redirect after successful login
  }
);

// Logout
app.get('/logout', (req, res) => {
  req.logout(err => {
    if (err) return res.status(500).json({ message: 'Logout failed' });
    res.send('Logged out successfully');
  });
});

// Protected route example
const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ message: 'Unauthorized' });
};

app.get('/protected', ensureAuthenticated, (req, res) => {
  res.json({ message: 'You are logged in!', user: req.user });
});

// Test route
app.get('/', (req, res) => {
  res.send('Hello World, This is Node Project2!');
});

// Swagger
swaggerDocs(app);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

/**
 * @swagger
 * /auth/github:
 *   get:
 *     summary: Login with GitHub
 *     description: Redirects user to GitHub for OAuth login
 *     responses:
 *       302:
 *         description: Redirect to GitHub login
 */

/**
 * @swagger
 * /auth/github/callback:
 *   get:
 *     summary: GitHub OAuth callback
 *     description: Redirect URI after GitHub login
 *     responses:
 *       302:
 *         description: Redirect to /protected after successful login
 */

/**
 * @swagger
 * /protected:
 *   get:
 *     summary: Protected route
 *     description: Returns user info if logged in via GitHub OAuth
 *     security:
 *       - githubAuth: [user:email]
 *     responses:
 *       200:
 *         description: Logged in user info
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /logout:
 *   get:
 *     summary: Logout the user
 *     description: Logs out the current GitHub user session
 *     responses:
 *       200:
 *         description: Logged out successfully
 */
