export interface User {
    userName: string;
    email: string;
}

export interface UsersState {
    user: User;
    isLoggedIn: boolean;
}


export interface Event {
    eventTitle: string;
    eventDate: string;
}

export interface EventsState {
    events: Event[];  
    isEvent: boolean;
}

export interface RootState {
    events:{
        events: Event[];  
        isEvent: boolean;
    },
    users:{
        user: User;
        isLoggedIn: boolean;
    }
}

export interface Signup{
    name:string;
    email:string;
    password:string;
    confirmPassword:string;
}
export interface Login{
    email:string;
    password:string;
}