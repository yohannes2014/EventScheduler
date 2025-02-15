//API

//cloude Api
const rootApi = "https://eventscaduleserver.onrender.com"
 //local Api
//const rootApi = "http://localhost:8000"


const authApi = `${rootApi}/api/auth`
const eventsApi = `${rootApi}/api/events`

//Signup Api
export const signUpApi =  `${authApi}/register`

//Login Api
export const loginApi =  `${authApi}/login`

//Logout Api
export const logOutApi = `${authApi}/logout`

//Add multiple Api
export const  multipeeventApi = `${eventsApi}/multiple`

//Add single event Api

//Get user data and user events Api
export const UserSData = `${authApi}`

//Get Events Api
export const userEventsApi = `${eventsApi}`


