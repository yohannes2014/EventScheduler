import React, { useState } from 'react';
import { Signup } from '../types/types';
import { useDispatch } from 'react-redux';
import { setUserForm } from '../features/users';

const SignUpForm = () => {
  const [users, setUsers] = useState<Signup[]>([]);
  const [signUp, setSignUp] = useState<Signup>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Signup>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const dispatch = useDispatch();

  const cancel = () => dispatch(setUserForm(false)); // Cancel signup

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUp((prev) => ({ ...prev, [name]: value }));

    if (value.length < 5) {
      setErrors((prev) => ({ ...prev, name: 'Name must have at least five characters' }));
    } else {
      setErrors((prev) => ({ ...prev, name: '' }));
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

    const validationErrors: Signup = {
      name: signUp.name ? '' : 'Name cannot be empty',
      email: signUp.email ? '' : 'Email cannot be empty',
      password: signUp.password ? '' : 'Password cannot be empty',
      confirmPassword:
        signUp.confirmPassword === signUp.password ? '' : 'Passwords do not match',
    };

    setErrors(validationErrors);

    // Check if there are any errors
    const isValid = !Object.values(validationErrors).some((error) => error);
    if (isValid) {
      const newUser: Signup = {
        name: signUp.name,
        email: signUp.email,
        password: signUp.password,
        confirmPassword: signUp.confirmPassword,
      };
      setUsers((prevUsers) => [...prevUsers, newUser]);
      console.log(users);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-600 text-sm font-medium mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter your name"
          onChange={handleName}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:lightPrimary"
        />
        <p className="text-red-600">{errors.name}</p>
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
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:lightPrimary"
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
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:lightPrimary"
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
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:lightPrimary"
        />
        <p className="text-red-600">{errors.confirmPassword}</p>
      </div>
      <div className="mb-4 flex gap-6">
        <button
          type="submit"
          className="w-full bg-primary p-3 text-white rounded text-base font-bold hover:bg-lightPrimary"
        >
          Sign up
        </button>
        <span
          className="p-3 bg-lightcancelBtn rounded text-base font-bold text-white"
          onClick={cancel}
        >
          Cancel
        </span>
      </div>
    </form>
  );
};

export default SignUpForm;
