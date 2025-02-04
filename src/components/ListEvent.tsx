import React from 'react'
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../types/types';
import axios from 'axios';
import { deleteEvent } from '../features/events';


const ListEvent:React.FC = () => {
  const events = useSelector((state:RootState)=>state.events.userEvent);

  const dispatch = useDispatch()
 

  const handleDelete = (e: string) => {

    axios.delete(`http://localhost:8000/api/events/${e}`)
      .then(() => {
        dispatch(deleteEvent(e))
      })
      .catch((err) => {
        console.log(err);
      });
  };




  return (
    <div>
{events.map((item, index)=>(
  <div className='flex flex-col gap-5 mt-5 ' key={index}>
 
  <div>
    <div className='w-[800px] mx-auto top-5 shadow-md flex justify-between px-2 rounded-md hover:shadow-lg '>
         <div className='flex flex-col justify-around'>
          <p><span className='font-medium text-primary'>title</span> : <span>{item.title}</span></p>
          <p><span className='font-medium text-primary'>discription</span> : <span>{item.description}</span></p>
          <p><span className='font-medium text-primary'>time</span> : <span>{item.time}</span> Date : {item.date}<span></span></p>
       
        </div>
        <div className='flex flex-col justify-around'>
          <p title='Edit'><FaRegEdit className='text-gray-600 hover:text-gray-900 cursor-pointer font-bold text-2xl' /></p>
          <p title='Delete' onClick={() =>handleDelete(item._id)}><RiDeleteBin6Line className='text-red-600 hover:text-red-900 cursor-pointer font-bold text-2xl' /></p>
          </div> 
        
    </div>
    
  </div>

</div>
))}

    </div>
    
  )
}

export default ListEvent