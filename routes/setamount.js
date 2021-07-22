const Ramount=require('../model/ramount')

module.exports= async (req,res)=>{
    try{
        var donoremail=req.query.donoremail
        var studentid=req.query.studentid
        var amount=req.query.amount

       await Ramount.findOne({'donoremail':donoremail,'studentid':studentid},(err,item)=>{
           if (err || !item){return res.status(200).json({'status':0,'messege':'not eligible yet'})}
           else{
               item.amountleft=amount
               item.save()
               return res.status(200).json({'status':1,'amount':item.amountleft})}
       })       
    }
    catch(err){
       // console.log(err)
        res.status(404)
    }
}  
