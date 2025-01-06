import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "../features/users"
import  eventsSlice from "../features/events"

const store = configureStore({
    reducer:{
        users:usersSlice,
        events:eventsSlice
    }
});

export default store;