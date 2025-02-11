
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Event } from '../types/types';
import { createEvent, setNewCalenderEvent, setNewEvent } from '../features/events';
import axios from 'axios';
import { addEvent } from '../api/api';
import { RootState } from '../types/types';


const AddNewEvent: React.FC = () => {
  const dispatch = useDispatch();
  const selectedDate = useSelector((state: RootState) => state.events.selectedDate)
  const [input, setInput] = useState<Event>({
    title: '',
    time: '',
    date: selectedDate,
    description: ''
  });

  const [error, setError] = useState<Event>({
    title: '',
    time: '',
    date: '',
    description: ''
  })



  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInput((pre) => ({ ...pre, [name]: value }));

    setError((prev) => ({
      ...prev,
      title: value === '' ? 'Please enter title' : ''
    }));

  }
  const handleTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInput((pre) => ({ ...pre, [name]: value }));

    setError((prev) => ({
      ...prev,
      time: value === '' ? 'Please enter time' : ''
    }));

  }
  const handleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInput((pre) => ({ ...pre, [name]: value }));

    setError((prev) => ({
      ...prev,
      date: value === '' ? 'Please enter date' : ''
    }));

  }
  const handleDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setInput((pre) => ({ ...pre, [name]: value }));

    setError((prev) => ({
      ...prev,
      description: value === '' ? 'Please enter description' : ''
    }));

  }



  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (input.time === "" && input.description === "" && input.title === "") {

      setError((pre) => ({ ...pre, time: "Please enter time" }));
      setError((pre) => ({ ...pre, title: "Please enter title" }));
      setError((pre) => ({ ...pre, description: "Please enter description" }));
      return
    }
    else if (input.time === "") {
      setError((pre) => ({ ...pre, time: "Please enter time" }));
      return
    }
    else if (input.title === "") {
      setError((pre) => ({ ...pre, title: "Please enter title" }));
      return
    }
  
    else if (input.description === "") {
      setError((pre) => ({ ...pre, description: "Please enter description" }));
      return
    }
    else {
      const newEvent = {

        title: input.title,
        date: selectedDate,
        time: input.time,
        description: input.description
      }

      axios.post(addEvent, newEvent)
        .then(res => {
          dispatch(createEvent(res.data.event));
          // Reset form after successful submission

          dispatch(setNewEvent(false));

          dispatch(setNewCalenderEvent(false))
        })
        .catch(err => {
          console.error('Error adding event:', err);
        });

    }

  };

  const handleCancel = () => {

    dispatch(setNewCalenderEvent(false))
  }


  return (
    <div className="w-full px-10 py-5 ">
      <p className='text-center font-bold text-blue-950'>New Event</p>
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
                  className="border-solid border-sky-300 rounded-lg border-2 w-full mb-2 focus:outline-yellow-200 p-1"
                  type="text"
                  placeholder="Title"
                  value={input.title}
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
                  className="border-solid border-sky-300 rounded-lg border-2 w-full mb-2 focus:outline-yellow-200 p-1"
                  type="date"
                  value={selectedDate}
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
                  className="border-solid border-sky-300 rounded-lg border-2 w-full mb-2 focus:outline-yellow-200 p-1"
                  type="time"
                  value={input.time}
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
                  className="border-solid border-sky-300 rounded-lg border-2 w-full mb-2 focus:outline-yellow-200 p-1"
                  value={input.description}
                  onChange={handleDescription}
                ></textarea>
              </td>
            </tr>
            <tr>
              <td className="flex gap-5">
                <button className="bg-[#020742] text-white px-8 py-1 rounded-md" type="submit">
                  Submit
                </button>
                <p
                  className="bg-[#99a38b] text-white px-4 py-1 rounded-md cursor-pointer hover:bg-slate-400"
                  onClick={handleCancel}
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

export default AddNewEvent




