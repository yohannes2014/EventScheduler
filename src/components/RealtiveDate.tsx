import React from 'react'

const RealtiveDate = () => {
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
                    <label>Day : </label>
                    <select  className='border-solid border-sky-100 border-2 w-full mb-2 focus:outline-yellow-200 p-1'>
                        <option >Monday</option>
                        <option >Tuesday</option>
                        <option >Wednesday</option>
                        <option >Thursday</option>
                        <option >Friday</option>
                        <option >Saturday</option>
                        <option >Sunday</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td>
                    <label>Week : </label>
                    <select  className='border-solid border-sky-100 border-2 w-full mb-2 focus:outline-yellow-200 p-1'>
                        <option >First</option>
                        <option >Second</option>
                        <option >Third</option>
                        <option >Last</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td>
                    <label>Month : </label>
                    <select  className='border-solid border-sky-100 border-2 w-full mb-2 focus:outline-yellow-200 p-1'>
                        <option >January</option>
                        <option >February</option>
                        <option >March</option>
                        <option >April</option>
                        <option >May</option>
                        <option >Jun</option>
                        <option >July</option>
                        <option >August</option>
                        <option >September</option>
                        <option >October</option>
                        <option >Novenber</option>
                        <option >December</option>
                    </select>
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

export default RealtiveDate