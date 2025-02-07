import React from 'react'
import SingleEvent from './SingleEvent';
import ComplexRecEvent from './ComplexRecEvent';
import { setEventType } from '../features/events';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../types/types';
import StandardEvents from './StandardEvents';

const NewEvent:React.FC = () => {
  const eventType = useSelector((state:RootState)=>state.events.eventType)
  const newEvent = useSelector((state:RootState)=>state.events.newEvent)
  const dispatch = useDispatch();
  
  return (
    <>
{newEvent &&    <div className='fixed w-full h-full z-10 bg-[rgba(205, 209, 234, 0.681)] backdrop-blur-[4px] flex justify-center z-1'>
          <div className='bg-white left-0 right-0  w-[700px] shadow-blue-500 shadow-md px-3 p-5 rounded-3xl h-fit xxs:mt-[100px] '>
    
    <div className='flex justify-between gap-5 px-2 bg-slate-100 py-1 w-full m-auto'>
        <p onClick={()=>dispatch(setEventType('single'))} className={`text-center border-solid border-primary border-[1px]  py-1 md:px-2 px-1 text-primary cursor-pointer font-medium rounded-lg ${eventType === 'single' && 'bg-[#b0b4c384]'}`}> Single Occurrence</p>
        <p onClick={()=>dispatch(setEventType('standard'))} className={`text-center  border-solid border-primary border-[1px] py-1 md:px-2 px-1 text-primary cursor-pointer font-medium rounded-lg ${eventType === 'standard' && 'bg-[#b0b4c384]'}`}>Standard Recurrence</p>
        <p onClick={()=>dispatch(setEventType('complex'))} className={`text-center  border-solid border-primary border-[1px] py-1 md:px-2 px-1  text-primary cursor-pointer font-medium rounded-lg ${eventType === 'complex' && 'bg-[#b0b4c384]'}`}>Complex Recurrence</p>
    </div>
    <div className='flex justify-center items-center'>
        {eventType === 'single' && <SingleEvent />}
        {eventType === 'standard' && <StandardEvents />}
        {eventType === 'complex' && <ComplexRecEvent />}

    </div>
</div>
      
    </div>}

    </>
  )
}

export default NewEvent
 