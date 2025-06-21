import React, { useEffect, useState } from "react";
import { createContext } from "react";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const ShopContext=createContext();

 const ShopContextProvider=(props)=>{


    const currency='₹'
    const deliver_fee =50;
    const backendurl=import.meta.env.VITE_BACKEND_URL
    const [search,setSearch]=useState('');
    const [showSearch,setShowSearch]=useState(false);
    const [cartItem,setCartItem]=useState({});
    const[products,setproduct]=useState([])
    const [token,settoken]=useState('')
    const navigate= useNavigate();


    const getProductData=async()=>{
        try {
            const responce=await axios.get(backendurl+'/api/product/list');
            console.log(responce.data)

            if(responce.data.success){
                setproduct(responce.data.product);
            }else{
                toast.error(responce.data.message);
            }
        } catch (error) {
            toast.error('Something went wrong');
        }

         }
    const getUsercart=async(token)=>{
            try {
                const responce=await axios.post(backendurl+'/api/cart/get',{},{headers:{token}})
                if(responce.data.success){
                    setCartItem(responce.data.cartData);
                }
            } catch (error) {
                toast.error('Something went wrong');
            }
        }



    useEffect(()=>{
        getProductData()
    },[])


    const addCart=async(itemId,size)=>{
         let cartData=structuredClone(cartItem);

         if(!size){
            toast.error('select the size')
            return
         }

         if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1;
            }else{
                 cartData[itemId][size] = 1;
            }
         }else{
            cartData[itemId]={};
            cartData[itemId][size]=1;
         }
         setCartItem(cartData)

         if(token){
            try{
                await axios.post(backendurl+'/api/cart/add',{itemId,size},{headers:{token}})
            }catch(error){
                 toast.error(error.message)
            }
         }
    }
   const getCartCount=()=>{
    let totalCount=0

    for(const items in cartItem){
        for(const item in cartItem[items]){
            try{
              if(cartItem[items][item]>0){
                totalCount += cartItem[items][item]
              }
            }catch(error){

            }
        }
    }
    return totalCount;
   }



   const updatequantity=async(itemId,size,quantity)=>{
           let cartData=structuredClone(cartItem);
           cartData[itemId][size]=quantity;

           setCartItem(cartData);

           if(token){
            try {
                await axios.post(backendurl+'/api/cart/update',{itemId,size,quantity},{headers:{token}});

            } catch (error) {
                toast.error(error.message)
            }
           }
   }


   const getcartAmount=()=>{
    let totalamount=0;
    for(const items in cartItem){
        let itemInfo=products.find((product)=>product._id===items);
         for(const item in cartItem[items]){
            try{
                if(cartItem[items][item]>0){
                    totalamount+=itemInfo.price*cartItem[items][item];

                }
            }catch(error){

            }
         }
   }
   return  totalamount;
}


    useEffect(()=>{
      if(!token && localStorage.getItem('token')){
        settoken(localStorage.getItem('token'));
        getUsercart(localStorage.getItem('token'))
      }
    },[])
        
    

    const value={
        products,currency,deliver_fee,
        search,setSearch,showSearch,setShowSearch,
        cartItem,addCart,navigate,setCartItem,
        getCartCount,updatequantity,getcartAmount,backendurl,
        token,settoken

    }



    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )

}

export default ShopContextProvider;