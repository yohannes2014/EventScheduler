import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';

const AllRoutes:React.FC = () => {
  return (
    <div className='px-5'>
        <Routes >
                <Route path='/' element={<Home />} />
                <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
    </div>
    
  )
}

export default AllRoutes



