const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Event = require('../models/event')
const jwt = require('jsonwebtoken')
const io = require('socket.io')()


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
    let events = [
        {
            "name": "event1",
            "date": "01/10/2018",
            "description": "Event1"
        },
        {
            "name": "event2",
            "date": "02/10/2018",
            "description": "Event2"
        },
        {
            "name": "event3",
            "date": "03/10/2018",
            "description": "Event3"
        },
        {
            "name": "event4",
            "date": "04/10/2018",
            "description": "Event4"
        },
        {
            "name": "event5",
            "date": "05/10/2018",
            "description": "Event5"
        }
    ]
    res.json(events)
    
})

module.exports = router