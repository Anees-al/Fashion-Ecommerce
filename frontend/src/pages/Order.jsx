import React, { useContext } from 'react'
import { ShopContext } from '../context/Shopcontent'
import Title from '../components/Title';

const Order = () => {
  const {products,currency}=useContext(ShopContext);

  return (
    <div className='border-t pt-14'>
       <div className='text-2xl'>
          <Title text1={'My'} text2={'Orders'}/>
       </div>
       <div>
        {
          products.slice(0,4).map((item,index)=>(
            <div className='py-4 border-t border-b text-gray-500  flex flex-col md:flex-row md:items-center md:justify-between gap-4' key={index}>
              <div className='flex items-start gap-6 text-sm'>
                  <img src={item.image[0]} className='w-16  sm:w-20'/>
                  <div>
                    <p className='font-medium sm:text-base'>{item.name}</p>
                    <div className='flex items-center gap-3 mt-3 text-base text-gray-700'>
                        <p>{currency}{item.price}</p>
                        <p>Quantity:1</p>
                        <p>Size:m</p>
                    </div>
                    <p className='mt-6'>DATE:<span className='text-gray-400'>24.july.2025</span></p>
                  </div>
              </div>
               <div className='md:w-1/2 flex justify-between'>
                 <div className='flex items-center gap-4'>
                   <p className='min-w-2 h-2 rounded-full bg-green-700'></p>
                   <p className='text-sm md:text-base'>Ready to ship</p>
                 </div>
               </div>
               <button className='border px-3 py-2 rounded-md shadow font-medium text-sm bg-blue-600 text-white'>Track your Order</button>
            </div>
          ))
        }
       </div>
    </div>
  )
}

export default Order
