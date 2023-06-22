const mongoose=require("mongoose");

const reviewSchema=new mongoose.Schema({
    bookId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"book_details"
    },
    reviewedBy:{
        type:String,
        
        default:"Guest"
    },
    reviewedAt:{
        type:Date,
        required:true

    },
    rating:{
        type:Number,
        min:1,
        max:5,
        required:true
    },
    review:{
        type:String
    }
})

module.exports=mongoose.model("bookReview",reviewSchema);