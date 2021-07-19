const Student = require('../model/student')



module.exports=async (req,res)=>{
    try{
    await Student.find({'verified':false},(err,studentlis)=>{
        if(err){return res.status(404)}
        else{return res.status(200).json({'status':1,'students':studentlis})}
    })}
    catch{
        return res.status(404) 
    }
}