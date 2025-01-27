import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../types/types';import { setForm, setMessage } from '../features/users';
import Note from './Note';
;

const SignUpLoginForm:React.FC = () => {

  
  const formUser = useSelector((state:RootState)=>state.users.logSignForm);
  const form = useSelector((state:RootState)=>state.users.Form)
  const dispatch = useDispatch()
  

 
 

  const handleLogin = () => {
    dispatch(setForm('login'))
  }
  const handleSignup = () => {
    dispatch(setForm('signup'))
  }
 




  return (
    <>
     {formUser && 
     <div className='fixed w-screen h-screen flex justify-center items-center bg-niceback backdrop-blur-myBlur'>

         
     <div  className= 'border-2 bg-white top-32m-auto w-full md:w-[600px]  shadow rounded-lg  p-4'>
      <Note />
           <div className="mb-2 flex gap-2">
         <span onClick={handleLogin} className={`w-full cursor-pointer hover:bg-yellow-100 text-center text-primary border-2 font-bold text-lg ${form === 'login'&& 'bg-yellow-100'} `}>Login</span>
         <span onClick={handleSignup} className={`w-full cursor-pointer hover:bg-yellow-100 text-center text-primary border-2 font-bold text-lg ${form === 'signup'&& 'bg-yellow-100'} `}>Sign Up</span>

    </div>
    {form === 'signup' && <SignUpForm/>}
    {form === 'login' &&  <LoginForm />}
    </div>


     </div>
  
    
    }
    
    
    </>
   
 
  )
}

export default SignUpLoginForm
