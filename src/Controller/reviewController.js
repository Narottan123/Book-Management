const { default: mongoose } = require("mongoose");
const reviewModel=require("../Model/reviewModel")
const bookmodel = require("../Model/bookModel");
const createReview=async(req,res)=>{
    let id=req.params.bookId;
    
    let book=await bookmodel.findById(id);
    if(!book){
        return res.status(404).send({status:false,message:"id not match please provide correct id"})
    }
    
    let {bookId,reviewedAt,rating,review}=req.body;
    if(id!==bookId){
        return res.status(404).send({status:false,message:"id not found"})
    }
    if(!bookId){
        return res.status(400).send({status:false,message:"bookid is not found"})
    }
    let check=mongoose.isValidObjectId(bookId);
    if(!check){
        return res.status(400).send({status:false,message:"Object id format is not valid"})
    }
    

    let data=await reviewModel.create({bookId,reviewedAt,rating,review});
    book.reviews += 1;
    await book.save();
    return res.status(200).send({status:true,message:"Review Created Successfully",data})
    
}

const updateReview=async(req,res)=>{
        const { bookId, reviewId } = req.params;
        const { review, rating, reviewedBy } = req.body;
      
        // Check if the book exists and is not deleted
        const book = await bookmodel.findOne({ _id: bookId, isDeleted: false });
        if (!book) {
          return res
            .status(404)
            .json({ status: false, message: "Book not found" });
        }
      
        // Check if the review exists
        const existingReview = await reviewModel.findOne({ _id: reviewId, bookId });
        if (!existingReview) {
          return res
            .status(404)
            .json({ status: false, message: "Review not found" });
        }
      
        // Update the review
        existingReview.review = review;
        existingReview.rating = rating;
        existingReview.reviewedBy = reviewedBy;
        await existingReview.save();
      
        // Return the updated book document with reviews data
        const updatedBook = await bookmodel
          .findById(bookId)
          .select('_id title excerpt userId category releasedAt reviews');
      
        return res
          .status(200)
          .json({ status: true, message: "Review updated successfully", book: updatedBook });
      
      
}

const deleteReview = async (req, res) => {
    const { bookId, reviewId } = req.params;
  
    // Check if the review exists with the given reviewId
    const review = await reviewModel.findOne({ _id: reviewId });
    if (!review) {
      return res.status(404).json({ status: false, message: 'Review not found' });
    }
  
    // Check if the book exists with the given bookId
    const book = await bookmodel.findOne({ _id: bookId });
    if (!book) {
      return res.status(404).json({ status: false, message: 'Book not found' });
    }
  
    // Delete the review
    await reviewModel.findByIdAndDelete(reviewId);
  
    // Update the book document - decrease review count by one
    book.reviews -= 1;
    await book.save();
  
    return res.status(200).json({ status: true, message: 'Review deleted successfully' });
  };
  
  
  
module.exports.createReview=createReview;
module.exports.updateReview=updateReview;
module.exports.deleteReview=deleteReview;
