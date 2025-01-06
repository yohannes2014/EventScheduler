import { combineReducers } from "@reduxjs/toolkit";
import usersSlice from "./users"
import  eventsSlice from "./events"

const rootReducer = combineReducers({
   users:usersSlice,
   events:eventsSlice
})

export default rootReducer

