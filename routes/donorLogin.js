const Donor = require("../model/donor");
const Authentication = require("../auth");
const authentication = new Authentication();
const bcrypt = require("bcryptjs");

module.exports = async (req, res) => {
  try {
    //console.log(req.headers)
    let email = req.headers.email;
    let password = req.headers.password;
    var redirect=0
    if ('redirect' in req.headers){
      redirect=req.headers.redirect
    }
    
    //const redirect=0
    //console.log(redirect)
    if (!email || !password) {
      return res
        .status(200)
        .json({ 'status':0 ,'messege': "both Email & Password are required" });
    }
    let donor = await Donor.findOne({ email: email });
    if(donor){
      let isPasswordValid = await bcrypt.compare(password, donor.password);
      if (!isPasswordValid) {
        return res.status(200).json({ 'status':0, 'messege': "wrong password" });
      }
      else if(isPasswordValid){
        let payloadToCreateToken = {
          userType: "donor",
          id: donor._id,
          name: donor.name,
          email: donor.email,
          phone: donor.phone,
        };
        let token = authentication.createToken(payloadToCreateToken);
        let jwtOptions = { expiresIn: 60*60*12*1000 ,httpOnly:true, maxAge:60*60*12*1000, SameSite: 'none'};
        
        //return res.status(200).json({ token });

        //console.log(req.headers)
        res.cookie('accesstoken',token,jwtOptions)
        res.cookie('email',email,{maxAge:60*60*7*1000,encode:String,SameSite:'none'})
        res.status(200)
  
        return res.status(200).json({'status':1,'redirect':redirect,'token':token})
      }
    }
    else{
      return res.status(200).json({'status':"0",'messege': "No User Found with the given email" });
    }
  }catch (err) {
    console.log(
      `err creating token for donor `,
      err
    );
  }
};
