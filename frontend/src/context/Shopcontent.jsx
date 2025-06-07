import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { products } from "../assets/asset";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext=createContext();

 const ShopContextProvider=(props)=>{


    const currency='₹'
    const deliver_fee =50;
    const [search,setSearch]=useState('');
    const [showSearch,setShowSearch]=useState(false);
    const [cartItem,setCartItem]=useState({});
    const navigate= useNavigate();


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



   const updatequantity=async(itemid,size,quantity)=>{
           let cartData=structuredClone(cartItem);
           cartData[itemid][size]=quantity;

           setCartItem(cartData);
   }


   const getcartAmount=()=>{
    let totalamount=0;
    for(const items in cartItem){
        let itemInfo=products.find((product)=>product.id===items);
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


    
    

    const value={
        products,currency,deliver_fee,
        search,setSearch,showSearch,setShowSearch,
        cartItem,addCart,navigate,
        getCartCount,updatequantity,getcartAmount


    }



    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )

}

export default ShopContextProvider;