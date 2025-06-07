import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/asset'
import Newsletter from '../components/Newsletter'

const About = () => {
  return (
    <div>
    <div className='text-2xl text-center pt-8 border-t '>
       <Title text1={'ABOUT'} text2={'US'} />
    </div>
   <div className='my-10 flex flex-col md:flex-row gap-10'>
        <img src={assets.about_image} alt="" className='w-[420px]  ' />
        <div className='flex flex-col justify-center gap-6 text-gray-500 md:w-2/4'>
          <p>At Fabrico, we believe that men’s fashion should be effortless, confident, and always on point. Our mission is to redefine how modern men dress by offering a curated selection of timeless pieces, trend-forward styles, and everyday essentials—all in one place. Whether you're dressing for the boardroom, a night out, or a casual weekend, we’ve got you covered with high-quality apparel, footwear, and accessories designed to elevate your wardrobe. We focus on clean cuts, premium fabrics, and versatile designs that fit every lifestyle.</p>
          <p>Founded with a passion for style and substance, our team keeps a close eye on global fashion trends, street style culture, and classic tailoring. We’re more than just a clothing brand—we're a community that values individuality, confidence, and expression. From minimalist streetwear to refined formalwear, every item on our site is chosen to help you look good and feel great. Join us on a journey where fashion meets function, and where your personal style gets the spotlight it deserves.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>We’re here to make style simple, confident, and accessible for every man. Our mission is to blend comfort, quality, and modern design into pieces that fit real lives—whether you're at work, out on the town, or off-duty. By curating timeless looks with a fresh edge, we help you build a wardrobe that speaks for you, every day.</p>
        </div>
   </div>

   <div className='text-2xl py-4'>
    <Title text1={'WHY'} text2={'CHOOSE US'}/>
   </div>

   <div className='flex flex-col md:flex-row text-sm mb-20'>
       <div className='border px-10 md:px-16 py-8 flex flex-col sm:py-20 gap-5'>
          <b>Quality Assurence:</b>
          <p className='text-gray-600'>We’re committed to delivering style that lasts. Every item is carefully checked for quality, fit, and durability, crafted by trusted artners who share our high standards. From fabric to finish, we ensure each piece is made to feel great and stand the test of time.</p>
       </div>
       <div className='border px-10 md:px-16 py-8 flex flex-col sm:py-20 gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'>We’ve designed our shopping experience to be quick, easy, and hassle-free—from smooth navigation and secure checkout to fast delivery and simple returns.</p>
       </div>
       <div className='border px-10 md:px-16 py-8 flex flex-col sm:py-20 gap-5'>
          <b>Exceptional Customer service:</b>
          <p  className='text-gray-600'>Our support team is here to help every step of the way—friendly, fast, and ready to make your experience smooth and stress-free.</p>
       </div>
   </div>

   <Newsletter/>

    </div>
  )
}

export default About
