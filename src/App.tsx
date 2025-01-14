import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './types/types';
import SignUpLoginForm from './components/SignUpLoginForm';
import Navigation from './components/Navigation';
import HomeRaute from './routes/HomeRaute';

const App:React.FC = () => {
  const userForm = useSelector((state:RootState) => state.users.userForm);
  return (
    <div>
      <div className='fixed w-full'>
      <Navigation />
      <HomeRaute />
      </div>
         {userForm && (<SignUpLoginForm />)}
         
    </div>
  );
}

export default App;
