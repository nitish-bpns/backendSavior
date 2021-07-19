const Donor = require('../model/donor');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const Auth = require('../auth');
const auth = new Auth()

module.exports = async (req, res) => {
    //console.log(req.body.body)
    try{
    //console.log(req.body.body)    
    let payload = req.body.body;
    let findUserWithSimilarEmail = await Donor.findOne({email: req.body.email})
    if(findUserWithSimilarEmail){
       return res.status(200).send({'message': 'User with similar email already exists','status':0})
    }

    const donorEntry = {
        //id: payload._id,
        'name': payload.name,
        'age': payload.age,
        'gender': payload.gender,
        'address': payload.address,
        'city': payload.city,
        'pin': payload.pin,
        'phone': payload.phone,
        //'organisation': payload.organisation,
        'email': payload.email,
        'adoptionCount': 0,
        'browniePoints': 0
    }
    //console.log(donorEntry)
    let password = await bcrypt.hash(payload.password, salt);
    donorEntry['password'] = password;
    
    let DonorRegistry = new Donor(donorEntry);
    DonorRegistry.save()
    return res.status(200).json({'status':1,'messege':'succesfully created'})
}
    catch{
        res.status(200).json({'status':0,'messege':'something went wrong please try later' })
    }
}