
const http = require('http');
const express = require('express');
const path = require('path');

const mongoose= require('mongoose');

const app = express();
const server = http.createServer(app);
const { Server } = require('socket.io')
const io = new Server(server);

mongoose.connect('mongodb://localhost/chat-database')
    .then(db =>console.log("base de datos conectada"))
    .catch(err => console.log(err));

app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, '/public')));


require('./sockets')(io);

server.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
});

