import React from 'react'
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

const ListEvent = () => {
  return (
    <div className='flex flex-col gap-5 mt-5 '>
      <div className='flex justify-between w-[800px] bg-niceback'>
        <p>Today</p>
        <p>Week</p>
        <p>Month</p> 
        <p>Year</p>
      </div>
      <div>
        <div className='w-[800px] mx-auto top-5 shadow-md flex justify-between px-2 rounded-md hover:shadow-lg '>
             <div className='flex flex-col justify-around'>
              <p><span className='font-medium text-primary'>title</span> : <span>Meeting</span></p>
              <p><span className='font-medium text-primary'>discription</span> : <span>This is ... lorem50</span></p>
              <p><span className='font-medium text-primary'>time</span> : <span>20:45</span></p>
            </div>
            <div className='flex flex-col justify-around'>
              <p title='Edit'><FaRegEdit className='text-gray-600 hover:text-gray-900 cursor-pointer font-bold text-2xl' /></p>
              <p title='Delete'><RiDeleteBin6Line className='text-red-600 hover:text-red-900 cursor-pointer font-bold text-2xl' /></p>
              </div> 
            
        </div>
        
      </div>

    </div>
  )
}

export default ListEvent