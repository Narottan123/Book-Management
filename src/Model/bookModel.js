const mongoose=require("mongoose");

const bookSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    excerpt:{
        type:String,
        required:true,
        trim:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user_details"
    },
    ISBN:{
        type:String,
        required:true,
        unique:true
    },
    category:{
        type:String,
        required:true
    },
    subcategory:{
        type:String,
        required:true
    },
    reviews:{
        type:Number,
        default:0,
        
    },
    deletedAt:{
        type:Date
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    releasedAt: {
        type: Date,
        required: true
    },

},{timestamps:true})

module.exports=mongoose.model('book_details',bookSchema);
