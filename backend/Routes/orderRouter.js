import express from 'express'
import adminAuth from '../middlewares/adminAuth.js'
import { allOrders, placeOrderCODmethod, placeOrderRazorpay, placeOrderStripe, updateSatuts, userOrders, verifyStripe } from '../controllers/ordercontrollers.js';
import authUser from '../middlewares/auth.js'


const orderRouter=express.Router();
// admin use
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateSatuts)


//payment features

orderRouter.post('/place',authUser,placeOrderCODmethod);
orderRouter.post('/stripe',authUser,placeOrderStripe);
orderRouter.post('/razorpay',authUser,placeOrderRazorpay);

//users feature


orderRouter.post('/userorder',authUser,userOrders);
orderRouter.post('/verifystripe',authUser,verifyStripe);

export default orderRouter;