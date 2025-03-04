const Student = require("../model/student");

module.exports= async (req,res)=>{
    try{
    const id=req.headers.id
    await Student.findById(id,(err,item)=>{
        //console.log(err,item)
        if (err || !item){
            return res.status(200).json({'status':0,'messege':'user not found','student':{}})
        }       
        return res.status(200).json({
            'student':{
                'name':item.name,
                'email':item.email,
                'age':item.age,
                'gender':item.gender,
                'intro':item.intro,
                'city':item.city,
                'photo':item.photo
            },
            'status':1,
            'messege':'success'
        
        })
    })
    }
    catch(err){
        //console.log(err) 
        return res.status(200).json({'status':0,'messege':'server error'})       
    }
}
