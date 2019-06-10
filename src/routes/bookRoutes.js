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
            
            const request = new sql.Request();
            request.query('select * from books')
            .then((results) => {
                debug(results);
                res.render('bookListView',
                {
                    title: 'Library',
                    nav,
                    books: results.recordset
                }
            );
            })
            
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