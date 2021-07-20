const mongoose = require('mongoose');

let studentSchema = new mongoose.Schema({
    id: String,
    name: String ,
    age: Number,
    gender: String,
    address: String,
    city: String,
    pin: Number,
    phone: String,
    guardianName: String,
    guardianAge: Number,
    guardianGender: String,
    guardianPhone: String,
    guardianRelation: String,
    grade: Number,
    intro: String,
    body: String,
    aim: String,
    requirements: String,
    email: String,
    password: String,
    photo: String,
    verified: Boolean,
    is_adopted: Boolean,
    donoremail:String,
    realemail:String,
});

module.exports = mongoose.model('student', studentSchema);