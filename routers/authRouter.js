// const express=require("express");
// const authRouter= express.Router();
// const userModel=require('../models/userModel');

// authRouter
// .route('/signup')
// .get(getSignUp)
// .post(postSignUp)

// authRouter
// .route('/login')
// .post(loginUser)

// function getSignUp(){

// }

// function postSignUp(){

// }

// async function loginUser(req,res){
//     try
//     {
//     let data=req.body;
//     if(data.email){
//     let user=await userModel.findOne({email:data.email});
//     if(user){
//         if(user.password==data.password){
//             res.cookie('isLoggedIn',true,{secure:true,httpOnly:true});        // It contains the information of login status either it is loged in or not.
//              return res.json({
//                 message:"user has logged in",
//                 userDetails:data
//             })
//         }
//         else
//         {
//             return res.json({
//                 message:"wrong credentials"
//             })
//         }
//     }
//     else
//     {
//         return res.json({
//             message:"user not found"
//         })
//     }
// }
// else{
//     return res.json({
//         message:"empty field found"
//     })
// }
//     }
//     catch(err){
//         return res.json({
//             message:err.message
//         })
//     }
// }

// module.exports=authRouter;











// JWT => json web token


const express=require("express");
const authRouter= express.Router();
const userModel=require('../models/userModel');
const jwt=require('jsonwebtoken');
const JWT_KEY='hgh6767hhghg8989';

authRouter
.route('/signup')
.get(getSignUp)
.post(postSignUp)

authRouter
.route('/login')
.post(loginUser)

function getSignUp(){

}

function postSignUp(){

}

async function loginUser(req,res){
    try
    {
    let data=req.body;
    if(data.email){
    let user=await userModel.findOne({email:data.email});
    if(user){
        if(user.password==data.password){
            let uid=user['_id'];  // uid
            let token=jwt.sign({payload:uid},JWT_KEY);  // is se signature banega aur header and uid ke sath milkar jwt bna dega
            res.cookie('isLoggedIn',token,{secure:true,httpOnly:true}); 
            return res.json({
            message:"user has logged in",
            userDetails:data
            })
        }
        else
        {
            return res.json({
                message:"wrong credentials"
            })
        }
    }
    else
    {
        return res.json({
            message:"user not found"
        })
    }
}
else{
    return res.json({
        message:"empty field found"
    })
}
    }
    catch(err){
        return res.json({
            message:err.message
        })
    }
}

module.exports=authRouter;