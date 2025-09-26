require('dotenv').config();
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const connectDB = require('./db/connection');
const User = require('./models/user');

const consumersRouter = require('./routes/consumers');
const cakesRouter = require('./routes/cakes');
const swaggerDocs = require('./swagger');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =======================
// Connect to MongoDB first
// =======================
(async () => {
  try {
    await connectDB();

    // =======================
    // Session setup
    // =======================
    app.use(
      session({
        secret: process.env.SESSION_SECRET || 'secretkey',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
          mongoUrl: process.env.MONGO_URI,
          collectionName: 'sessions',
        }),
        cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
      })
    );

    // =======================
    // Passport setup
    // =======================
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
      done(null, user.id); // store only MongoDB _id in session
    });

    passport.deserializeUser(async (id, done) => {
      try {
        const user = await User.findById(id);
        done(null, user);
      } catch (err) {
        done(err, null);
      }
    });

    passport.use(
      new GitHubStrategy(
        {
          clientID: process.env.GITHUB_CLIENT_ID,
          clientSecret: process.env.GITHUB_CLIENT_SECRET,
          callbackURL:
            process.env.GITHUB_CALLBACK_URL ||
            'https://cse-341-node-project2.onrender.com/auth/github/callback',
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
            let user = await User.findOne({ githubId: profile.id });
            if (!user) {
              user = await User.create({
                githubId: profile.id,
                username: profile.username,
                displayName: profile.displayName,
                email: profile.emails?.[0]?.value,
                avatarUrl: profile._json.avatar_url,
              });
            }
            return done(null, user);
          } catch (err) {
            return done(err, null);
          }
        }
      )
    );

    // =======================
    // Routes
    // =======================
    app.use('/api/consumers', consumersRouter);
    app.use('/api/cakes', cakesRouter);

    // OAuth routes
    app.get(
      '/auth/github',
      passport.authenticate('github', { scope: ['user:email'] })
    );

    app.get(
      '/auth/github/callback',
      passport.authenticate('github', { failureRedirect: '/' }),
      (req, res) => {
        res.redirect('/protected'); // redirect after successful login
      }
    );

    // Logout
    app.get('/logout', (req, res, next) => {
      req.logout(err => {
        if (err) return next(err);
        res.redirect('/');
      });
    });

    // Protected route
    const ensureAuthenticated = (req, res, next) => {
      if (req.isAuthenticated()) return next();
      res.status(401).json({ message: 'Unauthorized' });
    };

    app.get('/protected', ensureAuthenticated, (req, res) => {
      res.json({ message: 'You are logged in!', user: req.user });
    });

    // Home page
    app.get('/', (req, res) => {
      if (req.isAuthenticated()) {
        res.send(
          `<h1>Hello ${req.user.username}!</h1><a href="/logout">Logout</a>`
        );
      } else {
        res.send(
          '<h1>Hello World, This is Node Project2!</h1><a href="/auth/github">Login with GitHub</a>'
        );
      }
    });

    // Swagger
    swaggerDocs(app);

    // =======================
    // Start server
    // =======================
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
  }
})();
