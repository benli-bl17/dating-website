const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userInfoSchema = new Schema({
    userName: String,
    gender: String,
    language: String,
    email: String,
    City: String,
    photo: String,
});

module.exports = mongoose.model('userInfo', userInfoSchema, 'userInfo');