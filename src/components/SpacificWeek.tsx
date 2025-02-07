import React, { useState } from 'react';
import { Event } from '../types/types';
import axios from 'axios';
import { addMultipleEvent, setNewEvent } from '../features/events';
import { useDispatch } from 'react-redux';
import { multipeeventApi } from '../api/api';

const SapcificWeek = () => {

    const [selectedDate, setSelectedDate] = useState<Number[]>([])
    const dispatch = useDispatch();
    const [inputs, setInputs] = useState({
        title: '',
        time: '',
        date: '',
        description: '',
         starting:'',
        ending:''

    });

    const [error, setError] = useState({
        title: '',
        time: '',
        starting: '',
        ending: '',
        description: ''
    })


    const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setInputs((pre) => ({ ...pre, [name]: value }));

        if (value === '') {
            setError((pre) => ({ ...pre, title: "Please enter title" }));
            return
        }
        else{
            setError((pre) => ({ ...pre, title: "" }));
            return
        }

    }
    const handleTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setInputs((pre) => ({ ...pre, [name]: value }));

        if (value === '') {
            setError((pre) => ({ ...pre, time: "Please enter time" }));
            return
        }else{
            setError((pre) => ({ ...pre, time: "" }));
            return
        }

    }

    // Handle Starting date
    const handleStarting = (e: React.ChangeEvent<HTMLInputElement>) => {
       const {name, value} = e.target;
       setInputs((pre)=>({...pre, [name]:value}))

        if (value === '') {
            setError((prev) => ({ ...prev, starting: "Please insert starting date" }));
        } else {
            setError((prev) => ({ ...prev, starting: "" }));
        }
    }
    




    const handleEnding = (e: React.ChangeEvent<HTMLInputElement>) => {

      const { name, value} = e.target;

      setInputs((pre)=>({...pre, [name]:value}))
        if (value === '') {
            setError((pre) => ({ ...pre, ending: "Please enter ending day" }))
            return
        }
        else{
            setError((pre) => ({ ...pre, ending: "" }));
            return
        }

    }



    const handleDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value })

        if(value === ""){
            setError((pre)=>({...pre, description:"Please enter description"}))
            return
        }
        else{
            setError((pre)=>({...pre, description:""}))
            return
        }
    }

    const handleWeekDays = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;

        if (checked) {
            setSelectedDate((pre) => [...pre, Number(value)])

        }
        else {
            setSelectedDate((pre) => pre.filter((day) => day !== Number(value)))
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const start = new Date(inputs. starting);
        const end = new Date(inputs.ending);
        const newEvent: Event[] = [];

//validation 
if(inputs.title === "" && inputs.time === "" && inputs. starting === "" && inputs.ending === "" && inputs.description === ""){
    setError((pre)=>({...pre, title: "Please enter title"}));
    setError((pre) => ({ ...pre, time: "Please enter time" }));
    setError((pre) => ({ ...pre, starting: "Please enter starting day" }));
    setError((pre) => ({ ...pre, ending: "Please enter ending day" }))
    setError((pre) => ({ ...pre, description: "Please enter event description" }))
    return
}
else if(inputs.title === ""){
    setError((pre)=>({...pre, title: "Please enter title"}));
    return
}
else if(inputs.time === ""){
    setError((pre) => ({ ...pre, time: "Please enter time" }));
    return
}
else if(inputs. starting === ""){
    setError((pre) => ({ ...pre, starting: "Please enter starting day" }));
    return
}
else if(inputs.ending === ""){
    setError((pre) => ({ ...pre, ending: "Please enter ending day" }));
    return
}
else if(inputs.description === ""){
    setError((pre) => ({ ...pre, description: "Please enter event description" }))
    return
}
else if(start > end){
    setError((pre) => ({ ...pre, starting: "Please enter starting day can not be less than ending" }));
    return
}
else{




        for (let currentDate = start; currentDate <= end; currentDate.setDate(currentDate.getDate() + 1)) {
            const formattedDate = currentDate.toISOString().split('T')[0];
            const weekDate = currentDate.getDay();

            if (selectedDate.includes(weekDate)) {
                const event: Event = {

                    title: inputs.title,
                    time: inputs.time,
                    date: formattedDate,
                    description: inputs.description

                }
                newEvent.push(event)
            }
        }
        axios
            .post(multipeeventApi, newEvent)
            .then((res) => {
                
                dispatch(addMultipleEvent(res.data));
                dispatch(setNewEvent(false))

            })
            .catch(err => console.log(err));

        }
    }




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
                                <input type='time' name='time' onChange={handleTime} className='border-solid border-sky-200 border-2 w-full mb-2 focus:outline-yellow-200 p-1' />
                            </td>
                        </tr>
                        <tr>
                            <td>

                                <div className='flex justify-between'>
                                    <label>Starting date : </label>
                                    <p className='mr-3 text-red-500 text-[14px] font-bold'>{error.starting}</p>
                                </div>
                                <input onChange={handleStarting} name='starting' className='border-solid border-sky-200 border-2 w-full mb-2 focus:outline-yellow-200 p-1' type='date' />
                            </td>
                        </tr>
                        <tr>
                            <td>

                                <div className='flex justify-between'>
                                    <label>Ending date : </label>
                                    <p className='mr-3 text-red-500 text-[14px] font-bold'>{error.ending}</p>
                                </div>

                                <input onChange={handleEnding} name='ending' className='border-solid border-sky-200 border-2 w-full mb-2 focus:outline-yellow-200 p-1' type='date' />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Every : </label>
                                <div className='flex gap-5'>

                                    <div className='my-2'>
                                        <label htmlFor='mon'  >Mo</label>
                                        <input type='checkbox' onChange={handleWeekDays} id='mon' value={1} className='m-1 cursor-pointer w-5 h-5' />
                                    </div>
                                    <div className='my-2'>
                                        <label htmlFor='tue'  >Tu</label>
                                        <input type='checkbox' onChange={handleWeekDays} id='tue' value={2} className='m-1 cursor-pointer w-5 h-5' />
                                    </div>
                                    <div className='my-2'>
                                        <label htmlFor='wed'  >We</label>
                                        <input type='checkbox' onChange={handleWeekDays} value={3} id='wed' className='m-1 cursor-pointer w-5 h-5' />
                                    </div>
                                    <div className='my-2'>
                                        <label htmlFor='thu'  >Th</label>
                                        <input type='checkbox' onChange={handleWeekDays} id='thu' value={4} className='m-1 cursor-pointer w-5 h-5' />
                                    </div>
                                    <div className='my-2'>
                                        <label htmlFor='fri'  >Fr</label>
                                        <input type='checkbox' onChange={handleWeekDays} value={5} id='fri' className='m-1 cursor-pointer w-5 h-5' />
                                    </div>
                                    <div className='my-2'>
                                        <label htmlFor='sat'  >Sa</label>
                                        <input type='checkbox' onChange={handleWeekDays} value={6} id='sat' className='m-1 cursor-pointer w-5 h-5' />
                                    </div>
                                    <div className='my-2'>
                                        <label htmlFor='sun'  >Su</label>
                                        <input type='checkbox' onChange={handleWeekDays} value={0} className='m-1 cursor-pointer w-5 h-5' id='sun' />
                                    </div>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td>
                              
                                
                                <div className='flex justify-between'>
                                <label>description : </label>
                                    <p className='mr-3 text-red-500 text-[14px] font-bold'>{error.description}</p>
                                </div>
                                <textarea name='description' onChange={handleDescription} placeholder='description...' className='border-solid border-sky-200 border-2 w-full mb-2 focus:outline-yellow-200 p-1'></textarea>
                            </td>
                        </tr>
                        <tr>
                            <td className='flex gap-5'>
                                <button className='bg-[#020740] text-white px-8 py-1 cursor-pointer rounded-md hover:bg-[#020790]' type='submit'>
                                    Submit
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
    )
}

export default SapcificWeek