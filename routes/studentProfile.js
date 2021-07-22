const Student = require("../model/student");
const Donor = require("../model/donor");
const Message =require("../model/message");

module.exports = async (req, res) => {
    try {
        let studentEmail = req.headers.email;
        if (!studentEmail) {
          return res
            .status(200)
            .json({ 'ststus':0,'message': "Email is required" });
        }
        let student = await Student.findOne({ email: studentEmail });
        if(student){
            
            return res.status(200).json({
                name: student.name,
                age: student.age,
                gender: student.gender,
                address: student.address,
                city: student.city,
                pin: student.pin,
                phone: student.phone,
                guardianName: student.guardianName,
                guardianAge: student.guardianAge,
                guardianGender: student.guardianGender,
                guardianPhone: student.guardianPhone,
                guardianRelation: student.guardianRelation,
                grade: student.grade,
                intro: student.intro,
                body: student.body,
                aim: student.aim,
                requirements: student.requirements,
                email: student.email,
                photo: student.photo,
                is_adopted:student.is_adopted,
                donoremail:student.donoremail,
                id:student._id
            });
        }
        else{
          return res.status(404).json({ 'status':1,'message': "No User Found with the given email" });
        }
      }catch (err) {
        //console.log(
         // `err `,
         // err
       // );
       res.status(500)
      }
};