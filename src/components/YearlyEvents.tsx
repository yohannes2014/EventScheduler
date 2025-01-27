import { useSelector } from "react-redux";
import { RootState, Standard } from "../types/types";
import { useState } from "react";
import axios from "axios";

const  YearlyEvents = () => {
  const [range, setRange] = useState<number>(0);
  const [rangeType, setRangeType] = useState<string>('years');
  const id = useSelector((state: RootState) => state.auth.user.user._id);

  const [standard, setStandard] = useState<Standard>({
      title: '',
      discription: '',
      time: '',
      date: '',
      id: ''
  });

  const HandleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setStandard({ ...standard, [name]: value });
  };

  const HandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const start = new Date(standard.date);
      let nextRepeat = new Date(start);
      const newEvent: Standard[] = [];

          if (rangeType === "years") {
              for (let i = 1; i <= range; i++) {
                  nextRepeat.setFullYear(nextRepeat.getFullYear() + 1);
                  const item = {
                      title: standard.title,
                      discription: standard.discription,
                      time: standard.time,
                      date: nextRepeat.toISOString().split('T')[0],
                      id: id
                  };
                  newEvent.push(item);
              }
          }
         

       
     
      axios
          .post("http://localhost:8000/users/multievents", newEvent)
          .then(res => console.log(res.data))
          .catch(err => console.log(err));
  };



  return (
    <div className='w-full px-10 py-2'>
        <p>Year</p>
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
                        <label>Specific date: </label>
                      
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
  )
}

export default YearlyEvents