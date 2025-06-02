import React from 'react'
import { assets } from '../assets/asset'

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row border border-gray-600'>
        <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
        <div className='text-[#414141]'>
          <div className='flex items-center gap-2'>
             <p className=' w-8 md:w-11 bg-[#414141] h-[2px]'></p>
             <p className='prata-regular font-medium text-sm md:text-base tracking-wide'>OUR BESTSELLERS</p>
          </div>
          <h1 className='prata-regular text-3xl lg:text-5xl sm:py-3 leading-relaxed'>Latest Arrivals</h1>
          <div className='flex items-center gap-2'>
            <p className='prata-regular font-medium text-sm md:text-base'>Shop now</p>
            <p className='w-8 md:w-11 bg-[#414141] h-[2px]'></p>
          </div>
        </div>

        </div>
        <img src={assets.fashion_hero} className='w-full sm:w-1/2' />
      
    </div>
  )
}

export default Hero
