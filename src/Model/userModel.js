const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        enum:['Mr','Mrs','Miss'],
        trim:true
    },
    name:{
        type:String,
        required:true,
        trim:true
    },
    phone:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        validate:{
            validator:(value)=>{
                const emailRegex=/^[A-Z0-9._%+-]+@[A-Z0-9._%+-]+\.[A-Z]{2,}$/i;
                return emailRegex.test(value);
            },
            message:"invalid email address"
        },
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:8,
        maxlength:15
    },
    address:{
        street:String,
        city:String,
        pincode:String,
    },

},{timestamps:true})

module.exports=mongoose.model('user_details',userSchema);
