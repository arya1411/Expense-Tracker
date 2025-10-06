import { useState } from 'react'
import{
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import Home from './pages/dashboard/Home';
import Expense from './pages/dashboard/Expense';
import Income from './pages/dashboard/Income';
import UserProvider from './context/userContext';
import LandingPage from './LandingPage_Minimal';
import {Toaster} from 'react-hot-toast'

function App() {

  return (
    
    <UserProvider>
      <Router>
        <Routes>
          <Route path='/main' exact element={<LandingPage/>}/>
          <Route path='/' element={<Root/>}/>
          <Route path='/login' exact element={<Login/>}/>
          <Route path='/signup' exact element={<SignUp/>}/>
          <Route path='/home' exact element={<Home/>}/>
          <Route path='/expense' exact element={<Expense/>}/>
          <Route path='/income' exact element={<Income/>}/>
          <Route path='/dashboard' exact element={<Home/>}/>
        </Routes>
      </Router>

      <Toaster
        toastOptions={{
          className:"" ,
          style :{
            fontSize :'13px',
          },
        }}
        />
    </UserProvider>
  )
}

export default App


const Root = () =>{
  return (
    <Navigate to='/main'/>
  )

  
  //const isAuthenticated = !!localStorage.getItem("token");

 // return isAuthenticated ?(
   //   <Navigate to="/home"/>
 // ) :(
  //  <Navigate to="/login"/>
  //);
};