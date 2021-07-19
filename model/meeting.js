const mongoose=require('mongoose');

let meetingschema=mongoose.Schema({
    donoremail:String,
    studentid:String,
    meet_date:String,
    meet_time:String,
    link:String
})

module.exports=mongoose.model('meeting',meetingschema)