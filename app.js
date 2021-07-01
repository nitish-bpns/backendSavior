const express = require('express');
const mongoose = require('mongoose');
const razorpay = require('razorpay');
const bodyParser = require('body-parser');
const cors = require('cors');

const app=express();
require('dotenv/config');

//client id: 294198125435-ar7kbgpfhi93ht06838p6puvqo16hcuq.apps.googleusercontent.com
//client secret: XTqBwrT5Et51aVQk2bATuI09
//api key: AIzaSyCuvstYlIKbhfvdKSSqJR5KUBVJvO1SbWM

app.use(cors());
app.use(function (_, res, next) {
    res.setHeader("Content-Type", "application/json");
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const postsRoute = require('./routes/posts');
app.use('/',postsRoute);

mongoose.connect(
    process.env.DB_Connection,
    {
    useNewUrlParser:true,
    useUnifiedTopology:true
    },
    () => console.log('connected to DB!')
)

let port = process.env.PORT;
if(port == null || port == ""){
    port = 3000;
}

app.listen(port, function(){
    console.log("Server started successfully")
});