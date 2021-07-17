const mongoose=require('mongoose');

let meetingschema=mongoose.Schema({
    donor:String,
    student:String,
    meet_time:String,
    link:String
})

module.exports=mongoose.model('meeting',meetingschema)