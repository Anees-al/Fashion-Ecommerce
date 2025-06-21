import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartAnount from '../components/CartAnount'
import { assets } from '../assets/asset'
import { ShopContext } from '../context/Shopcontent'
import axios from 'axios'
import { toast } from 'react-toastify'



const PlaceOrder = () => {

  

  const{navigate,backendurl,token,cartItem,setCartItem,deliver_fee,products,getcartAmount}=useContext(ShopContext);


  const [method,setmethod]=useState('cod');
  const [formdata,setformdata]=useState({
    firstName:'',
    lastname:'',
    email:'',
    street:'',
    state:'',
    city:'',
    zipcode:'',
    country:'',
    phone:''
  })

   const changehandler=(e)=>{
          const name=e.target.name
          const value=e.target.value


          setformdata(data=>({...data,[name]:value}))
   }


   const submithandler=async(e)=>{
      e.preventDefault();
         try {
          let orderItems=[];
          console.log(cartItem)

          for(const items in cartItem){
            for(const item in cartItem[items]){
              if(cartItem[items][item]>0){
                const itemInfo=structuredClone(products.find(product => product._id === items));
                
                if(itemInfo){
                  itemInfo.size=item;
                  itemInfo.quantity=cartItem[items][item];
                  orderItems.push(itemInfo);
                }
              }
            }
          }
     console.log(orderItems)
          let orderdata={
            address:formdata,
            items:orderItems,
            amount:getcartAmount()+deliver_fee,
            
            
            
          }
          


          switch(method){
            case 'cod':
              const response=await axios.post(backendurl+'/api/order/place',orderdata,{headers:{token}})
              
              if(response.data.success){
                setCartItem({});
                navigate('/orders')
              }else{
                toast.error(response.data.message)
              }
              break;

              case 'stripe':
                const respontStripe= await axios.post(backendurl+'/api/order/stripe',orderdata,{headers:{token}});
                if(respontStripe.data.success){
                  const {session_url}=respontStripe.data
                  window.location.replace(session_url)
                  
                }else{
                  toast.error(respontStripe.data.message)
                }
                break;
            default:
              break;
          }
         } catch (error) {
           console.log(error)
         }

   }



  return (
    <form  onSubmit={submithandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]'>
       <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
          <div className='text-5xl sm:text-2xl my-7'>
             <Title text1={'Delivery'} text2={'Information'}/>
          </div>
          <div className='flex gap-3'>
            <input required  onChange={changehandler} name='firstName' value={formdata.firstName} type="text"  className='border border-gray-300 py-1.5 px-3.5 w-full' placeholder='First Name'/>
            <input required onChange={changehandler} name='lastname' value={formdata.lastname} type="text"  className='border border-gray-300 py-1.5 px-3.5 w-full' placeholder='Last name'/>
          </div>
          <input required type="email" onChange={changehandler} name='email' value={formdata.email}  className='border border-gray-300 py-1.5 px-3.5 w-full' placeholder='Email Address'/>
          <input required type="text" onChange={changehandler} name='street' value={formdata.street}  className='border border-gray-300 py-1.5 px-3.5 w-full' placeholder='Street'/>
           <div className='flex gap-3'>
            <input required type="text" onChange={changehandler} name='city' value={formdata.city}  className='border border-gray-300 py-1.5 px-3.5 w-full' placeholder='City'/>
            <input required type="text" onChange={changehandler} name='state' value={formdata.state} className='border border-gray-300 py-1.5 px-3.5 w-full' placeholder='State'/>
          </div>
          <div className='flex gap-3'>
            <input required type="number" onChange={changehandler} name='zipcode' value={formdata.zipcode}  className='border border-gray-300 py-1.5 px-3.5 w-full' placeholder='Zip code'/>
            <input required type="text" onChange={changehandler} name='country' value={formdata.country}  className='border border-gray-300 py-1.5 px-3.5 w-full' placeholder='Country'/>
          </div>
          <input required onChange={changehandler} name='phone' value={formdata.phone} type="number"  className='border border-gray-300 py-1.5 px-3.5 w-full' placeholder='Phone number'/>
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
                  <button  type='submit' className='bg-black text-white text-sm py-3 px-5 mt-5 rounded-lg shadow '>Place the order</button>
                  </div>
                  
               </div>
             </div>
       </div>
    </form>
  )
}

export default PlaceOrder
