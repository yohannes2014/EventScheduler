import React from 'react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../types/types';
import { setRegisterForm } from '../features/users';

const SignUpLoginForm:React.FC = () => {
  const registeredUser = useSelector((state:RootState)=>state.users.isRegisterd);
  const loginUser = useSelector((state:RootState)=>state.users.isLoggedIn)
  const dispatch = useDispatch();



 

   
 


  return (
   
    <div  className= 'border-2 bg-white top-32 shadow rounded-lg  p-4'>
           <div className="mb-2 flex gap-2">
           <span  onClick={()=>dispatch(setRegisterForm(true))} className={`w-full cursor-pointer hover:bg-yellow-100 text-center text-primary border-2 font-bold text-lg ${registeredUser ?  'bg-yellow-100 disabled:cursor-not-allowed ':`bg-white`} `}>Login</span>
          {!loginUser && <span  onClick={()=>dispatch(setRegisterForm(false))} className={`w-full cursor-pointer hover:bg-yellow-100 text-center text-primary border-2 font-bold text-lg ${!registeredUser ?  'bg-yellow-100 disabled:cursor-not-allowed ':`bg-white`} `}>Sign Up</span>}

    </div>
    {!registeredUser ? (<SignUpForm/>):(<LoginForm />)}
    </div>
    
  )
}

export default SignUpLoginForm
