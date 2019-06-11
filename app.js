const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const sql = require('mssql');

const app = express();
const port = process.env.PORT || 3000;



const config = {
    user: 'DB_A3D314_library_admin',
    password: 'LIBRARY2019',
    server: 'SQL5018.site4now.net', 
    database: 'DB_A3D314_library',
 
    options: {
        encrypt: true 
    }
};

sql.connect(config).catch((err) => debug(err));

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