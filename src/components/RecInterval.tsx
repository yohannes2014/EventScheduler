import React from 'react'

const RecInterval = () => {
  return (
    <div className='w-full px-10 py-5 '>
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
               <label>Repeat Every : </label>
               <div className='flex gap-4 items-center'>
               <input className='border-solid border-sky-100 border-2 w-full mb-2 focus:outline-yellow-200 p-1' type='number'  />
               <select>
                <option>Days</option>
                <option>Weeks</option>
                <option>Months</option>
               </select>
              </div>
               </td>
           </tr>
           <tr>
               <td>
               <label>Starting Date : </label>
               <input className='border-solid border-sky-100 border-2 w-full mb-2 focus:outline-yellow-200 p-1' type='date'  />
               </td>
           </tr>
           <tr>
               <td>
               <label>Ending Date : </label>
               <input className='border-solid border-sky-100 border-2 w-full mb-2 focus:outline-yellow-200 p-1' type='date'  />
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

export default RecInterval
