const Student = require("../model/student");
const Donor = require("../model/donor");
const Approvel = require("../model/approvel");
const student = require("../model/student");
const Ramount=require("../model/ramount")

module.exports= async (req,res)=>{
    try{
        var studentid=req.query.studentid
        var donoremail=req.query.donoremail
        var action=req.query.action
        const item= await Approvel.findOne({'studentid':studentid,'donoremail':donoremail})
            if (!item){return res.status(0).json({'status':0,'messege':'something went wrong' })}
            if (action=='approve'){
                item.status='approved'
                const a=Ramount({
                    'studentid':item.studentid,
                    'donoremail':item.donoremail,
                    'donorname':item.donorname,
                    'studentname':item.studentname,
                    'studentemail':item.studentemail,
                    'amountleft':0
                })
                a.save()
            }
            else if (action=="deny") {
                item.status='denied'
                var a=await Ramount.findOne({'donoremail':donoremail,'studentid':studentid})
                if (a){
                    a.delete()
                }
            }
            item.save()
            //console.log(action,item.studentemail)
            return res.status(200).json({'success':1,'body':item})
        
    }
    catch{
        res.send('error in firstplace')
    }
}