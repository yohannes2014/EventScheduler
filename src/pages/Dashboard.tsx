import React, { useEffect, useState } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../types/types';
import axios from 'axios';
import Calender from '../components/Calender';
import ListEvent from '../components/ListEvent';
import { getUser } from '../features/authe';
import { useNavigate } from 'react-router-dom';
import NewEvent from '../components/NewEvent';
import Notes from '../components/Test';
import EventScheduler from '../components/TestForm';
import TestNew from '../components/TestNew';

const Dashboard = () => {

  const [message, setMessage] = useState<any>()
  const user = useSelector((state:RootState)=>state.auth.user)
 




/*  useEffect(()=>{
  axios
      .get('http://localhost:8000/users/dashboard')
      .then((res:any) => {
         setMessage(res)
      })
      .catch((err) => {
        console.error(err);
       
      })

 }) */
const dispatch = useDispatch()

    useEffect(()=>{
    axios
    .get('http://localhost:8000/users')
    .then((res:any) => {
      setMessage(res.data);
      dispatch(getUser(res.data))
    })
    .catch((err) => {
      console.error(err);
     
    }) }, [])
  /*
    const userPro = () => {
   
      axios
    .get('http://localhost:8000/users/tokenRefresh')
    .then((res:any) => {
      
    })
    .catch((err) => {
      console.error(err);
     
    })

    
   }  

   */


const LogUser = useSelector((state:RootState)=>state.auth.user.isLoggedIn);
const navigate = useNavigate()

/* useEffect(()=>{
if(LogUser === false){
   navigate('/')
   console.log(LogUser)
}
},[])
 */


  return (
   
    <div className="">
      <DashboardHeader />
     
    
      <div className='flex justify-center'>
          <Calender />
          <ListEvent />
        
        
       

       
      </div>
    </div>

  );
};

export default Dashboard;
 