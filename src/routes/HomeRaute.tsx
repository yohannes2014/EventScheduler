import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import List from '../components/List';
import Calender from '../components/Calender';

const HomeRaute = () => {
  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard/*' element={<Dashboard />} >
            <Route path='list' element={<List />} />
            <Route path='calender'  element={<Calender />} />
        </Route>
    </Routes>
  )
}

export default HomeRaute


