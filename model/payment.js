const mongoose = require('mongoose');

let paymentSchema = mongoose.Schema({
    student:String,
    donor:String,
    amount:String
})

module.exports = mongoose.model('payment',paymentSchema)
