import React, {  useState } from 'react';
import { TbMenu3 } from "react-icons/tb";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector} from 'react-redux';
import { setEventDisplay, setNewEvent } from '../features/events';
import { RootState } from '../types/types';
import { MdNoteAdd } from "react-icons/md";

const DashboardHeader:React.FC = () => {
    const [menu, setMenu] = useState<boolean>(true);
    
    const userName = useSelector((state:RootState)=>state.auth.user?.username)

   
 

const dropdown = () =>{
    setMenu(!menu);
}
const dispatch = useDispatch() 

const handleForm = () => {
  dispatch(setNewEvent(true))
}

const listDisplay = () => {
  dispatch(setEventDisplay('list'));
  setMenu(!menu);
}

const calenderDisplay = () => {
  dispatch(setEventDisplay('calender'));
  setMenu(!menu);
}


const date = new Date()

  return (
    <div className='w-full h-[70px] bg-slate-50 flex sticky justify-between items-center top-[80px]'>
                  <div className='px-3'>
                      <p className='font-bold  text-primary text-sm'>Dashboard</p>
                      <p className='text-primary text-sm' >Hello <span className='font-bold  text-primary'>{userName}</span></p>
                  </div>
     
                <div className='md:hidden'>
                {menu ?  (<TbMenu3 onClick={dropdown} className='text-[30px] cursor-pointer font-bold  text-primary' />):
                (<IoMdClose  onClick={dropdown} className='text-[30px] cursor-pointer font-bold  text-primary' />)}
                </div>

        {!menu && <div className={`text-center md:hidden  block absolute w-full md:w-auto md:top-0 bg-[#d5d9e66a] backdrop-blur-[8px] top-[60px] gap-10 `}>
        <p onClick={listDisplay} className='cursor-pointer hover:shadow-md shadow-blue-200 py-1 rounded-xl px-2 md:font-semibold' >List of Events</p>
        <p onClick={calenderDisplay} className='cursor-pointer hover:shadow-md shadow-blue-200 py-1 rounded-xl px-2 md:font-semibold' >Calender</p>
        </div>}
        <div className={`text-center top-30 hidden  md:flex flex-row lg:py-0 gap-y-2 gap-5  ${menu ? ('my-[-500px]'):('my-[0px]')}`}>
        <p onClick={listDisplay} className='cursor-pointer hover:shadow-[0px_2px_5px_rgba(0,0,100,0.2)] py-1 shadow-sm px-2 font-semibold' >List of Events</p>
        <p onClick={calenderDisplay} className='cursor-pointer hover:shadow-[0px_2px_5px_rgba(0,0,100,0.2)] py-1 px-2 font-semibold shadow-sm' >Calender</p>
        </div> 

        <div className='flex gap-3 md:gap-5 px-3 items-center'>
       <div className='hidden md:block'>
       <button className='bg-[#b0b4c384] cursor-pointer hover:bg-[#b0b4c3fa] text-[#020742] lg:px-8 px-1 py-1 rounded-lg font-bold'  onClick={handleForm} >Add Event</button>
       </div>
        <div onClick={handleForm} className='block md:hidden'><MdNoteAdd className='text-3xl text-[#020742] cursor-pointer' /></div>
        <p className='md:font-bold font-semibold text-primary text-sm '>{date.toDateString()}</p>
        </div>
    </div>
  )
}

export default DashboardHeader
