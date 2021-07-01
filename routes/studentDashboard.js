const Student = require("../model/student");
const Donor = require("../model/donor");

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
                parentName: donor.name,
                parentAge: donor.age,
                parentAddress: donor.address,
                parentCity: donor.city,
                parentPin: donor.pin,
                parentGender: donor.gender,
                parentPhone: donor.phone,
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
            });
          }
          else{
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