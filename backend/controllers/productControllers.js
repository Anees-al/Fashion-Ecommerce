import {v2 as cloudinary} from'cloudinary'
import productModel from '../model/productdb.js';
// for adding product
const addProduct=async(req,res)=>{
    try {
         const {name,description,price,category,subcategory,size,bestseller}=req.body;
         const image1= req.files.image1 && req.files.image1[0]
         const image2= req.files.image2 && req.files.image2[0]
         const image3= req.files.image3 && req.files.image3[0]
         const image4= req.files.image4 && req.files.image4[0]


         const images=[image1,image2,image3,image4].filter((items)=>items != undefined)


         let imageUrl=await Promise.all(
            images.map(async(item)=>{
                let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'})
                return result.secure_url;
            })
         )
         


         console.log(name,description,price,category,subcategory,size,bestseller);
         console.log(imageUrl);

         const productData={
            name,
            description,
            price,
            image:imageUrl,
            category,
            subcategory,
            size:JSON.parse(size),
            date:Date.now(),
            bestseller: bestseller === 'true' || bestseller === true 
            }


            console.log(productData);

            const product=new productModel(productData);
            await product.save();
          res.json({success:true,message:'product added'})
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:error.message})
    }
}


// for listing product
const listProduct=async(req,res)=>{
    try {
         const product=await productModel.find({});
         console.log(product)
          res.json({success:true,product})
    } catch(error) {

        console.log(error);
        return res.json({success:false,message:error.message});
        
    }
}


// for removing product
const removeProduct=async(req,res)=>{
    try { 

        await productModel.findByIdAndDelete(req.body.id)
        return res.json({success:true,message:'successfully removed'})
        
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:error.message});
    }
}

// for single product
const singleProduct=async(req,res)=>{
    try {
        const {productId}=req.body;
        const product=await productModel.findById(productId);
        return res.json({success:true,messege:'get the product succefully',product})
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:error.message});
    }
}




export {addProduct,listProduct,removeProduct,singleProduct}