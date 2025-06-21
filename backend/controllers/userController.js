import userModel from "../model/userModel.js";
import validator from 'validator'
import bycrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const createtoken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

//user login
const loginUser=async(req,res)=>{

    try {
        const {email,password}=req.body;

        const user=await userModel.findOne({email});

        if(!user){
            res.json({success:false,message:'user doest exist'})
        }

        const isMatch=await bycrypt.compare(password,user.password);
        if (isMatch) {
            const token=createtoken(user.id);
             return res.json({success:true,token,message:'login succesfully'})
        }else{
            return res.json({success:false,message:'Invalid'})
        }


    } catch (error) {
       console.log(error) 
       return res.json({success:false,message:error.message}) 
    }

}


//register user
const registerUser=async(req,res)=>{
   try{
   const {name,email,password}=req.body;

   const exist= await userModel.findOne({email})

   if(exist){
    return res.json({success:false,message:"user already exists"})
   }

   if(!validator.isEmail(email)){
    return res.json({success:false,message:"please enter a valid email"});
   }


   if(password.length<8){
    return res.json({success:false,message:"please enter a strong password"})
   }

   const salt=await bycrypt.genSalt(10)
   const hashPassword=await bycrypt.hash(password,salt)


   const newUser=new userModel({
    name,
    email,
    password:hashPassword,
   })

   const user=await newUser.save()

   const token=createtoken(user.id);
   return res.json({success:true,token})
   }catch(error){
     console.log(error);
     return res.json({success:false,message:error.message})
   }
}
// admin login
const adminlogin=async(req,res)=>{
  try {
     const {email,password}=req.body;
   if(email===process.env.ADMIN_EMAIL  && password === process.env.ADMIN_PASSWORD){
    const token=jwt.sign(email+password,process.env.JWT_SECRET);
    return res.json({success:true,token})
  }  else{
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
    
  }
  }catch(error) {
     console.log(error) 
       return res.json({success:false,message:error.message})
   }
}


export {loginUser,registerUser,adminlogin}