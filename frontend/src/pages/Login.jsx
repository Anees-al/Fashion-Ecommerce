import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/Shopcontent'
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const[currentstate,setCurrentstate]=useState('login')
  const {token,settoken,backendurl,navigate}=useContext(ShopContext);

  const [name,setName]=useState('');
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');

  const handleSubmt=async(e)=>{
    e.preventDefault()
    try {
      if(currentstate==='sign up'){
        const responce=await axios.post(backendurl+'/api/user/register',{name,email,password });
        console.log(responce.data)
        if(responce.data.success){
          settoken(responce.data.token);
          localStorage.setItem('token',responce.data.token);
        }else{
          toast.error(responce.data.message);
        }
      }else{
        const responce=await axios.post(backendurl+'/api/user/login',{email,password });
        console.log(responce.data)
        if(responce.data.success){
          settoken(responce.data.token);
          localStorage.setItem('token',responce.data.token);
          navigate('/')
        }else{
          toast.error(responce.data.message);
        }
      }
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong');
    }
  }
    useEffect(()=>{
    if(token){
      navigate('/')
    }
    },[token])

  return (
    <form onSubmit={handleSubmt} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline items-center gap-2 mb-2 mt-10'>
         <p className='prata-regular text-3xl'>{currentstate}</p>
         
      </div>
      {currentstate==='login'?'':<input onChange={(e)=>setName(e.target.value)} value={name} type="text" className='w-full px-3 py-1 border border-gray-800' placeholder='Name'  required/>}
      <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" className='w-full px-3 py-1 border border-gray-800' placeholder='Email'  required/>
      <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" className='w-full px-3 py-1 border border-gray-800' placeholder='password' required/>
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
           <p className='cursor-pointer'>Forget password?</p>
           {
            currentstate==='login'?<p onClick={()=>setCurrentstate('sign up')} className='cursor-pointer'>Creat an account</p>:<p onClick={()=>setCurrentstate('login')} className='cursor-pointer'>Login here</p>
           }
          
      </div>
       <button className='bg-black text-white border px-8 mt-4  py-2 text-sm rounded-md'>{currentstate==='login'?'Sign In':'Sign Up'}</button>
    </form>
    
  )
}

export default Login
