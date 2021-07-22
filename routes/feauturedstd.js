const Student = require("../model/student");

module.exports=async (req,res)=>{
    try{
    var st1=await Student.findById('60f952b33b16c11e05654769')
    var st2=await Student.findById('60f959d5727cc926ae66d028')
    var st3=await Student.findById('60f95a6e727cc926ae66d029')
    res.status(200).json({'st1':st1,'st2':st2,'st3':st3})
    }
    catch(err){
        //console.log(err)
        return res.status(404)
    }
}