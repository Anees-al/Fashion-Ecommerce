import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/Shopcontent'
import { assets } from '../assets/asset'

const Product = () => {

  const {productId}=useParams()
  const {products,currency}=useContext(ShopContext);
  const [image, setImage]=useState('')
  const [size,setSize]=useState('')

  const[productData,setProductData]=useState(false);
  

  const fetchProductData=async()=>{
        products.map((items)=>{
          if(items.id===productId){
            setProductData(items);
            console.log(items)
            setImage(items.image[0])
            return null
          }
        })
  }


  useEffect(()=>{
      fetchProductData()
  },[productId,products])
  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in-out duration-500 opacity-100'>
       <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/* image*/}
        <div className='flex flex-col-reverse gap-3 sm:flex-row'>
            <div className='flex sm:flex-col  justify-between sm:justify-normal w-full sm:w-[18.7%]'>
               {
                productData.image.map((item,index)=>(
                  <img onClick={()=>setImage(item)}  src={item} key={index} className='w-[24%] sm:w-full sm:mb-3  flex-shrink-0 cursor-pointer'/>
                ))
               }
            </div>
            <div className='w-full sm:w-[70%]  '>
              <img src={image} className='w-full h-auto rounded shadow'/>
            </div>
        </div>
        <div className='flex-1'>
           <h1>{productData.name}</h1>
           <div className='flex items-center gap-1 mt-1'>
             <img src={assets.star_icon} alt="" className='w-3' />
             <img src={assets.star_icon} alt="" className='w-3'/>
             <img src={assets.star_icon} alt="" className='w-3'/>
             <img src={assets.star_icon} alt="" className='w-3'/>
             <img src={assets.star_icon} alt="" className='w-3'/>
             <p className='pl-2'>(123)</p>
           </div>
           <p className='text-3xl font-medium mt-6 text-red-800'>
            {currency}{productData.price}
           </p>
           <p className='text-gray-500 w-4/5 md:mt-5'>
            {productData.description}
           </p>
           <div className='flex flex-col gap-4 my-8'>
            <p>Select size</p>
          <div className='flex gap-2'>
            {
              productData.sizes.map((item,index)=>(
                <button onClick={()=>setSize(item)} className={`border py-2 px-4 bg-gray-100 hover:bg-gray-400 ${item === size ?'border-orange-400 text-white bg-gray-900':''}`} key={index}>{item}</button>
              ))
            }
          </div>

           </div>
           <button className='py-2 px-4 border bg-black text-white text-sm hover:bg-gray-700 active:bg-white active:text-black rounded shadow'>Add to cart</button>
           <hr className='mt-8 sm:w-4/5' />
           <div className='text-gray-600 text-sm mt-5 flex flex-col  gap-1'>
            <p>100% orginal product</p>
            <p>Cash on delivery availble for this product</p>
            <p> Easy return policy upto 7 days</p>
           </div>
        </div>

       </div>
       <div className='mt-20'>
           <div className='flex'>
            <b className='px-3 py-2 text-sm border'>Description</b>
            <p className='px-3 py-2 text-sm border'>Reviews(122)</p>

           </div>
           <div className='flex flex-col  gap-4 border px-6 py-6 text-sm text-gray-500'>
             <p>My fashion e-commerce website is a modern, user-friendly platform dedicated to delivering the latest trends in clothing, accessories, and lifestyle fashion to a global audience. Built with both style and technology in mind, the site offers a seamless shopping experience with detailed product listings, high-resolution images, easy navigation, and secure checkout options. Whether you're into streetwear, casual chic, or elegant evening styles, the collection is carefully curated to reflect current fashion movements and customer preferences. Behind the scenes, the site is powered by reliable inventory management, fast order processing, and responsive customer support.</p>
           </div>
       </div>
    </div>
  ):<div className='opacity-0'></div>
}

export default Product
