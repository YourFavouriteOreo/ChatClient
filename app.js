const express = require('express')
const app = express();
const http = require('http').Server(app)
const path = require('path')

app.use(express.static(path.join(__dirname, 'frontend/build')));

const PORT = 8080;

app.get('*' , (req,res) => {
    res.sendFile(path.join(__dirname, '/frontend/build'), 'index.html')
});

app.listen(PORT, function () {
    console.log(`Listening on Port: ${PORT}`);
})