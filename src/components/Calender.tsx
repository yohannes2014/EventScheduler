import React, { useState, useEffect } from 'react';
import { addMonths, eachDayOfInterval, endOfMonth, endOfWeek, format, startOfMonth, startOfWeek, subMonths } from 'date-fns';
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { toZonedTime } from 'date-fns-tz';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../types/types';
import { setNotifiCard, setNotification, setNotifName } from '../features/users';
import Notification from './Notification';
import { setSelectedDate,setSelectedEvents } from '../features/events';

const Calendar: React.FC = () => {
  const userEvent = useSelector((state: RootState) => state.events.userEvent);
  const notificationCard = useSelector((state:RootState)=>state.users.notifCard);
  
  const dispatch = useDispatch();
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;  // Get the user's local time zone

  useEffect(() => {
    const localTime = toZonedTime(new Date(), timeZone);
    setCurrentMonth(localTime); // Set the current month based on local time
  }, [timeZone]);

  const firstDayOfMonth = startOfMonth(currentMonth);
  const lastDayOfMonth = endOfMonth(currentMonth);

  const firstDayOfWeek = startOfWeek(firstDayOfMonth);
  const lastDayOfWeek = endOfWeek(lastDayOfMonth);

  const daysInMonth = eachDayOfInterval({ start: firstDayOfWeek, end: lastDayOfWeek });

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };


  const isCurrentMonth = (day: Date) => {
    return day.getMonth() === currentMonth.getMonth();
  };

  const handleDate = (date: Date) => {
    const zonedDate = toZonedTime(date, timeZone); // Convert to local time
    const formattedDate = format(zonedDate, 'yyyy-MM-dd');
    dispatch(setSelectedDate(formattedDate));

    if (isCurrentMonth(date)) {
      const eventOnDate = userEvent.filter((event) => event.date === formattedDate);
   
      if (eventOnDate.length > 0) {
        dispatch(setNotifName('Event'));
        dispatch(setNotification('Event'));
        dispatch(setNotifiCard(true));

        dispatch(setSelectedEvents(eventOnDate))
        
      } else {
        dispatch(setNotifName('NoEvent'));
        dispatch(setNotification('No Event'));
        dispatch(setNotifiCard(true));
       
      }
    } 

  };
 

     // Check if there are events on this date
  const isEventDate = (date: Date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    return userEvent.some((event) => event.date === formattedDate);
  };

  return (
    <>

    
    {notificationCard && <Notification />}
      <div className="w-full p-2 border-[2px] border-niceback rounded-xl">
        <div className="bg-slate-200 flex items-center flex-col py-2">
          <p className="font-extrabold text-lg">{format(currentMonth, 'yyyy')}</p>
          <div className="flex justify-around w-[300px] items-center">
            <FaChevronLeft onClick={handlePrevMonth} className="text-blue-950 cursor-pointer text-3xl hover:text-blue-500" />
            <p>{format(currentMonth, 'MMMM')}</p>
            <FaChevronRight onClick={handleNextMonth} className="text-blue-950 cursor-pointer text-3xl hover:text-blue-500" />
          </div>
        </div>
        <div className="flex justify-between mt-6 mb-6 w-full px-15">
          {weekdays.map((day, i) => (
            <p key={i} className="bg-niceback px-2 text-primary">{day}</p>
          ))}
        </div>
        <div className="bg-red-50 mt-5 grid grid-cols-7 gap-5">
          {daysInMonth.map((day, index) => (
            <p
              key={index}
              onClick={() => handleDate(day)}
              className={`text-center p-1 cursor-pointer
                ${isCurrentMonth(day) ? 'text-blue-950 font-bold' : 'text-gray-300'} 
                ${isEventDate(day) && isCurrentMonth(day) ? 'bg-green-200 hover:bg-green-400' : ''}
              `}
            >
              {format(day, 'd')}
            </p>
          ))}
        </div>
      </div>
    </>
  );
};

export default Calendar;
