import { createSlice } from "@reduxjs/toolkit";
import { EventsState } from "../types/types";



const initialState:EventsState = {
      events: [],  
      isEvent:false,
      newEvent:false,
      
}

const eventsSlice = createSlice({
    name:"users",
    initialState,
    reducers:{
    loginUser(state){
       state.isEvent = true;
    },
    eventForm(state, action){
       state.newEvent = action.payload; 
    }
    }
});

export default eventsSlice.reducer;
export const { loginUser, eventForm} = eventsSlice.actions