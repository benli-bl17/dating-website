const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const friendSchema = new Schema({
    user: String,
    friends: Array,
});

module.exports = mongoose.model('friend', friendSchema, 'friend');