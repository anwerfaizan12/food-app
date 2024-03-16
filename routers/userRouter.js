// const express=require("express");
// const userRouter= express.Router();
// const userModel=require('../models/userModel');



// userRouter
// .route('/')
// .get(protectRoute,getUsers)
// .post(postUser)
// .delete(deleteUser)
// .patch(updateUser)

// userRouter
// .route('/setCookies')
// .get(setCookies)

// userRouter
// .route('/getCookies')
// .get(getCookies)


// async function getUsers(req,res){
//     let users=await userModel.find();
//     if(users){
//         return res.json(users);
//     }
//     else{
//         res.json({
//             message:"please log in first"
//         })
//     }
// }

// function postUser(){

// }

// function updateUser(){

// }

// function deleteUser(){
    
// }

// function protectRoute(req,res,next){
//     if(req.cookies.isLoggedIn){     // It gives the information of login status.
//         next();
//     }
//     else{
//         return res.json({
//             message:"user not logged in"
//         })
//     }
// }

// function setCookies(req,res){
//     // res.setHeader('Set-Cookie','isLoggedIn=false');
//     res.cookie('isLoggedIn',true,{maxAge:1000*60*60*24,secure:true,httpOnly:true});  // maxAge -> kitne time tak cookies rahega , secure -> secure h ya nhi, httOnly -> frontend de server k through hi cookies ko access kar sakte hn (frontend se cookies ko direct access nhi kar sakte hn)
//     res.send('cookies has been set');
// }


// function getCookies(req,res){
//     let cookies=req.cookies;
//     console.log(cookies);
//     res.send("cookies recieved");
// }

// module.exports=userRouter;





















const express=require("express");
const multer=require('multer');
const userRouter= express.Router();
const {getUser,getAllUser,updateUser,deleteUser,updateProfileImage}=require('../controller/userController');
const{signup,login,isAuthorised,protectRoute,logout}=require('../controller/authController');


// user ke options
userRouter
.route('/:id')
.delete(deleteUser)
.patch(updateUser)

// signup
userRouter
.route('/signup')
.post(signup)

// login
userRouter
.route('/login')
.post(login)

// logout
userRouter
.route('/logout')
.get(logout)

// forgetPassword
// userRouter
// .route('/forgetpassword')
// .post(forgetpassword)

// resetPassword
// userRouter
// .route('/resetpassword')
// .post(resetpassword)


// multer for file upload
// upload -> storage,filter

const multerStorage=multer.diskStorage({
    destination:function(req,res,cb){
        cb(null,'public/images')
    },
    filename:function(req,res,cb){
        cb(null,`user-${Date.now()}.jpeg`)
    }
});

const filter=function(req,file,cb){
    if(file.mimetype.startsWith("image")){
        cb(null,true)
    }
    else{
        cb(new Error("Not an image. Please upload an image"));
    }
}

const upload=multer({
    storage:multerStorage,
    fileFilter:filter
})

userRouter.post('/ProfileImage',upload.single("photo"),updateProfileImage);
userRouter.get('/ProfileImage',(req,res)=>{
    res.sendFile("../views/multer.html",{root:__dirname});
})

// profile page
userRouter.use(protectRoute);
userRouter
.route('/userProfile')
.get(getUser);


// Admin specific function =>
userRouter.use(isAuthorised(['admin']));
userRouter
.route('')
.get(getAllUser)

module.exports=userRouter;