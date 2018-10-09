const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
const PORT = 3000
const api = require('./routes/api')


app.use(cors())

app.use(bodyParser.json())

app.use('/api', api)

app.get('/', function (req, res) {
    res.send('HELLO FORM SERVER')
})

app.listen(PORT, function () {
    console.log('SERVER RUNNING ON LOCALHOST:' + PORT)
})

