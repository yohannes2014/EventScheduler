import React from 'react'
import { Route, Routes } from 'react-router-dom'
import List from '../components/List'
import Calender from '../components/Calender'

const PrivetRaute = () => {
  return (
    <Routes>
        <Route path='list' element={<List />} />
        <Route path='/'  element={<Calender />} />
    </Routes>
  )
}

export default PrivetRaute