const student = require("../model/student");
const Student = require("../model/student");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
module.exports=async (req,res)=>{
    try{
    
    //console.log(req.headers)
    var id=req.headers.id
    var password1=req.headers.password1
    var student= await Student.findById(id)
        if (!student){return(res.status(200).json({"status":0}))}
        else{
            let password = await bcrypt.hash(password1, salt);
            student.password = password;
            student.save()
            //console.log(student)
            return(res.status(200).json({'status':1}))
        }
   
}catch(err){
    //console.log(err)
    return res.status(500)
}
}
