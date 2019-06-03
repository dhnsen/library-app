const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;



app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));

app.set('views', path.join('src', 'views'));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render(
        'index', 
        { 
            title: 'Library', 
            nav: ['books', 'authors'] 
        }
    );
});

app.listen(3000, function () {
    debug('listening at port ' + port + ". " + chalk.green('press ctrl+c to stop'));
});