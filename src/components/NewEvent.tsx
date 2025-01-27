import React, { useState } from 'react'
import SingleEvent from './SingleEvent';
import ComplexRecEvent from './ComplexRecEvent';
import { setEventType } from '../features/events';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../types/types';
import StandardEvents from './StandardEvents';

const NewEvent = () => {
  const eventType = useSelector((state:RootState)=>state.events.eventType)
  const dispatch = useDispatch();
  
  return (
    <div className='fixed bg-white top-36 left-0 right-0 '>
    <div >
        <div className='flex justify-between gap-5 px-2 bg-slate-100 py-1'>
            <p onClick={()=>dispatch(setEventType('single'))} className={`text-center border-solid border-primary border-[1px]  text-primary cursor-pointer font-medium rounded-lg ${eventType === 'single' && 'bg-red-100'}`}> Single Occurrence</p>
            <p onClick={()=>dispatch(setEventType('standard'))} className={`text-center  border-solid border-primary border-[1px] text-primary cursor-pointer font-medium rounded-lg ${eventType === 'standard' && 'bg-red-100'}`}>Standard Recurrence</p>
            <p onClick={()=>dispatch(setEventType('complex'))} className={`text-center  border-solid border-primary border-[1px]  text-primary cursor-pointer font-medium rounded-lg ${eventType === 'complex' && 'bg-red-100'}`}>Complex Recurrence</p>
        </div>
        <div className='flex justify-center items-center'>
            {eventType === 'single' && <SingleEvent />}
            {eventType === 'standard' && <StandardEvents />}
            {eventType === 'complex' && <ComplexRecEvent />}

        </div>
    </div>
    </div>
  )
}

export default NewEvent
 