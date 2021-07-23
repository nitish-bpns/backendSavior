const Ramount=require('../model/ramount')


const Razorpay = require('razorpay');
const shortid  = require('shortid');


const razorpay = new Razorpay({
    key_id: 'rzp_test_jqhdiD8zCaaVPs',
    key_secret: 'fUzSqtWApGDu2YcimBIZdmly',
});

module.exports = async (req, res) => {
    //console.log(req.body)
    const payment_capture = 1
    //const amount = 1500
    const currency = 'INR'
    
    var ramount= await Ramount.findOne({'donoremail':req.body.email,'studentid':req.body.studentid})
    //console.log(ramount)
    if (ramount){
        var amount=ramount.amountleft
    }
    else{
        var amount=0
    }
    
    const options = {
        amount: (amount*100).toString(),
        currency:currency,
        receipt: req.body.email+'#'+req.body.studentid,
        payment_capture:payment_capture,
        notes:  {
            'donoremail':ramount.donoremail,
            'studentid':ramount.studentid
        }
    }

    try{
        const response = await razorpay.orders.create(options)
        //console.log(response)
        res.json({
            id:       response.id,
            currency: response.currency,
            amount:   response.amount,
            notes:  response.notes,
            receipt:response.receipt
        })
    } catch(error){
        console.log(error)
    }
};
