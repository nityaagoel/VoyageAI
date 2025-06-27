import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function HeroSection() {
  return (
    <div className='flex flex-col items-center mx-56 gap-9'>
        <h1 className='font-extrabold text-[65px] text-center mt-10'>
          <span className='text-[#382f98]'> Discover Your Next Adventure with AI:</span> Personalized Itineraries at Your Fingertips</h1>
          <p className='text-[25px] text-center'>
            Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget
          </p>
          
          <Link to={'/create-trip'}>
            <Button>Get Started , It's Free</Button>
          </Link>
    </div>  
  )
}

export default HeroSection

