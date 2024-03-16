const planModel = require('../models/planModel');
const reviewModel=require('../models/reviewModel')

module.exports.getAllReviews=async function getAllReviews(req,res){
    try{
        const reviews=await reviewModel.find();
        if(reviews){
            return res.json({
                message:"reviews retrieved",
                data:reviews
            })
        }
        else{
            return res.json({
                message:"reviews not found",
                data:reviews
            })
        }
    }
    catch(err){
        return res.json({
            message:err.message
        })
    }
}

module.exports.top3Reviews=async function top3Reviews(req,res){
    try{
        const reviews=await reviewModel.find().sort({rating:-1}).limit(3);
        if(reviews){
            return res.json({
                message:"top 3 reviews retrieved",
                data:reviews
            })
        }
        else{
            return res.json({
                message:"reviews not found",
                data:reviews
            })
        }
    }
    catch(err){
        return res.json({
            message:err.message
        })
    }
}

module.exports.getPlanReviews=async function getPlanReviews(req,res){
    try{
        let planId=req.params.id;
        console.log(planId);
        let reviews=await reviewModel.find();
        console.log(reviews);
        reviews=reviews.filter((review)=>{
            if(review.plan._id == planId){
                return true;
            }
        })
        // console.log(reviews);
        if(reviews){
            return res.json({
                message:"reviews retrieved successfully",
                data:reviews
            })
        }
        else{
            return res.json({
                message:"reviews not found",
                data:reviews
            })
        }
    }
    catch(err){
        return res.json({
            message:err.message
        })
    }
}

module.exports.createReview=async function createReview(req,res){
    try{
        const id=req.params.plan;
        let plan=await planModel.findById(id);
        if(plan){
        let review=await reviewModel.create(req.body);
        plan.ratingsAverage=(plan.ratingsAverage+req.body.rating)/2;
        plan.save();
        res.json({
            message:"review created successfully",
            data:review
        })
    }
    else{
        res.json({
            message:"Plan not found"
        })
    }
    }
    catch(err){
       return res.json({
            message:err.message
        })
    }
}

module.exports.updateReview=async function updateReview(req,res){
    try{
        let planId=req.params.id;
        let id=req.body.id;    // review id from frontend
        let dataToBeUpdated=req.body;
        let keys=[];
        for(let key in dataToBeUpdated){
            if(key==id){
                continue;
            }
            keys.push(key);
        }

        const review=await reviewModel.findById(id);
        if(review){
        for(let i=0;i<keys.length;i++){
            review[keys[i]]=dataToBeUpdated[keys[i]];
        }
        await review.save();
        return res.json({
            message:"review updated successfully",
            data:review
        })
        }
        else{
        return res.json({
            message:"review not found"
        })
    }
    }
    catch(err){
        return res.status(500).json({
            message:err.message
        })
    }
}


module.exports.deleteReview=async function deleteReview(req,res){
    try{
        let planId=req.params.id;
        let id=req.body.id;    // review id
    let deletedReview=await reviewModel.findByIdAndDelete(id);
    return res.json({
        message:"review deleted successfully",
        data:deletedReview
    })
}
    catch(err){
        return res.json({
            message:err.message
        })
    }
}
    