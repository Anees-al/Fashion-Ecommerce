import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/asset'
import Newsletter from '../components/Newsletter'
const Contact = () => {
  return (
    <div>
        <div className='text-2xl text-center pt-8 border-t '>
       <Title text1={'Contact'} text2={'US'} />
    </div>
    <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img src={assets.contact_img} alt=""  className='w-full md:max-w-[480px]'/>
        <div className='flex flex-col justify-center items-start gap-4'>
          <p className='font-semibold text-xl text-gray-600'>Our store</p>
          <p className='text-gray-500 text-sm'>Fabrico main office Kazhakootam<br/>Thiruvanathapuram ,Kerala</p>
          <p className='text-gray-500'>(+91) 7025249503<br/>fabricostores@gmail.com</p>
         
          <p className='text-xl font-semibold text-gray-600'>Careers in fabrico</p>
           <p className='text-gray-500 text-sm'>learn more about our career option and job opening </p>
           <button className='text-sm px-4 py-2 bg-gray-800 text-white rounded hover:bg-black'>Explore jobs</button>
          

        </div>
    </div>
    <Newsletter/>
    
    </div>
  )
}

export default Contact
