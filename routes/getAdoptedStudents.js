const Student = require("../model/student");
const Donor = require("../model/donor");

module.exports = async (req, res) => {
    try {
        let email = req.headers.email;
        let donor = await Donor.findOne({ email: email });
        let parent_id = donor._id;
            await Student.find({parent_id: parent_id },(getErr, studentsList) => {
                if(getErr) {
                    res.status(500).json({message: 'Some glitch in getting the adopted students list.'})
                }
                res.status(200).json(studentsList)
            });
      }catch (err) {
        console.log(
          `err `,
          err
        );
      }
};