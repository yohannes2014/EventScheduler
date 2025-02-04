import React, { useState } from 'react'
import { Event } from '../types/types'
import { eachDayOfInterval, endOfMonth, startOfMonth } from 'date-fns';
import axios from 'axios';
import { addEvent } from '../api/api';

const RealtiveDate = () => {
   
    
    const [selectedDate, setSelectedDate] = useState<Number>(1);
    const [nthWeek, setNthWeek] = useState<string>('first')
    const [month, setMonth] = useState<number>(0)
    const [year, setYear] = useState<number>(new Date().getFullYear());
    const [events, setEvents] = useState<Event>({
        title: '',
        time: '',
        date: '',
        description: ''
    
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEvents({ ...events, [name]: value })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Ensure the selected month and year are valid.
        const startOfMonthDate = startOfMonth(new Date(year, month));
        const endOfMonthDate = endOfMonth(new Date(year, month));

        // Get all days of the selected month and year.
        const daysOfMonth = eachDayOfInterval({
            start: startOfMonthDate,
            end: endOfMonthDate,
        });

        // Filter for days that match the selected weekday (selectedDate).
        const matchingDays = daysOfMonth.filter((day: Date) => day.getDay() === selectedDate);

        let targetDay: Date | undefined;

        // Handle week selection logic.
        if (nthWeek === 'first' && matchingDays[0]) {
            targetDay = matchingDays[0];
        }
        if (nthWeek === 'second' && matchingDays[1]) {
            targetDay = matchingDays[1];
        }
        if (nthWeek === 'third' && matchingDays[2]) {
            targetDay = matchingDays[2];
        }
        if (nthWeek === 'last' && matchingDays.length > 0) {
            targetDay = matchingDays[matchingDays.length - 1];
        }

        if (targetDay) {
            // Format the date correctly.
            const formattedDate = targetDay.toISOString().split('T')[0];

            // Create event object based on form values.
            const event: Event = {
                title: events.title,
                time: events.time,
                date: formattedDate,
                description: events.description
                
            };

            // Send the event to the backend via POST request.
            axios.post(addEvent, event)
            .then(res=>console.log(res.data))
            .catch(err=>console.log(err));
            
        } else {
            console.log("No matching day found for the selected options.");
        }
    }

    return (
        <div className='w-full px-10 py-5'>
            <form className='shadow-md px-2 py-3 rounded-lg' onSubmit={handleSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <label>Title : </label>
                                <input name='title' onChange={handleChange} className='border-solid border-sky-100 border-2 w-full mb-2 focus:outline-yellow-200 p-1' type='text' placeholder='title' />
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <label>Time : </label>
                                <input name='time' type='time' onChange={handleChange} className='border-solid border-sky-100 border-2 w-full mb-2 focus:outline-yellow-200 p-1' />
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <label>Day : </label>
                                <select onChange={(e) => setSelectedDate(Number(e.target.value))} className='border-solid border-sky-100 border-2 w-full mb-2 focus:outline-yellow-200 p-1'>
                                    <option value='1'>Monday</option>
                                    <option value='2'>Tuesday</option>
                                    <option value='3'>Wednesday</option>
                                    <option value='4'>Thursday</option>
                                    <option value='5'>Friday</option>
                                    <option value='6'>Saturday</option>
                                    <option value='0'>Sunday</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Week : </label>
                                <select onChange={(e) => setNthWeek(e.target.value)} className='border-solid border-sky-100 border-2 w-full mb-2 focus:outline-yellow-200 p-1'>
                                    <option value='first'>First</option>
                                    <option value='second'>Second</option>
                                    <option value='third'>Third</option>
                                    <option value='last'>Last</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Month : </label>
                                <select onChange={(e) => setMonth(Number(e.target.value))} className='border-solid border-sky-100 border-2 w-full mb-2 focus:outline-yellow-200 p-1'>
                                    <option value={0}>January</option>
                                    <option value={1}>February</option>
                                    <option value={2}>March</option>
                                    <option value={3}>April</option>
                                    <option value={4}>May</option>
                                    <option value={5}>Jun</option>
                                    <option value={6}>July</option>
                                    <option value={7}>August</option>
                                    <option value={8}>September</option>
                                    <option value={9}>October</option>
                                    <option value={10}>November</option>
                                    <option value={11}>December</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Year : </label>
                                <input name='time' type='number' onChange={(e) => setYear(Number(e.target.value))} className='border-solid border-sky-100 border-2 w-full mb-2 focus:outline-yellow-200 p-1' />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Description : </label>
                                <textarea name='description' onChange={handleChange} placeholder='description...' className='border-solid border-sky-100 border-2 w-full mb-2 focus:outline-yellow-200 p-1'></textarea>
                            </td>
                        </tr>
                        <tr>
                            <td className='flex gap-5'>
                                <button className='bg-submitBtn text-white px-8 py-1 rounded-md' type='submit'>Submit</button>
                                <p className='bg-cancelBtn text-white px-4 py-1 rounded-md'>Cancel</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    )
}

export default RealtiveDate
