const mongoose = require('mongoose');

let newSchema = new mongoose.Schema({
    heading: String,
    content: String,
    location: String,
    source: String,
    image_url: String
});

module.exports = mongoose.model('News', newSchema);