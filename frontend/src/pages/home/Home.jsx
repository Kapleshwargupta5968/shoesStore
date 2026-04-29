import React from 'react'
import Hero from '../../components/home/Hero'
import FeaturedCategories from '../../components/home/FeaturedCategories'
import PopularProducts from '../../components/home/PopularProducts'
import Newsletter from '../../components/home/Newsletter'

const Home = () => {
  return (
    <div className="flex flex-col">
      <Hero />
      <FeaturedCategories />
      <PopularProducts />
      <Newsletter />
    </div>
  )
}

export default Home
