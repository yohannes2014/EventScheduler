import React from 'react'
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { RootState, UserEvent } from '../types/types';
import axios from 'axios';
import { deleteEvent, updateEvents, setSelectEvent, setNewEvent } from '../features/events';
import { userEventsApi } from '../api/api';


const ListEvent: React.FC = () => {
  const events = useSelector((state: RootState) => state.events.userEvent);

  const dispatch = useDispatch()



  const handleDelete = (e: string) => {

    axios.delete(`${userEventsApi}/${e}`)
      .then(() => {
        dispatch(deleteEvent(e))
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdate = (e: UserEvent) => {

    dispatch(setSelectEvent(e))
    dispatch(updateEvents(true));

  }
  const handleForm = () => {
    dispatch(setNewEvent(true))
  }


  return (
    <div className='w-full'>
      {events.length === 0 &&
        <div className='mt-20'>
          <p className=' text-blue-950 font-black text-center lg:text-2xl md:text-lg text-2xl'> No events has found !!</p>
          <p className='text-xl text-center'>Please add new event</p>

          <p className='bg-[#b0b4c384] text-center cursor-pointer mt-5 rounded-md hover:bg-[#b0b4c3fa] text-[#020742]  px-1 py-1 font-bold' onClick={handleForm} >Add Event</p>

        </div>}
      {events.map((item, index) => (
        <div className='flex flex-col gap-5 mt-5 w-[280px] 1xs:w-[380px] xs:w-[460px] sm:w-[550px] md:w-[700px] xl:w-[950px]' key={index}>

          <div>
            <div className='mx-auto top-5 shadow-md flex justify-between rounded-md hover:shadow-lg md:px-5 sm:px-3 px-1'>
              <div className='flex flex-col justify-around'>
                <p><span className='font-medium text-primary text-[12px] md:text-[16px] lg:text-[18px]'>Title</span>: <span className='text-[12px] md:text-[16px] lg:text-[18px]'>{item.title}</span></p>
                <p><span className='font-medium text-primary text-[12px] md:text-[16px] lg:text-[18px]'>Discription</span>: <span className='text-[12px] md:text-[16px] lg:text-[18px]'>{item.description}</span></p>
                <p><span className='font-medium text-primary text-[12px]  md:text-[16px] lg:text-[18px]'>Time</span>: <span className='text-[12px] md:text-[16px] lg:text-[18px]'>{item.time}</span> <span className='text-[12px] ml-3 md:text-[16px] lg:text-[18px]'>Date: {item.date}</span></p>

              </div>
              <div className='flex flex-col justify-around'>
                <p title='Edit' onClick={() => handleUpdate(item)}><FaRegEdit className='text-gray-600 hover:text-gray-900 cursor-pointer font-bold text-xl md:text-2xl' /></p>
                <p title='Delete' onClick={() => handleDelete(item._id)}><RiDeleteBin6Line className='text-red-600 hover:text-red-900 cursor-pointer font-bold text-xl md:text-2xl' /></p>
              </div>

            </div>

          </div>

        </div>
      ))}

    </div>

  )
}

export default ListEvent