import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { loginUser } from '../features/users';
import { Signup } from '../types/types';


const SignUpLoginForm:React.FC = () => {
  const [signUp, setSignUp] = useState(false);
  const [ users, setUsers] = useState<Signup[]>([]);
  const[ signupForm, setSignupForm] = useState<Signup>(
    {
      name:'',
      email:'',
      password:'',
      confirmPassword:''
    }
  );
  
   
    const dispatch = useDispatch();

    const cancel = () => {
      dispatch(loginUser(false));
  
    }
const inputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
     const { name , value} = e.target;

     setSignupForm({...signupForm, [name]:value})
}

const handleSignup = (e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();

    const newUser = {
      name:signupForm.name,
      email:signupForm.email,
      password:signupForm.password,
      confirmPassword:signupForm.confirmPassword
    }

    setUsers([...users, newUser]);

    setSignupForm({
      
        name:'',
        email:'',
        password:'',
        confirmPassword:''
      
    })
    
    
}


  return (
    <div  className= 'left-4 right-4 py-6 border-2 absolute bg-white top-32 shadow rounded-lg  p-4'>
           <div className="mb-2 flex gap-2">
           <span onClick={()=>setSignUp(false)} className={`w-full text-center text-primary border-2 font-bold text-lg ${!signUp ?  'bg-yellow-100 disabled:cursor-not-allowed ':`bg-white`} `}>Login</span>
           <span onClick={()=>setSignUp(true)} className={`w-full text-center text-primary border-2 font-bold text-lg ${signUp ?  'bg-yellow-100 disabled:cursor-not-allowed ':`bg-white`} `}>Sign Up</span>

    </div>

{/* Signup form */}

    { signUp ? (
  
        <form onSubmit={handleSignup}>
           <div className="mb-4">
             <label htmlFor="name" className="block text-gray-600 text-sm font-medium mb-2">Name</label>
             <input type="name"
                    id="name" 
                    name="name" 
                    placeholder="Enter your name"
                    value={signupForm.name}
                    onChange={inputChange} 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:lightPrimary"/>
           </div>
           <div className="mb-4">
             <label htmlFor="email" className="block text-gray-600 text-sm font-medium mb-2">Email</label>
             <input type="email" 
                    id="email"
                    name="email" 
                    placeholder="Enter your email"
                    value={signupForm.email} 
                    onChange={inputChange} 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:lightPrimary"/>
           </div>
               <div className="mb-4">
             <label htmlFor="password" className="block text-gray-600 text-sm font-medium mb-2">Password</label>
             <input type="password"
                    id="password" 
                    name="password" 
                    placeholder="Enter your password"
                    value={signupForm.password} 
                    onChange={inputChange} 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:lightPrimary"/>
           </div>
               <div className="mb-4">
             <label htmlFor="re-password" className="block text-gray-600 text-sm font-medium mb-2">Repeat Password</label>
             <input type="password"
                    id="re-password" 
                    name="re-password" 
                    placeholder="Repeat Password"
                    value={signupForm.confirmPassword} 
                    onChange={inputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:lightPrimary"/>
           </div>
               <div className="mb-4 flex gap-6">
                    <button type='submit' className='w-full bg-primary p-3 text-white rounded text-base font-bold hover:bg-lightPrimary'>Sign up</button>
                    <span className='p-3 bg-lightcancelBtn rounded text-base font-bold text-white' onClick={cancel}>Cancel</span>
           </div>
           </form>

):(
    /* Login form */
  <form>
  <div className="mb-4">
    <label htmlFor="email" className="block text-gray-600 text-sm font-medium mb-2">Email</label>
    <input type="email" id="email" name="email" placeholder="Enter your email" 
          
           className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:lightPrimary"
           />
  </div>
      <div className="mb-4">
    <label htmlFor="password" className="block text-gray-600 text-sm font-medium mb-2">Password</label>
    <input type="password" id="password" name="password" placeholder="Enter your password" 
           className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:lightPrimary"/>
  </div>
      <div className="mb-4 flex gap-4">
           <button type='submit' className='w-full bg-primary p-3 text-white rounded text-base font-bold hover:bg-lightPrimary'>Login</button>
           <span className='p-3 bg-lightcancelBtn rounded text-base font-bold text-white' onClick={cancel}>Cancel</span>
  </div>
  </form>

)}
    </div>
  )
}

export default SignUpLoginForm
