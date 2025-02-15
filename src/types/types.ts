
export interface UsersState {
    
    logSignForm:boolean;
    Form:string;
    login:boolean;
    signupLoading:boolean;
    loginload:boolean;
    notifCard:boolean,
    notification:string,
    notificationName:string,
}




export interface EventsState {
    events: Event | null; 
    selectedEvent:UserEvent[]; 
    selectedDate:string;
    isEvent: boolean;
    newEvent:boolean;
    eventType:string;
    repeat:string;
    display:string;
    userEvent:UserEvent[];
    updateCalender:boolean; 
    AddnewEvent:Event;
    selectEvent:UserEvent;
    addCalanderEvent:boolean;
    loading:boolean;
}

export interface RootState {
    events:{
        events: Event[];  
        isEvent: boolean;
        selectedEvent:UserEvent[];
        selectedDate:string;
        newEvent:boolean;
        eventType:string;
        repeat:string;
        display:string;
        userEvent:UserEvent[];
        updateCalender:boolean; 
        AddnewEvent:Event;
        selectEvent:UserEvent;
        addCalanderEvent:boolean;
        loading:boolean;
     
    },
    users:{
     
        logSignForm:boolean;
        Form:string;
        login:boolean;
        signupLoading:boolean;
        loginload:boolean;
        notifCard:boolean,
        notification:string,
        notificationName:string,
  
    },
    auth:{
        user:UserInfo;
        isLoggedIn:boolean;
        message:string; 
    }

     
    
}



export interface UsersInfo{
    username:string;
    email:string;
    password:string;
    
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


export interface AuthUser{
   user:UserInfo | null;
   isLoggedIn:boolean;
   message:string;     

}

export interface UserInfo{
    username: string;
    email:string;
    _id:string;
}




export interface Event{
    title:string;
    description:string;
    time:string;
    date:string;
}

export interface UserEvent extends Event{
    _id:string;
}

export interface Selected{
    title:string;
    description:string;
    time:string;
    date:string;
    _id?:string
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