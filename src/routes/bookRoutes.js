/* eslint-disable linebreak-style */
const express = require('express');

const bookRouter = express.Router();
const debug = require('debug')('app:bookRoutes');
const { MongoClient, ObjectID } = require('mongodb');
const bookController = require('../controllers/bookController');

function router(nav) {
  const { getIndex } = bookController(nav);
  bookRouter.use((req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.redirect('/');
    }
  });
  bookRouter.route('/')
    .get((req, res) => {
      
    });

  bookRouter.route('/:id')
    .get((req, res) => {
      const { id } = req.params;
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('connected to DB server on books');

          const db = client.db(dbName);
          const col = await db.collection('books');

          const book = await col.findOne({ _id: new ObjectID(id) });
          debug(book);
          res.render(
            'bookView',
            {
              nav,
              title: 'Library',
              book,
            },
          );
        } catch (err) {
          debug(err.stack);
        }
      }());
    });
  return bookRouter;
}


module.exports = router;
