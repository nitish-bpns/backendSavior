const Student = require('../model/student');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const Auth = require('../auth');
const auth = new Auth()

module.exports = async (req, res) => {
    try{
    let payload = req.body;
    //console.log(req.body)
    let user = await Student.findOne({_id: req.body._id})
    if(!user){
       return res.status(404).send({message: 'User not found'})
    }
    else{
    
        user.name= payload.name
        user.age= payload.age
        user.gender =payload.gender
        user.address= payload.address
        user.city=payload.city
        user.pin= payload.pin
        user.phone= payload.phone
        user.guardianName=payload.guardianName
        user.guardianAge=payload.guardianAge
        user.guardianGender=payload.guardianGender
        user.guardianPhone=payload.guardianPhone
        user.guardianRelation=payload.guardianRelation,
        user.grade= payload.grade
        user.intro=payload.intro
        user.body=payload.body
        user.aim=payload.aim
        user.requirements= payload.requirements
        user.email=payload.email
        user.verified=payload.verified
        user.is_adopted=payload.is_adopted
    
    
    
    user.save()
    return(res.status(200).json({'status':1}))
    } 
    }

catch{
    return(res.status(200).json({'status':0}))
}
}