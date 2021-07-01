const Student = require("../model/student");
const Donor = require("../model/donor");
const Message = require("../model/message");

module.exports = async (req, res) => {
    try {
      let sEmail = req.headers.email;
      let dEmail = req.headers.demail;
      let student = await Student.findOne({ email: sEmail });
      let donor = await Donor.findOne({ email: dEmail });
      let payload = req.body;
      
      const messageEntry = {
        'date': payload.date,
        'time': payload.time,
        'studentId': student._id,
        'donorId': donor._id,
        'sender': student._id,
        'message': payload.message
      }
      
      let messageRegistry = new Message(messageEntry);
      
      messageRegistry.save(async (registerErr, result) => {
        if(registerErr) 
        {
          return res.status(500).send({message: 'Some glitch in adding the message. Please try after sometime'});
        }
        else
        {
          return res.status(200).send({
            message: 'message added successfully'
          });
        }
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