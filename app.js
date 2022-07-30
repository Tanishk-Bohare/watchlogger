const express = require('express');
const fs = require('fs');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const logger= require('./index')
const saveLog = require('./saveLog')
require('dotenv').config()

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');

    const msg =  logger().then((res) => {
        // console.log(res)
        socket.emit('newlog', res)    
    })

    fs.watchFile('./logfile', (curr, prev) => {
        const msg =  logger().then((res) => {
                socket.emit('newlog', res)    
        })
    })    
    
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(process.env.PORT , () => {
  console.log('listening on *: ', process.env.PORT);
});