const express=require("express");
const bookingRouter=express.Router();
const {protectRoute}=require('../controller/authController');
const {createSession}=require('../controller/bookingController');
// var path=require('path');

bookingRouter.post('/createSession',protectRoute);
bookingRouter.get('/createSession',function(req,res){
res.sendFile('../views/booking.html',{root:__dirname});
})

module.exports=bookingRouter;