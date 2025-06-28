import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function HeroSection() {
  return (
    <div className='relative min-h-screen flex flex-col items-center justify-center mx-auto max-w-6xl px-6 gap-12 overflow-hidden'>
      {/* Enhanced background with geometric patterns */}
      <div className='absolute inset-0 bg-gradient-to-br from-blue-100 via-slate-50 to-purple-100 -z-10'></div>
      
      {/* Travel-themed background elements */}
      <div className='absolute inset-0 opacity-15 -z-5'>
        <svg className='absolute top-10 left-10 w-32 h-32 text-blue-600 animate-float' fill="currentColor" viewBox="0 0 24 24">
          <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
        </svg>
        <svg className='absolute top-32 right-20 w-24 h-24 text-purple-600 animate-float delay-1000' fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
        <svg className='absolute bottom-20 left-20 w-28 h-28 text-blue-500 animate-float delay-500' fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
        </svg>
        <svg className='absolute bottom-32 right-32 w-20 h-20 text-purple-500 animate-float delay-700' fill="currentColor" viewBox="0 0 24 24">
          <path d="M9.5 6.5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5S13.38 9 12 9 9.5 7.88 9.5 6.5zM11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
        </svg>
      </div>
      
      {/* Floating elements for modern touch */}
      <div className='absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full opacity-30 blur-3xl animate-pulse'></div>
      <div className='absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full opacity-30 blur-3xl animate-pulse delay-1000'></div>
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-cyan-200 to-blue-200 rounded-full opacity-25 blur-3xl animate-pulse delay-2000'></div>
      
      {/* Grid pattern overlay */}
      <div className='absolute inset-0 opacity-[0.08] -z-5' style={{backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`}}></div>
      
      {/* Main content */}
      <div className='relative z-10 text-center space-y-10'>
        
        <h1 className='font-black text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] tracking-tight max-w-5xl mx-auto'>
          <span className='bg-gradient-to-r from-[#382f98] via-blue-600 to-purple-600 bg-clip-text text-transparent animate-gradient block mb-4'> 
            Discover Your Next Adventure with AI
          </span>
          <span className='text-gray-800 text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold block'>
            Personalized Itineraries at Your Fingertips
          </span>
        </h1>
        
        <p className='text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-normal'>
          Your personal trip planner and travel curator, creating  custom itineraries
          tailored to your interests and budget
        </p>
        
        {/* Features highlight */}
        <div className='flex flex-wrap justify-center gap-6 text-sm text-gray-600 max-w-2xl mx-auto'>
          <div className='flex items-center gap-2'>
            <div className='w-2 h-2 bg-green-500 rounded-full'></div>
            <span>AI-Powered</span>
          </div>
          <div className='flex items-center gap-2'>
            <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
            <span>Personalized</span>
          </div>
          <div className='flex items-center gap-2'>
            <div className='w-2 h-2 bg-purple-500 rounded-full'></div>
            <span>Budget-Friendly</span>
          </div>
          <div className='flex items-center gap-2'>
            <div className='w-2 h-2 bg-orange-500 rounded-full'></div>
            <span>Instant Results</span>
          </div>
        </div>
        
        <div className='pt-8'>
          <Link to={'/create-trip'}>
            <Button className='bg-gradient-to-r from-[#382f98] to-blue-600 hover:from-blue-600 hover:to-purple-600 text-white px-12 py-5 text-xl font-bold rounded-full shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 ease-out border-0 relative overflow-hidden group'>
              <span className='relative z-10'>Get Started, It's Free</span>
              <div className='absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
            </Button>
          </Link>
          
         
        </div>
      </div>
      
      {/* Subtle animated dots */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full opacity-40 animate-bounce delay-300'></div>
        <div className='absolute top-1/3 right-1/3 w-1 h-1 bg-purple-400 rounded-full opacity-50 animate-bounce delay-700'></div>
        <div className='absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-blue-500 rounded-full opacity-30 animate-bounce delay-1000'></div>
        <div className='absolute bottom-1/3 right-1/4 w-1 h-1 bg-purple-500 rounded-full opacity-40 animate-bounce delay-500'></div>
      </div>
      
      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 4s ease infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>  
  )
}

export default HeroSection