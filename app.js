const express = require('express');
const mongoose = require('mongoose');
const razorpay = require('razorpay');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app=express();
const origin=process.env.ORIGIN
require('dotenv/config');

//client id: 294198125435-ar7kbgpfhi93ht06838p6puvqo16hcuq.apps.googleusercontent.com
//client secret: XTqBwrT5Et51aVQk2bATuI09
//api key: AIzaSyCuvstYlIKbhfvdKSSqJR5KUBVJvO1SbWM

app.use(cookieParser())
app.use(cors({
    origin:'http://localhost:3001',
    credentials: true,
    
})); 

app.use(function (_, res, next) {
    res.header("Content-Type", "application/json");
    res.header('Content-Type', 'application/json;charset=UTF-8')
    res.header('Access-Control-Allow-Credentials', true)
    //res.header('Access-Control-Allow-Origin' ,'https://edopt-v1.herokuapp.com')
    res.header(
    'Origin, X-Requested-With, Content-Type, Accept'
  )
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
