import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginUser } from '../features/users';


const Navigation:React.FC = () => {


  const dispatch = useDispatch()

  const userLoginForm = () => {
    dispatch(loginUser(true));

  }

   
  return (
    <div className='shadow-md h-[80px] flex justify-between px-2 py-a w-full items-center sticky bg-white top-0 left-0 right-0 text-primary'>
      <Link to={'/'} className='text-xl font-black '>Event Scheduler</Link>
      <div>
    <button onClick={userLoginForm} className='bg-primary text-white px-3 py-1 font-bold rounded-md hover:bg-lightPrimary' >Login</button>
      
      </div>
    </div>
  )
}

export default Navigation
