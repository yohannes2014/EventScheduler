import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUpdateEvent, updateEvents, updateSelected } from '../features/events';
import { Event, RootState } from '../types/types';
import axios from 'axios';

const EventsHandle: React.FC = () => {
  const selected = useSelector((state: RootState) => state.events.selectEvent);
  const dispatch = useDispatch();
  const [input, setInput] = useState<Event>({
    title: '',
    time: '',
    date: '',
    description: ''
  })
  const [error, setError] = useState<Event>({
    title: '',
    time: '',
    date: '',
    description: ''
  })

  useEffect(() => {
    if (selected) {
      setInput({
        title: selected.title,
        time: selected.time,
        date: selected.date,
        description: selected.description,
      })
    }
  }, [selected])

const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
  const {name, value} = e.target;

  setInput((pre)=>({...pre, [name]:value}));

  setError((prev) => ({
    ...prev,
    title: value === '' ? 'Please enter title' : ''
}));

}
const handleTime = (e: React.ChangeEvent<HTMLInputElement>) => {
  const {name, value} = e.target;

  setInput((pre)=>({...pre, [name]:value}));

  setError((prev) => ({
    ...prev,
    time: value === '' ? 'Please enter time' : ''
}));

}
const handleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
  const {name, value} = e.target;

  setInput((pre)=>({...pre, [name]:value}));

  setError((prev) => ({
    ...prev,
    date: value === '' ? 'Please enter date' : ''
}));

}
const handleDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  const {name, value} = e.target;

  setInput((pre)=>({...pre, [name]:value}));

  setError((prev) => ({
    ...prev,
    description: value === '' ? 'Please enter description' : ''
}));

}






  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
if(input.time==="" && input.date === "" && input.description==="" && input.title === ""){

  setError((pre)=>({...pre, time:"Please enter time"}));
  setError((pre)=>({...pre, title:"Please enter title"}));
  setError((pre)=>({...pre, date:"Please enter date"}));
  setError((pre)=>({...pre, description:"Please enter description"}));
  return
}
else if(input.time===""){
  setError((pre)=>({...pre, time:"Please enter time"}));
  return
}
else if(input.title===""){
  setError((pre)=>({...pre, title:"Please enter title"}));
  return
}
else if(input.date===""){
  setError((pre)=>({...pre, date:"Please enter date"}));
  return
}
else if(input.description===""){
  setError((pre)=>({...pre, description:"Please enter description"}));
  return
}
else{
    const updatedEvent = {
      _id: selected?._id,
      title: input.title,
      date: input.date,
      time: input.time,
      description: input.description
    }
    dispatch(setUpdateEvent(updatedEvent));
    axios.put(`http://localhost:8000/api/events/${updatedEvent._id}`, updatedEvent)
      .then(() => {

        dispatch(updateEvents(false));
        dispatch(updateSelected(updatedEvent))

      })
    }
  };

  const handleCancel = () => {

    dispatch(updateEvents(false))
  }


  return (
    <div className="w-full px-10 py-5 ">
      <p className='text-center font-bold text-blue-950'>Update Event</p>
      <form className="px-2 py-3 rounded-lg" onSubmit={handleSubmit}>
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
                  value={input.date}
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
                  Update
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




export default EventsHandle