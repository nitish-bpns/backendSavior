const Student = require("../model/student");
const Mark =require("../model/marks");

module.exports = async (req, res) => {
    try {
      let payload = req.body;
        let email = req.headers.email;
        if (!email) {
          return res
            .status(500)
            .json({ message: "Email is required" });
        }
        let student = await Student.findOne({ email: email });
        if(student){
          let subject = payload.subject;
          let entry = await Mark.findOne({ subject: subject });

          if(entry){
            await Mark.findOneAndUpdate({ subject: payload.subject }, {
              $push: { marks: payload.marks, testName: payload.testName}
          },
          {useFindAndModify: false}
          );
          return res.status(200).send({message: 'marks added successfully'});
          }
          else{
            const marksEntry = {
              studentid: student._id,
              subject: payload.subject,
              marks: payload.marks,
              testName: payload.testName
          }
          
          let marksRegistry = new Mark(marksEntry);
          
          marksRegistry.save(async (registerErr, result) => {
              if(registerErr) {
                  return res.status(500).send({message: 'Some glitch in adding marks.'});
              }else{

                    return res.status(200).send({message: 'marks added successfully'});
              }
          });
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