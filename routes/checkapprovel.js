const Student = require("../model/student");
const Donor = require("../model/donor");
const Approvel = require("../model/approvel");

module.exports= async (req,res)=>{
    try{
    //console.log(req)
    const studentid=req.headers.studentid
    const donoremail=req.headers.donoremail
    await Approvel.findOne({'studentid':studentid,'donoremail':donoremail},(err,item)=>{
        
        if (err){return res.status(200).json({'status':0,'messege':'dberror'})}

        if (item==null){
            return res.status(200).json({'status':0,'messege':'not requested yet'})
        }
        else{
            return res.status(200).json({'status':1,'messege':item.status})
        }
    })
}
catch(err){
    return res.status(200).json({'status':0,'messege':'servererro'})
}
}