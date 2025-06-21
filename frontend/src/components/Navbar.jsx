import React, { useContext, useState } from 'react'
import { assets } from '../assets/asset'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/Shopcontent'

const Navbar = () => {
    const [visible,setvisble]=useState(false)
    const {setShowSearch,getCartCount,navigate,token,settoken,setCartItem}=useContext(ShopContext);


    const logout=()=>{
       localStorage.removeItem('token');
      settoken('');
      setCartItem({});
      navigate('/login');
     
    }
  return (
    <div className='flex justify-between items-center py-3 font-medium'>
   <Link to={'/'}>   <img src={assets.fabrica_logo} className='w-36'/></Link>

      <ul className='hidden sm:flex gap-5 text-sm text-gray-600'>
        <NavLink to='/' className='flex flex-col items-center gap-1 '>
        <p>HOME</p>
        <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>
         <NavLink to='/collection' className='flex flex-col items-center gap-1 '>
        <p>COLLECTION</p>
        <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden '/>
        </NavLink>
         <NavLink to='/about' className='flex flex-col items-center gap-1 '>
        <p>ABOUT</p>
        <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>
         <NavLink to='/contact'className='flex flex-col items-center gap-1 '>
        <p>CONTACT</p>
        <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>
      </ul>
      <div className='flex items-center  gap-6'>
        <img onClick={()=>setShowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer'/>
        <div className='group relative'>
        <img onClick={()=> token ? null : navigate('/login')} src={assets.user_icon} className='w-6 cursor-pointer' />
            {
              token && <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4 '>
               <div className='flex flex-col w-36 gap-2 py-3 px-5 bg-slate-100 text-gray-600'>
                <p className='cursor-pointer hover:text-black '>My profile</p>
                <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
               </div>
            </div>
            }
        </div>
        <Link to='/cart' className='relative'>
          <img src={assets.cart_icon} className='w-5 min-w-5'/>
          <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px] '>{getCartCount()}</p>
        </Link>
        <img src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' onClick={()=>setvisble(true)}/>
      </div>
      {/*sidebar menu*/}
      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? ' w-full ': ' w-0 '} `}>
        <div className='flex flex-col text-gray-600'>
         <div className='flex items-center gap-3 p-3 cursor-pointer' onClick={()=>setvisble(false)}>
           <img src={assets.left_arrow}/>
           <p>Back</p>
         </div>
         <NavLink to='/' onClick={()=>setvisble(false)} className='py-2 pl-6 border hover:text-black hover:bg-gray-300'>HOME</NavLink>
         <NavLink to='/about' onClick={()=>setvisble(false)} className='py-2 pl-6 border hover:text-black hover:bg-gray-300'>ABOUT</NavLink>
         <NavLink to='/collection' onClick={()=>setvisble(false)} className='py-2 pl-6 border hover:text-black hover:bg-gray-300' >COLLECTION</NavLink>
        <NavLink to='/contact'onClick={()=>setvisble(false)}  className='py-2 pl-6 border hover:text-black hover:bg-gray-300'>CONTACT</NavLink>
        </div>
      </div>
    </div>
  )
}

export default Navbar
