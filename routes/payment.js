const Razorpay = require('razorpay');
const shortid  = require('shortid');

const razorpay = new Razorpay({
    key_id: '',
    key_secret: '',
});

module.exports = async (req, res) => {

    const payment_capture = 1
    const amount = 1500
    const currency = 'INR'
    
    const options = {
        amount: (amount*100).toString(),
        currency,
        receipt: shortid.generate(),
        payment_capture
    }

    try{
        const response = await razorpay.orders.create(options)
        console.log(response)
        res.json({
            id:       response.id,
            currency: response.currency,
            amount:   response.amount
        })
    } catch(error){
        console.log(error)
    }
};
