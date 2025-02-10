import React from 'react';
import { useLogin, useLoginError } from '../hooks/useUsers';
import axios from 'axios';
import { setLoginLoading, setUserForm } from '../features/users';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../types/types';
import { useNavigate } from 'react-router-dom';
import { setMessage } from '../features/authe';


const LoginForm = () => {
  
  const {login, setLogin} = useLogin();
  const {errors, setErrors} = useLoginError();
  const loading = useSelector((state:RootState)=>state.users.loginload);
  const dispatch = useDispatch();
  const navigate = useNavigate();


 
  // Handle email change with validation
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLogin((prev) => ({ ...prev, [name]: value }));
    // Validate email format
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!value || value.length < 5) {
      setErrors((prev) => ({ ...prev, email: 'Email must have at least 5 characters' }));
    } else if (!emailPattern.test(value)) {
      setErrors((prev) => ({ ...prev, email: 'Please enter a valid email address' }));
    } else {
      setErrors((prev) => ({ ...prev, email: '' }));
    }
  };

  // Handle password change with validation
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLogin((prev) => ({ ...prev, [name]: value }));

    if (value.length < 5) {
      setErrors((prev) => ({ ...prev, password: 'Password must have at least 5 characters' }));
    } else {
      setErrors((prev) => ({ ...prev, password: '' }));
    }
  };

  // Handle form submission with validation and API call
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = { email: '', password: '' };

    if (!login.email) {
      newErrors.email = 'Email can not be empty';
    }

    if (!login.password) {
      newErrors.password = 'Password can not be empty';
    }

    setErrors(newErrors);

  
    // If no errors, proceed to login
    if (!newErrors.email && !newErrors.password) {
      dispatch(setLoginLoading(true))
      axios.post("https://eventscaduleserver.onrender.com/api/auth/login", login,{withCredentials : true})
      .then(res=>{

        
        if(res.data.login){
          dispatch(setMessage(res.data.message));
          dispatch(setUserForm(false))
         
         navigate('/dashboard'); 
          
        }

        dispatch(setMessage(res.data.message))
     
      })
      .catch(err=>{
        dispatch(setMessage(err.message))
       
        
      })
      .finally(()=>{
        dispatch(setLoginLoading(false));

          setTimeout(() => {
            dispatch(setMessage(''))
          }, 2500)
        
      });


    }
  };

  // Cancel login form
const  handleCancel = () =>{
   dispatch(setUserForm(false))  
}

  return (
    <form onSubmit={handleLogin} noValidate>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-600 text-sm font-medium mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          onChange={handleEmail}
          value={login.email}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <p className="text-red-600">{errors.email}</p>
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-600 text-sm font-medium mb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          onChange={handlePassword}
          value={login.password}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <p className="text-red-600">{errors.password}</p>
      </div>

    

      <div className="mb-4 flex gap-4">
        <button
          type="submit"
          
          className={`${loading ? 'disabled bg-[#0e1457]':'cursor-pointer bg-[#020742]'} w-full p-3 text-white rounded text-base font-bold  hover:bg-[#0e1457]`}
        >
          {loading ? 'Loading...' : 'Login'}
        </button>
        <span
          className={`${loading ? 'disabled bg-[#abb898]':'bg-[#99a38b]'} p-3 bg-[#99a38b] rounded text-base font-bold text-white cursor-pointer hover:bg-[#abb898]`}
          onClick={handleCancel}
        >
          Cancel
        </span>
      </div>
    </form>
  );
};

export default LoginForm; 
 