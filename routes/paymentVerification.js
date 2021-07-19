const Ramount=require('../model/ramount')
const Payment=require('../model/payment')
const Student = require("../model/student");
const Donor = require("../model/donor");

const Razorpay = require('razorpay');
const { response } = require('express');

module.exports = async (req, res) => {

    const secret = 'realmadrid'

    console.log(req.body)

    const crypto = require('crypto')

	const shasum = crypto.createHmac('sha256', secret)
	shasum.update(JSON.stringify(req.body))
	const digest = shasum.digest('hex')

	//console.log(digest, req.headers['x-razorpay-signature'])

    if(digest === req.headers['x-razorpay-signature']) {
        //console.log('request is valid')
        //console.log(req.body.payload.payment.entity.notes)
        //Writing to a file, temporary...In production add to DB
        //require('fs').writeFileSync('payment1.json', JSON.stringify(req.body, null, 4))
        var donoremail=req.body.payload.payment.entity.notes.donoremail
        var studentid=req.body.payload.payment.entity.notes.studentid
        
     
    var ramount= await Ramount.findOne({'donoremail':donoremail,'studentid':studentid})
    //console.log(ramount)
    if (ramount){
        ramount.amountleft=0
        ramount.amountpaid=((req.body.payload.payment.entity.amount/100)+ramount.amountpaid).toString()
        ramount.save()
    }
    else{
    }
    const donor=await Donor.findOne({'email':donoremail})
    if (donor){
    donor.students.push(studentid)
    donor.adoptionCount=donor.adoptionCount+1
    donor.save()
    }
    else{
        console.log('error')

    }
    const student=await Student.findOne({'_id':studentid})
    //console.log(student)
    if (student){
        student.is_adopted=true
        student.donoremail=donoremail
        student.save()
    }
    else{
        console.log('error')
    }    
    return res.status(200).json({'status':1,'messege':'payment successful'})   
}

else{
    return res.status(200).json({'status':0,'messege':'payment failed'}) 
}
};


