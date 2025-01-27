import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Login, RootState } from '../types/types';
import axios from 'axios';
import { LoginResponse } from '../types/types';
import { useNavigate } from 'react-router-dom';
import { setMessage, setUserForm, setUserLogin, setUserNote } from '../features/users';
import { getUser, setLog } from '../features/authe';

const LoginForm = () => {
  
  const [login, setLogin] = useState<Login>({ email: '', password: '' });
  const dispatch = useDispatch()
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    general: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle email change with validation
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLogin((prev) => ({ ...prev, [name]: value }));
    axios.defaults.withCredentials = true;

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
    const newErrors = { email: '', password: '', general: '' };

    if (!login.email) {
      newErrors.email = 'Email cannot be empty';
    }

    if (!login.password) {
      newErrors.password = 'Password cannot be empty';
    }

    setErrors(newErrors);

    // If no errors, proceed to login
    if (!newErrors.email && !newErrors.password) {
      setLoading(true);
      try {
        const res:any = await axios.post('http://localhost:8000/users/login', login);
        setLoading(false);

        if (res.data.message === 'User not found') {
           dispatch(setMessage(String(res.data.message)));
           dispatch(setUserNote(true))
           setTimeout(() => {
            dispatch(setMessage(''))
          }, 1000)
          
        }
        if(res.data.message === 'Invalid password'){
          dispatch(setMessage(String(res.data.message)))
          dispatch(setUserNote(true))
          setTimeout(() => {
            dispatch(setMessage(''))
          }, 1000)
        } else {

          dispatch(setMessage(String(res.data.message)))
          dispatch(setUserNote(true))
          dispatch(setUserLogin(Boolean(res.data.login)))
          dispatch(setUserForm(false))
            dispatch(setLog(true))
            navigate('/dashboard')
         

          axios
          .get('http://localhost:8000/users')
          .then((res:any) => {
            setMessage(res.data);
            dispatch(getUser(res.data))
          })
        }
      } catch (err) {
        setLoading(false);
        
      }
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
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
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
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <p className="text-red-600">{errors.password}</p>
      </div>

    

      <div className="mb-4 flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary p-3 text-white rounded text-base font-bold hover:bg-lightPrimary"
        >
          {loading ? 'Loading...' : 'Login'}
        </button>
        <span
          className="p-3 bg-lightcancelBtn rounded text-base font-bold text-white cursor-pointer"
          onClick={handleCancel}
        >
          Cancel
        </span>
      </div>
    </form>
  );
};

export default LoginForm; 
 