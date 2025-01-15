import React from 'react'
import { useDays } from '../hooks/states';

const SapcificWeek = () => {
    
    const {mon, setMon, tue, setTue, wed, setWed, thu, setThu, fri, setFri, sat, setSat, sun, setSun } = useDays();

const handleWeek = () =>{

}


  return (
    <div className='w-full px-10 py-5'>
    <form className='shadow-md px-2 py-3 rounded-lg'>
        <table>
            <tbody>
            <tr>
                <td>
                    <label>Title : </label>
                    <input className='border-solid border-sky-100 border-2 w-full mb-2 focus:outline-yellow-200 p-1' type='text' placeholder='title' />
                </td>
            </tr>

            <tr>
                <td>
                    <label>Time : </label>
                    <input type='time' className='border-solid border-sky-100 border-2 w-full mb-2 focus:outline-yellow-200 p-1' />
                </td>
            </tr>
            <tr>
                <td>
                    <label>Starting date : </label>
                    <input className='border-solid border-sky-100 border-2 w-full mb-2 focus:outline-yellow-200 p-1' type='date' />
                </td>
            </tr>
            <tr>
                <td>
                    <label>Ending date : </label>
                    <input className='border-solid border-sky-100 border-2 w-full mb-2 focus:outline-yellow-200 p-1' type='date' />
                </td>
            </tr>
                <tr>
                    <td>
                        <label>Every : </label>
                        <div className='flex gap-5'>

                            <div className='my-2'>
                                <label htmlFor='mon' className={`rounded-full px-1 p-1 outline outline-blue-500 ${mon ? 'text-red-600  bg-primary' : 'text-primary'}`} >Mo</label>
                                <input type='checkbox' onChange={handleWeek} id='mon' name='mon' hidden />
                            </div>
                            <div className='my-2'>
                                <label htmlFor='tue' className={`rounded-full px-1 p-1 outline outline-blue-500 ${tue ? 'text-red-600  bg-primary' : 'text-primary'}`} >Tu</label>
                                <input type='checkbox' onChange={handleWeek} id='tue' name='tue' hidden />
                            </div>
                            <div className='my-2'>
                                <label htmlFor='wed' className={`rounded-full px-1 p-1 outline outline-blue-500 ${wed ? 'text-red-600  bg-primary' : 'text-primary'}`} >We</label>
                                <input type='checkbox' onChange={handleWeek} name='wed' id='wed' hidden />
                            </div>
                            <div className='my-2'>
                                <label htmlFor='thu' className={`rounded-full px-1 p-1 outline outline-blue-500 ${thu ? 'text-red-600  bg-primary' : 'text-primary'}`} >Th</label>
                                <input type='checkbox' onChange={handleWeek} id='thu' name='thu' hidden />
                            </div>
                            <div className='my-2'>
                                <label htmlFor='fri' className={`rounded-full px-1 p-1 outline outline-blue-500 ${fri ? 'text-red-600  bg-primary' : 'text-primary'}`} >Fr</label>
                                <input type='checkbox' onChange={handleWeek} name='fri' id='fri' hidden />
                            </div>
                            <div className='my-2'>
                                <label htmlFor='sat' className={`rounded-full px-1 p-1 outline outline-blue-500 ${sat ? 'text-red-600  bg-primary' : 'text-primary'}`} >Sa</label>
                                <input type='checkbox' onChange={handleWeek} name='sat' id='sat' hidden />
                            </div>
                            <div className='my-2'>
                                <label htmlFor='sun' className={`rounded-full px-1 p-1 outline outline-blue-500 ${sun ? 'text-red-600  bg-primary' : 'text-primary'}`} >Su</label>
                                <input type='checkbox' onChange={handleWeek} name='sun' id='sun' hidden />
                            </div>
                        </div>
                    </td>
                </tr>
            
            <tr>
                <td>
                    <label>Discription : </label>
                    <textarea placeholder='Discription...' className='border-solid border-sky-100 border-2 w-full mb-2 focus:outline-yellow-200 p-1'></textarea>
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

export default SapcificWeek