const config = require('./package.json').config;
const express = require('express');
const app = express();
const morgan = require('morgan');
const api = require('./api');
const bodyParser = require('body-parser');

// Middlewares Express
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Link API
app.use(api);

// Serve static files (images)
app.use('/images/', express.static(__dirname + '/images'))

app.listen(config.port, () => {
    console.log(`API lancée sur le port ${config.port}`);
})
