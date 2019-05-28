const express = require('express');
const chalk = require('chalk');
const debug = require('debug');
const morgan = require('morgan');


const app = express();

app.use(morgan('combined'));

app.get('/', function (req, res) {
    res.sendfile(__dirname + '\\views\\index.html');
});

app.listen(3000, function () {
    debug('listening on port ' + chalk.green('3000'));
});