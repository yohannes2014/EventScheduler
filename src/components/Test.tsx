// src/components/Calendar.tsx

import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addMonths, subMonths, eachDayOfInterval } from 'date-fns';

const Notes: React.FC = () => {
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

  return (
    <div className="flex flex-col items-center w-full">
      <header className="flex justify-between items-center w-full p-4 bg-gray-100 rounded-lg">
        <button
          onClick={handlePrevMonth}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Prev
        </button>
        <h2 className="text-xl font-semibold">{format(currentMonth, 'MMMM yyyy')}</h2>
        <button
          onClick={handleNextMonth}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Next
        </button>
      </header>

      <div className="grid grid-cols-7 gap-2 mt-6 w-full max-w-[350px]">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center font-bold text-sm text-gray-700">
            {day}
          </div>
        ))}

        {daysInMonth.map((day:any) => (
          <div
            key={day.toString()}
            className="flex items-center justify-center w-full p-3 rounded-lg cursor-pointer hover:bg-gray-200"
          >
            {format(day, 'd')}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;
