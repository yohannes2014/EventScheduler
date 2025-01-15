import React, { useState } from 'react'
import SingleEvent from './SingleEvent';
import StandardEvent from './StandardEvent';
import ComplexRecEvent from './ComplexRecEvent';

const NewEvent = () => {
    const [eventType, setEventType] = useState<string>('single');
  return (
    <div className='fixed bg-white top-36 left-0 right-0 '>
    <div >
        <div className='flex justify-between gap-5 px-2 bg-slate-100 py-1'>
            <p onClick={()=>setEventType('single')} className={`text-center border-solid border-primary border-[1px]  text-primary cursor-pointer font-medium rounded-lg ${eventType === 'single' && 'bg-red-100'}`}> Single Occurrence</p>
            <p onClick={()=>setEventType('standard')} className={`text-center  border-solid border-primary border-[1px] text-primary cursor-pointer font-medium rounded-lg ${eventType === 'standard' && 'bg-red-100'}`}>Standard Recurrence</p>
            <p onClick={()=>setEventType('complex')} className={`text-center  border-solid border-primary border-[1px]  text-primary cursor-pointer font-medium rounded-lg ${eventType === 'complex' && 'bg-red-100'}`}>Complex Recurrence</p>
        </div>
        <div className='flex justify-center items-center'>
            {eventType === 'single' && <SingleEvent />}
            {eventType === 'standard' && <StandardEvent />}
            {eventType === 'complex' && <ComplexRecEvent />}

        </div>
    </div>
    </div>
  )
}

export default NewEvent
