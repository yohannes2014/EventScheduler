import React from 'react';
import { createEvent, loadingEvents, setNewEvent } from '../features/events';
import axios from 'axios';
import { Event, RootState } from '../types/types';
import { useSingle, useSingleError, useEvent } from '../hooks/useEvents';
import { useDispatch, useSelector } from 'react-redux';
import { userEventsApi } from '../api/api';


const SingleEvent: React.FC = () => {
  const loading = useSelector((state:RootState)=>state.events.loading)
  const { single, setSingle} = useSingle();
  const { error, setError} = useSingleError();
  const { setEvents } = useEvent();
  const dispatch = useDispatch();
  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSingle({ ...single, [name]: value });

    // Title validation
    if (value === '') {
      setError((prev) => ({ ...prev, title: "Please insert title" }));
    } else {
      setError((prev) => ({ ...prev, title: "" }));
    }
  };

  const handleTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSingle({ ...single, [name]: value });

    // Time validation
    if (value === '') {
      setError((prev) => ({ ...prev, time: "Please insert time" }));
    } else {
      setError((prev) => ({ ...prev, time: "" }));
    }
  };
  const handleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSingle({ ...single, [name]: value });

    // Time validation
    if (value === '') {
      setError((prev) => ({ ...prev, date: "Please insert date" }));
    } else {
      setError((prev) => ({ ...prev, date: "" }));
    }
  };
  const handleDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSingle({ ...single, [name]: value });

    // Time validation
    if (value === '') {
      setError((prev) => ({ ...prev, description: "Please insert description" }));
    } else {
      setError((prev) => ({ ...prev, description: "" }));
    }
  };


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  

    // Title validation
    if (single.title === "" && single.time === "" && single.date === "" && single.description === '') {
      setError((prev) => ({ ...prev, title: 'Please insert title' }));
      setError((prev) => ({ ...prev, time: 'Please insert time' }));
      setError((prev) => ({ ...prev, date: 'Please insert date' }));
      setError((prev) => ({ ...prev, description: 'Please insert description' }));
      return;
    }
    else if (single.title === "") {
      setError((prev) => ({ ...prev, title: 'Please insert title' }));
      return;
    }
    else if ( single.time === "") {
     
      setError((prev) => ({ ...prev, time: 'Please insert time' }));

      return;
    }
    else if (single.date === "" ) {
     
      setError((prev) => ({ ...prev, date: 'Please insert date' }));
    
      return;
    }
    else if ( single.description === '') {

      setError((prev) => ({ ...prev, description: 'Please insert description' }));
      return;
    }
    dispatch(loadingEvents(true))
    const newEvent: Event = {
      title: single.title,
      time: single.time,
      description: single.description,
      date: single.date
    };

    // Add the new event to the events list
    setEvents((prevEvents) => [...prevEvents, newEvent]);

    axios.post(userEventsApi, newEvent)
      .then(res => {
        dispatch(createEvent(res.data.event));
      //loading
      dispatch(loadingEvents(false))

        // Reset form after successful submission
 
         dispatch(setNewEvent(false))
        setSingle({
          title: '',
          time: '',
          description: '',
          date: ''
        });
      })
      .catch(err => {
        console.error('Error adding event:', err);
      });
  };

  return (
    <div className="w-full px-10 py-5">
      <form className="shadow-md px-2 py-3 rounded-lg" onSubmit={handleSubmit}>
        <table className="w-full">
          <tbody>
            <tr>
              <td>
                <div className='flex justify-between'>
                  <label>Title: </label>
                  <p className='mr-3 text-red-500 text-[14px] font-bold'>{error.title}</p>
                </div>
                <input
                  name="title"
                  className="border-solid border-sky-100 border-2 w-full mb-2 focus:outline-yellow-200 p-1"
                  type="text"
                  placeholder="Title"
                  value={single.title}
                  onChange={handleTitle}
                />
              </td>
            </tr>
            <tr>
              <td>
                <div className='flex justify-between'>
                <label>Date: </label>
                  <p className='mr-3 text-red-500 text-[14px] font-bold'>{error.date}</p>
                </div>
                <input
                  name="date"
                  className="border-solid border-sky-100 border-2 w-full mb-2 focus:outline-yellow-200 p-1"
                  type="date"
                  value={single.date}
                  onChange={handleDate}
                />
              </td>
            </tr>
            <tr>
              <td>
                <div className='flex justify-between'>
                <label>Time: </label>
                  <p className='mr-3 text-red-500 text-[14px] font-bold'>{error.time}</p>
                </div>
                <input
                  name="time"
                  className="border-solid border-sky-100 border-2 w-full mb-2 focus:outline-yellow-200 p-1"
                  type="time"
                  value={single.time}
                  onChange={handleTime}
                />
              </td>
            </tr>
            <tr>
              <td>
                <div className='flex justify-between'>
                <label>Description: </label>
                  <p className='mr-3 text-red-500 text-[14px] font-bold'>{error.description}</p>
                </div>
                <textarea
                  name="description"
                  placeholder="Description..."
                  className="border-solid border-sky-100 border-2 w-full mb-2 focus:outline-yellow-200 p-1"
                  value={single.description}
                  onChange={handleDescription}
                ></textarea>
              </td>
            </tr>
            <tr>
              <td className="flex gap-5">
                <button className={`bg-[#020742] text-white px-8 py-1  cursor-pointer rounded-md`} type="submit">
                 {loading ? 'Loading' : 'Submit'}
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
  );
};

export default SingleEvent;
