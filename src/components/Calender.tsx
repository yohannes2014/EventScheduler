import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


const Calender = () => {

  
  const [date, setDate] = useState<Date>(new Date());

  // Handle date change
  const handleDateChange = (newDate:Date) =>void {
   
  }
  return (
  
      <Calendar value={date} />
   
  )
}

export default Calender




