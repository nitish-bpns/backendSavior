const Student = require("../model/student");
const Donor = require("../model/donor");

module.exports = async (req, res) => {
    try {
        let sEmail = req.headers.email;
        let dEmail = req.headers.demail;
        let count = req.headers.count;

        let student = await Student.findOne({ email: sEmail });
        let donor = await Donor.findOne({ email: dEmail });

        if(student){
            if(donor){
                await Donor.findOneAndUpdate({ email: dEmail }, {
                  $push: { students: student._id }, adoptionCount: count
              },
              {useFindAndModify: false}
              );
              await Student.findOneAndUpdate({ email: sEmail }, {
                $push: { parent_id: donor._id }
            },
            {useFindAndModify: false}
            );
            return res.status(200).send({message: 'student added successfully'});
            }else{
                return res.status(404).json({ message: "No donor Found with the given email" });
              }
        }
        else{
          return res.status(404).json({ message: "No student Found with the given email" });
        }
      }catch (err) {
        console.log(
          `err `,
          err
        );
      }
};