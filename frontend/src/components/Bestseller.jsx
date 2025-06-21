import  { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/Shopcontent'
import Title from './Title';
import ProductItem from './ProductItem';

const Bestseller = () => {

    const {products}=useContext(ShopContext);
    const [bestseller,setBestseller]=useState([]);

   useEffect(()=>{
      const bestproducts=products.filter((item)=>(item.bestseller))
      setBestseller(bestproducts.slice(0,5))
   },[products])
    
  return (
    <div className='my-10'>
        <div className='text-center text-3xl py-8'>
         <Title text1={'BEST'} text2={'SELLERS'}/> 
          <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 '>Discover the latest trends in men's fashion with our exclusive online collection, updated for every season.
</p>  


        </div>
         <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 '>
         {
            bestseller.map((item,index)=>(
                <ProductItem  key={index} _id={item._id} image={item.image} name={item.name} price={item.price}/>
            ))
         }
      </div>

      
    </div>
  )
}

export default Bestseller
