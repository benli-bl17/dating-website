const express = require('express')
const router = express.Router()
const User = require('../models/user')
const UserInfo = require('../models/userInfo')
const Event = require('../models/event')
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
const db = "mongodb://aip:aippass80@ds231720.mlab.com:31720/datingdb"


mongoose.connect(db, err => {
    if (err) {
        console.error('Error!' + err)
    } else {
        console.log('Connected to Mogodb')
    }
})
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
    let userData = req.body
    let user = new User(userData)
    user.save((error, registeredUser) => {
        if (error) {
            console.log(error)
        } else {
            let payload = { subject: registeredUser._id }
            let token = jwt.sign(payload, 'aip')
            res.status(200).send({ token })
        }
    })
})

router.post('/login', (req, res) => {
    let userData = req.body

    User.findOne({ email: userData.email }, (error, user) => {
        if (error) {
            console.log(error)
        } else {
            if (!user) {
                res.status(401).send('Invalid email')
            } else if (user.password !== userData.password) {
                res.status(401).send('Invalid password')
            } else {
                let payload = { subject: user._id }
                let token = jwt.sign(payload, 'aip')
                res.status(200).send({ token })
            }
        }
    })
})
router.get('/events', (req,res) => {
    Event.find(function (err, events) {
        if (err) return next(err);
        res.json(events);
      });
})
router.get('/members', verifyToken,(req,res) => {
    UserInfo.find(function (err, members) {
        if (err) return next(err);
        res.json(members);
      });
})
module.exports = router