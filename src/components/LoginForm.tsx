import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Login } from '../types/types';
import { setLoginUser, setUserForm } from '../features/users';
import axios from 'axios';
import { LoginResponse } from '../types/types';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const dispatch = useDispatch();
  const [login, setLogin] = useState<Login>({ email: '', password: '' });
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

        if (res.data.login === false) {
          setErrors((prev) => ({ ...prev, general: 'Invalid email or password' }));
        } else {
          navigate('/dashboard');
        }
      } catch (err) {
        setLoading(false);
        setErrors((prev) => ({ ...prev, general: 'An error occurred. Please try again.' }));
      }
    }
  };

  // Cancel login form
  const cancel = () => {
    setLogin({ email: '', password: '' }); // Reset form
    setErrors({ email: '', password: '', general: '' }); // Reset errors
    dispatch(setUserForm(false)); // Close form
  };

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

      {/* General error message */}
      {errors.general && <p className="text-red-600 mb-4">{errors.general}</p>}

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
          onClick={cancel}
        >
          Cancel
        </span>
      </div>
    </form>
  );
};

export default LoginForm;
