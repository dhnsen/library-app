/* eslint-disable linebreak-style */
const express = require('express');
const debug = require('debug')('app:authRoutes');
const { MongoClient, ObjectID } = require('mongodb');

const authRouter = express.Router();

function router() {
  authRouter.route('/signUp')
    .post((req, res) => {
      const { username, password } = req.body;
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      (async function addUser() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('connected to DB server on auth');

          const db = client.db(dbName);

          const col = db.collection('users');
          const user = { username, password };
          const results = col.insertOne(user);
          debug(results);
        } catch (err) {
          debug(err);
        }
      }());
      req.login(req.body, () => {
        res.redirect('/auth/profile');
      });
    });
  authRouter.route('/profile')
    .get((req, res) => {
      res.json(req.user);
    });
  return authRouter;
}

module.exports = router;
