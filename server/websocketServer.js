'use strict';
//Building websocketServer for long polling request and websocket request from chatroom component, and it can also avoid cross origin issues
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = 5000;

//if user connected, console a message
io.on('connection', (socket) => {
    console.log('user connected');
    //When the user 'invoke add-message',
    socket.on('add-message', (message) => {
        //Broadcast the message to every user
        io.emit('message', { type: 'new-message', text: message });
    });
    //If disconnet, console a message
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});

http.listen(port, () => {
    console.log('started on port',port);
});
