import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useSingleEvent} from '../hooks/useEvents';
import axios from 'axios';
import { addEvent } from '../api/api';
import { Event, RootState } from '../types/types';
import { setAddCalecder, setAddNewEvent } from '../features/events';

const CalenderEventForm:React.FC = () => {


  
  const {single, setSingle} = useSingleEvent(); 
  const dispatch = useDispatch();
 const selectedDate = useSelector((state:RootState)=>state.events.selectedDate)


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSingle({ ...single, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    const newEvent:Event = {
      title:single.title,
      time: single.time,
      description: single.description,
      date:selectedDate
    }



  axios.post(addEvent, newEvent)
  .then(()=>dispatch(setAddNewEvent(newEvent)))
  .catch(err=>console.log(err));
  
 dispatch(setAddCalecder(false))
   
  };

  return (
    <div className="w-full px-10 py-5">
      <form className="shadow-md px-2 py-3 rounded-lg" onSubmit={handleSubmit}>
        <table className="w-full">
          <tbody>
            <tr>
              <td>
                <label>Title: </label>
                <input
                  name="title"
                  className="border-solid border-sky-100 border-2 w-full mb-2 focus:outline-yellow-200 p-1"
                  type="text"
                  placeholder="Title"
                  value={single.title}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Date: </label>
                <input
                  name="date"
                  className="border-solid border-sky-100 border-2 w-full mb-2 focus:outline-yellow-200 p-1"
                  type="text"
                  value={selectedDate}
                  disabled
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Time: </label>
                <input
                  name="time"
                  className="border-solid border-sky-100 border-2 w-full mb-2 focus:outline-yellow-200 p-1"
                  type="time"
                  value={single.time}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Description: </label>
                <textarea
                  name="description"
                  placeholder="Description..."
                  className="border-solid border-sky-100 border-2 w-full mb-2 focus:outline-yellow-200 p-1"
                  value={single.description}
                  onChange={handleChange}
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
                  onClick={()=>dispatch(setAddCalecder(false))}
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




export default CalenderEventForm