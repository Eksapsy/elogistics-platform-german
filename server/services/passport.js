const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const Sender = mongoose.model('senders');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  Sender.findById(id)
    .then(user => {
      done(null, user);
    })
});

passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientId,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
  },
    async (accessToken, refreshToken, profile, done) => {
      console.log('profile');
      const existingUser = await Sender.findOne({
        googleID: profile.id
      });

      if (existingUser) {
        return done(null, existingUser);
      }

      const user = await new Sender({
        googleID: profile.id,
        displayName: profile.displayName
      }).save();
      done(null, user);
    }
  )
);