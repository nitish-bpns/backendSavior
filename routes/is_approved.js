const Approval=require('../model/approvel')

module.exports=async(req,res)=>{
    //console.log(req.query)
    try{
        studentid=req.query.studentid
        donoremail=req.query.donoremail
        await Approval.findOne({'studentid':studentid,'donoremail':donoremail},(err,approval)=>{
            if (err || !approval){
                return(res.status(200).json({'approved':0}))
            }
            else{
                if (approval.status=="approved"){return(res.status(200).json({'approved':1}))}
                else{return res.status(200).json({'approved':0})}
                
            }
         } )
    }
    catch(err){
        return(res.status(200).json({'approved':0}))
    }
}