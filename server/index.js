const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = require("socket.io")(server, {
    cors: {
        origin: "https://affectionate-ardinghelli-e3aac4.netlify.app",
        methods: ["GET", "POST"]
    }
});

const userList = {};

app.get('/', (req, res) => {
    res.send('<h1>Hey Socket.io</h1>');
});

io.on('connection', (socket) => {
    socket.on('login', (nickname) => {
        userList[socket.id] = nickname;
        io.emit('users', userList);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
        delete userList[socket.id];
        io.emit('users', userList);
    });
    socket.on('msg', (data) => {
        io.emit('msg', data);
    });

});




server.listen(3000, () => {
    console.log('listening on *:3000');
});