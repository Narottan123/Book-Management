const { default: mongoose } = require("mongoose");
const bookmodel = require("../Model/bookModel");
const reviewModel=require("../Model/reviewModel")
const createBook = async (req, res) => {
  let { title, excerpt, userId, ISBN, category, subcategory, releasedAt } =
    req.body;
  if (
    !title ||
    !excerpt ||
    !userId ||
    !ISBN ||
    !category ||
    !subcategory ||
    !releasedAt
  ) {
    return res
      .status(400)
      .send({
        status: false,
        message: "Please provide all the necessary fields",
      });
  }
  if (userId !== req["x-auth-token"].userId) {
    return res
      .status(403)
      .send({ status: false, message: "Unauthorised Please try later" });
  }
  let savedData = await bookmodel.create({
    title,
    excerpt,
    userId,
    ISBN,
    category,
    subcategory,
    releasedAt,
  });
  return res
    .status(201)
    .send({ status: true, message: "Book created successfully", savedData });
};
const getBook = async (req, res) => {
  try {
    let { userId, category, subcategory } = req.query;
    let filter = { isDeleted: false };
    /*if(isDeleted===true){
        return res.status(400).send({status:false,message:"Record deleted previously"})
    }*/
    if (userId) {
      const isValid = mongoose.isValidObjectId(userId);
      if (!isValid) {
        res.status(400).send({ status: false, message: "Invalid author id" });
      }
    }
    if (category) {
      filter.category = category;
    }
    if (subcategory) {
      filter.subcategory = subcategory;
    }
    const bookList = await bookmodel.find(filter)
    .select('_id title excerpt userId category releasedAt reviews')
    .sort({ title: 'asc' });

    
    if (bookList.length == 0) {
      return res
        .status(404)
        .send({ status: false, message: "No book record found" });
    }
    return res
      .status(200)
      .send({ status: true, message: "Book List", bookList });
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message });
  }
};

const getBookByid = async(req, res) => {
    const { bookId } = req.params;
  
    // Find the book by its ID
    const book = await bookmodel.findOne({ _id: bookId });
  
    // If no book is found, return a 404 response
    if (!book) {
      return res.status(404).json({ status: false, message: 'Book not found' });
    }
  
    // If the book has no reviews, return the book details with an empty reviews array
    if (book.reviews === 0) {
      return res.status(200).json({
        status: true,
        message: 'Book found',
        bookData: book,
        reviewsData: [],
      });
    }
  
    // Retrieve the reviews for the book
    const reviews = await reviewModel.find({ bookId });

    let obj={
        bookData: book,
        reviewsData: reviews
    }
  
    // Return the book details with the reviews array
    return res.status(200).json({
      status: true,
      message: 'Book found',
      data:obj
    });
  };
 

const updateBook=async(req,res)=>{
    let id=req.params.bookId;
    let valid=mongoose.isValidObjectId(id);
    if(!valid){
        return res.status(400).send({status:false,message:"please enter valid bookId"})
    }
    let data=await bookmodel.findById(id);
    if(!data){
        return res.status(404).send({status:false,message:"id not match plaese provide correct id"})
    }
    if(!(req['x-auth-token'].userId==data.userId)){
        return res.status(403).send({status:false,message:"Unauthorized Acees"})
    }
    let {title,excerpt,releasedAt,ISBN}=req.body;
    data.title=title||data.title;
    data.excerpt=excerpt||data.excerpt;
    data.releasedAt=releasedAt||data.releasedAt;
    data.ISBN=ISBN||data.ISBN

    let updatedData=await data.save();
    res.status(200).json({
        status: true, message: "Book updated", data: updatedData
    });


}

const deleteBook=async(req,res)=>{
    let id=req.params.bookId;
    let valid=mongoose.isValidObjectId(id);
    if(!valid){
        return res.status(400).send({status:false,message:"please enter valid bookId"})
    }
    let data=await bookmodel.findOne({_id:id,isDeleted:false});
    if(!data){
        return res.status(404).send({status:false,message:"id not match please provide correct id"})
    }
    if(!(req['x-auth-token'].userId==data.userId)){
        return res.status(403).send({status:false,message:"Unauthorized Acees"})
    }
    data.isDeleted=true;
    let deleted=await data.save();
    return res.status(204).json({
        status: true,
        message: "successful deleted"
    });

}

module.exports.createBook = createBook;
module.exports.getBook = getBook;
module.exports.getBookByid=getBookByid;
module.exports.updateBook=updateBook;
module.exports.deleteBook=deleteBook;
