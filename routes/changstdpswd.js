const student = require("../model/student");
const Student = require("../model/student");

module.exports=async (req,res)=>{
    try{
    
    id=req.headers.id
    password1=req.headers.password1
    student= await Student.findById(id)
        if (!student){return(res.status(200).json({"status":0}))}
        else{
            let password = await bcrypt.hash(password1, salt);
            student.password = password;
            student.save()
            return(res.status(200).status(json({'status':1})))
        }
   
}catch(err){
    console.log(err)
    return res.status(500)
}
}
