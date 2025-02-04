import Navigation from "./components/Navigation"
import NewEvent from "./components/NewEvent"
import SignUpLoginForm from "./components/SignUpLoginForm"
import AllRoutes from "./routes/AllRoutes"

function App() {


  return (
    <>
      <SignUpLoginForm />
       <NewEvent />

   
      <div className="xl:w-[1200px] m-auto">
        <Navigation />
        <AllRoutes />
        </div>
    
    </>

  )
}

export default App
