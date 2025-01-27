import React, { useState } from 'react'
import { RootState, Standard } from '../types/types'
import { useSelector } from 'react-redux'
import { eachDayOfInterval, endOfMonth, format, startOfMonth } from 'date-fns';

const RealtiveDate = () => {
    const id = useSelector((state:RootState)=>state.auth.user.user._id);
    const [date, setDate] = useState<string>('Monday');
    const [nthWeek, setNthWeek] = useState<string>('first')
    const [month, setMonth] = useState<number>(0)
    const [year, setYear] = useState<number>(new Date().getFullYear());
    const [inputs, setInputs] = useState<Standard>({
        title:'',
        time:'',
        date:'',
        discription:'',
        id:''
    });
const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
     const { name, value} = e.target;
     setInputs({...inputs, [name]:value})
}

const helperFunction = () =>{
    const startOfMonthDate = startOfMonth(new Date(year, month));
    const endOfMonthDate = endOfMonth(new Date(year, month));

    //Date in month
  const daysInMonth = eachDayOfInterval({start:startOfMonthDate, end:endOfMonthDate});

  const matchingDay = daysInMonth.filter(day => format(day, 'EEEE') === date)
  
  if(nthWeek === 'first') return matchingDay[0];
  if(nthWeek === 'second') return matchingDay[1];
  if(nthWeek === 'third') return matchingDay[2];
  if(nthWeek === 'last') return matchingDay[matchingDay.length - 1];

  return null // if no match found
  
}


const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
const formattedDate = helperFunction()
if(formattedDate){
setDate(format(formattedDate, 'yyyy-mm-dd'))

}

const startOfMonthDate = startOfMonth(new Date(year, month));
const endOfMonthDate = endOfMonth(new Date(year, month));
const daysInMonth = eachDayOfInterval({start:startOfMonthDate, end:endOfMonthDate});
const matchingDay = daysInMonth.filter(day => format(day, 'EEEE') === date)
console.log(startOfMonthDate)
console.log(endOfMonthDate);
console.log(matchingDay);
console.log(date)

const newDate = new Date(date)
console.log(newDate)


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
                    <select onChange={(e)=>setDate(e.target.value)}  className='border-solid border-sky-100 border-2 w-full mb-2 focus:outline-yellow-200 p-1'>
                        <option value='Monday' >Monday</option>
                        <option value='Tuesday' >Tuesday</option>
                        <option value='Wednesday' >Wednesday</option>
                        <option value='Thursday' >Thursday</option>
                        <option value='Friday' >Friday</option>
                        <option value='Saturday' >Saturday</option>
                        <option value='Sunday' >Sunday</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td>
                    <label>Week : </label>
                    <select onChange={(e)=>setNthWeek(e.target.value)} className='border-solid border-sky-100 border-2 w-full mb-2 focus:outline-yellow-200 p-1'>
                        <option value='first' >First</option>
                        <option value='second' >Second</option>
                        <option value='third' >Third</option>
                        <option value='last' >Last</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td>
                    <label>Month : </label>
                    <select onChange={(e)=>setMonth(Number(e.target.value))}  className='border-solid border-sky-100 border-2 w-full mb-2 focus:outline-yellow-200 p-1'>
                        <option value={0} >January</option>
                        <option value={1} >February</option>
                        <option value={2} >March</option>
                        <option value={3} >April</option>
                        <option value={4} >May</option>
                        <option value={5} >Jun</option>
                        <option value={6} >July</option>
                        <option value={7} >August</option>
                        <option value={8} >September</option>
                        <option value={9} >October</option>
                        <option value={10} >Novenber</option>
                        <option value={11} >December</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td>
                    <label>Year : </label>
                    <input name='time' type='number' onChange={(e)=>setYear(Number(e.target.value))} className='border-solid border-sky-100 border-2 w-full mb-2 focus:outline-yellow-200 p-1' />
                </td>
            </tr>
            <tr>
                <td>
                    <label>Discription : </label>
                    <textarea name='discription' onChange={handleChange} placeholder='Discription...' className='border-solid border-sky-100 border-2 w-full mb-2 focus:outline-yellow-200 p-1'></textarea>
                </td>
            </tr>
            <tr>
                <td className='flex gap-5'>
                    <button className='bg-submitBtn text-white px-8 py-1 rounded-md' type='submit'>Submit</button>
                    <p className='bg-cancelBtn text-white px-4 py-1 rounded-md' >Cancel</p>
                </td>
            </tr>
            </tbody>
        </table>
    </form>
</div>
  )
}

export default RealtiveDate