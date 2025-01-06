import { createSlice } from "@reduxjs/toolkit";
import { EventsState } from "../types/types";



const initialState:EventsState = {
      events: [],  
      isEvent:false
}

const eventsSlice = createSlice({
    name:"users",
    initialState,
    reducers:{
    loginUser(state){
       state.isEvent = true;
    },
    }
});

export default eventsSlice.reducer;
export const { loginUser} = eventsSlice.actions