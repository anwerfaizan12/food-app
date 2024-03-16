// This is your test secret API key
let SK="sk_test_51MyBs7SBaRxOGbTXLpv3GjEfVBXrqr20xNaOfjMepeyvrFEf0sNRU3PoHyui7SaO4GL36t8Lm4RjfP6UWnbmi46A00IPYIGswm"; // secret key from stripe dashboard

// let SK="sk_test_51MyBs7SBaRxOGbTXLpv3GjEfVBXrqr20xNaOfjMepeyvrFEf0sNRU3PoHyui7SaO4GL36t8Lm4RjfP6UWnbmi46A00IPYIGswm"; // secret key from stripe dashboard
const stripe = require('stripe')(SK);
const planModel=require('../models/planModel');
const userModel=require('../models/userModel');
const express = require('express');

module.exports.createSession=async function createSession(req,res){
    try{
        let userId=req.id;
        let planId=req.params.id;

        const user=await userModel.findById(userId);
        const plan=await planModel.findById(planId);

        const session= await stripe.checkout.session.create({
            payment_method_types:['card'],
            customer_email:user.email,
            client_reference_id:plan.id,
            line_items:[
                {
                    name:plan.name,
                    description:plan.description,
                    //deploy website
                    amount:plan.price*100,
                    currency:"inr",
                    quantity:1
                }
            ],
            success_url:`${req.protocol}://${req.get("host")}/profile`,
            cancel_url:`${req.protocol}://${req.get("host")}/profile`
        })
        res.status(200).json({
            status:success,
            session
        })
    }
    catch(err){    
            res.status(500).json({
                err:err.message
            })       
        }
}