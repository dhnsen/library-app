const express = require('express');

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

const bookRouter = express.Router();

bookRouter.route('/')
    .get(function (req, res) {
        res.render('books',
            {
                title: 'Library',
                nav: [{ link: '/books', title: 'Books' },
                { link: '/authors', title: 'Authors' }],
                books
            }
        );
    });

bookRouter.route('/single')
    .get(function (req, res) {
        res.send("Hello from single book");
    });

    module.exports = bookRouter;