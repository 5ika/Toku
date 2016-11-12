const api = require('express').Router();
const config = require('./package.json').config;
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/toku');

const Posts = require('./models/post');

const allowCrossDomain = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
api.use(allowCrossDomain);

const handleData = (error, data, res) => {
    if (error)
        res.status(500).json({error});
    else
        res.json(data);
    }

// GET All posts
api.get('/', (req, res) => Posts.find({}, (error, data) => handleData(error, data, res)));

// GET :number last posts
api.get('/last/:number', (req, res) => Posts.find({}).sort({date: -1}).limit(req.params.number).exec((error, data) => handleData(error, data, res)));

// GET One post by ID
api.get('/:id', (req, res) => Posts.findById(req.params.id, (error, data) => handleData(error, data, res)));

// POST a new post
api.post('/', (req, res) => {
    const data = req.body;
    const post = new Posts(data);
    post.save((err) => handleData(err, post, res));
});

// PUT / update a post by ID
api.put('/:id', (req, res) => {
    const id = req.params.id;
    const data = req.body;
    Posts.findByIdAndUpdate(id, data, (err, object) => handleData(err, object, res));
});

// PUT / Upvote a post by ID
api.put('/up/:id', (req, res) => {
    const id = req.params.id;
    const update = {
        $inc: {
            "votes.up": 1
        }
    };
    Posts.findByIdAndUpdate(id, update, (err, object) => handleData(err, object, res));
});

// PUT / Downvote a post by ID
api.put('/down/:id', (req, res) => {
    const id = req.params.id;
    const update = {
        $inc: {
            "votes.down": 1
        }
    };
    Posts.findByIdAndUpdate(id, update, (err, object) => handleData(err, object, res));
});

// DELETE a post by ID
api.delete('/:id', (req, res) => {
    const pass = req.body.password;
    if (pass == config.delete_password) {
        const id = req.params.id;
        Posts.findByIdAndRemove(id, (err, object) => handleData(err, object, res));
    } else
        res.status(401).json({error: 'Unauthorized'});
    }
);

module.exports = api;
