import React from 'react';
import { RootState, SignupValidator, UsersInfo } from '../types/types';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useSignup, useSignupError } from '../hooks/useUsers';
 import { signUpApi } from '../api/api';
import { setUserForm, setSignupLoading, setForm,/* setForm  */} from '../features/users';
import { setMessage } from '../features/authe';

const SignUpForm = () => {

 
  const {signUp, setSignUp} = useSignup();
  const {errors, setErrors} = useSignupError();
  const loading = useSelector((state:RootState)=>state.users.signupLoading)

  const dispatch = useDispatch();

 

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUp((prev) => ({ ...prev, [name]: value }));

    if (value.length < 5) {
      setErrors((prev) => ({ ...prev, username: 'Name must have at least five characters' }));
    } else {
      setErrors((prev) => ({ ...prev, username: '' }));
    }
  };

  // Email validation
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUp((prev) => ({ ...prev, [name]: value }));

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(value)) {
      setErrors((prev) => ({ ...prev, email: 'Please enter a valid email' }));
    } else {
      setErrors((prev) => ({ ...prev, email: '' }));
    }
  };

  // Password validation
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUp((prev) => ({ ...prev, [name]: value }));

    if (value.length < 5) {
      setErrors((prev) => ({ ...prev, password: 'Password must have at least five characters' }));
    } else {
      setErrors((prev) => ({ ...prev, password: '' }));
    }
  };

  // Confirm password validation
  const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUp((prev) => ({ ...prev, [name]: value }));

    if (value !== signUp.password) {
      setErrors((prev) => ({ ...prev, confirmPassword: 'Passwords do not match' }));
    } else {
      setErrors((prev) => ({ ...prev, confirmPassword: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors:SignupValidator = {
      username: signUp.username ? '' : 'Name can not be empty',
      email: signUp.email ? '' : 'Email can not be empty',
      password: signUp.password ? '' : 'Password can not be empty',
      confirmPassword:
        signUp.confirmPassword === signUp.password ? '' : 'Passwords do not match',
    };

    setErrors(validationErrors);

    // Check if there are any errors
  
    const isValid = !Object.values(validationErrors).some((error) => error);
    if (isValid) {
      dispatch(setSignupLoading(true))
      const newUser: UsersInfo = {
        username: signUp.username,
         email: signUp.email,
        password: signUp.password
      };

axios.post(signUpApi, newUser)
.then(res=>{
 
 if(res.data === "Successfully registered"){
  dispatch(setMessage(res.data));
  dispatch(setForm('login'))

 }
 
 dispatch(setMessage(res.data));

})
.catch(err=>(dispatch(setMessage(err.message))))
.finally(()=>{
  dispatch(setSignupLoading(false));

  setTimeout(() => {
    dispatch(setMessage(''))
  }, 2500);
})
  }
  
}



const  handleCancel = () =>{
   dispatch(setUserForm(false))  
}

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-600 text-sm font-medium mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="username"
          placeholder="Enter your name"
          onChange={handleName}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <p className="text-red-600">{errors.username}</p>
      </div>
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
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <p className="text-red-600">{errors.password}</p>
      </div>
      <div className="mb-4">
        <label htmlFor="confirmPassword" className="block text-gray-600 text-sm font-medium mb-2">
          Repeat Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Repeat Password"
          onChange={handleConfirmPassword}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <p className="text-red-600">{errors.confirmPassword}</p>
      </div>
      <div className="mb-4 flex gap-6">
        <button
          type="submit"
          className={` ${loading ? 'disabled bg-[#172285]':'cursor-pointer hover:bg-[#0e1457]'} w-full bg-[#020742] p-3 text-white rounded text-base font-bold`}
        >
         {loading ?  'Loading...' : 'Sign up'}
         
        </button>
        <span
          className={` ${loading ? 'disabled bg-[#bdc4b5]':'cursor-pointer hover:bg-[#abb898]'} p-3 bg-[#99a38b] rounded text-base font-bold text-white `}
          onClick={handleCancel}
        >
          Cancel
        </span>
      </div>
    </form>
  );
};

export default SignUpForm;
