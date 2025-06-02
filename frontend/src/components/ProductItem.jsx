import React, { useContext } from 'react'
import { ShopContext } from '../context/Shopcontent'
import { Link } from 'react-router-dom';

const ProductItem = ({id,image,name,price}) => {
     
    const {currency}=useContext(ShopContext);

  return (
    <Link to={`/product/${id}`} className='text-gray-700'>
       <div className='overflow-hidden'>
          <img className='hover:scale-110 transition ease-in-out h-[360px] w-[600px]' src={image[0]} alt='image-product'/>
       </div>
       <p className='pt-3 pb-1 text-sm'>{name}</p>
       <p className='font-medium text-sm'>{currency}{price}</p>
    </Link>
  )
}

export default ProductItem
