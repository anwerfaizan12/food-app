// mongoBD
const mongoose=require('mongoose');
const db_link="mongodb+srv://faizan:uWr9cefxIEo8jlrw@cluster0.pnr5slk.mongodb.net/?retryWrites=true&w=majority";
    mongoose.connect(db_link)
    .then(function(db){
    console.log("reviews db connected");
    })
    .catch(function(err){
    console.log(err);
    });

    const reviewSchema=new mongoose.Schema({
        review:{
            type:String,
            require:[true,'review is required']
        },
        rating:{
            type:Number,
            min:1,
            max:10,
            required:[true,'rating is required']
        },
        createdAt:{
            type:Date,
            default:Date.now()
        },
        user:{
            type:mongoose.Schema.ObjectId,
            ref:'userModel',
            required:[true,'review must belong to a user']
        },
        plan:{
            type:mongoose.Schema.ObjectId,
            ref:'planModel',
            required:[true,'review must belong to a plan']
        }
    });

    // jab bhi find wale koi bhi function chalega to us se pehle user aur plan populate hoga 
    // eg: find(),findBuId() etc. 
    // populate -> 
    reviewSchema.pre(/^find/,function(next){
        this.populate({
            path:"user",
            select:"name profileImage",
        }).populate("plan");
        next();
    })


    const reviewModel=mongoose.model('reviewModel', reviewSchema);
    module.exports=reviewModel;