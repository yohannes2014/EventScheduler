import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate} from 'react-router-dom';
import { RootState } from '../types/types';
import { setUserForm, setUserLogin } from '../features/users';
import axios from 'axios';
import { logOutApi } from '../api/api';
const Navigation:React.FC = () => {


const login = useSelector((state:RootState)=>state.users.login)
  const dispatch = useDispatch();

  const userLoginForm = () => {
   dispatch(setUserForm(true))  
  

  }

  



const navigate = useNavigate();
const logoutUser = () =>{

  axios.post(logOutApi)
  .then(()=>{
 localStorage.removeItem('token');
 navigate('/');
 //here we can add success message
 dispatch(setUserLogin(false)) 
    
  }).catch(err=>console.log(err));
   
}





  return (
    <div className='shadow-md z-10 h-[80px] lg:h-[90px] sticky top-0 flex justify-between px-5 py-a w-full items-center bg-white right-0 text-primary'>
      <Link to={'/'} className='xl:text-4xl lg:text-3lx md:text-2xl text-[#020742] text-xl font-black '>Event Scheduler</Link>
      <div>
   {!login && <button onClick={userLoginForm} className=' bg-[#CDD1EA4D] text-Primary px-3 py-[2px] lg:text-[18px] font-bold cursor-pointer rounded-md hover:bg-[#e8e9ed] text-[14px]' >Login</button>}
   {login && <button onClick={logoutUser} className=' bg-[#CDD1EA4D] text-Primary px-3 py-1 font-bold cursor-pointer rounded-md hover:bg-[#e8e9ed] lg:text-lg' >Login Out</button>
}
      
      </div>
    </div>
  )
}

export default Navigation
