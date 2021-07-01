const mongoose = require('mongoose');

let newsletterSchema = new mongoose.Schema({
    email: String,
    enrolled_on: Date,
    is_subscribed: {type: Boolean, default: false}
});

module.exports = mongoose.model('Newsletter', newsletterSchema);