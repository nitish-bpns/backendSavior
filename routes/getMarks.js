const Marks = require("../model/marks");
const Student = require("../model/student");

module.exports = async (req, res) => {
    try {
        let email = req.headers.email;
        if (!email) {
            return res
              .status(500)
              .json({ message: "Email is required" });
          }
        let student = await Student.findOne({ email: email });
            await Marks.find({studentid: student._id},(getMarksErr, marksList) => {
                if(getMarksErr) {
                    res.status(500).json({message: 'Some glitch in getting the marks.'})
                }
                res.status(200).json(marksList)
            });
      }catch (err) {
        console.log(
          `err `,
          err
        );
      }
};