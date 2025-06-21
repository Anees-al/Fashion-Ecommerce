import { useState } from 'react'
import { backendurl } from '../App';
import axios from 'axios'
import { toast } from 'react-toastify';

const Login = ({setToken}) => {

  const [email,setEmail]=useState('');
  const[password,setPassword]=useState('')

  const handleSubmit=async(e)=>{
    try {
       e.preventDefault()
       const responce= await axios.post(backendurl+'/api/user/adminlogin',{email,password})
       console.log(responce)
       if(responce.data.success){
        setToken(responce.data.token)
        toast.success('succefully loged in')
       }else{
        toast.error(responce.data.message)
       }
      

    } catch (error) {
       console.log(error)
       toast.error(error.message)
    }
  }
  return (
    <div className='flex justify-center items-center w-full min-h-screen'>
      <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
        <h1 className='mb-3 text-2xl font-bold'>Admin Panel</h1>
        <form onSubmit={handleSubmit}>
         
         <div className='mb-3 min-w-72'>
          <p className='text-sm font-medium text-gray-700'>Emial addresss</p>
          <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder='enter your email here'  className='rounded-md w-full px-3 py-2  border border-gray-600 outline-none'/>
         </div>

          <div>
          <p  className='text-sm font-medium text-gray-700'>Password</p>
          <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder='enter your password here'  className='rounded-md w-full px-3 py-2 border  border-gray-600 outline-none' />
         </div>
         <button className='w-full py-2 px-8 border border-gray-900 mt-2 rounded-md hover:bg-gray-300'>Login</button>

        </form>
      </div>
    </div>
  )
}

export default Login
