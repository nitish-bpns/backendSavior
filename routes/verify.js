const Student = require('../model/student')

module.exports=async (req,res)=>{
    try{
    id=req.headers.studentid
    action=req.headers.action
    await Student.findOne({'_id':id},(err,item)=>{
        if (err){return res.status(404)}
        
        else if(action=="delete"){
            item.delete()
        }
        else {
            item.verified=true
            item.save()
        }
        return res.status(200).json({'status':1,'messege':'success'})
    })
}catch(err){
    return res.status(404)
}
}