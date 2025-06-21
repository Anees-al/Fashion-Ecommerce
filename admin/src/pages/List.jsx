import  { useState,useEffect } from 'react'
import axios from 'axios'
import { backendurl } from '../App'

import  {toast} from 'react-toastify'


const List = ({token}) => {


  const [list ,setlist]=useState([]);
  const fetchList = async()=>{
     try {
      const response = await axios.get(`${backendurl}/api/product/list`);
      setlist(response.data.product);
      

      if (response.data.success) {
        console.log(response.data.product);
      }else {
        toast.error(response.data.message);
      }

     } catch (error) {
       toast.error(error.message);
     }
  }
      

  useEffect(()=>{
    fetchList()
  },[])


  const remove=async(id)=>{
    try {
      const response=await axios.post(backendurl+'/api/product/remove',{id},{headers:{token}})
      if(response.data.success){
        toast.success(response.data.message);
        await fetchList();
      }else{
        toast.error(error.message);
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  return(
     <div>
         <p>ALL PRODUCT LIST</p>
         <div className='flex flex-col'>
             <div className=' hidden md:grid  px-2 py-1 bg-gray-300 grid-cols-[1fr_2fr_1fr_1fr_1fr] items-center'>
               <b>Images</b>
               <b>Name</b>
               <b>Category</b>
               <b>Price</b>
               <b>Action</b>
             </div>
             {
  (list || []).map((item, index) => (
    <div key={index} className='px-2 py-1 bg-gray-100 grid grid-cols-[1fr_2fr_1fr_1fr_1fr] items-center gap-4'>
    <img className='w-12' src={item.image[0]} alt="" />
    <p>{item.name}</p>
    <p>{item.description}</p>
    <p>{item.price}</p>
    <p className=' cursor-pointer text-lg' onClick={()=>remove(item._id)}>X</p>
    </div>
  ))
}


         </div>

         
     </div>
  )
}

export default List
