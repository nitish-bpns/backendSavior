const Student = require('../model/student')



module.exports=async (req,res)=>{
    try{
        verified=req.headers.verified
    await Student.find({'verified':verified},(err,studentlis)=>{
        if(err){return res.status(404)}
        else{return res.status(200).json({'status':1,'students':studentlis})}
    })}
    catch{
        return res.status(404) 
    }
}