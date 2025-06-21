import jwt from 'jsonwebtoken';
import 'dotenv/config'


const authUser=async(req,res,next )=>{

    const {token}= req.headers;
    if(!token){
        return res.json({success:false,message:'No token provided, please login again'});
    }
    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.body.userId= decoded.id;

        next();
    } catch (error) {
        return res.status(401).json({success:false,message:'Invalid token, please login again'});
    }
}


export default authUser;