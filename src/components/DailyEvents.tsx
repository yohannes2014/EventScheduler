
import {  Event } from "../types/types";
import { useState } from "react";
import axios from "axios";

const DailyEvents = () => {

  const [range, setRange] = useState<number>(0);
  const [rangeType, setRangeType] = useState<string>('days');

  const [standard, setStandard] = useState<Event>({
      title: '',
      description: '',
      time: '',
      date: ''
     
  });

  const HandleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setStandard({ ...standard, [name]: value });
  };

  const HandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const start = new Date(standard.date);
      let nextRepeat = new Date(start);
      const newEvent: Event[] = [];
      const week = range * 7;
      const month = range * 30;
      const year = range * 365;


          if (rangeType === "days") {
              for (let i = 1; i <= range; i++) {
                  nextRepeat.setDate(nextRepeat.getDate() + 1);
                  const item = {
                      title: standard.title,
                      description: standard.description,
                      time: standard.time,
                      date: nextRepeat.toISOString().split('T')[0]
                     
                  };
                  newEvent.push(item);
              }
          }
          if (rangeType === "weeks") {
              for (let i = 1; i <= week; i++) {
                  nextRepeat.setDate(nextRepeat.getDate() + 1);
                  const item = {
                      title: standard.title,
                      description: standard.description,
                      time: standard.time,
                      date: nextRepeat.toISOString().split('T')[0]
                    
                  };
                  newEvent.push(item);
              }
          }
          if (rangeType === "months") {
              for (let i = 1; i <= month; i++) {
                  nextRepeat.setDate(nextRepeat.getDate() + 1);
                  const item = {
                      title: standard.title,
                      description: standard.description,
                      time: standard.time,
                      date: nextRepeat.toISOString().split('T')[0]
                     
                  };
                  newEvent.push(item);
              }
          }
          if (rangeType === "years") {
              for (let i = 1; i <= year; i++) {
                  nextRepeat.setDate(nextRepeat.getDate() + 1);
                  const item = {
                      title: standard.title,
                      description: standard.description,
                      time: standard.time,
                      date: nextRepeat.toISOString().split('T')[0]
                      
                  };
                  newEvent.push(item);
              }
          }
         

     
     
      axios
          .post("http://localhost:8000/api/events/multiple", newEvent)
          .then(res => console.log(res.data))
          .catch(err => console.log(err));
  };



  return (
    <div className='w-full px-10 py-2'>
    <form className='shadow-md px-2 py-3 rounded-lg' onSubmit={HandleSubmit}>
        <table>
            <tbody>
                <tr>
                    <td>
                        <label>Title: </label>
                        <input
                            className='border-solid border-sky-100 border-2 w-full mb-2 focus:outline-yellow-200 p-1'
                            type='text'
                            placeholder='Title'
                            name='title'
                            value={standard.title}
                            onChange={HandleChange}
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Time: </label>
                        <input
                            type='time'
                            className='border-solid border-sky-100 border-2 w-full mb-2 focus:outline-yellow-200 p-1'
                            name='time'
                            value={standard.time}
                            onChange={HandleChange}
                        />
                    </td>
                </tr>

                <tr>
                    <td>
                        <label>Starting date: </label>
                        <input
                            name="date"
                            className="border-solid border-sky-100 border-2 w-full mb-2 focus:outline-yellow-200 p-1"
                            type="date"
                            value={standard.date}
                            onChange={HandleChange}
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>For next: </label>
                        <div className='flex gap-4 items-center'>
                            <input
                                value={range}
                                onChange={(e) => setRange(Number(e.target.value))}
                                className='border-solid border-sky-100 border-2 w-full mb-2 focus:outline-yellow-200 p-1'
                                type='number'
                            />
                            <select onChange={(e) => setRangeType(e.target.value)} className='h-[35px]'>
                                <option value='days'>Days</option>
                                <option value='weeks'>Weeks</option>
                                <option value='months'>Months</option>
                                <option value='years'>Years</option>
                            </select>
                        
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Description: </label>
                        <textarea
                            onChange={HandleChange}
                            name='description'
                            placeholder='Description...'
                            className='border-solid border-sky-100 border-2 w-full mb-2 focus:outline-yellow-200 p-1'
                            value={standard.description}
                        ></textarea>
                    </td>
                </tr>
                <tr>
                    <td className='flex gap-5'>
                        <button className='bg-blue-600 text-white px-8 py-1 rounded-md' type='submit'>
                            Submit
                        </button>
                        <p className='bg-gray-600 text-white px-4 py-1 rounded-md'>Cancel</p>
                    </td>
                </tr>
            </tbody>
        </table>
    </form>
</div>
  )
}

export default DailyEvents