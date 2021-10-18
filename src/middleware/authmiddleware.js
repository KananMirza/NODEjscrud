const jwt = require("jsonwebtoken");
const login = (req,res,next)=>{
    try{
        const token = req.header("Authorization").replace("Bearer ","");
        const ret  =jwt.verify(token,'ayy@qaa');
        req.user = ret;
        next();
    }catch(e){
        req.error ={
            "data":"Please Login",
            status:false,
        };
        next();
        
    }
}

module.exports = login