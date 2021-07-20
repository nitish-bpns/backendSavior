const express = require('express');
const router = express.Router();
const multer = require('multer');
const Authentication = require('../auth');
const authentication = new Authentication()
const debug = require('debug')('myapp:server');
const path = require('path'); 

const upload = multer({
    dest: 'uploads/'
});

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images/students')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});
const uploadimage = multer({ storage: storage });
router.post('/imageupload',authentication.verifytokenadmin, uploadimage.single('file'), function(req,res) {
    debug(req.file);
    var link='http://'+req.hostname +':3000/' + req.file.path
    //return res.send(req.file);
    console.log(link)
    res.status(200).json({'status':1,'link':link})
})
//will be using this for uplading


const payment= require('../model/payment')

router.get('/',(req,res)=>{
    res.send('we are on home');
});

router.post('/registerStudent',require('./studentSignup'));
router.post('/registerDonor',require('./donorSignup'));

router.get('/studentLogin', require('./studentLogin'));
router.get('/donorLogin', require('./donorLogin'));

router.get('/parentDetails',authentication.verifyToken,require('./parentProfile'));
router.post('/messageDonor',authentication.verifyToken,require('./messageDonor'));
router.get('getChat',authentication.verifyToken,require('./chat'));

router.get('/studentDashboard',authentication.verifyToken,require('./studentDashboard'));
router.post('/submitMarks',authentication.verifyToken,require('./submitMarks'));
router.get('/getMarks',authentication.verifyToken,require('./getMarks'));

router.post('/addNews',require('./addNews'));
router.get('/getNews',require('./news'));

router.get('/donorDashboard',authentication.verifyToken,require('./donorDashboard'));
router.get('/donorFeed',require('./donorFeed'));
router.get('/adoptedStudents',authentication.verifyToken,require('./getAdoptedStudents'));
router.get('/studentProfile',authentication.verifyToken,require('./studentProfile'));

router.post('/payment', require('./payment'));
router.post('/verification', require('./paymentVerification'));
router.get('/addStudent',authentication.verifyToken,require('./addStudent'));

//index.html is temporary, connect with frontend
router.get('/upload', (req,res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
})

router.post('/upload', upload.single('file_uploaded'), (req,res) => {
    res.redirect('/');
})

router.post('/subscribe',require('./subscribeNewsletter'));
router.get('/unsubscribe',require('./unsubscribeNewsletter'));

router.get('/test',(req,res)=>{
    const p=payment({
        donor:'sanu',
        student:'sonu',
        payment: '50'
    });
    p.save()
    res.send('hello')
})
router.get('/admin/approve',authentication.verifytokenadmin,require('./approve'))
router.get('/approvalrequest',require('./approvelrequest'))
router.get('/admin/getapprovel',authentication.verifytokenadmin,require('./getapprovels'))
router.get('/logout',(req,res)=>{
    res.clearCookie('accesstoken')
    res.clearCookie('email')
    res.status(200).json({'messege':'loggedout'})
})
router.get('/isloggedin',(req,res)=>{
    //console.log('hi',req.headers,req.cookies)
    if ((req.headers.email!=0) && (req.headers.email!='undefined')){
        res.status(200).json({'status':1 ,'messege':'yes'})
    }
    else{
        res.status(200).json({'status':0 ,'messege':'NO'})
    }
    
})
router.get('/studentdata',require('./studentdata'))
router.get('/checkapprovel',require('./checkapprovel'))
router.get('/getmydonor',authentication.verifyToken,require('./donordata'))
router.get('/isapproved',authentication.verifyToken,require('./is_approved'))
router.get('/getamount',require('./getamount'))
router.get('/setamount',authentication.verifytokenadmin,require('./setamount'))
router.get('/getamountlist',authentication.verifytokenadmin,require('./getamountlist'))
router.get('/chkusername',require('./chkusername'))
router.get('/verifylis',authentication.verifytokenadmin,require('./verifylis'))
router.get('/verify',authentication.verifytokenadmin,require('./verify'))
router.get('/admin/studentdata',authentication.verifytokenadmin,require('./adminstudentdata'))
router.get('/admin/login',require('./adminlogin'))
router.post('/admin/editdata',authentication.verifytokenadmin,require('./editstudentdata'))
router.post('/admin/changepasswordstd',authentication.verifytokenadmin,require('./changstdpswd'))
module.exports = router;