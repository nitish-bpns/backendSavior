const Student = require("../model/student");
const Donor = require("../model/donor");
const Message =require("../model/message");

module.exports = async (req, res) => {
    try {
        let email = req.headers.email;
        if (!email) {
          return res
            .status(500)
            .json({ message: "Email is required" });
        }
        let student = await Student.findOne({ email: email });
        if(student){
            let donor = await Donor.findOne({_id: student.parent_id});
          if(donor){
            return res.status(200).json({
                name: donor.name,
                age: donor.age,
                address: donor.address,
                city: donor.city,
                pin: donor.pin,
                gender: donor.gender,
                phone: donor.phone,
                msg: Message,
            });
          }
          else{
            return res.status(401).json({ message: "no donor found" });
          }
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