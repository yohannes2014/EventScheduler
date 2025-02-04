import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../types/types'
import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { setNotifiCard } from '../features/users';
import { setAddCalecder } from '../features/events';

const Notification:React.FC = () => {
    const notification = useSelector((state:RootState)=>state.users.notification);
    const note = useSelector((state:RootState)=>state.users.notificationName);
    const selected = useSelector((state:RootState)=>state.events.selectedEvent);
    const dispatich = useDispatch();
    const handleAddNew = () => {
      dispatich(setNotifiCard(false));
      dispatich(setAddCalecder(true))
      
    }
  return (
    <div className='absolute w-[700px] rounded-Sxl bg-white shadow-blue-300 shadow-md'>
      <div className='w-full bg-blue-100 py-1 font-bold text-center text-blue-900'>Event Notification</div>
      {note === 'NoEvent' && <div className='flex justify-center h-[70px] items-center'>
        <p className='font-black'>{notification}</p>
      </div> }
      {note === 'Event' &&
         <div>
     {selected?.map((item, index)=>(
       <div className='flex flex-col gap-5 mt-5 ' key={index}>
      
       <div>
         <div className='w-full mx-auto top-5 shadow-md flex justify-between px-2 rounded-md hover:shadow-lg '>
              <div className='flex flex-col justify-around'>
               <p><span className='font-medium text-primary'>title</span> : <span>{item.title}</span></p>
               <p><span className='font-medium text-primary'>discription</span> : <span>{item.description}</span></p>
               <p><span className='font-medium text-primary'>time</span> : <span>{item.time}</span></p>
            
             </div>
             <div className='flex flex-col justify-around'>
               <p title='Edit'><FaRegEdit className='text-gray-600 hover:text-gray-900 cursor-pointer font-bold text-2xl' /></p>
               <p title='Delete' ><RiDeleteBin6Line className='text-red-600 hover:text-red-900 cursor-pointer font-bold text-2xl' /></p>
               </div> 
             
         </div>
         
       </div>
     
     </div>
     ))}
     
         </div>
      }

      <div className='flex justify-center gap-5 py-2'>
        <button onClick={()=>handleAddNew()} className='px-6 bg-amber-300 rounded-md py-1 cursor-pointer'> Add </button>
        <button onClick={()=>dispatich(setNotifiCard(false))} className='px-2 bg-amber-300 rounded-md py-1 cursor-pointer'> Cancel </button>
      </div>
    </div>
  )
}

export default Notification
