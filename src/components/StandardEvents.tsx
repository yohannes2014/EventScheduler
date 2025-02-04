import { useDispatch, useSelector } from "react-redux";
import DailyEvents from "./DailyEvents";
import MonthlyEvents from "./MonthlyEvents";
import WeeklyEvents from "./WeeklyEvents";
import YearlyEvents from "./YearlyEvents";
import { RootState } from "../types/types";
import { setRepeatEvent } from "../features/events";


const StandardEvents = () => {
    const repeat = useSelector((state:RootState)=>state.events.repeat);
    const dispatch = useDispatch()


    return (
        <div>
       <div className="bg-niceback flex w-screen px-10 top-10 justify-between">
            <p onClick={()=>dispatch(setRepeatEvent('daily'))} className="bg-white px-5 rounded-md cursor-pointer ">Daily</p>
            <p  onClick={()=>dispatch(setRepeatEvent('weekly'))} className="bg-white px-5 rounded-md cursor-pointer">Weekly</p>
            <p onClick={()=>dispatch(setRepeatEvent('monthly'))} className="bg-white px-5 rounded-md cursor-pointer">Monthly</p>
            <p onClick={()=>dispatch(setRepeatEvent('yearly'))} className="bg-white px-5 rounded-md cursor-pointer">Yearly</p>
       </div>
            {repeat === 'daily' && <DailyEvents />}
             {repeat === 'weekly' && <WeeklyEvents />}
             {repeat === 'monthly' && <MonthlyEvents />}
             {repeat === 'yearly' && <YearlyEvents />}


       </div>
    );
};

export default StandardEvents;




