import React, { useEffect } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import Calender from '../components/Calender';
import ListEvent from '../components/ListEvent';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../types/types';
import { UserSData } from '../api/api';
import Notification from '../components/Notification';
import EventsHandle from '../components/EventsHandle';
import AddNewEvent from '../components/AddNewEvent';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../features/authe';
import { setUserEvents } from '../features/events';
import { setUserLogin } from '../features/users';

const Dashboard: React.FC = () => {
  const display = useSelector((state: RootState) => state.events.display);
  const notification = useSelector((state: RootState) => state.users.notifCard);
  const update = useSelector((state: RootState) => state.events.updateCalender);
  const addNew = useSelector((state: RootState) => state.events.addCalanderEvent);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");  // No token, redirect to home/login
      return;
    }

    // Optional: Validate token expiration here if needed.
    axios.defaults.headers["Authorization"] = `Bearer ${token}`;
    
    axios
      .get(UserSData)
      .then((res) => {
        // Dispatch user data and events
        dispatch(getUser(res.data.userInfo));
        dispatch(setUserEvents(res.data.events));
        dispatch(setUserLogin(true));
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        navigate("/");  // On error, redirect to home/login
      });
  }, [dispatch, navigate]);

  return (
    <div className='w-full'>
      <DashboardHeader />
      <div className='flex justify-center my-10'>
        {notification && <Notification />}
        {update && (
          <div className='absolute z-10 bg-white shadow-lg shadow-blue-700 rounded-lg'>
            <EventsHandle />
          </div>
        )}
        {addNew && (
          <div className='absolute z-10 bg-white shadow-lg shadow-blue-700 rounded-lg'>
            <AddNewEvent />
          </div>
        )}
        <div>
          {display === "calender" && <Calender />}
          {display === 'list' && <ListEvent />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
