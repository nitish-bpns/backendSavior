const mongoose=require('mongoose');

let approvelschema=mongoose.Schema({
    studentid:String,
    studentemail:String,
    donoremail:String,
    status:String,
    studentname:String,
    donorname:String
})

module.exports=mongoose.model('approvel',approvelschema)