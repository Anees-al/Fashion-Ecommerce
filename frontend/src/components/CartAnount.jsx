import React, { useContext } from 'react'
import { ShopContext } from '../context/Shopcontent'
import Title from './Title';

const CartAnount = () => {
    const {getcartAmount,currency,deliver_fee}=useContext(ShopContext);
  return (
    <div className='w-full'>
      <div className='text-2xl'>
         <Title text1={'Cart'} text2={'Amount'}/>
      </div>

      <div className='flex flex-col gap-2 mt-2 text-sm'> 
        <div className='flex justify-between '>
          <p>SubTotal</p>
          <p>{currency} {getcartAmount()}.00</p>
        </div>
        <hr/>
        <div className='flex justify-between'>
            <p>Shipping fee</p>
            <p>{currency}{deliver_fee}.00</p>
        </div>
        <hr/>
        <div className='flex justify-between'>
        <p>Total</p>
        <p className='text-red-800'>{currency}{getcartAmount()===0? 0:getcartAmount()+deliver_fee}.00</p>
        </div>
      </div>
    </div>
  )
}

export default CartAnount
