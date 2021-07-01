const Razorpay = require('razorpay');

module.exports = async (req, res) => {

    const secret = ''

    console.log(req.body)

    const crypto = require('crypto')

	const shasum = crypto.createHmac('sha256', secret)
	shasum.update(JSON.stringify(req.body))
	const digest = shasum.digest('hex')

	console.log(digest, req.headers['x-razorpay-signature'])

    if(digest === req.headers['x-razorpay-signature']) {
        console.log('request is valid')

        //Writing to a file, temporary...In production add to DB
        require('fs').writeFileSync('payment1.json', JSON.stringify(req.body, null, 4))
    } else{
        //pass 
    }

    res.json({status: 'ok'})
};
