import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { RootState } from '../types/types';
import { setUserForm } from '../features/users';
import axios from 'axios';
import { getUser, setLog } from '../features/authe';


const Navigation:React.FC = () => {

const [message, setMessage] = useState()
const loginn = useSelector((state:RootState)=>state.users.login)
  const dispatch = useDispatch();

  const userLoginForm = () => {
   dispatch(setUserForm(true))  
  

  }

  const navigate = useNavigate()

const userLogOut = () =>{
  
  axios.post('http://localhost:8000/users/logout')
  .then((res:any)=>{

    dispatch(setLog(false));
    navigate('/')
  }).catch(err=>console.log(err));
   

   
}





  return (
    <div className='shadow-md h-[80px] lg:h-[90px] sticky top-0 flex justify-between px-5 py-a w-full items-center bg-white right-0 text-primary'>
      <Link to={'/'} className='text-xl font-black '>Event Scheduler</Link>
      <div>
   {!loginn && <button onClick={userLoginForm} className='bg-niceback text-Primary px-3 py-1 font-bold rounded-md hover:bg-nicebackDark' >Login</button>}
  <button onClick={userLogOut} className='bg-primary text-white px-3 py-1 font-bold rounded-md hover:bg-lightPrimary' >LoginOut</button>
      
      </div>
    </div>
  )
}

export default Navigation
