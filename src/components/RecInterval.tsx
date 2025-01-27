import React, { useState } from 'react'
import { RootState, Standard } from '../types/types'
import { useSelector } from 'react-redux';
import axios from 'axios';

const RecInterval = () => {
    const [newEvent, setNewEvent] = useState<Standard[]>([])
    const [events, setEvnts] = useState<Standard>({
        title:'',
        date:'',
        time:'',
        discription:'',
        id:''
    });
    const [repeat, setRepeat] = useState<number>(0);
    const [repeatType, setRepeatType] = useState<string>('days');
    const [starting, setStarting]= useState<string>('');
    const [ending, setEnding] = useState<string>('')
    const id = useSelector((state: RootState) => state.auth.user.user._id);


    const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value} = e.target;
        setEvnts({...events , [name]:value })
    }
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
      
        const newEvent: Standard[] = [];
        const start = new Date(starting);
        const end = new Date(ending);
      
        const repeatEvery = repeat;
        const repeatWeekly = repeatEvery*7
      
        // Validate that start is before end
        if (start > end) {
          alert('Starting day cannot be before ending');
          return;
        }
      
        const totalMiliSec = end.getTime() - start.getTime(); // Milliseconds between start and end
        const range = totalMiliSec / (1000 * 3600 * 24); // Convert milliseconds to days
      
        // Loop through dates using a for loop
    
       if(repeatType === 'days'){ for (let nextRepeat = start; nextRepeat <= end; nextRepeat.setDate(nextRepeat.getDate() + repeatEvery)) {
          const item:Standard = {
            title: events.title,
            time:events.time,
            date: nextRepeat.toISOString().split('T')[0], // Format as YYYY-MM-DD
            discription:events.discription,
            id:id
          };
          newEvent.push(item);
        }}
       if(repeatType === 'weeks'){ for (let nextRepeat = start; nextRepeat <= end; nextRepeat.setDate(nextRepeat.getDate() + repeatWeekly)) {
          const item:Standard = {
            title: events.title,
            time:events.time,   
            date: nextRepeat.toISOString().split('T')[0], // Format as YYYY-MM-DD
            discription:events.discription,
            id:id
          };
          newEvent.push(item);
        }}
       if(repeatType === 'months'){ for (let nextRepeat = start; nextRepeat <= end; nextRepeat.setMonth(nextRepeat.getMonth() + repeatEvery)) {
          const item:Standard = {
            title: events.title,
            time:events.time,
            date: nextRepeat.toISOString().split('T')[0], // Format as YYYY-MM-DD
            discription:events.discription,
            id:id
          };
          newEvent.push(item);
        }}
      
        axios
        .post("http://localhost:8000/users/multievents", newEvent)
        .then(res => console.log(res.data))
        .catch(err => console.log(err))

      };
      
  

      

  return (
    <div className='w-full px-10 py-5 '>
    <form className='shadow-md px-2 py-3 rounded-lg' onSubmit={handleSubmit}>
       <table>
        <tbody>
           <tr>
               <td>
               <label>Title : </label>
               <input value={events.title} onChange={handleChange} className='border-solid border-sky-100 border-2 w-full mb-2 focus:outline-yellow-200 p-1' type='text' name='title' placeholder='title' />
               </td>
           </tr>
           <tr>
               <td>
                   <label>Time : </label>
                   <input value={events.time} type='time' name='time' onChange={handleChange} className='border-solid border-sky-100 border-2 w-full mb-2 focus:outline-yellow-200 p-1' />
               </td>
           </tr>
           <tr>
               <td>
               <label>Repeat Every : </label>
               <div className='flex gap-4 items-center'>
               <input value={repeat} name='repeat' onChange={(e)=>setRepeat(Number(e.target.value))} className='border-solid border-sky-100 border-2 w-full mb-2 focus:outline-yellow-200 p-1' type='number'  />
               <select  value={repeatType} name='intervalType' onChange={(e)=>setRepeatType(e.target.value)} className='h-[30px]'>
                    <option value='days'>Days</option>
                    <option value='weeks'>Weeks</option>
                    <option value='months'>Months</option>
               </select>
              </div>
               </td>
           </tr>
           <tr>
               <td>
               <label>Starting Date : </label>
               <input value={starting} name='starting' onChange={(e)=>setStarting(e.target.value)} className='border-solid border-sky-100 border-2 w-full mb-2 focus:outline-yellow-200 p-1' type='date'  />
               </td>
           </tr>
           <tr>
               <td>
               <label>Ending Date : </label>
               <input value={ending} name='ending' onChange={(e)=>setEnding(e.target.value)} className='border-solid border-sky-100 border-2 w-full mb-2 focus:outline-yellow-200 p-1' type='date'  />
               </td>
           </tr>
        
           <tr>
               <td>
                    <label>Discription : </label>
                    <textarea value={events.discription} name='discription' onChange={handleChange} placeholder='Discription...' className='border-solid border-sky-100 border-2 w-full mb-2 focus:outline-yellow-200 p-1'></textarea>
               </td>
           </tr>
           <tr>
               <td className='flex gap-5'>
               <button className='bg-submitBtn text-white px-8 py-1 rounded-md' type='submit'>Submit</button>
               <p className='bg-cancelBtn text-white px-4 py-1 rounded-md' >Cancel</p> 
               </td>
           </tr>
           </tbody>
       </table>
   </form>
</div>
  )
}

export default RecInterval
