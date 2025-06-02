import React from 'react'
import { assets } from '../assets/asset'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 mt-40 my-10 text-sm'>
          <div>
            <img src={assets.fabrica_logo} alt="logo" className='mb-5 w-32' />
            <p className='w-full md:w-2/3 text-gray-500'>At Fabrico, we’re dedicated to redefining modern menswear with a focus on quality, fit, and timeless style. Whether you're upgrading your wardrobe or looking for everyday essentials, our curated collections are designed to keep you sharp and confident. Need help or style advice? Our support team is just a click away—and don’t forget to subscribe for exclusive drops, insider fashion tips, and members-only offers.</p>
          </div>
          <div>
            <p className='text-xl font-medium mb-6'>COMPANY</p>
            <ul className='flex flex-col gap-4 text-gray-400'>
                <li className='cursor-pointer'>Home</li>
                <li className='cursor-pointer'>About us</li>
                <li className='cursor-pointer'>Delivery</li>
                <li className='cursor-pointer'>Privacy policy</li>
            </ul>
          </div>
          <div>
            <p className='text-xl font-medium mb-6'>Get in touch</p>
            <ul className='flex flex-col gap-4 text-gray-400'>
                <li className='cursor-pointer'>+91 7777 8888 99</li>
                <li className='cursor-pointer'>fabrica@gmail.com</li>
                
            </ul>
          </div>
      </div>
      <div>
        <hr/>
        <p className='text-center text-xs py-5'>Copyrights 2024@ forever.com - All copyrights Reserved</p>
      </div>
      
    </div>
  )
}

export default Footer
