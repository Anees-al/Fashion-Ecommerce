import jwt from 'jsonwebtoken';
import 'dotenv/config'


const adminAuth=async(req,res,next)=>{
    try {
        const {token}=req.headers
        if(!token){
            return res.json({success:false,message:'not authorized'});

        }
        const token_code=jwt.verify(token,process.env.JWT_SECRET)
        if(token_code !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.json({success:false,message:'not authorized'});
        }
        next()
            
    } catch (error) {
         console.log(error) 
       return res.json({success:false,message:error.message}) 
    }
}


export default adminAuth;