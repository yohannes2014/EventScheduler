import React, { useEffect, useState } from 'react'
import { MdOutlineNoteAdd } from "react-icons/md";
import { TbMenu3 } from "react-icons/tb";
import { IoMdClose } from "react-icons/io";
import {  NavLink} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../types/types';
import { setNewEvent } from '../features/events';

const DashboardHeader:React.FC = () => {
    const [menu, setMenu] = useState<boolean>(true);
    const [date, setDate] = useState<Date>(new Date());
const userName = useSelector((state:RootState)=>state.auth.user.user.username)
const dropdown = () =>{
    setMenu(!menu);
}
const dispatch = useDispatch() 

const handleForm = () => {
  dispatch(setNewEvent(true))
}

const listDisplay = () => {

  setMenu(!menu);
}

const calenderDisplay = () => {
 
  setMenu(!menu);
}

  return (
    <div className='w-full h-[70px] bg-slate-50 flex sticky justify-between items-center top-[80px]'>
        <div className='px-3'>
            <p className='font-bold  text-primary text-sm'>Dashboard</p>
            <p className='text-primary text-sm' >Hello <span className='font-bold  text-primary'>{userName}</span></p>
        </div>
        <div>
      {menu ?  (<TbMenu3 onClick={dropdown} className='text-[30px] cursor-pointer font-bold  text-primary' />):
        (<IoMdClose  onClick={dropdown} className='text-[30px] cursor-pointer font-bold  text-primary' />)}
        </div>
        <div className={`gap-10 absolute top-[70px] w-full text-center flex flex-col gap-y-5 py-2 shadow-md bg-white ${menu ? ('my-[-500px]'):('my-[0px]')}`}>
        <p onClick={listDisplay}>List of Events</p>
        <p onClick={calenderDisplay}>Calender</p>

        </div>
        <div className='flex gap-10 px-3'>
        <button className='bg-primary text-white px-5 py-1 hidden  ' >Add New </button>
        <MdOutlineNoteAdd onClick={handleForm}  className='text-[30px] cursor-pointer font-bold  text-primary' />
        <p className='font-bold text-primary text-sm '>{date.toDateString()}</p>

        </div>
    </div>
  )
}

export default DashboardHeader
