import { Route, Routes } from 'react-router-dom'
import './App.css'
import Signup from './pages/SignUp/Signup'
import Login from './pages/Login/Login'
import HomePage from './pages/Homepage/Homepage'
import RoutePlanner from './pages/Dashboard/dashboard'
import { io } from 'socket.io-client';
import BikeRentingPage from './pages/bikerenting/Bikerenting'
import Wallet from './pages/wallet/Wallet'
//  import BikeTracker from './pages/biketracking/Bicktrack'

 
function App() {


  // const socket = io('http://localhost:3000');  // Ensure the correct server address is used
  
  // socket.on('connect', () => {
  //   console.log('Connected to server');
  // });
  
  // socket.on('bike-data', (data) => {
  //   console.log('Received bike data:', data);
  // });

  return (
    <>
      <Routes>
      <Route path="/" element={<HomePage></HomePage>} />
        <Route path='/signup' element={<Signup></Signup>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/dashboard' element={<RoutePlanner />}></Route>
         <Route path="/bike-rent/:bikeId" element={<BikeRentingPage />} />
         <Route path="/Wallet" element={<Wallet />} />
      </Routes>
    </>
  )
}

export default App