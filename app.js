const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Going to add MS SQL Database access here and use "adminRoutes"
// need to figure out connection string for express
// here is asp.net connection string:
// "Data Source=SQL5018.site4now.net;Initial Catalog=DB_A3D314_library;User Id=DB_A3D314_library_admin;Password=LIBRARY2019;"


const nav = [{ link: '/books', title: 'Book' },
{ link: '/authors', title: 'Author' }]
const bookRouter = 
    require(path.join(__dirname, 'src', 'routes', 'bookRoutes'))(nav);

app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use('/books', bookRouter);

app.set('views', path.join('src', 'views'));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render(
        'index',
        {
            title: 'Library',
            nav: [{ link: '/books', title: 'Book' },
            { link: '/authors', title: 'Author' }]
        }
    );
});

app.listen(3000, function () {
    debug('listening at port ' + port + ". " + chalk.green('press ctrl+c to stop'));
});