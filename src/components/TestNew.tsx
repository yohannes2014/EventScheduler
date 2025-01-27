import React, { useState } from 'react';

const TestNew: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Number[]>([]);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedDate((prev) => [...prev, Number(value)]);
    } else {
      setSelectedDate((prev) => prev.filter((day) => day !== Number(value)));
    }
  };



  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
const start = new Date(startDate);
const end = new Date(endDate);
const listArray = [];

for(let currentDate = start; currentDate<=end; currentDate.setDate(currentDate.getDate() + 1)){
    const newDate = currentDate.toISOString().split('T')[0]
    const weekDays = currentDate.getDay();
if(selectedDate.includes(weekDays)) {
    const items = {
        date:newDate
    }
    listArray.push(items)
}  

}  
 console.log(listArray)   
 
  };

  return (
    <div>
      <h2>Select Weekdays</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Start Date:
            <input
              type="date"
              onChange={(e)=>setStartDate(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            End Date:
            <input
              type="date"
              onChange={(e)=>setEndDate(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="Monday"
              value="1"
              onChange={handleCheck}
            />
            Monday
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="Tuesday"
              value="2"
              onChange={handleCheck}
            />
            Tuesday
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="Wednesday"
              value="3"
              onChange={handleCheck}
            />
            Wednesday
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="thursdayy"
              value="4"
              onChange={handleCheck}
            />
            Thursday
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="friday"
              value="5"
              onChange={handleCheck}
            />
            Friday
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="saturday"
              value="6"
              onChange={handleCheck}
            />
            Saturday
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="sunday"
              value="0"
              onChange={handleCheck}
            />
            Sunday
          </label>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default TestNew;
