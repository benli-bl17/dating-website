const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name:String,
    date:String,
    description:String
});

module.exports = mongoose.model('event', eventSchema, 'events');