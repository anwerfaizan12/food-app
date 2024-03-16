// mongoDB =>

const mongoose=require('mongoose');
const crypto=require('crypto');   // it is used to create unique crypto
const emailValidator=require('email-validator');
const bcrypt=require("bcrypt");
const db_link="mongodb+srv://faizan:uWr9cefxIEo8jlrw@cluster0.pnr5slk.mongodb.net/?retryWrites=true&w=majority";
    mongoose.connect(db_link)
    .then(function(db){
    console.log(" user db connected");
    })
    .catch(function(err){
    console.log(err);
    });
    
    const userSchema=mongoose.Schema({
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            validate:function(){
                return emailValidator.validate(this.email);
            }
        },
        password:{
            type:String,
            required:true,
            minLength:8
        },
        confirmPassword:{
            type:String,
            required:true,
            minLength:8,
            validate:function(){
                return this.confirmPassword==this.password;
            }
        },
        role:{
            type:String,
            enum:['admin','user','restaurantowner','deliveryboy'],
            default:'user'
        },
        profileImage:{
            type:String,
            default:'/img/users/default.jpeg'
        },
        resetToken:String
    });

        userSchema.pre('save',function(){
        this.confirmPassword=undefined;
    });

    // userSchema.pre('save',async function(){
    //     let salt=await bcrypt.genSalt();
    //     let hashedString=await bcrypt.hash(this.password,salt);
    //     this.password=hashedString;
    // })

    userSchema.methods.createResetToken=function(){
        //creating unique token using npm crypto
        const resetToken=crypto.randomBytes(32).toString("hex");
        this.resetToken=resetToken;
        return resetToken;
    }

    userSchema.methods.resetPasswordHandler=function(password,confirmpassword){
        this.password=password;
        this.confirmPassword=confirmpassword;
        this.resetToken=undefined;
    }
    
    const userModel=mongoose.model('userModel',userSchema);

    module.exports=userModel;




