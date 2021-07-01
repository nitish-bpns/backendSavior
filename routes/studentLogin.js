const Student = require("../model/student");
const Authentication = require("../auth");
const authentication = new Authentication();
const bcrypt = require("bcryptjs");

module.exports = async (req, res) => {
  try {
    let email = req.headers.email;
    let password = req.headers.password;
    if (!email || !password) {
      return res
        .status(500)
        .json({ message: "both Email & Password are required" });
    }
    let student = await Student.findOne({ email: email });
    if(student){
      let isPasswordValid = await bcrypt.compare(password, student.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "wrong password" });
      }
      else if(isPasswordValid){
        let payloadToCreateToken = {
          userType: "student",
          id: student._id,
          grade: student.grade,
          name: student.name,
          email: student.email,
          phone: student.phone,
        };
        let token = authentication.createToken(payloadToCreateToken);
        
        return res.status(200).json({ token });
      }
    }
    else{
      return res.status(404).json({ message: "No User Found with the given email" });
    }
  }catch (err) {
    console.log(
      `err creating token for student `,
      err
    );
  }
};
