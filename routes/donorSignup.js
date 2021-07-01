const Donor = require('../model/donor');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const Auth = require('../auth');
const auth = new Auth()

module.exports = async (req, res) => {
    let payload = req.body;
    let findUserWithSimilarEmail = await Donor.findOne({email: req.body.email})
    if(findUserWithSimilarEmail){
       return res.status(400).send({message: 'User with similar email already exists'})
    }

    const donorEntry = {
        id: payload._id,
        'name': payload.name,
        'age': payload.age,
        'gender': payload.gender,
        'address': payload.address,
        'city': payload.city,
        'pin': payload.pin,
        'phone': payload.phone,
        'organisation': payload.organisation,
        'email': payload.email,
        'adoptionCount': 0,
        'browniePoints': 0
    }

    let password = await bcrypt.hash(payload.password, salt);
    donorEntry['password'] = password;
    
    let DonorRegistry = new Donor(donorEntry);
    
    DonorRegistry.save(async (registerErr, result) => {
        if(registerErr) {
            return res.status(500).send({message: 'Some glitch in adding the donor. Please try after sometime'});
        }else{
            let payloadToCreateToken = {
                userType: "donor",
                id: DonorRegistry._id,
                name: payload.name,
                email: payload.email,
                phone: payload.phone,
              };
              let token = auth.createToken(payloadToCreateToken)
              return res.status(200).send({
                  id: result._id,
                  message: 'donor added successfully',
                  token: token
                });
        }
    });
}