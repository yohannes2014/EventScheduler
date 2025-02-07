import React, { useState } from 'react';
import { Event } from '../types/types';
import axios from 'axios';
import { addMultipleEvent, setNewEvent } from '../features/events';
import { useDispatch } from 'react-redux';
import { useSingle } from '../hooks/useEvents';
import { multipeeventApi } from '../api/api';

const RecInterval = () => {
  const dispatch = useDispatch();

  const { single, setSingle } = useSingle();
  const [repeat, setRepeat] = useState<number>(0);
  const [repeatType, setRepeatType] = useState<string>('days');
  const [startingDay, setStartingDay] = useState<string>('');
  const [ending, setEnding] = useState<string>('');
  const [error, setError] = useState({
    title: '',
    time: '',
    repeat: '',
    starting: '',
    ending: '',
    description: ''
  });


  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setSingle((pre) => ({ ...pre, [name]: value }));

    if (value === '') {
      setError((prev) => ({ ...prev, title: "Please insert title" }));
    } else {
      setError((prev) => ({ ...prev, title: "" }));
    }
  }

      //handle time change
      const handleTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setSingle((pre) => ({ ...pre, [name]: value }));

        if (value === '') {
            setError((prev) => ({ ...prev, time: "Please insert time" }));
        } else {
            setError((prev) => ({ ...prev, time: "" }));
        }
    }



  const handleRepeate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRepeat(Number(e.target.value));

  }




  const handleEnding = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnding(e.target.value);

    if (ending === '') {
      setError((prev) => ({ ...prev, ending: "Please insert last day" }));
    }

    else {
      setError((prev) => ({ ...prev, ending: "" }));
    }
  }
  const handleDecription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSingle({ ...single, [name]: value })
    if (single.description === '') {
      setError((prev) => ({ ...prev, description: "Please insert descrption" }));
    }

    else {
      setError((prev) => ({ ...prev, description: "" }));
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newEvent: Event[] = [];
    const start = new Date(startingDay);
    const end = new Date(ending);

    const repeatEvery = repeat;
    const repeatWeekly = repeatEvery * 7



    // Validation
    if (single.title === "" && single.time === ""  && single.description === '' && single.date === '' && startingDay === "" && ending === "") {
      setError((prev) => ({ ...prev, title: 'Please insert title' }));
      setError((prev) => ({ ...prev, time: 'Please insert time' }));
      setError((prev) => ({ ...prev, description: 'Please insert description' }));
      setError((prev) => ({ ...prev, starting: 'Please insert starting ' }));
      setError((prev) => ({ ...prev, ending: 'Please insert ending ' }));
      return;
  }
  else if (single.title === "") {
      setError((prev) => ({ ...prev, title: 'Please insert title' }));
      return;
  }
  else if (single.time === "") {

      setError((prev) => ({ ...prev, time: 'Please insert time' }));

      return;
  }
  else if (single.description === "") {

      setError((prev) => ({ ...prev, description: 'Please insert description' }));

      return;
  }
  else if (repeat === 0) {

      setError((prev) => ({ ...prev, interval: 'Please insert interval' }));

      return;
  }
  else if (startingDay === "") {

      setError((prev) => ({ ...prev, starting: 'Please insert starting day' }));

      return;
  }
  else if (ending === "") {

      setError((prev) => ({ ...prev, ending: 'Please insert ending day' }));

      return;
  }
else{
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
      .post(multipeeventApi, newEvent)
      .then(res => {
        dispatch(addMultipleEvent(res.data))
        dispatch(setNewEvent(false))
        setSingle({
          title: '',
          time: '',
          date: '',
          description: ''
        })
      })
      .catch(err => console.log(err))
  }
}

  return (
    <div className='w-full mt-2'>
      <form className='px-5' onSubmit={handleSubmit}>
        <table className="w-full">
          <tbody>
            <tr>
              <td>
                <div className='flex justify-between'>
                  <label>Title: </label>
                  <p className='mr-3 text-red-500 text-[14px] font-bold'>{error.title}</p>
                </div>
                <input value={single.title} onChange={handleTitle} className='border-solid border-sky-200 border-2 w-full mb-2 focus:outline-yellow-200 p-1' type='text' name='title' placeholder='title' />
              </td>
            </tr>
            <tr>
              <td>
                <div className='flex justify-between'>
                  <label>Time : </label>
                  <p className='mr-3 text-red-500 text-[14px] font-bold'>{error.time}</p>
                </div>
                <input value={single.time} type='time' name='time' onChange={handleTime} className='border-solid border-sky-200 border-2 w-full mb-2 focus:outline-yellow-200 p-1' />
              </td>
            </tr>
            <tr>
              <td>

                <div className='flex gap-5'>
                  <label>Repeat Every : </label>
                  <p className='mr-3 text-red-500 text-[14px] font-bold'>{error.repeat}</p>
                </div>
                <div className='flex gap-4 items-center'>
                  <input value={repeat} name='repeat' onChange={handleRepeate} className='border-solid border-sky-200 border-2 w-full mb-2 focus:outline-yellow-200 p-1' type='number' />
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
                <div className='flex justify-between'>
                  <label>Starting Date : </label>
                  <p className='mr-3 text-red-500 text-[14px] font-bold'>{error.starting}</p>
                </div>
                <input value={startingDay} name='startingDay' onChange={(e)=>setStartingDay(e.target.value)} className='border-solid border-sky-200 border-2 w-full mb-2 focus:outline-yellow-200 p-1' type='date' />
              </td>
            </tr>
            <tr>
              <td>

                <div className='flex justify-between'>
                  <label>Ending Date : </label>
                  <p className='mr-3 text-red-500 text-[14px] font-bold'>{error.ending}</p>
                </div>
                <input value={ending} name='ending' onChange={handleEnding} className='border-solid border-sky-200 border-2 w-full mb-2 focus:outline-yellow-200 p-1' type='date' />
              </td>
            </tr>

            <tr>
              <td>


                <div className='flex justify-between'>
                  <label>description : </label>
                  <p className='mr-3 text-red-500 text-[14px] font-bold'>{error.description}</p>
                </div>
                <textarea value={single.description} name='description' onChange={handleDecription} placeholder='description...' className='border-solid border-sky-200 border-2 w-full mb-2 focus:outline-yellow-200 p-1'></textarea>
              </td>
            </tr>
            <tr>
              <td className='flex gap-5'>
                <button className='bg-[#020740] text-white px-8 py-1 cursor-pointer rounded-md hover:bg-[#020790]' type='submit'>
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
