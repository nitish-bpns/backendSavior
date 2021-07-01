const Student = require("../model/student");
const Donor = require("../model/donor");
const Message = require("../model/message");

module.exports = async (req, res) => {
    try {
      let sEmail = req.headers.studentEmail;
      let dEmail = req.headers.donorEmail;
      let student = await Student.findOne({ email: sEmail });
      let donor = await Donor.findOne({ email: dEmail });
      await Message.find({studentId: student._id, donorId: donor._id},(getMessagesErr, messageList) => {
        if(getMessagesErr) {
            res.status(500).json({message: 'Some glitch in getting the messages.'})
        }
        res.status(200).json(messageList)
    });
    }
    catch (err) 
    {
      console.log(
        `err `,
        err
      );
    }
};