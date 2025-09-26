const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: '/auth/github/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      //just return the GitHub profile
      return done(null, profile);
    }
  )
);

// Save user in the session
passport.serializeUser((user, done) => {
  done(null, user);
});

// Retrieve user from the session
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

module.exports = passport;
