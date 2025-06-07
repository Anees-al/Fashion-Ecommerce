import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/Shopcontent'
import Title from './Title';
import ProductItem from './ProductItem';

const Relatedproduct = ({category,subCategory}) => {
    const {products}=useContext(ShopContext);
    const [relatedproduct,setrelatedproduct]=useState([]);

    useEffect(()=>{
       if(products.length > 0){
        let productcopy= products.slice()

        productcopy=productcopy.filter((items)=>category===items.category);
        productcopy=productcopy.filter((items)=>subCategory===items.subCategory);

          setrelatedproduct(productcopy.slice(0,5))
       }
    },[products])
  return (
    <div className='my-20'>
       <div className='text-center text-3xl py-2'>
         <Title text1={'Related'} text2={'Products'}/>
       </div>
       <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 '>
         {
            relatedproduct.map((item,index)=>(
                <ProductItem  key={index} id={item.id} image={item.image} name={item.name} price={item.price}/>
            ))
         }
      </div>
    </div>
  )
}

export default Relatedproduct
