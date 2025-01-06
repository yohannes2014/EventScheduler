import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DailyEvents from '../components/DailyEvents';
import MonthlyEvents from '../components/MonthlyEvents';
import YearEvents from '../components/YearEvents';

const EventRoutes:React.FC = () => {
  return (
    <Routes>
        <Route path='/today' element={<DailyEvents />} />
        <Route path='/thisMonth' element={<MonthlyEvents />} />
        <Route path='/thisYear' element={<YearEvents />} />
    </Routes>
  )
}

export default EventRoutes
