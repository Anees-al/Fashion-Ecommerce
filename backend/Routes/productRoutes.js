import express from 'express'

import { addProduct,listProduct, removeProduct, singleProduct } from '../controllers/productControllers.js';
import upload from '../middlewares/multer.js';
import adminAuth from '../middlewares/adminAuth.js';


const prouductRouter=express.Router()


prouductRouter.post('/add',adminAuth, upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1}]),addProduct);
prouductRouter.get('/list',listProduct);
prouductRouter.post('/remove',removeProduct);
prouductRouter.post('/single',singleProduct);



export default prouductRouter;