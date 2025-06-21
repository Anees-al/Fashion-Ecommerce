import userModel from "../model/userModel.js";

const addcart=async(req,res)=>{

   
    try {
     const {userId,itemId,size}=req.body;
     const userData=await userModel.findById(userId);

     let cartData=   await userData.cartData;

     if(cartData[itemId]){
        if(cartData[itemId][size]){
            cartData[itemId][size] += 1;
        }else{
            cartData[itemId][size] = 1;
        }
    }else{
        cartData[itemId]={};
        cartData[itemId][size]=1;
    }
    await userModel.findByIdAndUpdate(userId,{cartData:cartData});
    return res.json({success:true,message:'Cart updated successfully'});
    } catch (error) {
         return res.json({success:false,message:error.message})
    }
}


const updatecart=async(req,res)=>{
    try {
        const {userId,itemId,size,quantity}=req.body;
     const userData=await userModel.findById(userId);

     let cartData=   await userData.cartData;
     cartData[itemId][size] = quantity;
     

     await userModel.findByIdAndUpdate(userId,{cartData:cartData});
     return res.json({success:true,message:'updated correctly'})


        
    } catch (error) {
         res.json({success:false,message:error.message})
    }
}



const getusercart=async(req,res)=>{
    try {

        const{userId}=req.body;
        const userData=await userModel.findById(userId);
         let cartData=   await userData.cartData;


         return res.json({success:true,cartData})

        
    } catch (error) {
        return res.json({success:false,message:error.message})
        
    }
}



export {addcart,updatecart,getusercart}