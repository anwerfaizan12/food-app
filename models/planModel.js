// mongoose k through connecting with mongoDB =>

const mongoose=require('mongoose');
const db_link="mongodb+srv://faizan:uWr9cefxIEo8jlrw@cluster0.pnr5slk.mongodb.net/?retryWrites=true&w=majority";
    mongoose.connect(db_link)
    .then(function(db){
    console.log("plans db connected");
    })
    .catch(function(err){
    console.log(err);
    });

    const planSchema=new mongoose.Schema({
        name:{
            type:String,
            required:true,
            unique:true,
            maxlength:[20,'plan name should not exceed more than 20 characters']
        },
        duration:{
            type:Number,
            required:true
        },
        price:{
            type:Number,
            required:[true,'price not entered']
        },
        ratingsAverage:{
            type:Number
        },
        discount:{
            type:Number,
            validate:[function(){
                return this.discount<100},'discount should not exceed price']
        }
    });


    // model
    let planModel=mongoose.model('planModel',planSchema);
    module.exports=planModel;


        // (async function createPlan(){
    //    let planObj= {
    //         name:"superfood",
    //         duration:30,
    //         price:1000,
    //         ratingsAverage:5,
    //         discount:20
    //     }

    //     let data=await planModel.create(planObj);
    //     console.log(data);
    // })();