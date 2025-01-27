import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EventsState } from "../types/types";



const initialState:EventsState = {
      events: [],  
      isEvent:false,
      newEvent:false,
      eventType:'single',
      repeat:'daily',
      
}

const eventsSlice = createSlice({
    name:"users",
    initialState,
    reducers:{

    setEventType(state, action:PayloadAction<string>){
      state.eventType = action.payload
   },
    setNewEvent(state, action:PayloadAction<boolean>){
      state.newEvent = action.payload
   },
    setRepeatEvent(state, action:PayloadAction<string>){
      state.repeat = action.payload
   },
  
    }
});

export default eventsSlice.reducer;
export const { setEventType, setNewEvent, setRepeatEvent} = eventsSlice.actions 