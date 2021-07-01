const Newsletter = require("../model/newsletter");

module.exports = async (req, res) => {
    try {
        let email = req.headers.email;
        if (!email) {
            return res
              .status(500)
              .json({ message: "Email is required" });
          }
          await Newsletter.findOneAndUpdate(
              { email: email },
              {is_subscribed: false},
              {useFindAndModify: false}
              );
          return res.status(200).send({message: "unsunscribed successfully"});
      }catch (err) {
        console.log(
          `err `,
          err
        );
      }
};