const mongoose = require('mongoose');

let messageSchema = new mongoose.Schema({
    date: Date,
    time: Date,
    studentId: String,
    donorId: String,
    sender: String,
    message: String
});

module.exports = mongoose.model('message', messageSchema);