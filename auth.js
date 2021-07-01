const jwt = require('jsonwebtoken');
let nope = process.env.AUTH_secret;

class Authentication{
    createToken(payload){
        let jwtOptions = { expiresIn: 60*60*12 };
        let token = jwt.sign( payload, nope, jwtOptions );
        return token;
    };
    
    verifyToken(req, res, next){
        try{
            const bearerHeader = req.headers['authorization'];
            if(typeof bearerHeader !== 'undefined') {
                const bearer = bearerHeader.split(' ');
                const bearerToken = bearer[1];
                req.token = bearerToken;
                next();
            } else {
                res.sendStatus(403);
            }
        }catch(err){
            console.log(`error verifying token: ${req.headers.token}, ${err}`);
            return res.status(401).json({message:"please send proper token"});
        }
    };
}

module.exports = Authentication;