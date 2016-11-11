// Schema : Post
const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    auteur: {
        type: String,
        default: "Anonymous"
    },
    content: String,
    image: String,
    votes: {
        up: {
            type: Number,
            default: 0
        },
        down: {
            type: Number,
            default: 0
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('Post', postSchema);
