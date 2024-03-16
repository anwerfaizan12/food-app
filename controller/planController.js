const planModel=require('../models/planModel');

module.exports.getAllPlans=async function getAllPlans(req,res){
    try{
    const plans=await planModel.find();
    if(plans){
        return res.json({
            message:"plans retrieved successfully",
            data:plans
        })
    }
    else
    {
        return res.json({
            message:"plans not found"
        })
    }
}
catch(err){
    return res.status(500).json({
        message:err.message
    })
}
}

module.exports.getPlan=async function getPlan(req,res){
    try{
    let id=req.params.id;
    const plan=await planModel.findById(id);
    if(plan){
        return res.json({
            message:"plan retrieved successfully",
            data:plan
        })
    }
    else
    {
        return res.json({
            message:"plan not found"
        })
    }
}
catch(err){
    return res.status(500).json({
        message:err.message
    })
}
}

module.exports.createPlan=async function createPlan(req,res){
    try{
    let planData=req.body;
    let createPlan=await planModel.create(planData);
    res.json({
        message:"plan created successfully",
        data:createPlan
    })
}
    catch(err){
        return res.json({
            message:err.message
        })
    }
}

module.exports.deletePlan=async function deletePlan(req,res){
    try{
    let id=req.uid;
    let deletedPlan=await planModel.findByIdAndDelete(id);
    return res.json({
        message:"plan deleted successfully",
        data:deletedPlan
    })
}
    catch(err){
        return res.json({
            message:err.message
        })
    }
}

module.exports.updatePlan=async function updatePlan(req,res){
    try{
    let dataToBeUpdated=req.body;
    let keys=[];
    for(let key in dataToBeUpdated){
        keys.push(key);
    }
    let id=req.params.id;
    const plan=await planModel.findById(id);
    if(plan){
    for(let i=0;i<keys.length;i++){
        plan[keys[i]]=dataToBeUpdated[keys[i]];
    }
    await plan.save();
    return res.json({
        message:"plan updated successfully",
        data:plan
    })
    }
    else{
    return res.json({
        message:"plan not found"
    })
}
}
catch(err){
    return res.status(500).json({
        message:err.message
    })
}
}


module.exports.top3Plans=async function top3Plans(req,res){
    try{
        const plans=await planModel.find().sort({ratingsAverage:-1}).limit(3);
        if(plans){
        return res.json({
            message:"top 3 plans",
            data:plans
        })
    }
    else
    {
        return res.json({
            message:"plans not found"
        })
    }
    }
    catch(err){
        return res.status(500).json({
            message:err.message
        })
    }
}