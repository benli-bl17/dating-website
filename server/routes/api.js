const express = require('express')
const router = express.Router()
const User = require('../models/user')
const UserInfo = require('../models/userInfo')
const Event = require('../models/event')
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
// Database address
const db = "mongodb://aip:aippass80@ds231720.mlab.com:31720/datingdb"

// Connect to the database
mongoose.connect(db, err => {
    if (err) {
        console.error('Error!' + err)
    } else {
        console.log('Connected to Mogodb')
    }
})
//Define verifyToken to verify the request
function verifyToken(req, res, next) {
    const unAuthorizedRequest = 'Unauthorized request'
    if (!req.headers.authorization) {
        return res.status(401).send(unAuthorizedRequest)
    }
    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
        return res.status(401).send(unAuthorizedRequest)
    }
    let payload = jwt.verify(token, 'aip')
    if (!payload) {
        return res.status(401).send(unAuthorizedRequest)
    }
    req.userId = payload.subject
    next()
}
// respond with "From API route" when a GET request is made to the homepage
router.get('/', (req, res) => {
    res.send('From API route')
})
// post method for register api 
router.post('/register', (req, res) => {
    let userData = req.body
    let user = new User(userData)
    User.findOne({ email: user.email }, (err, userExist) => {
        if (err) return next(err);
        //respond User Existed message if user already exists
        else if (userExist) {
            res.json("User Existed")
        }
        // save the data of the new user
        else {
            user.save((error, registeredUser) => {
                if (error) {
                    console.log(error)
                } else {
                    // TOKEN BASED AUTHENTICATION
                    let payload = { subject: registeredUser._id }
                    let token = jwt.sign(payload, 'aip')
                    // add userId into userinfo collection
                    let userInfo = new UserInfo({ "userId": user._id })
                    userInfo.save()
                    res.status(200).send({ token })
                }
            });
        }
    })
})
// POST method for login api
router.post('/login', (req, res) => {
    let userData = req.body;
    User.findOne({ email: userData.email }, (error, user) => {
        if (error) {
            console.log(error)
        } else {
            //check the email and password and give according respond
            if (!user) {
                res.json("Invalid email")
            } else if (user.password !== userData.password) {
                res.json("Invalid password")
            } else {
                //TOKEN BASED AUTHENTICATION
                let payload = { subject: user._id }
                let token = jwt.sign(payload, 'aip')
                res.status(200).send({ token })
            }
        }
    })
})
//POST method for join api
router.post('/join', verifyToken, (req, res) => {
    let join = req.body;
    //find the event, add the user name into the member list, update the member numbers
    Event.findOne({ _id: join.event }, (err, eventJoin) => {
        if (!eventJoin) {
            console.log(join.event + "Not Found")
        }
        else {
            eventJoin.members.push(join.user);
            eventJoin.amount = eventJoin.members.length;
            eventJoin.save();
        }
    })
})
//POST method for quit api
router.post('/quit', verifyToken, (req, res) => {
    let quit = req.body;
    Event.findOne({ _id: quit.event }, (err, eventQuit) => {
        if (!eventQuit) {
            console.log(quit.event + "Not Found")
        }
        // find the event and delete the user name from the member list
        else {
            if (eventQuit.members.indexOf(quit.user) !== -1) {
                eventQuit.members.splice(eventQuit.members.indexOf(quit.user), 1);
                eventQuit.amount = eventQuit.members.length;
                eventQuit.save();
            }
        }
    })
})
// Get method for events api
router.get('/events', (req, res) => {
    Event.find(function (err, events) {
        if (err) return next(err);
        res.json(events);
    });
})
//Get method for members api
router.get('/members', verifyToken, (req, res) => {
    let memberNew = [];
    let token = req.headers.authorization.split(' ')[1]
    // Verification token
    let payload = jwt.verify(token, 'aip')
    req.userId = payload.subject
    UserInfo.find(function (err, members) {
        if (err) return next(err);
        members.forEach(function (eachMember) {
            if (eachMember.lastName) {
                //Do not display current user information
                if (eachMember.userId !== req.userId) {
                    memberNew.push(eachMember);
                }
            }
        });
        res.json(memberNew);
    });
})
//Get method for userinfo api
router.get('/userInfo', verifyToken, (req, res) => {
    let token = req.headers.authorization.split(' ')[1]
    let payload = jwt.verify(token, 'aip')
    req.userId = payload.subject
    let id = req.userId
    UserInfo.findOne({ "userId": id }, function (err, userInfo) {
        if (err) return next(err);
        res.json(userInfo);
    });
})
//Post method foe userinfoupdate api
router.post('/userInfoUpdate', verifyToken, (req, res) => {
    let userInfoData = req.body
    let id = userInfoData.userId
    UserInfo.findOne({ "userId": id }, (err, userInfo) => {
        if (!userInfo) {
            console.log("Not Found")
        } else {
            //Update user information to the database
            userInfo.firstName = userInfoData.firstName
            userInfo.lastName = userInfoData.lastName
            userInfo.gender = userInfoData.gender
            userInfo.dateOfBirth = userInfoData.dateOfBirth
            userInfo.marriageStatus = userInfoData.marriageStatus
            userInfo.education = userInfoData.education
            userInfo.job = userInfoData.job
            userInfo.height = userInfoData.height
            userInfo.weight = userInfoData.weight
            userInfo.location = userInfoData.location
            userInfo.phoneNumber = userInfoData.phoneNumber
            userInfo.description = userInfoData.description
            userInfo.save()
        }
    })
})
//Get method for user detail information
router.get('/user/:id', verifyToken, (req, res) => {
    let id = req.params.id
    UserInfo.findOne({ "userId": id }, function (err, userInfo) {
        if (err) return next(err);
        res.json(userInfo);
    });
})
module.exports = router