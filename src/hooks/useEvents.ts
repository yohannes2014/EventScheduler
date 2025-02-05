import { Event } from "../types/types";
import { useState } from "react";


export const useSingle = () => {
  const [single, setSingle] = useState<Event>({
    title: '',
    date: '',
    time: '',
    description: ''
  });

  return { single, setSingle}
}

export const useSingleError = () => {
  const [error, setError] = useState<Event>({
    title: '',
    date: '',
    time: '',
    description: ''
  });

 return { error, setError}
}

export const useEvent = () => {
  const [events, setEvents] = useState<Event[]>([]);

  return { events, setEvents}
}  


