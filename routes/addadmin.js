const Admin=require('../model/admin')

module.exports=async (req,res)=>{
    ad=Admin({
        'name':'admin',
        'username':'admin@edopt',
        'password':'admingotnochill',

    })
    ad.save()
    res.status(200).json({'status':'1','messege':'added'})
}