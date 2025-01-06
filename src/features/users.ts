import { UsersState } from '../types/types';
import { createSlice } from "@reduxjs/toolkit";

const user = {
    userName: "",
    email:""
}


const initialState:UsersState = {
    user:user,
    isLoggedIn:false,
}

const usersSlice = createSlice({
    name:"users",
    initialState,
    reducers:{
    loginUser(state, action){
       state.isLoggedIn = action.payload;
    },
    }
});

export default usersSlice.reducer;
export const { loginUser} = usersSlice.actions