import { UsersState } from '../types/types';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";




const initialState:UsersState = {
   
    
    logSignForm:false,
    notification:true,
    message:'',
    Form:'login',
    login:false,
    
}

const usersSlice = createSlice({
    name:"users",
    initialState,
    reducers:{
    setUserForm(state, action:PayloadAction<boolean>){
       state.logSignForm = action.payload
    },    
    setUserNote(state, action:PayloadAction<boolean>){
       state.notification = action.payload
    },    
    setMessage(state, action:PayloadAction<string>){
       state.message = action.payload
    },    
    setForm(state, action:PayloadAction<string>){
       state.Form = action.payload
    },    
    setUserLogin(state, action:PayloadAction<boolean>){
       state.login = action.payload
    },    
    /* setLoginUser(state, action){
       state.isLoggedIn = action.payload;
    },
    setRegisterForm(state , action){
        state.isRegisterd = action.payload;
    },
    setDisplay(state , action){
        state.display = action.payload;
    }, */
    }
});

export default usersSlice.reducer;
export const { setUserForm , setMessage, setForm, setUserNote, setUserLogin} = usersSlice.actions 