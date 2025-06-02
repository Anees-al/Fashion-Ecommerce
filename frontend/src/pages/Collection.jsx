import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/Shopcontent'
import { assets } from '../assets/asset';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';


const Collection = () => {

  const {products,search,showSearch}=useContext(ShopContext);
  const [showfilter,setShowfilter]=useState(false);
  const [filterproducts,Setfilterproducts]=useState([]);
  const [category,setCategory]=useState([]);
  const [subcategory,setSubCategory]=useState([]);
  const [sortType,setSortType]=useState('relevant');


  const toggleCategory=(e)=>{
    if(category.includes(e.target.value)){
      setCategory(prev=>prev.filter(items=>items!==e.target.value))
    }else{
      setCategory(prev=>[...prev,e.target.value])
    }
  }

const toggleSubCategory=(e)=>{
    if(subcategory.includes(e.target.value)){
      setSubCategory(prev=>prev.filter(items=>items !==e.target.value))
    }else{
      setSubCategory(prev=>[...prev,e.target.value])
    }
  }


const applyFilter=()=>{
  let productCopy=products.slice()

  if(search && showSearch){
    productCopy=productCopy.filter(items=>items.name.toLowerCase().includes(search.toLowerCase()))
  }

  if(category.length>0){
    productCopy=productCopy.filter(items=>category.includes(items.category))
  }  
  if(subcategory.length>0){
    productCopy=productCopy.filter(items=>subcategory.includes(items.subCategory))
  }  

  Setfilterproducts(productCopy)
}

 const sortProduct=()=>{
  let filterproductscopy=filterproducts.slice()

  switch(sortType){
    case 'low-high':Setfilterproducts(filterproductscopy.sort((a,b)=>(a.price-b.price)));
    break;

    case 'high-low':Setfilterproducts(filterproductscopy.sort((a,b)=>(b.price-a.price)));
    break;

    default:
      applyFilter();
      break;
  }
 }


  useEffect(()=>{
      applyFilter()
  },[category,subcategory,search,showSearch])


  useEffect(()=>{
     sortProduct( )
  },[sortType])

  return (
    <div className='flex flex-col sm:flex-row  gap-1 sm:gap-10 pt-10 border-t'>
    <div className='min-w-60 sticky top-24 self-start bg-stone-100 pt-3 px-5 py-3 rounded-md'>
        <p onClick={()=>setShowfilter(!showfilter)} className='text-xl flex items-center cursor-pointer gap-2 '>FILTERS</p>
        <img src={assets.left_arrow} className={`h-3 sm-hidden ${showfilter ? '-rotate-90':''}`}/>
        {/*category filter*/}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showfilter ?' ':'hidden'} sm:block`}>
           <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
           <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
               <p className='flex gap-2'>
                <input className='w-3' type='checkbox' value={'Shirts'} onChange={toggleCategory}/>Shirts
               </p>
               <p className='flex gap-2'>
                <input className='w-3' type='checkbox' value={'Tshirts'} onChange={toggleCategory}/>Tshirts
               </p>
               <p className='flex gap-2'>
                <input className='w-3' type='checkbox' value={'Pants'} onChange={toggleCategory}/>Pants
               </p>
           </div>
        </div>
        {/*sub categoery*/}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showfilter ?' ':'hidden'} sm:block`}>
           <p className='mb-3 text-sm font-medium'>Sub categories</p>
           <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
               <p className='flex gap-2'>
                <input className='w-3' type='checkbox' value={'Topwear'} onChange={toggleSubCategory}/>Top wear
               </p>
               <p className='flex gap-2'>
                <input className='w-3' type='checkbox' value={'Bottomwear'} onChange={toggleSubCategory}/>Bottom wear
               </p>
              
           </div>
        </div>
      </div>

      {/*right side*/}

      <div className='flex-1'>
       <div className='flex justify-between text-base sm:text-2xl nb-4'>
        <Title text1={'All'} text2={'Collections'}/>


        <select onChange={(e)=>setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
          <option value="relevant">Relevant</option>
          <option value="low-high">Low to high</option>
          <option value="high-low">High to low</option>
          
        </select>
       </div>
       
       {/*all products*/}
       <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 mt-5 '>
         {
            filterproducts.map((item,index)=>(
                <ProductItem key={index} id={item.id} image={item.image} name={item.name} price={item.price}/>
            ))
         }
      </div>
      </div>

    </div>
  )
}

export default Collection
