import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartAnount from '../components/CartAnount'
import { assets } from '../assets/asset'
import { ShopContext } from '../context/Shopcontent'


const PlaceOrder = () => {

  const{navigate}=useContext(ShopContext);


  const [method,setmethod]=useState('cod');
  return (
    <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]'>
       <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
          <div className='text-5xl sm:text-2xl my-7'>
             <Title text1={'Delivery'} text2={'Information'}/>
          </div>
          <div className='flex gap-3'>
            <input type="text"  className='border border-gray-300 py-1.5 px-3.5 w-full' placeholder='First Name'/>
            <input type="text"  className='border border-gray-300 py-1.5 px-3.5 w-full' placeholder='Last name'/>
          </div>
          <input type="email"  className='border border-gray-300 py-1.5 px-3.5 w-full' placeholder='Email Address'/>
          <input type="text"  className='border border-gray-300 py-1.5 px-3.5 w-full' placeholder='Street'/>
           <div className='flex gap-3'>
            <input type="text"  className='border border-gray-300 py-1.5 px-3.5 w-full' placeholder='City'/>
            <input type="text"  className='border border-gray-300 py-1.5 px-3.5 w-full' placeholder='State'/>
          </div>
          <div className='flex gap-3'>
            <input type="number"  className='border border-gray-300 py-1.5 px-3.5 w-full' placeholder='Zip code'/>
            <input type="text"  className='border border-gray-300 py-1.5 px-3.5 w-full' placeholder='Country'/>
          </div>
          <input type="number"  className='border border-gray-300 py-1.5 px-3.5 w-full' placeholder='Phone number'/>
       </div>
       {/* right side */}
       <div className='mt-8'>
             <div className='mt-8 min-w-80'>
               <CartAnount/>
               <div className='mt-12'>
                  <Title text1={'PAYMENT'} text2={'METHOD'}/>

                  <div className='flex gap-3 flex-col lg:flex-row'>
                    <div onClick={()=>setmethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                      <p  className={`min-w-3.5 h-3.5 border rounded-full ${ method==='stripe'?'bg-green-700':''} `}></p>
                      <img  className='h-5 mx-4' src={assets.stripe_logo} alt="" />
                    </div>
                    <div onClick={()=>setmethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                      <p  className={`min-w-3.5 h-3.5 border rounded-full ${ method==='razorpay'?'bg-green-700':''} `}></p>
                      <img  className='h-5 mx-4' src={assets.razor_pay} alt="" />
                    </div>
                    <div onClick={()=>setmethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                      <p className={`min-w-3.5 h-3.5 border rounded-full  ${ method==='cod'?'bg-green-700':''} `}></p>
                      <p>CASH ON DELIVERY</p>
                    </div>
                  </div>
                  <div className='w-full text-end mt-6'>
                  <button onClick={()=>navigate('/orders')} className='bg-black text-white text-sm py-3 px-5 mt-5 rounded-lg shadow '>Place the order</button>
                  </div>
                  
               </div>
             </div>
       </div>
    </div>
  )
}

export default PlaceOrder
