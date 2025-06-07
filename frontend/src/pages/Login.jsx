import React, { useState } from 'react'

const Login = () => {
  const[currentstate,setCurrentstate]=useState('login')
  return (
    <form className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline items-center gap-2 mb-2 mt-10'>
         <p className='prata-regular text-3xl'>{currentstate}</p>
         
      </div>
      {currentstate==='login'?'':<input type="text" className='w-full px-3 py-1 border border-gray-800' placeholder='Name'  required/>}
      <input type="email" className='w-full px-3 py-1 border border-gray-800' placeholder='Email'  required/>
      <input type="password" className='w-full px-3 py-1 border border-gray-800' placeholder='password' required/>
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
           <p className='cursor-pointer'>Forget password?</p>
           {
            currentstate==='login'?<p onClick={()=>setCurrentstate('sign in')} className='cursor-pointer'>Creat an account</p>:<p onClick={()=>setCurrentstate('login')} className='cursor-pointer'>Login here</p>
           }
          
      </div>
       <button className='bg-black text-white border px-8 mt-4  py-2 text-sm rounded-md'>{currentstate==='login'?'Sign In':'Sign Up'}</button>
    </form>
    
  )
}

export default Login
