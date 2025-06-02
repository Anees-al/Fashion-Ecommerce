import React from 'react'
import { assets } from '../assets/asset'

const Ourpolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-2'>
       <div>
         <img src={assets.exchange_icon} className='w-12 m-auto mb-5' />
         <p className='font-semibold'>Easy exchange policy</p>
         <p className='text-gray-600'>We offer hassle free exchange policy</p>
       </div>
       <div>
         <img src={assets.quality_icon} className='w-12 m-auto mb-5' />
         <p className='font-semibold'>7 Day return policy</p>
         <p className='text-gray-600'>We provide 7 day return policy</p>
       </div>
       <div>
         <img src={assets.support_img} className='w-12 m-auto mb-5' />
         <p className='font-semibold'>Best support team</p>
         <p className='text-gray-600'>We have 24 hours support team</p>
       </div>
    </div>
  )
}

export default Ourpolicy
