import { AuthUser, UserInfo } from '../types/types';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState:AuthUser = {
    user:null,
    isLoggedIn:false,
    message:''
}

const authSlice = createSlice({
    name:"users",
    initialState,
    reducers:{
        getUser(state, action:PayloadAction<UserInfo>){
            state.user = action.payload
         },
        setLog(state, action:PayloadAction<boolean>){
            state.isLoggedIn = action.payload
         },
         setMessage(state, action:PayloadAction<string>){
            state.message = action.payload
         },
    }

});

export default authSlice.reducer;
export const {getUser, setLog, setMessage } = authSlice.actions