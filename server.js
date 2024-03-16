// CONNECTION BETWEEN MONGODB ABD MONGOOSE =>

// const express=require("express");
// const app=express();
// const mongoose=require('mongoose');

// app.use(express.json());
// app.listen(3000);

// let users=[];

// const db_link="mongodb+srv://anwerfaizan12:12345aW@cluster0.isku7sb.mongodb.net/?retryWrites=true&w=majority";
// mongoose.connect(db_link)
// .then(function(db){
// console.log("db connected");
// })
// .catch(function(err){
// console.log(err);
// });



// USED SCHEMA AND SAVED DATA TO MONGODB =>

// const express=require("express");
// const app=express();
// const mongoose=require('mongoose');

// app.use(express.json());
// app.listen(4001);

// const db_link="mongodb+srv://faizan:12345aW@cluster0.pnr5slk.mongodb.net/?retryWrites=true&w=majority";
// mongoose.connect(db_link)
// .then(function(db){
// console.log("db connected");
// })
// .catch(function(err){
// console.log(err);
// });

// const userSchema=mongoose.Schema({
//     name:{
//         type:String,
//         required:true
//     },
//     email:{
//         type:String,
//         required:true,
//         unique:true
//     },
//     password:{
//         type:String,
//         required:true,
//         minLength:8
//     },
//     confirmPassword:{
//         type:String,
//         required:true,
//         minLength:8
//     }
// });

// const userModel=mongoose.model('userModel',userSchema);

// (async function createUser(){
//     let user={
//         name:"faizan",
//         email:"abc@gmail.com",
//         password:"123456789",
//         confirmPassword:"123456789"
//     };

//     let data = await userModel.create(user);
//     console.log(data);
// })();




// GET USERS FROM MONGODB =>

// const express=require('express');
// const app=express();
// const mongoose=require('mongoose');

// app.use(express.json());
// app.listen(4004);

// const db_link="mongodb+srv://faizan:12345aW@cluster0.pnr5slk.mongodb.net/?retryWrites=true&w=majority";
// mongoose.connect(db_link)
// .then(function(db){
// console.log("db connected");
// })
// .catch(function(err){
// console.log(err);
// });

// const userSchema=mongoose.Schema({
//     name:{
//         type:String,
//         required:true
//     },
//     email:{
//         type:String,
//         required:true,
//         unique:true
//     },
//     password:{
//         type:String,
//         required:true,
//         minLength:8
//     },
//     confirmPassword:{
//         type:String,
//         required:true,
//         minLength:8
//     }
// });

// let userModel=mongoose.model('userModel',userSchema);

// const userRouter= express.Router();
// app.use('/user',userRouter);

// userRouter
// .route('/')
// .get(getUser)
// .post(postUser)
// .delete(deleteUser)
// .patch(updateUser)

// async function getUser(req,res){
//     // let user=await userModel.findOne({name:"faizan"}) => to get one
//     let allUsers=await userModel.find();
//     res.json({
//         message:'list of all users',
//         data:allUsers
//     })
// }

// async function postUser(req,res){
//     let dataObj=req.body;
//     let user=await userModel.create(dataObj);
//     console.log("backend",user);
//     res.json({
//         message:"user signed up",
//         data:user
//     });
// }

// async function updateUser(req,res){
//     console.log("req.body -> ",req.body);
//     let dataToBeUpdated=req.body;
//     let user=await userModel.findOneAndUpdate({email:'abc@gmail.com'},dataToBeUpdated);
//     res.json({
//         message:"data updated successfully"
//     })
// }

// async function deleteUser(req,res){
//     let dataToBeDeleted=req.body;
//     let user=await userModel.findOneAndDelete(dataToBeDeleted);
//     res.json({
//         message:"data deleted successfully",
//         data:user
//     })
// }






// MONGOOSE HOOKS =>  (pre,post)

// const express=require('express');
// const app=express();
// const mongoose=require('mongoose');
// const emailValidator=require('email-validator')

// app.use(express.json());
// app.listen(4000);


// const userRouter= express.Router();
// app.use('/user',userRouter);

// userRouter
// .route('/')
// // .get(getUser)
// .post(postUser)
// // .delete(deleteUser)
// // .patch(updateUser)

// async function postUser(req,res){
//         let dataObj=req.body;
//         let user=await userModel.create(dataObj);
//         console.log("backend",user);
//         res.json({
//             message:"user signed up",
//             data:user
//         });
//     }


//     const db_link="mongodb+srv://faizan:12345aW@cluster0.pnr5slk.mongodb.net/?retryWrites=true&w=majority";
//     mongoose.connect(db_link)
//     .then(function(db){
//     console.log("db connected");
//     })
//     .catch(function(err){
//     console.log(err);
//     });
    
//     const userSchema=mongoose.Schema({
//         name:{
//             type:String,
//             required:true
//         },
//         email:{
//             type:String,
//             required:true,
//             unique:true,
//             validate:function(){
//                 return emailValidator.validate(this.email);
//             }
//         },
//         password:{
//             type:String,
//             required:true,
//             minLength:8
//         },
//         confirmPassword:{
//             type:String,
//             required:true,
//             minLength:8,
//             validate:function(){
//                 return this.confirmPassword==this.password;
//             }
//         }
//     });
    
//     // let userModel=mongoose.model('userModel',userSchema);
    
//     userSchema.pre('save',function(){
//         this.confirmPassword=undefined;
//     });
    
//     userSchema.post('save',function(doc){
//     console.log("after saving in db",doc);
//     })

//     let userModel=mongoose.model('userModel',userSchema);




// HASHING USING DECRYPT => 

// const express=require('express');
// const app=express();
// const userModel=require('./models/userModel');

// app.use(express.json());
// app.listen(4000);

// const userRouter= express.Router();
// app.use('/user',userRouter);

// userRouter
// .route('/')
// .post(postUser)

// async function postUser(req,res){
//         let dataObj=req.body;
//         let user=await userModel.create(dataObj);
//         console.log("backend",user);
//         res.json({
//             message:"user signed up",
//             data:user
//         });
//     }






// COOKIES =>

// const express=require('express');
// const app=express();
// const cookieParser=require('cookie-parser');

// app.use(express.json());
// app.listen(3002);
// app.use(cookieParser());

// const userRouter= express.Router();
// app.use('/user',userRouter);

// userRouter
// .route('/setCookies')
// .get(setCookies)

// userRouter
// .route('/getCookies')
// .get(getCookies)


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










const express=require('express');
const app=express();
const cookieParser=require('cookie-parser');

app.use(express.json());
app.listen(3003);
app.use(cookieParser());


const userRouter= require('./routers/userRouter');
// const authRouter=require('./routers/authRouter');
const planRouter=require('./routers/planRouter');
const reviewRouter = require('./routers/reviewRouter');
// const bookingRouter=require('./routers/bookingRouter');

app.use('/user',userRouter);

// app.use('/auth',authRouter);

app.use('/plans',planRouter);
app.use('/review',reviewRouter)
// app.use('/booking',bookingRouter);



//llmqmpxvmkiqgkqh
