const jwt = require('jsonwebtoken');
let nope = process.env.AUTH_secret;

class Authentication{
    createToken(payload){
        //let jwtOptions = { expiresIn: 60*60*12 ,httpOnly:true};
        let token = jwt.sign( payload, nope );
        return token;
    };
    
    /* verifyToken(req, res, next){
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
    }; */
    verifyToken(req,res,next){
            //console.log('hi')
            const token=req.cookies.accesstoken
              
            const decoded=jwt.verify(token,nope)
            const email=req.cookies.email
            //console.log(token,email)  
            if (email==decoded.email){
                next();
            }
            else{
                return res.status(404)
            }
            
       
        }
    verifytokenadmin(req,res,next){
        const token=req.cookies.accesstoken
              
            const decoded=jwt.verify(token,nope)
            const email=req.cookies.email
            //console.log(token,email)
            //console.log(decoded)  
            if (email==decoded.email && decoded.userType=="admin"){
                next();
            }
            else{
                return res.status(404)
            }
    }
    
    
    }


module.exports = Authentication;