import React, { useState } from 'react'
import RecInterval from './RecInterval'
import SapcificWeek from './SapcificWeek'
import RealtiveDate from './RealtiveDate'

const ComplexRecEvent:React.FC = () => {
    const [complex, setComplex] = useState<string>('recInterval')
  return (
    <div>
      <div className='flex justify-between px-2 bg-blue-50'>
        <p onClick={()=>setComplex('recInterval')} className='cursor-pointer hover:bg-yellow-200 px-3 rounded-md text-center'>Recurring Interval</p>
        <p onClick={()=>setComplex('spacificWeek')} className='cursor-pointer hover:bg-yellow-200 px-3 rounded-md text-center'>Spacific Weekdays</p>
        <p onClick={()=>setComplex('relativeDates')} className='cursor-pointer hover:bg-yellow-200 px-3 rounded-md text-center'>Relative Dates</p>
      </div>
      {complex === "recInterval" && <RecInterval />}
      {complex === "spacificWeek" && <SapcificWeek />}
      {complex === "relativeDates" && <RealtiveDate />}
    </div>
  )
}

export default ComplexRecEvent
