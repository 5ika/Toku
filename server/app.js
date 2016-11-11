const config = require('./package.json').config;
const app = require('express')();
const morgan = require('morgan');
const api = require('./api');
const bodyParser = require('body-parser');

// Middlewares Express
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Link API
app.use(api);

app.listen(config.port, () => {
    console.log(`API lancée sur le port ${config.port}`);
})
