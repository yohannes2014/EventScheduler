import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Event,  EventsState,  UserEvent } from "../types/types";


const newEvent:Event = {

  title:'',
  time:'',
  date:'',
  description:''

}
const updateEvent:UserEvent = {

  title:'',
  time:'',
  date:'',
  description:'',
  _id:''

}

const initialState:EventsState = {
      userEvent:[],
      selectedEvent:[],
      selectedDate:'',
      events: null,
      updateCalender:false, 
      isEvent:false,
      newEvent:false,
      eventType:'single',
      repeat:'daily',
      display:'list',
      AddnewEvent:newEvent,
      selectEvent:updateEvent,
      addCalanderEvent:false,
      
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
      state.selectedDate = action.payload,
      state.selectedEvent = state.userEvent.filter(item => item.date === action.payload);
    
   },
    setNewEvent(state, action:PayloadAction<boolean>){
      state.newEvent = action.payload
   },
    setNewCalenderEvent(state, action:PayloadAction<boolean>){
      state.addCalanderEvent = action.payload
   },
   setAddNewEvent(state, action:PayloadAction<Event>){
  state.AddnewEvent = action.payload
   },
   setSelectEvent(state, action:PayloadAction<UserEvent>){
   state.selectEvent = action.payload;
   },
   deleteSelected(state, action:PayloadAction<string>){
    state.selectedEvent = state.selectedEvent.filter(event => event._id !== action.payload)
},
updateSelected(state, action:PayloadAction<UserEvent>){
  const index = state.selectedEvent.findIndex(event => event._id === action.payload._id);
  if (index !== -1) {
    state.selectedEvent[index] = action.payload;  
  }
},

    updateEvents(state, action:PayloadAction<boolean>){
      state.updateCalender = action.payload
   },
    setRepeatEvent(state, action:PayloadAction<string>){
      state.repeat = action.payload
   },

   setUserEvents(state, action:PayloadAction<UserEvent[]>){
    state.userEvent = action.payload
   },
   setUpdateEvent(state, action: PayloadAction<UserEvent>) {
    const index = state.userEvent.findIndex(event => event._id === action.payload._id);
    if (index !== -1) {
      state.userEvent[index] = action.payload;  
    }
  },
  deleteEvent(state, action: PayloadAction<string>) {
    state.userEvent = state.userEvent.filter(event => event._id !== action.payload); 
  },
 
  createEvent(state, action: PayloadAction<UserEvent>) {
     state.userEvent.push(action.payload)
  },
  addMultipleEvent(state, action: PayloadAction<UserEvent[]>) {
    state.userEvent = [...state.userEvent, ...action.payload];

  },

  
    }
});

export default eventsSlice.reducer;
export const { setEventType, 
               setNewEvent, 
               setRepeatEvent, 
               setUserEvents, 
               setSelectedDate,
               setEventDisplay, 
               setAddNewEvent,
               setUpdateEvent,
               deleteEvent,
               updateEvents,
               setSelectEvent,
               setNewCalenderEvent,
               createEvent,
               addMultipleEvent,

               updateSelected,
               deleteSelected
          
              } = eventsSlice.actions 