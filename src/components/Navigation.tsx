import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setUserForm } from '../features/users';
import { RootState } from '../types/types';
import axios from 'axios';


const Navigation:React.FC = () => {

const userForm = useSelector((state:RootState) => state.users.userForm);
const [message, setMessage] = useState()
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const userLoginForm = () => {
    dispatch(setUserForm(true));



  }



const userLogOut = () =>{
  
  axios.post('http://localhost:8000/users/logout')
  .then((res:any)=>{
   setMessage(res)
    
  }).catch(err=>console.log(err));

 
  console.log(message);
}





  return (
    <div className='shadow-md h-[80px] flex justify-between px-2 py-a w-full items-center bg-white right-0 text-primary'>
      <Link to={'/'} className='text-xl font-black '>Event Scheduler</Link>
      <div>
   {!userForm && ( <button onClick={userLoginForm} className='bg-primary text-white px-3 py-1 font-bold rounded-md hover:bg-lightPrimary' >Login</button>)}
  <button onClick={userLogOut} className='bg-primary text-white px-3 py-1 font-bold rounded-md hover:bg-lightPrimary' >LoginOut</button>
      
      </div>
    </div>
  )
}

export default Navigation
