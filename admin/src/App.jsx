import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import {Route ,Routes} from 'react-router-dom'
import Login from './components/Login'
import List from './pages/List'
import Order from './pages/Orders'
import Add from './pages/Add'
 import { ToastContainer } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css'



 export const backendurl=import.meta.env.VITE_BACKEND_URL



const App = () => {
  const[token,setToken]=useState(localStorage.getItem('token')?localStorage.getItem('token'):'')

  useEffect(()=>{
    localStorage.setItem('token',token)
  },[token])


  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer toastStyle={{fontFamily:'monospace'}}/>
      {token === ""? <Login setToken={setToken}/> :
      <>
      <Navbar setToken={setToken} />
    <hr />
    <div className='flex w-full'>
        <Sidebar/>

        <div className='mx-6 ml-[max(5vm,25px) my-4 text-gray-600 text-base w-full'>
         <Routes>
        
          <Route path='/list' element={<List token={token}/>} />
          <Route path='/order' element={<Order token={token}/>} />
          <Route path='/add' element={<Add token={token}/>} />
         </Routes>
        </div>
    </div>
    </> }
      
    </div>
  )
}

export default App
