import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/Shopcontent'
import Title from '../components/Title';
import { assets } from '../assets/asset';
import CartAnount from '../components/CartAnount';

const Cart = () => {

const {products,currency,cartItem,updatequantity,navigate}=useContext(ShopContext);
const [cardData,setCardData]=useState([]);

useEffect(()=>{

  if(products.length>0){
    const tempData=[];
      for(const items in cartItem){
        for(const item in cartItem[items]){
          if(cartItem[items][item]>0){
            tempData.push({
              _id:items,
              size:item,
              quantity:cartItem[items][item]
            })
          }
        }
      }
      console.log(tempData)
      setCardData(tempData)

  }
      
},[cartItem,products])
  return (
    <div className='border-t pt-14'>
       <div className='text-2xl mb-3'>
           <Title text1={'Your'} text2={'Cart'}/>
       </div>

       <div>
        {
          cardData.map((item,index)=>{
            const productData=products.find((products)=>products._id===item._id)

            return(
              <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                  <div className='flex items-start gap-6'>
                  <img src={productData.image[0]} className='w-16 sm:w-20'/>
                  <div>
                    <p className='sm:text-md font-medium text-sm'>{productData.name}</p>
                    <div className='flex items-center gap-5'>
                          <p>{currency}{productData.price}</p>
                          <p className='px-2 sm:px-3 sm:py-1 bg-slate-50'>{item.size}</p>
                    </div>
                  </div>
                  <div>
                    
                  </div>
                  </div>
                  <input onChange={(e)=>e.target.value===''||e.target.value===0 ? null : updatequantity(item._id,item.size,Number(e.target.value))} type='number' className='border max-w-10 sm:max-w-20 px-1 px-2 py-2 text-center' min={1} defaultValue={item.quantity}/>
                  <img onClick={()=>updatequantity(item._id,item.size,0)} src={assets.bin_icon} alt=""  className='w-5 cursor-pointer'/>
                  
              </div>
            )
          })
        }
       </div>
      <div className='flex justify-end'>
           <div className='w-full sm:w-[450px]'>
               <CartAnount/>
               <div className='w-full text-end'>
                  <button onClick={()=>navigate('/place-order')}  className='bg-black text-white text-sm py-3 px-5 mt-5 rounded-lg shadow'>Proceed to checkout</button>
               </div>
           </div>
      </div>
    </div>
  )
}

export default Cart
