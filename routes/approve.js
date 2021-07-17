const Student = require("../model/student");
const Donor = require("../model/donor");
const Approvel = require("../model/approvel");
const student = require("../model/student");


module.exports= async (req,res)=>{
    try{
        var studentid=req.query.studentid
        var donoremail=req.query.donoremail
        var action=req.query.action
        await Approvel.findOne({'studentid':studentid,'donoremail':donoremail},(err,item)=>{
            if (err){return res.send('error')}
            if (action=='approve'){item.status='approved'}
            else if (action=="deny") {item.status='denied'}
            item.save()
            //console.log(action,item.studentemail)
            return res.status(200).json({'success':1,'body':item})
        })
    }
    catch{
        res.send('error in firstplace')
    }
}