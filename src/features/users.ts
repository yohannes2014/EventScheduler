import { UsersState } from '../types/types';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState:UsersState = {
   
    
    logSignForm:false,
    Form:'login',
    login:false,
    signupLoading:false,
    loginload:false,
    notifCard:false,
    notification:'',
    notificationName:'',
    
}

const usersSlice = createSlice({
    name:"users",
    initialState,
    reducers:{
    setUserForm(state, action:PayloadAction<boolean>){
       state.logSignForm = action.payload
    },     
    setForm(state, action:PayloadAction<string>){
       state.Form = action.payload
    },    
      
    setUserLogin(state, action:PayloadAction<boolean>){
       state.login = action.payload
    }, 
    setSignupLoading(state, action:PayloadAction<boolean>){
        state.signupLoading = action.payload
    },  
    setLoginLoading(state, action:PayloadAction<boolean>){
        state.loginload = action.payload
    },

    setNotifiCard(state, action:PayloadAction<boolean>){
        state.notifCard = action.payload
     },
     setNotification(state, action:PayloadAction<string>){
        state.notification = action.payload
     },    
     setNotifName(state, action:PayloadAction<string>){
        state.notificationName = action.payload
     },
   
    }
});

export default usersSlice.reducer;
export const { setUserForm , setForm,setNotification, setNotifiCard,setNotifName ,setUserLogin, setSignupLoading, setLoginLoading} = usersSlice.actions 