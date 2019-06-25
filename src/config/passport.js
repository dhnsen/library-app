/* eslint-disable linebreak-style */
/* eslint-disable indent */
const passport = require('passport');

module.exports = function passportConfig(app) {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser();
    passport.deserializeUser();
};
