import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import {backendurl} from '../App'
import { toast } from 'react-toastify'

const Add = ({token}) => {

  const [image1,setimage1]=useState(false);

  const [image2,setimage2]=useState(false);
  const [image3,setimage3]=useState(false);   
  const [image4,setimage4]=useState(false);
  const [name ,setname]=useState('');
  const [description ,setdescription]=useState('');
  const [price ,setprice]=useState('');
  const [category ,setcategory]=useState('Shirts');
  const [subcategory ,setsubcategory]=useState('Topper');
  const [size ,setsize]=useState([]);
  const [bestsellers ,setbestsellers]=useState(false);


  const handleSubmiter=async(e)=>{
     e.preventDefault()
      try {
         const formData= new FormData();
          image1 && formData.append('image1',image1);  
          image2 && formData.append('image2',image2);
          image3 && formData.append('image3',image3);
          image4 && formData.append('image4',image4);


          formData.append('name',name);
          formData.append('description',description); 
          formData.append('price',price);
          formData.append('category',category); 
          formData.append('subcategory',subcategory);
          formData.append('size',JSON.stringify(size));
          formData.append('bestsellers',bestsellers);

           const response=await axios.post(`${backendurl}/api/product/add`,formData,{headers:{token}})
           console.log(response.data);

           if(response.data.success){
            toast.success(response.data.message);
            setimage1(false);
            setimage2(false);
            setimage3(false);
            setimage4(false);
            setname('');
            setdescription('');
            setprice('');
            setcategory('Shirts');
            setsubcategory('Topper');
            setsize([]);
            setbestsellers(false);
           }
            else{
            toast.error(response.data.message);
            }
      } catch (error) {
         console.log(error)
         toast.error(error.data.message || 'Something went wrong')
      }
  }



  return (
   <form onSubmit={handleSubmiter} >
    <div className='flex flex-col  w-full'>
      <p className='mb-2'>Upload image</p>
      <div className='flex gap-2'>
        <label htmlFor="image1">
          <img className='w-20 cursor-pointer'  src={!image1 ? assets.upload_area :URL.createObjectURL(image1)} alt="" />
           <input type='file'onChange={(e)=>setimage1(e.target.files[0])}  id='image1' className='hidden'/>
        </label>
        <label htmlFor="image2">
          <img className='w-20 cursor-pointer'  src={!image2?assets.upload_area:URL.createObjectURL(image2)} alt=""  />
           <input type='file' onChange={(e)=>setimage2(e.target.files[0])} id='image2' className='hidden'/>
        </label><label htmlFor="image3">
          <img  className='w-20 cursor-pointer' src={!image3?assets.upload_area:URL.createObjectURL(image3)} alt="" />
           <input type='file'onChange={(e)=>setimage3(e.target.files[0])}  id='image3' className='hidden'/>
        </label>
        <label htmlFor="image4">
          <img  className='w-20 cursor-pointer'  src={!image4?assets.upload_area:URL.createObjectURL(image4)} alt="" />
           <input type='file' onChange={(e)=>setimage4(e.target.files[0])}  id='image4' className='hidden'/>
        </label>

      </div>
    </div>

    <div className='w-full mt-10'>
      <p className='mb-2'>Product name</p>
      <input type="text"  onChange={(e)=>setname(e.target.value)} value={name} placeholder= 'name of the product' className='w-full max-w-[500px] px-3 py-2' />
    </div>


    <div className='w-full mt-10'>
      <p className='mb-2'>Product description</p>
      <textarea type="text" onChange={(e)=>setdescription(e.target.value)} value={description} placeholder= 'description of the product' className='w-full max-w-[500px] px-3 py-2' />
    </div>


    <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-6'>
      <div>
        <p>Select category</p>
        <select  onChange={(e)=>setcategory(e.target.value)} className='w-full px-3 py-2 sm:w-[120px] '>
          <option value="Shirts">Shirt</option>
          <option value="Pants">Pants</option>
          <option value="Tshirts">Tshirts</option>
        </select>
      </div>


      <div>
        <p>Select Subcategory</p>
        <select onChange={(e)=>setsubcategory(e.target.value)}  className='w-full px-3 py-2 sm:w-[120px]'>
          <option value="Shirts">Topper</option>
          <option value="Pants">Lower</option>
          
        </select>
      </div>


      <div>
        <p>Product price</p>
        <input onChange={(e)=>setprice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="number" placeholder='1000' />
      </div>
    </div>

    <div >
      <p>product size</p>
      <div className='flex gap-3'>
        <div onClick={()=>setsize(prev => prev.includes('S')?prev.filter(item => item !== 'S'):[...prev,'S'])}>
          <p className={`${size.includes('S')?'bg-gray-900 text-white':'bg-slate-200'} px-3 py-1 cursor-pointer`} >S</p>
        </div>

        <div onClick={()=>setsize(prev => prev.includes('M')?prev.filter(item => item !== 'M'):[...prev,'M'])}>
          <p className={`${size.includes('M')?'bg-gray-900 text-white':'bg-slate-200'} px-3 py-1 cursor-pointer`} >M</p>
        </div>


        <div onClick={()=>setsize(prev => prev.includes('L')?prev.filter(item => item !== 'L'):[...prev,'L'])}>
          <p className={`${size.includes('L')?'bg-gray-900 text-white':'bg-slate-200'} px-3 py-1 cursor-pointer`} >L</p>
        </div>


        <div onClick={()=>setsize(prev => prev.includes('XL')?prev.filter(item => item !== 'XL'):[...prev,'XL'])}>
          <p className={`${size.includes('XL')?'bg-gray-900 text-white':'bg-slate-200'} px-3 py-1 cursor-pointer`}>XL</p>
        </div>
      </div>
    </div>


    <div className='flex gap-2 mt-6'>
      <input onChange={()=>setbestsellers(prev => !prev)} checked={bestsellers} type="checkbox" id='bestsellers' />
      <label  htmlFor="bestsellers">Add to best sellers</label>
    </div>


    <button className='px-3 py-2 text-white bg-black mt-4 rounded-md shadow'>Add</button>
   </form>
  )
}

export default Add
