const mongoose = require('mongoose');

let markSchema = new mongoose.Schema({
    studentid: String,
    subject: String,
    marks: [],
    testName: []
});

module.exports = mongoose.model('marks', markSchema);