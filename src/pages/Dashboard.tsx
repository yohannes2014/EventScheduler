import React from 'react'
import DashboardHeader from '../components/DashboardHeader'
import PrivetRaute from '../routes/PrivetRaute'
import AddNewEvent from '../components/AddNewEvent'

const Dashboard = () => {



  return (
    <div className=''>
        <DashboardHeader  />
        <PrivetRaute />
        <AddNewEvent />
        
    </div>
  )
}

export default Dashboard