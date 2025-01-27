import React, { useState } from 'react';
import { addMonths, eachDayOfInterval, endOfMonth, endOfWeek, format, startOfMonth, startOfWeek, subMonths } from 'date-fns';
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";

const Calendar = () => {
  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
 

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

  // Check if a given day is in the current month
  const isCurrentMonth = (day: Date) => {
    return day.getMonth() === currentMonth.getMonth();
  };
const handleDate = (date:Date) => {
  alert(date);
}
  return (
    <div className="w-full p-2 border-[2px] border-niceback rounded-xl">
      <div className="bg-slate-200 flex items-center flex-col py-2">
        <p className="font-extrabold text-lg">{format(currentMonth, 'yyyy')}</p>
        <div className="flex justify-around w-[300px] items-center">
          <FaChevronLeft onClick={handlePrevMonth} className="text-primary" />
          <p>{format(currentMonth, 'MMMM')}</p>
          <FaChevronRight onClick={handleNextMonth} className="text-primary" />
        </div>
      </div>
      <div className="flex justify-between mt-6 mb-6 w-full">
        {weekdays.map((day, i) => (
          <p key={i} className="bg-niceback px-2 text-primary">{day}</p>
        ))}
      </div>
      <div className="bg-red-50 mt-5 grid grid-cols-7 gap-5">
        {daysInMonth.map((day, index) => (
          <p
            key={index}
            onClick={()=>handleDate(day)}
            className={`text-center p-1 ${isCurrentMonth(day) ? '' : 'text-gray-400'}`}
          >
            {format(day, 'd')}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
