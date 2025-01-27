export interface User {
    userName: string;
    email: string;
}

export interface UsersState {
    
    logSignForm:boolean;
    notification:boolean;
    message:string;
    Form:string;
    login:boolean;
}




export interface EventsState {
    events: Event[];  
    isEvent: boolean;
    newEvent:boolean;
    eventType:string;
    repeat:string;
}

export interface RootState {
    events:{
        events: Event[];  
        isEvent: boolean;
        newEvent:boolean;
        eventType:string;
        repeat:string;
    },
    users:{
     
        logSignForm:boolean;
        notification:boolean
        message:string;
        Form:string;
        login:boolean;
    },
    auth:{
        user:AuthUser;
        isLoggedIn:boolean;
    }

     
    
}

export interface UserData{
    username:string;
    email:string;
    _id:string
}


export interface UsersInfo{
    username:string;
    email:string;
    password:string;
    date:string;
}
export interface  Signup extends UsersInfo{
  
    confirmPassword:string;
  
}
export interface SignupValidator{
    username:string;
    email:string;
    password:string;
    confirmPassword:string;
}


export interface Login{
    email:string;
    password:string;
}

export interface userForm{
  username:string,
  email:string
}
export interface Auth{
    user:AuthUser;
    
}

export interface AuthUser{
   user:{ username: string;
           email:string;
            _id:string;
        },
   isLoggedIn:boolean     

}




export interface Event{
    title:string;
    discription:string;
    time:string;
    date:string;
    id:string;
}

export interface Standard {
    title:string;
    discription:string;
    time:string;
    date:string;
    id:string
  
}

export interface Error{
    message:string
}


export interface LoginResponse {
    login: boolean;
  }



export interface SelectedDays{
    Monday: boolean;
    Tuesday: boolean;
    Wednesday: boolean;
    Thursday: boolean;
    Friday: boolean;
    Saturday: boolean;
    Sunday: boolean;
  };