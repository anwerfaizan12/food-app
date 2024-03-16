const express=require('express');
const planRouter=express.Router();
const {protectRoute,isAuthorised} =require('../controller/authController');
const {getPlan,getAllPlans,deletePlan,updatePlan,createPlan, top3Plans}=require('../controller/planController');

// getting all available plans
planRouter
.route('/allPlans')
.get(getAllPlans)

planRouter
.route('/top3plans')
.get(top3Plans)

// getting own plan => for this logged in is necessary
planRouter.use(protectRoute)
planRouter
.route('/plan/:id')
.get(getPlan)

// only admin and restaurant owner can do these operations
planRouter.use(isAuthorised(['admin','restaurantowner']));
planRouter
.route('/crudPlan')
.post(createPlan)


planRouter
.route('/crudPlan/:id')
.delete(deletePlan)
.patch(updatePlan)


module.exports=planRouter;