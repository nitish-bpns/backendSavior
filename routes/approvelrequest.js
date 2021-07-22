const Student = require("../model/student");
const Donor = require("../model/donor");
const Approvel = require("../model/approvel");
//const student = require("../model/student");

module.exports= async (req,res)=>{
    try{
        var studentid=req.query.studentid
        var donoremail=req.query.donoremail
        var studentemail=req.query.studentemail
        var studentname=req.query.studentname
        var donorname=req.query.donorname
        var meetingdate=req.query.meetingdate
        var meetingtime=req.query.meetingtime
        await Approvel.findOne({'studentid':studentid,'donoremail':donoremail},(err,item)=>{
            if (err){return res.send('error')}
            //console.log(item)
            if (item==null){
                const a=Approvel({
                    'studentemail':studentemail,
                    'donoremail':donoremail,
                    'studentid':studentid,
                    'studentname':studentname,
                    'donorname':donorname,
                    'status':'pending',
                    'meetingdate':meetingdate,
                    'meetingtime':meetingtime
                })
                a.save()
                return res.status(200).json({'status':1,'messege':' Hola Hero thankyou!! admin team  will be in touch with you soon via mail'})
            }
            else{
                return res.status(200).json({'status':0,'messege':'already requested!!'})  
            }
        })
    }
    catch(err){
        //console.log('err',err)
       res.status(500)
    }
}