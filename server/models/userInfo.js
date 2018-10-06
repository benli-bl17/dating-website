const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userInfoSchema = new Schema({
    userId:String,
    firstName:String,
    lastName:String,
    gender:String,
    dateOfBirth:String,
    marriageStatus:String,
    education: String,
    height:Number,
    weight:Number,
    location:String,
    phoneNumber:Number
});

module.exports = mongoose.model('userInfo', userInfoSchema, 'userInfo');