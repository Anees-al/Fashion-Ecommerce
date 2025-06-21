import orderModel from '../model/orderModel.js'
import userModel from '../model/orderModel.js'
import Stripe from 'stripe'
import 'dotenv/config'


const stripe=new Stripe(process.env.STRIPE_SECRET_KEY)
const currency='inr'
const deliveryCharge=50

const placeOrderCODmethod=async(req,res)=>{
    try {
    const {userId,amount,address,items}=req.body

    const userData={
        userId,
        items,
        amount,
        address,
        items,
        paymentMethod:'cod',
        payment:false,
        date:Date.now(),

        
    }
     const newOrder=new orderModel(userData)


    await newOrder.save();
    await userModel.findByIdAndUpdate(userId,{cartData:{}})


    return res.json({success:true,message:'orderplaced'})

   
    } catch (error) {
        console.log(error);
      return  res.json({success:false,message:error.message})
        
    }
}


const placeOrderStripe=async(req,res)=>{
    try {
        const {userId,amount,address,items}=req.body
        const { origin }= req.headers;

         const userData={
        userId,
        items,
        amount,
        address,
        items,
        paymentMethod:'stripe',
        payment:false,
        status:'pending',
        date:Date.now(),

        
    }
    const newOrder=new orderModel(userData)
    await newOrder.save();
    await userModel.findByIdAndUpdate(userId,{cartData:{}})
      

    const line_items=items.map((item)=>(
        {
            price_data:{
                currency:currency,
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*10
            },
            quantity:item.quantity,
        }
    ))

    line_items.push({
            price_data:{
                currency:currency,
                product_data:{
                    name:deliveryCharge
                },
                unit_amount:deliveryCharge
            },
            quantity:1,
        })

    const session=await stripe.checkout.sessions.create({
        success_url:`${origin}/verify?success=true&orderId=${newOrder._id}`,
        cancel_url:`${origin}/verify?success=false&orderId=${newOrder._id}`,
        line_items,
        mode:'payment'
    })

    res.json({success:true,session_url:session.url})


    } catch (error) {
       console.log("stripe error" +error);
      return  res.json({success:false,message:error.message})
      
          
    }
}



const verifyStripe=async(req,res)=>{
    try {
       const {orderId,success,userId}=req.body;
       if(success==='true'){
        await orderModel.findByIdAndUpdate(orderId,{payment:true});
        await userModel.findByIdAndUpdate(userId,{cartData:{}})
        res.json({success:true})
       } else{
        await orderModel.findByIdAndDelete(orderId);
        res.json({success:false})
       }
    } catch (error) {
        console.log(error);
      return  res.json({success:false,message:error.message})
       
    }
}

const placeOrderRazorpay=async()=>{
    try {
        
    } catch (error) {
        
    }
}
const allOrders=async(req,res)=>{
    try {

        const orders=await orderModel.find({})
        return res.json({success:true,message:'all orders',orders})
        
    } catch (error) {
        return res.json({success:false,message:error.message})
    }
}
const userOrders=async(req,res)=>{
    try {

        const {userId}=req.body;
        const orders=await orderModel.find({userId})

        return res.json({success:true,message:'get user orders',orders})

        
        
    } catch (error) {
        return res.json({success:false,message:error.message})
    }
}

const updateSatuts=async(req,res)=>{
    try {
  
        const {orderId,status}=req.body;

        await orderModel.findByIdAndUpdate(orderId,{status})
        res.json({success:true,message:'updated'})

        
    } catch (error) {
        return res.json({success:false,message:error.message})
    }
}


export {placeOrderCODmethod,placeOrderStripe,placeOrderRazorpay,allOrders,userOrders,updateSatuts,verifyStripe}