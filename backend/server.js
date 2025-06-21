import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDb from './config/database.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './Routes/userRouter.js';
import prouductRouter from './Routes/productRoutes.js';
import cartRouter from './Routes/cartroute.js';
import orderRouter from './Routes/orderRouter.js';



const app=express();
const port=process.env.PORT||4000;
const DATABASE_URL=process.env.DATABASE_URL

app.use(express.json())
app.use(cors())


app.use('/api/user',userRouter)
app.use('/api/product',prouductRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)

connectDb(DATABASE_URL);
connectCloudinary()


app.get('/',(req,res)=>{n
    res.send('Api working sucefuly')
})


app.listen(port,()=>{
 console.log(`the server is running in the port ${port} sucessfully`)
})