import React from 'react';
import './App.css'
import Messenger from './components/Messenger';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import { Toaster } from 'react-hot-toast'
import RequiredUser from './components/Auth/RequiredUser';
import 'animate.css';
const App = () => {

  return (
    <div >
      <Routes>
        <Route path='/' element={<RequiredUser>
          <Messenger />
        </RequiredUser>} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App