import { UsersState } from '../types/types';
import { createSlice } from "@reduxjs/toolkit";

const user = {
    userName: "",
    email:""
}


const initialState:UsersState = {
    user:user,
    isLoggedIn:false,
    isRegisterd:true,
    userForm:false
}

const usersSlice = createSlice({
    name:"users",
    initialState,
    reducers:{
    setUserForm(state, action){
       state.userForm = action.payload
    },    
    setLoginUser(state, action){
       state.isLoggedIn = action.payload;
    },
    setRegisterForm(state , action){
        state.isRegisterd = action.payload;
    }
    }
});

export default usersSlice.reducer;
export const { setUserForm, setLoginUser, setRegisterForm} = usersSlice.actions