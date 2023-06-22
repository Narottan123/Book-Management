const usermodel=require("../Model/userModel");
const jwt=require("jsonwebtoken")
const userRegister=async(req,res)=>{
    let data=req.body;
    let saveddata=await usermodel.create(data);
    res.send(saveddata);
}
const userLogin=async(req,res)=>{
    let {email,password}=req.body;
    if (!email) {
        return res
          .status(400)
          .send({ status: false, message: "Please Provide email address" });
    }
    if (!password) {
        return res
          .status(400)
          .send({ status: false, message: "Please Provide password" });
    }
    let userExist=await usermodel.findOne({email:email,password:password});
    if(!userExist){
        return res.status(401).json({ status: false, message: "userid and password is invalid" })
    }
    let token=jwt.sign({project:"Book Management",userId:userExist._id.toString()},"Book123")
    res.setHeader('x-auth-token',token);
    return res.status(201).send({status:true,message:"Token created successfully",token})
}
module.exports.userRegister=userRegister;
module.exports.userLogin=userLogin;