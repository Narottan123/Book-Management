const jwt=require("jsonwebtoken");
const usermodel=require("../Model/userModel");
const tokenVerify=async(req,res,next)=>{
     let token=req.headers['x-auth-token'];
     //console.log(token);
     if(!token){
        return res.status(404).send({status:false,message:"token not found"});
     }
     try {
        let decodedToken = jwt.verify(token, "Book123");
        req["x-auth-token"] = decodedToken;
        next();
      } catch (error) {
        return res.status(400).send({ status: false, message: "Token is invalid" });
      }

}
module.exports.tokenVerify=tokenVerify;