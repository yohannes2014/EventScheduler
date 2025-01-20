import React, { useEffect, useState } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import NewEvent from '../components/NewEvent';
import { useSelector } from 'react-redux';
import { RootState } from '../types/types';
import axios from 'axios';
import Calender from '../components/Calender';
import ListEvent from '../components/ListEvent';

const Dashboard = () => {
  const newEvent = useSelector((state: RootState) => state.events.newEvent);
  const [dash, setDash] = useState<any>(false);
  const display = useSelector((state:RootState)=>state.users.display)


 
 useEffect(()=>{
  axios
      .get('http://localhost:8000/users/dashboard')
      .then((res:any) => {
        setDash(res.data.valid);
      })
      .catch((err) => {
        console.error(err);
       
      })

 })
    
     


  return (
    <div className="bg-slate-300">
      <DashboardHeader />
      {newEvent && <NewEvent />}
      <div className='flex justify-center'>
         {display === "calender" && <Calender />}
         {display === "list" && <ListEvent />}
       
      </div>

    
      
  
   
    </div>
  );
};

export default Dashboard;
