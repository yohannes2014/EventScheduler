import React from 'react'
import { Link } from 'react-router-dom'

const Navigation = () => {
   
  return (
    <div className='shadow-md h-[80px] flex justify-between px-2 py-a w-full'>
      <Link to={'/'}>Logo</Link>
      <div>
        <Link to={'/'}>Log In</Link>
        
      </div>
      
    
    </div>
  )
}

export default Navigation
