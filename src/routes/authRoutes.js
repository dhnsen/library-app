/* eslint-disable linebreak-style */
/* eslint-disable indent */
const express = require('express');
const debug = require('debug')('app:bookRoutes');
const { MongoClient, ObjectID } = require('mongodb');

const authRouter = express.Router();

function router() {
    authRouter.route('/signUp')
        .post((req, res) => {
            debug(req.body);
        });
}

module.exports = router;
