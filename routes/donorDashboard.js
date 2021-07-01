const Donor = require("../model/donor");

module.exports = async (req, res) => {
    try {
        let email = req.headers.email;
        if (!email) {
          return res
            .status(500)
            .json({ message: "Email is required" });
        }
        let donor = await Donor.findOne({ email: email });
        if(donor){
            return res.status(200).json({
                name: donor.name,
                age: donor.age,
                gender: donor.gender,
                address: donor.address,
                city: donor.city,
                pin: donor.pin,
                phone: donor.phone,
                organisation: donor.organisation,
                email: donor.email,
                adoptionCount: donor.adoptionCount,
                browniePoints: donor.browniePoints,
            });
        }
        else{
          return res.status(404).json({ message: "No User Found with the given email" });
        }
      }catch (err) {
        console.log(
          `err `,
          err
        );
      }
};