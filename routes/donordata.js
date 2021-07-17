//api for select donor details in student dashboard

const Donor=require("../model/donor")
const Student=require("../model/student")
module.exports= async(req,res)=>{
    try{
        const donoremail=req.headers.donoremail
        const studentid=req.headers.studentid
        let student =  await Student.findById(studentid)
            //console.log(donoremail)
            //if (err){return res.status(200).json({'status':0,'messege':'no such student exists'})}
            if(!student.is_adopted){return res.status(200).json({'status':0,'messege':'no adopted yet'})}
            else if(student.donoremail!=donoremail){return res.status(200).json({'status':0,'messege':'forbidden'})}
            else{
                await Donor.findOne({'email':donoremail},(err,donor)=>{
                    return res.status(200).json({
                        'status':1,
                        'donordata':{
                            'name':donor.name,
                            'age':donor.age,
                            'gender':donor.gender,
                            'address':donor.address,
                            'phone':donor.phone,
                            'email':donor.email
                        }
                    })
                })
            }
    
    }
    catch(err){
        console.log(err)
        return res.status(200).json({'status':0,'messege':'internal server error!! contact dev'})
    }

}
