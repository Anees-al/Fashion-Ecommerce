import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/Shopcontent'
import Title from './Title';
import { useEffect } from 'react';
import ProductItem from './ProductItem';

const Latestcollection = () => {


    const {products}=useContext(ShopContext);
    const [latestproduct,setlatestproduct]=useState([])
    
    
    useEffect(()=>{
         setlatestproduct(products.slice(0,5))
    },[])
    
  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={'LATEST'} text2={'COLLECTION'}/>
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 '>Discover the latest trends in men's fashion with our exclusive online collection, updated for every season.
</p>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 '>
         {
            latestproduct.map((item,index)=>(
                <ProductItem  key={index} id={item.id} image={item.image} name={item.name} price={item.price}/>
            ))
         }
      </div>
    </div>
  )
}

export default Latestcollection
