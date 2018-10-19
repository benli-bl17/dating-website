const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name: String,
    date: String,
    time: String,
    description: String,
    amount: Number,
    members: Array,
    membersID: Array,
    pic: String,
    location: String,
});

module.exports = mongoose.model('event', eventSchema, 'events');