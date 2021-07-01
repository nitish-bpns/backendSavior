const Student = require('../model/student');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const Auth = require('../auth');
const auth = new Auth()

module.exports = async (req, res) => {
    let payload = req.body;
    let findUserWithSimilarEmail = await Student.findOne({email: req.body.email})
    if(findUserWithSimilarEmail){
       return res.status(400).send({message: 'User with similar email already exists'})
    }

    const studentEntry = {
        id: payload._id,
        'name': payload.name,
        'age': payload.age,
        'gender': payload.gender,
        'address': payload.address,
        'city': payload.city,
        'pin': payload.pin,
        'phone': payload.phone,
        'guardianName': payload.guardianName,
        'guardianAge': payload.guardianAge,
        'guardianGender': payload.guardianGender,
        'guardianPhone': payload.guardianPhone,
        'guardianRelation': payload.guardianRelation,
        'grade': payload.grade,
        'intro': payload.intro,
        'body': payload.body,
        'aim': payload.aim,
        'requirements': payload.requirements,
        'email': payload.email,
        'verified': false
    }

    let password = await bcrypt.hash(payload.password, salt);
    studentEntry['password'] = password;
    
    let StudentRegistry = new Student(studentEntry);
    
    StudentRegistry.save(async (registerErr, result) => {
        if(registerErr) {
            return res.status(500).send({message: 'Some glitch in adding the student. Please try after sometime'});
        }else{
            let payloadToCreateToken = {
                userType: "student",
                id: StudentRegistry._id,
                grade: payload.grade,
                name: payload.name,
                email: payload.email,
                phone: payload.phone,
              };
              let token = auth.createToken(payloadToCreateToken)
              return res.status(200).send({
                  id: result._id,
                  message: 'Student added successfully',
                  token: token
                });
        }
    });
}
