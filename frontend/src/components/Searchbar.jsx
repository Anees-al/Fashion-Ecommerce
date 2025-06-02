import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/Shopcontent'
import { assets } from '../assets/asset'
import { useLocation } from 'react-router-dom';

const Searchbar = () => {


  const {search,setSearch,showSearch,setShowSearch}=useContext(ShopContext);
  const location=useLocation();
  const [vissible,setvisble]=useState(false)

  useEffect(()=>{
    if(location.pathname.includes('collection')){
       setvisble(true)
    }else{
        setvisble(false)
    }
  },[location])

  return showSearch && vissible ?  (
    <div className='border-t border-b bg-gray-50 text-center'>
       <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2 '>
          <input value={search} onChange={(e)=>setSearch(e.target.value)} className='flex-1 outline-none bg-inherit text-sm' type="text" placeholder='search' />
          <img src={assets.search_icon} alt="search-icon"  className='w-4'/>
       </div>
       <img src={assets.cross_icon} alt="cross-icon"  className='inline w-2 cursor-pointer'  onClick={()=>setShowSearch(false)}/>
    </div>
  ):null
}

export default Searchbar
