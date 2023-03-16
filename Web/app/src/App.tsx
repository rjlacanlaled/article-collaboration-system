import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Signup from './Components/Signup';
import SignupSuccess from './Components/SignupSuccess';
import ResetPassword from './Components/ResetPassword';
import DashboardPage from './Pages/DashboardPage';
import ProjectBoard from './Components/ProjectBoard';
import DashboardContent from './Components/DashboardContent';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/success" element={<SignupSuccess/>} />
        <Route path="/reset-password" element={<ResetPassword/>} />
        <Route path="/dashboard" element={<DashboardPage children={undefined}/>} />
        <Route path="/taskboard" element={<ProjectBoard/>} />
        <Route path="/user" element={<DashboardContent/>} />
      </Routes>
    </div>
  );
}

export default App;
