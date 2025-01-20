export interface User {
    userName: string;
    email: string;
}

export interface UsersState {
    user: User;
    userForm:boolean;
    isLoggedIn: boolean;
    isRegisterd:boolean;
    display:string;
}




export interface EventsState {
    events: Event[];  
    isEvent: boolean;
    newEvent:boolean;
}

export interface RootState {
    events:{
        events: Event[];  
        isEvent: boolean;
        newEvent:boolean;
    },
    users:{
        user: User;
        userForm:boolean;
        isLoggedIn: boolean;
        isRegisterd:boolean;
        display:string;
    }
}




export interface UsersInfo{
    name:string;
    email:string;
    password:string;
    date:string;
}
export interface  Signup extends UsersInfo{
  
    confirmPassword:string;
  
}
export interface SignupValidator{
    name:string;
    email:string;
    password:string;
    confirmPassword:string;
}


export interface Login{
    email:string;
    password:string;
}




export interface Event{
    title:string;
    discription:string;
    time:string;
    date:string;
}

export interface Standard {
    title:string;
    discription:string;
    time:string;
    date:string;
  
}

export interface Error{
    message:string
}



export interface LoginResponse {
    login: boolean;
  }