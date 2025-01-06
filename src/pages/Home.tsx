import React from 'react';
import Navigation from '../components/Navigation';
import { useSelector } from 'react-redux';
import { RootState } from '../types/types';
import SignUpLoginForm from '../components/SignUpLoginForm';

const Home:React.FC = () => {
  const IsLogin = useSelector((state:RootState) => state.users.isLoggedIn);
  return (
    <div>
        <Navigation />
       {IsLogin && <SignUpLoginForm />}
       
    </div>
  )
}

export default Home
