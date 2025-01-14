import React, { useState } from 'react';
import { NewEvent, RootState } from '../types/types';
import { useSelector } from 'react-redux';

const AddNewEvent: React.FC = () => {
  const [eventRepeate, setEventRepeate] = useState<string>('');
  const [event, setEvent] = useState<string>('standard')
  const [repeate, setRepeate] = useState<string>('');
  const [discription, setDiscription] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const formEvent = useSelector((state: RootState) => state.events.newEvent);
  const [mon, setMon] = useState<boolean>(false);
  const [tue, setTue] = useState<boolean>(false);
  const [wed, setWed] = useState<boolean>(false);
  const [thu, setThu] = useState<boolean>(false);
  const [fri, setFri] = useState<boolean>(false);
  const [sat, setSat] = useState<boolean>(false);
  const [sun, setSun] = useState<boolean>(false);

 // to remove false value
    const selectedDays = [
    mon && 'Mon',
    tue && 'Tue',
    wed && 'Wed',
    thu && 'Thu',
    fri && 'Fri',
    sat && 'Sat',
    sun && 'Sun',
  ].filter(Boolean); 

  // here wether all value is true

  const allSelected = selectedDays.length === 7; 


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setTitle(title);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const event = {
      title,
      discription,
      repeate,
      time,
      date,
    };
    console.log(event);
    console.log(formEvent);
  };


  return (
    <div className="m-auto shadow-sm shadow-primary bg-slate-200 p-5">
      <form onSubmit={handleSubmit}>
        <p className="text-center text-lg font-semibold">New Event</p>

        <div className="flex justify-between space-x-4 my-4">
          <div
            className={`cursor-pointer bg-green-400 p-2 rounded ${
              eventRepeate === 'standard' ? 'bg-green-600' : ''
            }`}
            onClick={() => setEvent('standard')}
          >
            Standard
          </div>
          <div
            className={`cursor-pointer bg-blue-500 p-2 rounded ${
              eventRepeate === 'custom' ? 'bg-blue-700' : ''
            }`}
            onClick={() => setEvent('custom')}
          >
            Custom
          </div>
        </div>
        <table className="w-full">
          <tbody>
            <tr>
              <td className="p-2">Title</td>
              <td className="p-2">
                <input
                  type="text"
                  value={title}
                  onChange={handleChange}
                  name="title"
                  className="border rounded px-2 py-1"
                />
              </td>
            </tr>
            <tr>
              <td className="p-2">Description</td>
              <td className="p-2">
                <textarea
                  value={discription}
                  onChange={(e) => setDiscription(e.target.value)}
                  className="border rounded px-2 py-1"
                ></textarea>
              </td>
            </tr>
          </tbody>
        </table>

        {event === 'standard' && (
          <div className="p-4">
            <div className="my-3">
              <label>Time</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="border rounded p-1 ml-2"
              />
            </div> 
            <div className="my-3">
            <label>Date</label>
               <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="border rounded p-1 ml-2"
              />
            </div>
               


            <label>Repeat:</label>
            <select
              value={repeate}
              onChange={(e) => setRepeate(e.target.value)}
              name="eventRepeate"
              className="border rounded p-1 ml-2"
            >
              <option value="">No Repeat</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
  
           {repeate === 'daily' &&
            <>
            <div className='m-2'>
               <label>from </label>
               <input type='date' className="border rounded p-1 ml-2" />
            </div>
            <div className='m-2'>
               <label>to </label>
               <input type='date' className="border rounded p-1 ml-2"/>
            </div>
            </>}
           {repeate === 'weekly' && <div className=''>


{/* display selected value */}

<div className=''>
        <p><span>Every </span>
            {allSelected ? 'day': selectedDays.length > 0 ? selectedDays.join(', ') : ''}
        </p>
      </div>


           <div className='flex gap-5'>

           <div className='my-2'> 
            <label htmlFor='mon' className={`rounded-full px-1 p-1 outline outline-blue-500 ${mon ? 'text-red-600  bg-primary':'text-primary'}`} >Mo</label>
            <input type='checkbox' onChange={(e)=>setMon(!mon)} id='mon' hidden/>
            </div>
           <div className='my-2'> 
            <label htmlFor='tue' className={`rounded-full px-1 p-1 outline outline-blue-500 ${tue ? 'text-red-600  bg-primary':'text-primary'}`} >Tu</label>
            <input type='checkbox' onChange={(e)=>setTue(!tue)} id='tue' hidden/>
           </div>
           <div className='my-2'> 
            <label htmlFor='wed' className={`rounded-full px-1 p-1 outline outline-blue-500 ${wed ? 'text-red-600  bg-primary':'text-primary'}`} >We</label>
            <input type='checkbox' onChange={(e)=>setWed(!wed)} id='wed' hidden/>
           </div>
           <div className='my-2'> 
            <label htmlFor='thu' className={`rounded-full px-1 p-1 outline outline-blue-500 ${thu ? 'text-red-600  bg-primary':'text-primary'}`} >Th</label>
            <input type='checkbox' onChange={(e)=>setThu(!thu)} id='thu' hidden/>
           </div>
           <div className='my-2'> 
            <label htmlFor='fri' className={`rounded-full px-1 p-1 outline outline-blue-500 ${fri ? 'text-red-600  bg-primary':'text-primary'}`} >Fr</label>
            <input type='checkbox' onChange={(e)=>setFri(!fri)} id='fri' hidden/>
           </div>
           <div className='my-2'> 
            <label htmlFor='sat' className={`rounded-full px-1 p-1 outline outline-blue-500 ${sat ? 'text-red-600  bg-primary':'text-primary'}`} >Sa</label>
            <input type='checkbox' onChange={(e)=>setSat(!sat)} id='sat' hidden/>
           </div>
           <div className='my-2'> 
            <label htmlFor='sun' className={`rounded-full px-1 p-1 outline outline-blue-500 ${sun ? 'text-red-600  bg-primary':'text-primary'}`} >Su</label>
            <input type='checkbox' onChange={(e)=>setSun(!sun)} id='sun' hidden/>
           </div>
           </div>

            <div className='m-2'>
               <label>from </label>
               <input type='date' className="border rounded p-1 ml-2" />
            </div>
            <div className='m-2'>
               <label>to </label>
               <input type='date' className="border rounded p-1 ml-2"/>
            </div>
            
            </div>}
           {repeate === 'monthly' && 
            <>
            <div className='m-2'>
               <label>from </label>
               <input type='date' className="border rounded p-1 ml-2" />
            </div>
            <div className='m-2'>
               <label>to </label>
               <input type='date' className="border rounded p-1 ml-2"/>
            </div>
            </>}
           {repeate === 'yearly' && 
           
           
           <div className='my-2'>
           <label className='mr-4'>For</label>
           <input type='number' placeholder='years' />
           </div>}
          </div>
        )}

        {event === 'custom' && (
       <p>Custem</p>
        )}

        <div className="mt-4">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewEvent;
