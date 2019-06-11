const express = require('express');
const bookRouter = express.Router();
const sql = require('mssql');
const debug = require('debug')('app:bookRoutes');

function router(nav) {
    const books = [
        {
            title: "Harry Potter and the Sorceror's Stone",
            genre: 'Fantasy',
            author: 'JK Rowling',
            read: false
        },
        {
            title: "War and Peace",
            genre: 'Historical Ficiton',
            author: 'Leo Tolstoy',
            read: false
        }
    ]

    bookRouter.route('/')
        .get(function (req, res) {
            (async function query() {
                const request = new sql.Request();
                const result = await request.query('select * from books');
                debug(result);
                res.render('bookListView',
                    {
                        title: 'Library',
                        nav,
                        books: result.recordset
                    }
                );
            }());
        });

    bookRouter.route('/:id').get(function (req, res) {
        const { id } = req.params;
        res.render('bookView',
            {
                title: 'Library',
                nav,
                book: books[id]
            }
        );
    });
    return bookRouter;
}

module.exports = router;