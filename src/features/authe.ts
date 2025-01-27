import { Auth, AuthUser } from '../types/types';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const user:AuthUser = {
  user: 
        { username:'',
          email:'',
          _id:''},
isLoggedIn:false       

}



const initialState:Auth = {
    user:user
    
   
}

const authSlice = createSlice({
    name:"users",
    initialState,
    reducers:{
        getUser(state, action:PayloadAction<AuthUser>){
            state.user = action.payload
         },
        setLog(state, action:PayloadAction<boolean>){
            state.user.isLoggedIn = action.payload
         },
    }
});

export default authSlice.reducer;
export const {getUser, setLog } = authSlice.actions