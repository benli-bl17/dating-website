const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Event = require('../models/event')
const Members = require('../models/userInfo')
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
const db = "mongodb://aip:aippass80@ds231720.mlab.com:31720/datingdb"


mongoose.connect(db, err => {
    if (err) {
        console.error('Error!' + err)
    } else {
        console.log('Connected to Mongodb')
    }
});
function verifyToken(req, res, next) {
    if(!req.headers.authorization) {
      return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null') {
      return res.status(401).send('Unauthorized request')    
    }
    let payload = jwt.verify(token, 'aip')
    if(!payload) {
      return res.status(401).send('Unauthorized request')    
    }
    req.userId = payload.subject
    next()
  }

router.get('/', (req, res) => {
    res.send('From API route')
})

router.post('/register', (req, res) => {
    let userData = req.body;
    let userNew = new User(userData);
    let userInfo = new Members(userData);
    User.findOne({ email: userData.email }, (error, user) => {
        if (error) {
            console.log(error)
        } else {
            if (!user) {
                userNew.save((error, registeredUser) => {
                    if (error) {
                        console.log(error)
                    } else {
                        let payload = { subject: registeredUser._id };
                        let token = jwt.sign(payload, 'aip');
                        res.status(200).send({ token })
                    }
                })
                userInfo.save();
            } else {
                res.status(401).send('Existed email')
            }
        }
    })
})

router.post('/login', (req, res) => {
    let userData = req.body;
    User.findOne({ email: userData.email }, (error, user) => {
        if (error) {
            console.log(error)
        } else {
            if (!user) {
                res.status(401).send('Invalid email')
            } else if (user.password !== userData.password) {
                res.status(401).send('Invalid password')
            } else {
                let payload = { subject: user._id };
                let token = jwt.sign(payload, 'aip');
                res.status(200).send({ token })
            }
        }
    })
})

router.post('/join', (req, res) => {
    let join = req.body;
    console.log(join);
    Event.findOne({ _id: join.event }, (err, eventJoin) => {
        if(!eventJoin){
            console.log(join.event + "Not Found")
        }
        else{
            eventJoin.members.push(join.user);
            eventJoin.amount = eventJoin.members.length;
            eventJoin.save();
        }
    })
})
router.post('/quit', (req, res) => {
    let quit = req.body;
    console.log("quit" + quit);
    Event.findOne({ _id: quit.event }, (err, eventQuit) => {
        if(!eventQuit){
            console.log(quit.event + "Not Found")
        }
        else {
            if ( eventQuit.members.indexOf(quit.user) != -1) {
            eventQuit.members.splice(eventQuit.members.indexOf(quit.user), 1);
            eventQuit.amount = eventQuit.members.length;
            eventQuit.save();
            console.log("delete");
            }
        }
    })
})

router.get('/events', (req,res) => {
    Event.find(function (err, events) {
        if (err) return next(err);
        res.json(events);
    })
})
router.get('/members', (req,res) => {
    Members.find(function (err, events) {
        if (err) return next(err);
        res.json(events);
    })
})
module.exports = router;