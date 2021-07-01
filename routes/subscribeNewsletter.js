const Newsletter = require("../model/newsletter");

module.exports = async (req, res) => {
    try {
        let payload = req.body;   
        const newsletterEntry = {
            id: payload._id,
            //'enrolled_on': payload.date,
            'email': payload.email,
            'is_subscribed': true
        }
        let NewsletterRegistry = new Newsletter(newsletterEntry);
        
        NewsletterRegistry.save(async (registerErr, result) => {
        if(registerErr) {
            return res.status(500).send({message: 'Some glitch in subscribing'});
        }
        else
        {
          return res.status(200).send({
            id: result._id,
            message: 'Subscribed successfully'
          });
        }
    });
      }catch (err) {
        console.log(
          `err `,
          err
        );
      }
};