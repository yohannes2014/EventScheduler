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
        <div className="w-full">
       <div className="bg-niceback flex w-full justify-around mt-3 border-b-2 border-blue-200 rounded-2xl " >
            <p onClick={()=>dispatch(setRepeatEvent('daily'))} className={`${repeat === 'daily' && 'bg-blue-200'} px-5 rounded-md cursor-pointer  py-2`}>Daily</p>
            <p  onClick={()=>dispatch(setRepeatEvent('weekly'))} className={`${repeat === 'weekly' && 'bg-blue-200'} px-5 rounded-md cursor-pointer py-2`}>Weekly</p>
            <p onClick={()=>dispatch(setRepeatEvent('monthly'))} className={`${repeat === 'monthly' && 'bg-blue-200'} px-5 rounded-md cursor-pointer py-2`}>Monthly</p>
            <p onClick={()=>dispatch(setRepeatEvent('yearly'))} className={`${repeat === 'yearly' && 'bg-blue-200'} px-5 rounded-md cursor-pointer py-2`}>Yearly</p>
       </div>
            {repeat === 'daily' && <DailyEvents />}
             {repeat === 'weekly' && <WeeklyEvents />}
             {repeat === 'monthly' && <MonthlyEvents />}
             {repeat === 'yearly' && <YearlyEvents />}


       </div>
    );
};

export default StandardEvents;




