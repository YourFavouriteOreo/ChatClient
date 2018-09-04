var express = require('express')
var app = express();
var server = require('http').Server(app);
var mongooseInstance = require('./db')
var chats = {length:0};
var currentUsers = {length:0};
var io = require('./webSocketHandling').listen(server,mongooseInstance,{chats,currentUsers});

const path = require('path')

app.use(express.static(path.join(__dirname, 'frontend/build')));

const PORT = (process.env.PORT || 80);

app.get('*' , (req,res) => {
    res.sendFile(path.join(__dirname, '/frontend/build'), 'index.html')
});

server.listen(PORT, function () {
    console.log(`Listening on Port: ${PORT}`);
})

