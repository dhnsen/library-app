/* eslint-disable linebreak-style */
/* eslint-disable indent */
// eslint-disable-next-line import/no-dynamic-require
const path = require('path');

require(path.join(__dirname, 'strategies', 'local.strategy'));

const passport = require('passport');

module.exports = function passportConfig(app) {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    
};
