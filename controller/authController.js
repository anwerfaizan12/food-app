const express=require('express');
const userModel=require('../models/userModel');
const jwt=require('jsonwebtoken');
const { sendMail } = require('../utility/nodeMailer');
const JWT_KEY='hgh6767hhghg8989';


// user signup
module.exports.signup=async function signup(req,res){
    try{
        let dataObj=req.body;
    let user=await userModel.create(dataObj);
    sendMail("signup",user);
    if(user){
       return res.json({
        message:"user signed up",
        data:user
    })
}
else{
    res.json({
        message:"error while signing up"
    })
}
    }
    catch(err){
        res.json({
            message:err.message
        })
    }
}


// user login
module.exports.login=async function login(req,res){
    try
    {
    let data=req.body;
    if(data.email){
    let user=await userModel.findOne({email:data.email});
    if(user){
        if(user.password==data.password){
            let uid=user['_id'];  // uid
            let token=jwt.sign({payload:uid},JWT_KEY);  // is se signature banega aur header and uid ke sath milkar jwt bna dega
            res.cookie('isLoggedIn',token,{httpOnly:true}); 
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

// is Authorized function -> To check user role(user,admin or other).
module.exports.isAuthorised=function isAuthorised(roles){
    return function(req,res,next){
        if(roles.includes(req.role)==true){
            next();
        }
        else{
            res.status(401).json({
                message:"operation not allowed"
            })
        }
    }
}

// protect route
module.exports.protectRoute=async function protectRoute(req,res,next){
    try{
    let token;
    if(req.cookies.isLoggedIn){     // It gives the information of login status.
        token=req.cookies.isLoggedIn;
        let payload=jwt.verify(token,JWT_KEY);   // yeh purane wale ka header aur payload ko le lega aur naya signature banayega agar purana signature naya signature se match kar rha h to login h otherwise nhi h.
        console.log("payload=>",payload.payload);
        if(payload){
            const user=await userModel.findById(payload.payload);
            req.role=user.role;
            req.id=user.id;
            next();   // next karne par next route m chale jayenge aur abhi req m jo kuch bhi h wo agle route k req m chla jayega -> example(role aur id)
        }
        else{
            res.json({
                message:"please login again"
            })
        }
    }
    else{
        let client=req.get("User-Agent");
        if(client.includes("Mozilla")===true){
            return res.redirect('/login');
        }
        else{
        return res.json({
            message:"Please login"
        })
    }
    }
}
catch(err){
    res.json({
        message:err.message
    })
}
}

// forget password
module.exports.forgetpassword=async function forgetpassword(req,res){
    let {email}=req.body;
    try{
        const user=await userModel.findOne({email:email});
        if(user){
            const resetToken=user.createResetToken();
            // http://abc.com/resetpassword/resetToken
            let resetPasswordLink=`${req.protocol}://${req.get('host')}/resetpassword/${resetToken}`;
            // send email to the user
            let obj={
                resetPasswordLink:resetPasswordLink,
                email:email
            }

            // nodemailer
            sendMail("resetpassword",obj);
        }
        else{
            return res.json({
                message:"Please signup"
            })
        }
    }
    catch(err){
        return res.json({
            message:err.messsage
        })
    }
}


// reset password =>
module.exports.resetpassword=async function resetpassword(req,res){
    try{
    const token=req.params.token;
    let {passwprd,confirmpassword}=req.body;
    const user=await userModel.findOne({resetToken:token});
    if(user){
    // resetpassword will update user in database
    user.resetPasswordHandler(password,confirmpassword);
    await user.save();
    res.json({
        message:"password change successfully. Login again."
    })
}
else{
    return res.json({
        message:"user not found"
    })
}
}
catch(err){
    return res.json({
        message:err.message
    })
}
}


module.exports.logout=function logout(req,res){
    res.cookie('isLoggedIn','',{maxAge:1});
    return res.json({
        message:"user logged out successfully"
    })
}