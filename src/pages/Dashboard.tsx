import React, { useEffect }  from 'react';
import DashboardHeader from '../components/DashboardHeader';
import Calender from '../components/Calender';
import ListEvent from '../components/ListEvent';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../types/types';
import axios from 'axios';
import { UserSData } from '../api/api';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../features/authe'; 
import { setUserEvents } from '../features/events';
import Notification from '../components/Notification';


const Dashboard:React.FC = () => {
 
  const display = useSelector((state:RootState)=>state.events.display);
  const notification = useSelector((state:RootState)=>state.users.notifCard)
    axios.defaults.withCredentials = true;
    const dispatch = useDispatch()
    const navigate = useNavigate();
  


useEffect(()=>{
  axios.get(UserSData)
.then((res)=>{
  dispatch(getUser(res.data.userInfo));
  dispatch(setUserEvents(res.data.events))
 
  
}).catch(() =>{
 
  return navigate('/')
  
})
}) 
 


  return (
   
    <div className='w-full'>
      <DashboardHeader />


      <div className='flex justify-center my-10'>
      {notification && <Notification />}
          {display === "calender" && <Calender />}
         {display === 'list' && <ListEvent />}
         
      </div>
    </div>

  );
};

export default Dashboard;
 