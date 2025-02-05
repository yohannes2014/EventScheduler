import React, { useState } from 'react'
import RecInterval from './RecInterval'
import SapcificWeek from './SpacificWeek'
import RealtiveDate from './RealtiveDate'

const ComplexRecEvent:React.FC = () => {
    const [complex, setComplex] = useState<string>('recInterval')
  return (
    <div className="w-full">
    <div className="bg-niceback flex w-full justify-around mt-3  border-b-2 border-blue-200 rounded-2xl " >
        <p onClick={()=>setComplex('recInterval')} className={`${complex === "recInterval" && 'bg-blue-200'} px-5 rounded-md cursor-pointer  py-2`}>Recurring Interval</p>
        <p onClick={()=>setComplex('spacificWeek')} className={`${complex === "spacificWeek" && 'bg-blue-200'} px-5 rounded-md cursor-pointer py-2`}>Spacific Weekdays</p>
        <p onClick={()=>setComplex('relativeDates')} className={`${complex === "relativeDates" && 'bg-blue-200'} px-5 rounded-md cursor-pointer py-2`} >Relative Dates</p>
      </div>
      {complex === "recInterval" && <RecInterval />}
      {complex === "spacificWeek" && <SapcificWeek />}
      {complex === "relativeDates" && <RealtiveDate />}
    </div>
  )
}

export default ComplexRecEvent
