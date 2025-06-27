import React from 'react'
import { Button } from '../ui/button'

function Header() {
  return (
    <div className='p-1 shadow-sm flex justify-between items-center px-3'>
      <img
        src='./src/assets/logo1.png'
        alt='Logo'
        className='h-20 w-auto' 
      />
      <div className='flex gap-3'> {/* Added flex and spacing */}
        <Button>Sign In</Button>
        <Button>About Us</Button> {/* Removed px-1 to keep consistent padding */}
      </div>
    </div>
  )
}

export default Header

