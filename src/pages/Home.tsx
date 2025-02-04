import React from 'react';
import { setUserForm } from '../features/users';
import { useDispatch } from 'react-redux';

const Home:React.FC = () => {

 
  const dispatch = useDispatch();

  const userLoginForm = () => {
   dispatch(setUserForm(true))  
  

  }
 
  return (
    <div className='flex flex-col md:mt-[100px] mt-5 h-full md:flex-row justify-around'>
  
   <div className='p-6 text-[#020742] flex justify-center flex-col'>
  <h2 className='font-black text-center xl:text-[32px] lg:text-[25px] md:text-[18px] sm:text-[16px]'>Welcome to Your Free Scheduling Hub</h2>
  <p className='mt-2 text-center xl:text-[25px] lg:text-[18px] md:text-[16px] text-[14px] font-bold'>Plan your day, week, month, and even your year.</p>
  <p className='mt-4 text-center  xl:text-[20px] lg:text-[16px] md:text-[14px] text-[12px]'>Stay organized and efficient by managing your schedule and notes all in one place.</p>
  <button onClick={userLoginForm} className='mt-4 bg-[#818dde7f] cursor-pointer text-[#020742] font-semibold py-1 rounded-md hover:bg-[#e8e9ed]'>
    Schedule Now
  </button>
</div>
  <div className='px-10 md:border-[#767cb4] md:border-l-2 md:w-[400px] lg:w-[600px]'>
    
      <img src='src/assets/onecalendar.jpg' className=' rounded-md h-full w-full' alt='profile'/> 
  </div>
    
      </div>
  )  
}

export default Home