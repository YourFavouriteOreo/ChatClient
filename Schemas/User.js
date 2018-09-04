var mongoose = require('mongoose')
var uuid = require('uuid')

var userSchema = new mongoose.Schema({
    publicName: {required:true,type:String},
    privateID: String,
    publicID: String,
});

userSchema.pre('save',function(next){
console.log('saving')
this.privateID = uuid()
this.publicID = uuid()
next()
})

const User = mongoose.model('User', userSchema,'Users')

module.exports = exports = User