const express=require("express");
const router=express.Router();
const  userController=require("../Controller/userController");
const userMiddleware=require("../Middleware/userregister")
const tokenverify=require("../Middleware/tokenVerify");
const bookController=require("../Controller/bookController")
const reviewController=require("../Controller/reviewController")
router.post('/register',userMiddleware.userregisterCheck,userController.userRegister);
router.post('/login',userController.userLogin);
router.post('/books',tokenverify.tokenVerify,bookController.createBook);
router.get('/books',bookController.getBook)
router.get('/books/:bookId', bookController.getBookByid);
router.put('/books/:bookId',tokenverify.tokenVerify,bookController.updateBook);
router.delete('/books/:bookId',tokenverify.tokenVerify,bookController.deleteBook);
router.post('/books/:bookId/review',reviewController.createReview);
router.put('/books/:bookId/review/:reviewId', reviewController.updateReview);
router.delete('/books/:bookId/review/:reviewId', reviewController.deleteReview);

module.exports=router;