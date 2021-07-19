const Student = require("../model/student");
const Donor = require("../model/donor");
const Approvel = require("../model/approvel");

module.exports = async (req,res)=>{
    try{
        await Approvel.find({$or:[{'status':'pending'},{'status':'denied'}]},(err,data)=>{
            if (err){return res.status(200).json({'status':0,
            'messege':
            `error in fetching data contact devoloper`})}
            //console.log(data)
            return res.status(200).json({'status':1,'data':data,'messege':'success'})
        })
    }
    catch{
        res.status(200).json({'status':0,'messege':'server error contact dev'})
    }
} 