const express = require('express');
const router = express.Router();
const multer = require('multer');
const Authentication = require('../auth');
const authentication = new Authentication()
const upload = multer({
    dest: 'uploads/'
});

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

//router.post('/payment',authentication.verifyToken, require('./payment'));
//router.post('/verification',authentication.verifyToken, require('./paymentVerification'));
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

module.exports = router;