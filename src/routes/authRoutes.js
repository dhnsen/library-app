/* eslint-disable linebreak-style */
const express = require('express');
const debug = require('debug')('app:bookRoutes');
const { MongoClient, ObjectID } = require('mongodb');

const authRouter = express.Router();

function router() {
  authRouter.route('/signUp')
    .post((req, res) => {
      debug(req.body);
      // create user
      req.login(req.body, () => {
        res.redirect('auth/profile');
      });
    });
  authRouter.all('/profile')
    .get((req, res) => {
      res.json(req.user);
    });
  return authRouter;
}

module.exports = router;
