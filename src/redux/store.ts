import { configureStore } from "@reduxjs/toolkit";
import { persistStore,/*  persistReducer  */} from 'redux-persist';
/* import storage from 'redux-persist/lib/storage';  */
import authSlice from "../features/authe";
import eventsSlice from "../features/events"
import usersSlice from "../features/users"


/* const persistAuthConfig = {
  key: 'auth', 
  version: 1,
  storage, 
  whitelist: ['user'], 
  
}; */


/* const persistedAuthReducer = persistReducer(persistAuthConfig, authSlice); */


const store = configureStore({
  reducer: {
    auth:authSlice,
    events:eventsSlice,
    users:usersSlice
    
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'], 
      },
    }),
});


const persistor = persistStore(store);

export { store, persistor };
