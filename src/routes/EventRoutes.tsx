import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DailyEvents from '../components/DailyEvents';
import MonthlyEvents from '../components/MonthlyEvents';
import YearEvents from '../components/YearEvents';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';


const EventRoutes:React.FC = () => {
  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/today' element={<DailyEvents />} />
        <Route path='/thisMonth' element={<MonthlyEvents />} />
        <Route path='/thisYear' element={<YearEvents />} />
    </Routes>
  )
}

export default EventRoutes
