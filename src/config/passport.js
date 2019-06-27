/* eslint-disable linebreak-style */
/* eslint-disable indent */
const path = require('path');

const passport = require('passport');

// eslint-disable-next-line import/no-dynamic-require
require(path.join(__dirname, 'strategies/local.strategy'));

module.exports = function passportConfig(app) {
    app.use(passport.initialize());
    app.use(passport.session());

    // Stores user in session
    passport.serializeUser((user, done) => {
      done(null, user);
    });

    // Retrieves user from session
    passport.deserializeUser((user, done) => {
      done(null, user);
    });
  };
