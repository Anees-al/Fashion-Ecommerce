import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/Shopcontent'
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Verify = () => {
    const {navigate,backendurl,cartItem,token,setCartItem}=useContext(ShopContext);
    const [seachparams,setsearchparams]=useSearchParams()

    const success=seachparams.get('success');
    const orderId=seachparams.get('orderId');


    const verifypayment=async()=>{
        try {
            if(!token){
                return null;
            }
            const responce=await axios.post(backendurl+'/api/order/verifystripe',{success,orderId},{headers:{token}});
            if(responce.data.success){
                setCartItem({});
                navigate('/orders')
            }else{
                navigate('/cart')
            }

        } catch (error) {
            console.log(error);
            toast.error(responce.data.message)
        }
    }

    useEffect(()=>{
        verifypayment()
    },[token])
  return (
    <div>
      
    </div>
  )
}

export default Verify
