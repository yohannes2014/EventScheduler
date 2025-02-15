import React, { useState } from 'react'
import { Event, RootState } from '../types/types'
import { eachDayOfInterval, endOfMonth, startOfMonth, format } from 'date-fns';
import axios from 'axios';
import { createEvent, loadingEvents, setNewEvent } from '../features/events';
import { useDispatch, useSelector } from 'react-redux';
import { toZonedTime } from 'date-fns-tz';
import { userEventsApi } from '../api/api';

const RealtiveDate = () => {

    const dispatch = useDispatch();
    const loading = useSelector((state:RootState)=>state.events.loading)
    const [selectedDate, setSelectedDate] = useState<number>(0);
    const [nthWeek, setNthWeek] = useState<string>('first');
    const [month, setMonth] = useState<number>(0);
    const [year, setYear] = useState<number>(new Date().getFullYear());
    const [events, setEvents] = useState<Event>({
        title: '',
        time: '',
        date: '',
        description: ''
    });

    const [error, setError] = useState({
        title: '',
        time: '',
        year: '',
        description: ''
    });

    const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEvents({ ...events, [name]: value });
        setError((prev) => ({
            ...prev,
            title: value === '' ? 'Please enter title' : ''
        }));
    };

    const handleTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEvents({ ...events, [name]: value });
        setError((prev) => ({
            ...prev,
            time: value === '' ? 'Please enter time' : ''
        }));
    };

    const handleYear = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newYear = Number(e.target.value);
        setYear(newYear);
        setError((prev) => ({
            ...prev,
            year: newYear === 0 ? 'Please enter year' : newYear < 2025 ? 'Please enter valid year' : ''
        }));
    };

    const handleDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEvents({ ...events, [name]: value });
        setError((prev) => ({
            ...prev,
            description: value === '' ? 'Please enter description' : ''
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        const startOfMonthDate = startOfMonth(new Date(year, month));
        const endOfMonthDate = endOfMonth(new Date(year, month));

        const daysOfMonth = eachDayOfInterval({
            start: startOfMonthDate,
            end: endOfMonthDate,
        });

        // Validation
        if (events.title === "" || events.time === "" || year === 0 || events.description === "") {
            setError((prev) => ({
                ...prev,
                title: events.title === "" ? 'Please enter title' : prev.title,
                time: events.time === "" ? 'Please enter time' : prev.time,
                year: year === 0 ? 'Please enter year' : year < 2025 ? 'Please enter valid year' : prev.year,
                description: events.description === "" ? 'Please enter event description' : prev.description,
            }));
            return;
        }
        dispatch(loadingEvents(true))
        const matchingDays = daysOfMonth.filter((day: Date) => day.getDay() === selectedDate);

        let targetDay: Date | undefined;

        if (nthWeek === 'first' && matchingDays[0]) targetDay = matchingDays[0];
        if (nthWeek === 'second' && matchingDays[1]) targetDay = matchingDays[1];
        if (nthWeek === 'third' && matchingDays[2]) targetDay = matchingDays[2];
        if (nthWeek === 'last' && matchingDays.length > 0) targetDay = matchingDays[matchingDays.length - 1];

        if (targetDay) {
            const localTargetDay = toZonedTime(targetDay, timeZone);
            const formattedDate = format(localTargetDay, 'yyyy-MM-dd');

            const event: Event = {
                title: events.title,
                time: events.time,
                date: formattedDate,
                description: events.description
            };

            axios.post(userEventsApi, event)
                .then((res) => {
                    dispatch(setNewEvent(false));
                    dispatch(createEvent(res.data.event));
                    dispatch(loadingEvents(true))
                })
                .catch(err => console.log(err));
        } else {
            console.log("No matching day found for the selected options.");
        }
    };

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
                                <input name='title' onChange={handleTitle} className='border-solid border-sky-200 border-2 w-full mb-2 focus:outline-yellow-200 p-1' type='text' placeholder='title' />
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <div className='flex justify-between'>
                                    <label>Time : </label>
                                    <p className='mr-3 text-red-500 text-[14px] font-bold'>{error.time}</p>
                                </div>
                                <input name='time' type='time' onChange={handleTime} className='border-solid border-sky-200 border-2 w-full mb-2 focus:outline-yellow-200 p-1' />
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <label>Day : </label>
                                <select onChange={(e) => setSelectedDate(Number(e.target.value))} className='border-solid border-sky-200 border-2 w-full mb-2 focus:outline-yellow-200 p-1'>
                                    <option value='0'>Sunday</option>
                                    <option value='1'>Monday</option>
                                    <option value='2'>Tuesday</option>
                                    <option value='3'>Wednesday</option>
                                    <option value='4'>Thursday</option>
                                    <option value='5'>Friday</option>
                                    <option value='6'>Saturday</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Week : </label>
                                <select onChange={(e) => setNthWeek(e.target.value)} className='border-solid border-sky-200 border-2 w-full mb-2 focus:outline-yellow-200 p-1'>
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
                                <select onChange={(e) => setMonth(Number(e.target.value))} className='border-solid border-sky-200 border-2 w-full mb-2 focus:outline-yellow-200 p-1'>
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
                                <div className='flex justify-between'>
                                    <label>Year : </label>
                                    <p className='mr-3 text-red-500 text-[14px] font-bold'>{error.year}</p>
                                </div>
                                <input name='time' type='number' onChange={handleYear} className='border-solid border-sky-200 border-2 w-full mb-2 focus:outline-yellow-200 p-1' />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className='flex justify-between'>
                                    <label>Description : </label>
                                    <p className='mr-3 text-red-500 text-[14px] font-bold'>{error.description}</p>
                                </div>
                                <textarea name='description' onChange={handleDescription} placeholder='description...' className='border-solid border-sky-200 border-2 w-full mb-2 focus:outline-yellow-200 p-1'></textarea>
                            </td>
                        </tr>
                        <tr>
                            <td className='flex gap-5'>
                            <button className='bg-[#020740] text-white px-8 py-1 cursor-pointer rounded-md hover:bg-[#020790]' type='submit'>
                          {loading ? "Loading..." : "Submit"}
                        </button>
                                <p className="bg-[#99a38b] text-white px-4 py-1 rounded-md cursor-pointer hover:bg-slate-400" onClick={() => dispatch(setNewEvent(false))}>
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

export default RealtiveDate;
