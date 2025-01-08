import React from 'react';
import Navigation from '../components/Navigation';
import { useSelector } from 'react-redux';
import { RootState } from '../types/types';
import SignUpLoginForm from '../components/SignUpLoginForm';
const Home:React.FC = () => {
  const userForm = useSelector((state:RootState) => state.users.userForm);
  return (
    <div>
        <Navigation />
       {userForm && <SignUpLoginForm />}


       
    </div>
  )
}

export default Home
