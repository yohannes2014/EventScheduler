import React from 'react';
import DashboardHeader from '../components/DashboardHeader'
import PrivetRaute from '../routes/PrivetRaute';
import NewEvent from '../components/NewEvent';
import { useSelector } from 'react-redux';
import { RootState } from '../types/types';

const Dashboard = () => {
  const newEvent = useSelector((state:RootState)=>state.events.newEvent);



  return (
    <div className=''>
        <DashboardHeader  />
        <PrivetRaute />
       {newEvent && <NewEvent />}
        
    </div>
  )
}

export default Dashboard