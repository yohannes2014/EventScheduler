import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authe";
import eventsSlice from "../features/events"
import usersSlice from "../features/users"




const store = configureStore({
  reducer: {
    auth:authSlice,
    events:eventsSlice,
    users:usersSlice
  }

});




export { store, persistor };
