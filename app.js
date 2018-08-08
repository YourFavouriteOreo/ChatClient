var express = require('express')
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

const path = require('path')

app.use(express.static(path.join(__dirname, 'frontend/build')));

const PORT = (process.env.PORT || 80);

app.get('*' , (req,res) => {
    res.sendFile(path.join(__dirname, '/frontend/build'), 'index.html')
});

server.listen(PORT, function () {
    console.log(`Listening on Port: ${PORT}`);
})

io.on('connection',function(socket) {
    console.log("A user has connected");
})