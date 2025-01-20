import { useState } from "react";
import { Standard } from "../types/types";

const StandardEvent = () => {
    const [repeat, setRepeat] = useState<string>('daily');
    const [range, setRange] = useState<number>(0);
    const [event, setEvent] = useState<Standard[]>([]);
    const [rangeType, setRangeType] = useState<string>('days');
    const [standard, setStandard] = useState<Standard>({
        title: '',
        discription: '',
        time: '',
        date: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setStandard({ ...standard, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const start = new Date(standard.date);
        let nextRepeat = new Date(start);
        const newEvent: Standard[] = [];
        const week = range*7;
        const month = range*30;
        const year = range*365;
        const weekpermonth = range*4;
        const weekperyear = range*52;
        const monthperyear = range*12;
     


        if(repeat === 'daily'){
            if(rangeType === "days"){
                for(let i = 1; i<=range; i++){
                    nextRepeat.setDate(nextRepeat.getDate() + 1); 
                    const item = {
                        title: standard.title,
                        discription: standard.discription,
                        time: standard.time,
                        date: nextRepeat.toISOString().split('T')[0], 
                    };
                    newEvent.push(item)
                    
                }
            }
            else if(rangeType === 'weeks'){
                for(let i=1; i<=week; i++){
                    nextRepeat.setDate(nextRepeat.getDate() + 1); 
                    const item = {
                        title: standard.title,
                        discription: standard.discription,
                        time: standard.time,
                        date: nextRepeat.toISOString().split('T')[0], 
                    };
                    newEvent.push(item)
                }
            }
            else if(rangeType === 'months'){
                for(let i=1; i<=month; i++){
                    nextRepeat.setDate(nextRepeat.getDate() + 1); 
                    const item = {
                        title: standard.title,
                        discription: standard.discription,
                        time: standard.time,
                        date: nextRepeat.toISOString().split('T')[0], 
                    };
                    newEvent.push(item)
                }
            }
            else if(rangeType === 'years'){
                for(let i=1; i<=year; i++){
                    nextRepeat.setDate(nextRepeat.getDate() + 1); 
                    const item = {
                        title: standard.title,
                        discription: standard.discription,
                        time: standard.time,
                        date: nextRepeat.toISOString().split('T')[0], 
                    };
                    newEvent.push(item)
                }
            }


        }
        if(repeat === "weekly"){
            if(rangeType === "weeks"){
                for(let i = 1; i<=range; i++){
                    nextRepeat.setDate(nextRepeat.getDate() + 7); 
                    const item = {
                        title: standard.title,
                        discription: standard.discription,
                        time: standard.time,
                        date: nextRepeat.toISOString().split('T')[0], 
                    };
                    newEvent.push(item)
                    
                }
            }
            if(rangeType === "months"){
                for(let i = 1; i<=weekpermonth; i++){
                    nextRepeat.setDate(nextRepeat.getDate() + 7);
                     const item = {
                        title: standard.title,
                        discription: standard.discription,
                        time: standard.time,
                        date: nextRepeat.toISOString().split('T')[0], 
                    };
                    newEvent.push(item)
                }
            }
            if(rangeType === "years"){
                for(let i = 1; i<=weekperyear; i++){
                    nextRepeat.setDate(nextRepeat.getDate() + 7);
                     const item = {
                        title: standard.title,
                        discription: standard.discription,
                        time: standard.time,
                        date: nextRepeat.toISOString().split('T')[0], 
                    };
                    newEvent.push(item)
                }
            }

        }
        if(repeat === "monthly"){
            if(rangeType === "months"){
                for(let i = 1; i<=range; i++){
                    nextRepeat.setMonth(nextRepeat.getMonth() + 1);
                     const item = {
                        title: standard.title,
                        discription: standard.discription,
                        time: standard.time,
                        date: nextRepeat.toISOString().split('T')[0], 
                    };
                    newEvent.push(item)
                }
            }
            if(rangeType === "years"){
                for(let i = 1; i<=monthperyear; i++){
                    nextRepeat.setMonth(nextRepeat.getMonth() + 1);
                     const item = {
                        title: standard.title,
                        discription: standard.discription,
                        time: standard.time,
                        date: nextRepeat.toISOString().split('T')[0], 
                    };
                    newEvent.push(item)
                }
            }

            
        }
        if(repeat === "yearly"){
            if(rangeType === "years"){
                for(let i = 1; i<=range; i++){
                    nextRepeat.setFullYear(nextRepeat.getFullYear() + 1);
                     const item = {
                        title: standard.title,
                        discription: standard.discription,
                        time: standard.time,
                        date: nextRepeat.toISOString().split('T')[0], 
                    };
                    newEvent.push(item)
                }
            }
        }

        

        setEvent((pre)=>[...pre,...newEvent]);
        console.log(event)
        
    };

    return (
        <div className='w-full px-10 py-2'>
            <form className='shadow-md px-2 py-3 rounded-lg' onSubmit={handleSubmit}>
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
                                    onChange={handleChange}
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
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Repeat: </label>
                                <select onChange={(e) => setRepeat(e.target.value)} name='repeat' className='border-solid border-sky-100 border-2 w-full mb-2 focus:outline-yellow-200 p-1'>
                                    <option value='daily'>Daily</option>
                                    <option value='weekly'>Weekly</option>
                                    <option value='monthly'>Monthly</option>
                                    <option value='yearly'>Yearly</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                {repeat === "monthly" && <label>Specific date: </label>}
                                {repeat === "yearly" && <label>Specific date: </label>}
                                {repeat === "daily" && <label>Starting date: </label>}
                                {repeat === "weekly" && <label>Starting date: </label>}
                                <input
                                    name="date"
                                    className="border-solid border-sky-100 border-2 w-full mb-2 focus:outline-yellow-200 p-1"
                                    type="date"
                                    value={standard.date}
                                    onChange={handleChange}
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
                                   {repeat === "daily" && <select onChange={(e) => setRangeType(e.target.value)} className='h-[35px]'>
                                        <option value='days'>Days</option>
                                        <option value='weeks'>Weeks</option>
                                        <option value='months'>Months</option>
                                        <option value='years'>Years</option>
                                    </select>}
                                   {repeat === "weekly" && <select onChange={(e) => setRangeType(e.target.value)} className='h-[35px]'>
                                        
                                        <option value='weeks'>Weeks</option>
                                        <option value='months'>Months</option>
                                        <option value='years'>Years</option>
                                    </select>}
                                   {repeat === "monthly" && <select onChange={(e) => setRangeType(e.target.value)} className='h-[35px]'>
                                       
                                        <option value='months'>Months</option>
                                        <option value='years'>Years</option>
                                    </select>}
                                   {repeat === "yearly" && <select onChange={(e) => setRangeType(e.target.value)} className='h-[35px]'>
                                       
                                        <option value='years'>Years</option>
                                    </select>}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Description: </label>
                                <textarea
                                    onChange={handleChange}
                                    name='discription'
                                    placeholder='Description...'
                                    className='border-solid border-sky-100 border-2 w-full mb-2 focus:outline-yellow-200 p-1'
                                    value={standard.discription}
                                ></textarea>
                            </td>
                        </tr>
                        <tr>
                            <td className='flex gap-5'>
                                <button className='bg-submitBtn text-white px-8 py-1 rounded-md' type='submit'>
                                    Submit
                                </button>
                                <p className='bg-cancelBtn text-white px-4 py-1 rounded-md'>Cancel</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
};

export default StandardEvent;
