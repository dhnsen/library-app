const express = require('express');
const bookRouter = express.Router();
const debug = require('debug')('app:bookRoutes');
const { MongoClient } = require('mongodb');

function router(nav) {

  bookRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('connected to DB server on books');

          const db = client.db(dbName);
          const col = await db.collection('books');

          const books = await col.find().toArray();
          res.render(
            'bookListView',
            {
              nav,
              title: 'Library',
              books
            }
          );

        } catch (err) {
          debug(err.stack);
        }
        client.close();
      }());
    });

  bookRouter.route('/:id')
    .get((req, res) => {
      const { id } = req.params;
      res.render(
        'bookView',
        {
          nav,
          title: 'Library',
          book: books[id]
        }
      );
    });
  return bookRouter;
}



module.exports = router;
