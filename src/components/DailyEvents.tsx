import { Event } from "../types/types";
import { useState } from "react";
import axios from "axios";
import { addMultipleEvent, setNewEvent } from "../features/events";
import { useDispatch } from "react-redux";
import { useSingle  } from "../hooks/useEvents";

const DailyEvents = () => {

    const [range, setRange] = useState<number>(0);
    const [rangeType, setRangeType] = useState<string>('days');
    const dispatch = useDispatch();
    const { single, setSingle } = useSingle();
    const [error, setError] = useState({
        title: '',
        interval: '',
        time: '',
        description: '',
        startingDate:'',
      });
    


    // handle title change
    const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setSingle((pre) => ({ ...pre, [name]: value }));

        if (value === '') {
            setError((prev) => ({ ...prev, title: "Please insert title" }));
        } else {
            setError((prev) => ({ ...prev, title: "" }));
        }
    }

    //handle time change
    const handleTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setSingle((pre) => ({ ...pre, [name]: value }));

        if (value === '') {
            setError((prev) => ({ ...prev, time: "Please insert time" }));
        } else {
            setError((prev) => ({ ...prev, time: "" }));
        }
    }

    //Handle Descrption
    const handleDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setSingle((pre) => ({ ...pre, [name]: value }));

        if (value === '') {
            setError((prev) => ({ ...prev, description: "Please insert description" }));
        } else {
            setError((prev) => ({ ...prev, description: "" }));
        }
    }
    // Handle Starting date
    const HandleStarting = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setSingle((pre) => ({ ...pre, [name]: value }));

        if (value === '') {
            setError((prev) => ({ ...prev, startingDate: "Please insert starting date" }));
        } else {
            setError((prev) => ({ ...prev, startingDate: "" }));
        }
    }

    const intervalHandle = (e:React.ChangeEvent<HTMLInputElement>) => {
        setRange(Number(e.target.value))

        if (range < 0) {
            setError((prev) => ({ ...prev, interval: "Please insert interval" }));
        } else if(range > 0) {
            setError((prev) => ({ ...prev, interval: "" }));
        }
    }


    const HandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const start = new Date(single.date);
        let nextRepeat = new Date(start);
        const newEvent: Event[] = [];
        const week = range * 7;
        const month = range * 30;
        const year = range * 365;

        if (single.title === "" && single.time === ""  && single.description === '' && single.date === '' && range <= 0) {
            setError((prev) => ({ ...prev, title: 'Please insert title' }));
            setError((prev) => ({ ...prev, time: 'Please insert time' }));
            setError((prev) => ({ ...prev, startingDate: 'Please insert starting day' }));
            setError((prev) => ({ ...prev, description: 'Please insert description' }));
            setError((prev) => ({ ...prev, interval: 'Please insert interval ' }));
            return;
        }
        else if (single.title === "") {
            setError((prev) => ({ ...prev, title: 'Please insert title' }));
            return;
        }
        else if (single.time === "") {

            setError((prev) => ({ ...prev, time: 'Please insert time' }));

            return;
        }
        else if (single.description === "") {

            setError((prev) => ({ ...prev, description: 'Please insert description' }));

            return;
        }
        else if (range === 0) {

            setError((prev) => ({ ...prev, interval: 'Please insert interval' }));

            return;
        }
        else{

        if (rangeType === "days") {
            for (let i = 1; i <= range; i++) {
                nextRepeat.setDate(nextRepeat.getDate() + 1);
                const item = {
                    title: single.title,
                    description: single.description,
                    time: single.time,
                    date: nextRepeat.toISOString().split('T')[0]

                };
                newEvent.push(item);
            }
        }
        if (rangeType === "weeks") {
            for (let i = 1; i <= week; i++) {
                nextRepeat.setDate(nextRepeat.getDate() + 1);
                const item = {
                    title: single.title,
                    description: single.description,
                    time: single.time,
                    date: nextRepeat.toISOString().split('T')[0]

                };
                newEvent.push(item);
            }
        }
        if (rangeType === "months") {
            for (let i = 1; i <= month; i++) {
                nextRepeat.setDate(nextRepeat.getDate() + 1);
                const item = {
                    title: single.title,
                    description: single.description,
                    time: single.time,
                    date: nextRepeat.toISOString().split('T')[0]

                };
                newEvent.push(item);
            }
        }
        if (rangeType === "years") {
            for (let i = 1; i <= year; i++) {
                nextRepeat.setDate(nextRepeat.getDate() + 1);
                const item = {
                    title: single.title,
                    description: single.description,
                    time: single.time,
                    date: nextRepeat.toISOString().split('T')[0]

                };
                newEvent.push(item);
            }
        }
        axios
            .post("http://localhost:8000/api/events/multiple", newEvent)
            .then(res => {
                dispatch(addMultipleEvent(res.data));
                dispatch(setNewEvent(false));
               
            })
            .catch(err => console.log(err));
            setSingle({
                title:'',
                time:'',
                date:'',
                description:''
             })
        }
    };



    return (
        <div className='w-full mt-2'>
            <form className='px-5' onSubmit={HandleSubmit}>
                <table className="w-full">
                    <tbody>
                        <tr>
                            <td>
                                <div className='flex justify-between'>
                                    <label>Title: </label>
                                    <p className='mr-3 text-red-500 text-[14px] font-bold'>{error.title}</p>
                                </div>
                                <input
                                    className='border-solid border-sky-200 border-2 w-full mb-2 focus:outline-yellow-200 p-1'
                                    type='text'
                                    placeholder='Title'
                                    name='title'
                                    value={single.title}
                                    onChange={handleTitle}
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
                                    type='time'
                                    className='border-solid border-sky-200 border-2 w-full mb-2 focus:outline-yellow-200 p-1'
                                    name='time'
                                    value={single.time}
                                    onChange={handleTime}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>
                                
                                <div className='flex justify-between'>
                                <label>Starting date: </label>
                                    <p className='mr-3 text-red-500 text-[14px] font-bold'>{error.startingDate}</p>
                                </div>
                                <input
                                    name="date"
                                    className="border-solid border-sky-200 border-2 w-full mb-2 focus:outline-yellow-200 p-1"
                                    type="date"
                                    value={single.date}
                                    onChange={HandleStarting}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                             

                                <div className='flex gap-5'>
                                <label>For next: </label>
                                    <p className='text-red-500 text-[14px] font-bold'>{error.interval}</p>
                                </div>
                                <div className='flex gap-4 items-center'>
                                    <input
                                        value={range}
                                        onChange={intervalHandle}
                                        className='border-solid border-sky-200 border-2 w-full mb-2 focus:outline-yellow-200 p-1'
                                        type='number'
                                    />
                                    <select onChange={(e) => setRangeType(e.target.value)} className='mb-2 h-[34px] w-80 border-solid border-sky-200 border-2'>
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


                                <div className='flex justify-between'>
                                    <label>Description: </label>
                                    <p className='mr-3 text-red-500 text-[14px] font-bold'>{error.description}</p>
                                </div>
                                <textarea
                                    onChange={handleDescription}
                                    name='description'
                                    placeholder='Description...'
                                    className='border-solid border-sky-200 border-2 w-full mb-2 focus:outline-yellow-200 p-1'
                                    value={single.description}
                                ></textarea>
                            </td>
                        </tr>
                        <tr>
                            <td className='flex gap-5'>
                                <button className='bg-[#020740] text-white px-8 py-1  cursor-pointer rounded-md hover:bg-[#020790]' type='submit'>
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

export default DailyEvents