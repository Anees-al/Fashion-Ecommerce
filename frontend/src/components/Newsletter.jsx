import React from 'react'

const Newsletter = () => {
    const onSubmitHandler=(e)=>{
        e.preventDefault()
    }
  return (
    <div className='text-center'>
      <p className='text-2xl font-medium text-gray-600'>Let sunscribe and get 20% off</p>
      <p className='text-gray-400 mt-3'>get the exculisive offer to clothes by get code</p>
      <form className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-2'>
         <input type="email" placeholder='Enter your email here' className='w-full sm:flex-1 outline-none' />
         <button onClick={onSubmitHandler} type='submit' className='px-10 py-4 text-white bg-black text-xs'>Subscribe</button>
      </form>
    </div>
  )
}

export default Newsletter
