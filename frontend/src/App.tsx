import { Route, Routes } from 'react-router-dom'
import './App.css'
import Signup from './pages/SignUp/Signup'
import Login from './pages/Login/Login'
import HomePage from './pages/Homepage/Homepage'
import RoutePlanner from './pages/Dashboard/dashboard'
// import BikeTracker from './pages/biketracking/Bicktrack'

 
function App() {


  return (
    <>
      <Routes>
      <Route path="/" element={<HomePage></HomePage>} />
        <Route path='/signup' element={<Signup></Signup>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/dashboard' element={<RoutePlanner />}></Route>
        {/* <Route path='/Bike' element={<BikeTracker />}></Route> */}
      
   

      </Routes>
    </>
  )
}

export default App