const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');
const userdb = require('../etc/userdb');
const bcrypt = require('bcrypt');

const Sender = mongoose.model('senders');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  userdb.findById(id, (err, user) => {
    if (err) {
      return done(err);
    }
    done(null, user);
  });
});

passport.use(
  new Strategy((username, password, cb) => {
    userdb.findByUsername(username, (err, user) => {
      if (err) {
        return cb(err);
      }
      if (!user) {
        return cb(null, false);
      }
      if (user.password != password) {
        return cb(null, false);
      }
      return cb(null, user);
    });
  })
);