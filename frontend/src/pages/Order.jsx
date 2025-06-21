import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/Shopcontent'
import Title from '../components/Title';

import axios from 'axios';

const Order = () => {
  const {currency,backendurl,token}=useContext(ShopContext);
  const [orderdata,setorderdata]=useState([]);

  const loaderdata=async()=>{
    try {
      if(!token){
        return null
      }

      const response=await axios.post(backendurl+'/api/order/userorder',{},{headers:{token}});
      console.log(response.data)
      if(response.data.success){
        let allorders=[];
        response.data.orders.map((order)=>{
          order.items.map((item)=>{
            item['status']=order.status,
            item['payment']=order.payment,
            item['paymentMethod']=order.paymentMethod,
            item['date']=order.date
            allorders.push(item)
          })
        })
        setorderdata(allorders)
      }
      
    } catch (error) {
      
    }
  }

  useEffect(()=>{
   loaderdata()
  },[token])

  return (
    <div className='border-t pt-14'>
       <div className='text-2xl'>
          <Title text1={'My'} text2={'Orders'}/>
       </div>
       <div>
        {
          orderdata.map((item,index)=>(
            <div className='py-4 border-t border-b text-gray-500  flex flex-col md:flex-row md:items-center md:justify-between gap-4' key={index}>
              <div className='flex items-start gap-6 text-sm'>
                  <img src={item.image[0]} className='w-16  sm:w-20'/>
                  <div>
                    <p className='font-medium sm:text-base'>{item.name}</p>
                    <div className='flex items-center gap-3 mt-3 text-base text-gray-700'>
                        <p>{currency}{item.price}</p>
                        
                        <p>Quantity:{item.quantity}</p>
                        <p>Size:m</p>
                    </div>
                    <p className='mt-6'>DATE:<span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                     <p className='mt-6 '>Payment:<span className='text-gray-400 ml-1'>{item.paymentMethod}</span></p>
                  </div>
              </div>
               <div className='md:w-1/2 flex justify-between'>
                 <div className='flex items-center gap-4'>
                   <p className='min-w-2 h-2 rounded-full bg-green-700'></p>
                   <p className='text-sm md:text-base'>{item.status}</p>
                 </div>
               </div>
               <button onClick={loaderdata} className='border px-3 py-2 rounded-md shadow font-medium text-sm bg-blue-600 text-white'>Track your Order</button>
            </div>
          ))
        }
       </div>
    </div>
  )
}

export default Order
