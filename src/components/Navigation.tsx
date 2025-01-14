import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setUserForm } from '../features/users';
import { RootState } from '../types/types';


const Navigation:React.FC = () => {

const userForm = useSelector((state:RootState) => state.users.userForm);
  const dispatch = useDispatch()

  const userLoginForm = () => {
    dispatch(setUserForm(true));

  }

   
  return (
    <div className='shadow-md h-[80px] flex justify-between px-2 py-a w-full items-center bg-white right-0 text-primary'>
      <Link to={'/'} className='text-xl font-black '>Event Scheduler</Link>
      <div>
   {!userForm && ( <button onClick={userLoginForm} className='bg-primary text-white px-3 py-1 font-bold rounded-md hover:bg-lightPrimary' >Login</button>)}
      
      </div>
    </div>
  )
}

export default Navigation
