import React, { useState } from 'react';
import { Event } from '../types/types';
import axios from 'axios';
import { addMultipleEvent, setNewEvent } from '../features/events';
import { useDispatch } from 'react-redux';
import { useSingle } from '../hooks/useEvents';

const RecInterval = () => {
  const dispatch = useDispatch();

  const {single, setSingle} = useSingle();
  const [repeat, setRepeat] = useState<number>(0);
  const [repeatType, setRepeatType] = useState<string>('days');
  const [starting, setStarting] = useState<string>('');
  const [ending, setEnding] = useState<string>('');


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSingle({ ...single, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newEvent: Event[] = [];
    const start = new Date(starting);
    const end = new Date(ending);

    const repeatEvery = repeat;
    const repeatWeekly = repeatEvery * 7

    // Validate that start is before end
    if (start > end) {
      alert('Starting day cannot be before ending');
      return;
    }

    // Loop through dates using a for loop

    if (repeatType === 'days') {
      for (let nextRepeat = start; nextRepeat <= end; nextRepeat.setDate(nextRepeat.getDate() + repeatEvery)) {
        const item: Event = {
          title: single.title,
          time: single.time,
          date: nextRepeat.toISOString().split('T')[0], // Format as YYYY-MM-DD
          description: single.description

        };
        newEvent.push(item);
      }
    }
    if (repeatType === 'weeks') {
      for (let nextRepeat = start; nextRepeat <= end; nextRepeat.setDate(nextRepeat.getDate() + repeatWeekly)) {
        const item: Event = {
          title: single.title,
          time: single.time,
          date: nextRepeat.toISOString().split('T')[0], // Format as YYYY-MM-DD
          description: single.description

        };
        newEvent.push(item);
      }
    }
    if (repeatType === 'months') {
      for (let nextRepeat = start; nextRepeat <= end; nextRepeat.setMonth(nextRepeat.getMonth() + repeatEvery)) {
        const item: Event = {
          title: single.title,
          time: single.time,
          date: nextRepeat.toISOString().split('T')[0], // Format as YYYY-MM-DD
          description: single.description

        };
        newEvent.push(item);
      }
    }
    axios
          .post("http://localhost:8000/api/events/multiple", newEvent)
          .then(res => {
              dispatch(addMultipleEvent(res.data))
             
          })
          .catch(err => console.log(err))
         setSingle({
            title:'',
            time:'',
            date:'',
            description:''
         })
  };





  return (
    <div className='w-full mt-2'>
      <form className='px-5' onSubmit={handleSubmit}>
        <table className="w-full">
          <tbody>
            <tr>
              <td>
                <label>Title : </label>
                <input value={single.title} onChange={handleChange} className='border-solid border-sky-200 border-2 w-full mb-2 focus:outline-yellow-200 p-1' type='text' name='title' placeholder='title' />
              </td>
            </tr>
            <tr>
              <td>
                <label>Time : </label>
                <input value={single.time} type='time' name='time' onChange={handleChange} className='border-solid border-sky-200 border-2 w-full mb-2 focus:outline-yellow-200 p-1' />
              </td>
            </tr>
            <tr>
              <td>
                <label>Repeat Every : </label>
                <div className='flex gap-4 items-center'>
                  <input value={repeat} name='repeat' onChange={(e) => setRepeat(Number(e.target.value))} className='border-solid border-sky-200 border-2 w-full mb-2 focus:outline-yellow-200 p-1' type='number' />
                  <select value={repeatType} name='intervalType' onChange={(e) => setRepeatType(e.target.value)} className='mb-2 h-[34px] w-80 border-solid border-sky-200 border-2'>
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
                <input value={starting} name='starting' onChange={(e) => setStarting(e.target.value)} className='border-solid border-sky-200 border-2 w-full mb-2 focus:outline-yellow-200 p-1' type='date' />
              </td>
            </tr>
            <tr>
              <td>
                <label>Ending Date : </label>
                <input value={ending} name='ending' onChange={(e) => setEnding(e.target.value)} className='border-solid border-sky-200 border-2 w-full mb-2 focus:outline-yellow-200 p-1' type='date' />
              </td>
            </tr>

            <tr>
              <td>
                <label>description : </label>
                <textarea value={single.description} name='description' onChange={handleChange} placeholder='description...' className='border-solid border-sky-200 border-2 w-full mb-2 focus:outline-yellow-200 p-1'></textarea>
              </td>
            </tr>
            <tr>
              <td className='flex gap-5'>
                <button className='bg-[#020740] text-white px-8 py-1 rounded-md hover:bg-[#020790]' type='submit'>
                  Submit
                </button>
                <p
                  className="bg-[#99a38b] text-white px-4 py-1 rounded-md cursor-pointer hover:bg-slate-400"
                  onClick={() => dispatch(setNewEvent(false))}
                >
                  Cancel
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  )
}

export default RecInterval
