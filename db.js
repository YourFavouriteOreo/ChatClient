var mongoose = require('mongoose')

var mongoDB = 'mongodb://oreo:oreo@ds247499.mlab.com:47499/node_testing_api';
mongoose.connect(mongoDB, { useNewUrlParser: true })

mongoose.Promise = global.Promise

var mongoInstance = mongoose.connection

var DEBUG = true

//Bind connection to error event (to get notification of connection errors)
mongoInstance.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoInstance.once('open', function callback () {
    console.log("Connection to Database established");

    mongoose.connection.db.listCollections({name: 'Users'})
    .next(function(err, collinfo) {
        if (err != null){
            mongoInstance.createCollection("Users")
            console.log("Users collection created");
        }
        if (DEBUG && collinfo){
            console.log("Users collection detected")
        }
    })
})

module.exports = mongoInstance

