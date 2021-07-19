const mongoose = require('mongoose');

let ramountschema=mongoose.Schema({
    studentid:String,
    studentemail:String,
    donoremail:String,
    studentname:String,
    donorname:String,
    amountleft:String,
    amountpaid:String
})

module.exports=mongoose.model('ramount',ramountschema)