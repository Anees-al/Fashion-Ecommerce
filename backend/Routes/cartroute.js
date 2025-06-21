import express from 'express';
import { addcart, getusercart, updatecart } from '../controllers/cartcontrollers.js';
import authUser from '../middlewares/auth.js';

const cartRouter=express.Router();



cartRouter.post('/add',authUser, addcart);
cartRouter.post('/update',authUser,updatecart);
cartRouter.post('/get',authUser,getusercart);



export default cartRouter;