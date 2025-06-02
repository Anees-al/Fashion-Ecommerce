import React from 'react'
import Hero from '../components/Hero'
import Latestcollection from '../components/Latestcollection'
import Bestseller from '../components/Bestseller'
import Ourpolicy from '../components/Ourpolicy'
import Newsletter from '../components/Newsletter'

const Home = () => {
  return (
    <div>
    <Hero/>
    <Latestcollection/>
    <Bestseller/>
    <Ourpolicy/>
    <Newsletter/>
    </div>
  )
}

export default Home
