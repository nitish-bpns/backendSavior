const Student = require("../model/student");

module.exports= async (req,res)=>{
    try{
    username=req.headers.username
    //console.log(username)
    await Student.findOne({'email': username},(err,item)=>{
        //console.log(item)
        if (err){return res.status(200).json({'status':0,'messege':'something went wrong'})}
        if (item){return res.status(200).json({'status':0,'messege':'username already exist!'}) }
        else{return res.status(200).json({'status':1,'messege':'ok'}) }
    })
}catch{
    res.status(404)
}
}
