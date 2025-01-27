import React, { useState } from 'react';
import { RootState, SelectedDays, Standard } from '../types/types';
import { useSelector } from 'react-redux';
import axios from 'axios';

const SapcificWeek = () => {
    const id = useSelector((state:RootState)=>state.auth.user.user._id)
    const [starting, setStarting] = useState<string>('');
    const [ending, setEnding] = useState<string>('');
    const [selectedDate, setSelectedDate] = useState<Number[]>([])
    const [inputs, setInputs] = useState<Standard>({
        title:'',
        time:'',
        date:'',
        discription:'',
        id:''
    })


    const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
          const { name, value} = e.target;
          setInputs({...inputs, [name]:value})
    }

    const handleWeekDays = (e:React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;

         if(checked){
           setSelectedDate((pre)=>[...pre, Number(value)])
         }
         else {
            setSelectedDate((pre)=>pre.filter((day)=> day !== Number(value)))
         }
    }

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
       e.preventDefault();
       const start = new Date(starting);
       const end = new Date(ending);
       const newEvent:Standard[] = [];

       for(let currentDate = start; currentDate<=end; currentDate.setDate(currentDate.getDate() + 1)){
        const formattedDate = currentDate.toISOString().split('T')[0];
        const weekDate = currentDate.getDay();

        if(selectedDate.includes(weekDate)){
            const event:Standard = {
        
                title:inputs.title,
                time:inputs.time,
                date:formattedDate,
                discription:inputs.discription,
                id:id
            }
            newEvent.push(event)
        }
       }
       axios
       .post("http://localhost:8000/users/multievents", newEvent)
       .then(res => console.log(res.data))
       .catch(err => console.log(err));

    }
    
   


  return (
    <div className='w-full px-10 py-5'>
    <form className='shadow-md px-2 py-3 rounded-lg' onSubmit={handleSubmit}>
        <table>
            <tbody>
            <tr>
                <td>
                    <label>Title : </label>
                    <input name='title' onChange={handleChange} className='border-solid border-sky-100 border-2 w-full mb-2 focus:outline-yellow-200 p-1' type='text' placeholder='title' />
                </td>
            </tr>

            <tr>
                <td>
                    <label>Time : </label>
                    <input type='time' name='time' onChange={handleChange} className='border-solid border-sky-100 border-2 w-full mb-2 focus:outline-yellow-200 p-1' />
                </td>
            </tr>
            <tr>
                <td>
                    <label>Starting date : </label>
                    <input onChange={(e)=>setStarting(e.target.value)} className='border-solid border-sky-100 border-2 w-full mb-2 focus:outline-yellow-200 p-1' type='date' />
                </td>
            </tr>
            <tr>
                <td>
                    <label>Ending date : </label>
                    <input onChange={(e)=>setEnding(e.target.value)} className='border-solid border-sky-100 border-2 w-full mb-2 focus:outline-yellow-200 p-1' type='date' />
                </td>
            </tr>
                <tr>
                    <td>
                        <label>Every : </label>
                        <div className='flex gap-5'>

                            <div className='my-2'>
                                <label htmlFor='mon' className={`rounded-full px-1 p-1 outline outline-blue-500 `} >Mo</label>
                                <input type='checkbox'  onChange={handleWeekDays} id='mon' value={1} />
                            </div>
                            <div className='my-2'>
                                <label htmlFor='tue' className={`rounded-full px-1 p-1 outline outline-blue-500 `} >Tu</label>
                                <input type='checkbox'   onChange={handleWeekDays} id='tue' value={2} />
                            </div>
                            <div className='my-2'>
                                <label htmlFor='wed' className={`rounded-full px-1 p-1 outline outline-blue-500 `} >We</label>
                                <input type='checkbox'  onChange={handleWeekDays} value={3} id='wed' />
                            </div>
                            <div className='my-2'>
                                <label htmlFor='thu' className={`rounded-full px-1 p-1 outline outline-blue-500 `} >Th</label>
                                <input type='checkbox'   onChange={handleWeekDays} id='thu' value={4} />
                            </div>
                            <div className='my-2'>
                                <label htmlFor='fri' className={`rounded-full px-1 p-1 outline outline-blue-500 `} >Fr</label>
                                <input type='checkbox'  onChange={handleWeekDays} value={5} id='fri' />
                            </div>
                            <div className='my-2'>
                                <label htmlFor='sat' className={`rounded-full px-1 p-1 outline outline-blue-500 `} >Sa</label>
                                <input type='checkbox' onChange={handleWeekDays} value={6} id='sat' />
                            </div>
                            <div className='my-2'>
                                <label htmlFor='sun' className={`rounded-full px-1 p-1 outline outline-blue-500 `} >Su</label>
                                <input type='checkbox'  onChange={handleWeekDays} value={0} id='sun' />
                            </div>
                        </div>
                    </td>
                </tr>
            
            <tr>
                <td>
                    <label>Discription : </label>
                    <textarea name='discription' onChange={handleChange} placeholder='Discription...' className='border-solid border-sky-100 border-2 w-full mb-2 focus:outline-yellow-200 p-1'></textarea>
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

export default SapcificWeek