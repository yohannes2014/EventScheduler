import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Event, EventsState, UserEvent } from "../types/types";

const event:UserEvent = {
  _id:'',
  title:'',
  time:'',
  date:'',
  description:''

}
const newEvent:Event = {

  title:'',
  time:'',
  date:'',
  description:''

}

const initialState:EventsState = {
      userEvent:[],
      selectedEvent:[],
      selectedDate:'',
      events: null,
      addCalender:false,  
      isEvent:false,
      newEvent:false,
      eventType:'single',
      repeat:'daily',
      display:'list',
      singleEvent:event,
      AddnewEvent:newEvent,
}

const eventsSlice = createSlice({
    name:"users",
    initialState,
    reducers:{

    setEventType(state, action:PayloadAction<string>){
      state.eventType = action.payload
   },
    setEventDisplay(state, action:PayloadAction<string>){
      state.display = action.payload
   },
    setSelectedDate(state, action:PayloadAction<string>){
      state.selectedDate = action.payload
   },
    setNewEvent(state, action:PayloadAction<boolean>){
      state.newEvent = action.payload
   },
   setAddNewEvent(state, action:PayloadAction<Event>){
  state.AddnewEvent = action.payload
   },
   
    setAddCalecder(state, action:PayloadAction<boolean>){
      state.addCalender = action.payload
   },
    setRepeatEvent(state, action:PayloadAction<string>){
      state.repeat = action.payload
   },
  
   setUserEvents(state, action:PayloadAction<UserEvent[]>){
    state.userEvent = action.payload
   },
   setSelectedEvents(state, action:PayloadAction<UserEvent[]>){
    state.selectedEvent = action.payload
   },
  
   updateEvent(state, action: PayloadAction<UserEvent>) {
    const index = state.userEvent.findIndex(event => event._id === action.payload._id);
    if (index !== -1) {
      state.userEvent[index] = action.payload;  
    }
  },
  deleteEvent(state, action: PayloadAction<string>) {
    state.userEvent = state.userEvent.filter(event => event._id !== action.payload); 
  },

  
    }
});

export default eventsSlice.reducer;
export const { setEventType, 
               setNewEvent, 
               setRepeatEvent, 
               setUserEvents, 
               setSelectedEvents,
               setSelectedDate,
               setEventDisplay, 
               setAddNewEvent,
               updateEvent,
               deleteEvent,
               setAddCalecder,
              } = eventsSlice.actions 