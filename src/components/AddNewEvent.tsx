
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Event } from '../types/types';
import { setNewCalenderEvent } from '../features/events';


const AddNewEvent:React.FC = () => {
    const dispatch = useDispatch();
    const [input, setInput] = useState<Event>({
      title:'',
      time:'',
      date:'',
      description:''
    });
    
    
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name , value} = e.target;
    setInput({...input, [name]:value})
    
      };
    
      const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    const newEvent = {
     
      title:input.title,
      date:input.date,
      time:input.time,
      description:input.description
    }
    console.log(newEvent)
    
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
                    <label>Title: </label>
                    <input
                      name="title"
                      className="border-solid border-sky-300 rounded-lg border-2 w-full mb-2 focus:outline-yellow-200 p-1"
                      type="text"
                      placeholder="Title"
                      value={input.title}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Date: </label>
                    <input
                      name="date"
                      className="border-solid border-sky-300 rounded-lg border-2 w-full mb-2 focus:outline-yellow-200 p-1"
                      type="date"
                       value={input.date}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Time: </label>
                    <input
                      name="time"
                      className="border-solid border-sky-300 rounded-lg border-2 w-full mb-2 focus:outline-yellow-200 p-1"
                      type="time"
                      value={input.time}
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
                      className="border-solid border-sky-300 rounded-lg border-2 w-full mb-2 focus:outline-yellow-200 p-1"
                      value={input.description}
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




