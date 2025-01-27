import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './types/types';
import SignUpLoginForm from './components/SignUpLoginForm';
import Navigation from './components/Navigation';
import AllRoutes from './routes/AllRoutes';
import NewEvent from './components/NewEvent';

const App:React.FC = () => {

const newEvent = useSelector((state:RootState)=>state.events.newEvent)
  
  return (
    <>
      <SignUpLoginForm />
      {newEvent && <NewEvent />}
      <div className='w-full lg:px-7 xl:w-[1120px] m-auto'>
      <Navigation />
      <AllRoutes />
      </div>
        
    </>
  );
}

export default App;
