const express = require('express');
const chalk = require('chalk');
const debug = require('debug');
const morgan = require('morgan');


const app = express();

app.use(morgan('combined'));

app.get('/', function(req, res){
    res.send('test from express.get');
});

app.listen(3000, function(){
    debug(chalk.green('listening on port 3000. ctrl+c to stop'));
});