import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useSingleEvent} from '../hooks/useEvents';
import { setNewEvent } from '../features/events';
import { RootState } from '../types/types';
import axios from 'axios';

const SingleEvent: React.FC = () => {
  
  const {events,setEvents, single, setSingle} = useSingleEvent(); 
  const dispatch = useDispatch()
  const id = useSelector((state:RootState)=> state.auth.user.user._id)


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSingle({ ...single, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    const newEvent = {
      title:single.title,
      time: single.time,
      discription: single.discription,
      date: single.date,
      id:id 
    }

    // Add the new event to the events list
    setEvents((prevEvents) => [...prevEvents, newEvent]);

   axios.post("http://localhost:8000/users/events", newEvent)
   .then(res=>console.log(res.data))
   .catch(err=>console.log(err))


 
    // Reset form data
    setSingle({
      title: '',
      time: '',
      discription: '',
      date: '',
      id:''
      
    });

   
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
                  type="date"
                  value={single.date}
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
                  name="discription"
                  placeholder="Description..."
                  className="border-solid border-sky-100 border-2 w-full mb-2 focus:outline-yellow-200 p-1"
                  value={single.discription}
                  onChange={handleChange}
                ></textarea>
              </td>
            </tr>
            <tr>
              <td className="flex gap-5">
                <button className="bg-submitBtn text-white px-8 py-1 rounded-md" type="submit">
                  Submit
                </button>
                <p
                  className="bg-cancelBtn text-white px-4 py-1 rounded-md cursor-pointer hover:bg-slate-400"
                  onClick={()=>dispatch(setNewEvent(false))}
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
 