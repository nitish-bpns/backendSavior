const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);


let generateHash = async(pass)=>{
    let ourHash = await bcrypt.hash(pass, salt)
    return ourHash;
}

let comparePassword = async(actual)=>{
    let what = await bcrypt.compare(actual,password);
    console.log(what);
}

generateHash('tempPassword').then(console.log).catch(console.log);