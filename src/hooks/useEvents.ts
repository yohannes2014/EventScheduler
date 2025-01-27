import { useState } from "react";
import { Event, RootState, Standard } from "../types/types";




export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
return {events, setEvents}

}
/* Single Events */
export const useSingle = () => {
  

 const [single, setSingle] = useState<Event>({
    title: '',
    date: '',
    time: '',
    discription: '',
    id:'',
  });
 return {single, setSingle}
}

export const useSingleEvent = () => {
  const { single, setSingle} = useSingle();
  const { events, setEvents} = useEvents()
  return { single, setSingle, events, setEvents}
}




/* Standard Events */

