import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import SignupSuccessPage from './Pages/SignupSuccessPage';
import ResetPasswordPage from './Pages/ResetPasswordPage';
import DashboardPage from './Pages/DashboardPage';
import ProjectBoard from './Components/ProjectBoard';
import DashboardContent from './Components/DashboardContent';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/signup" element={<SignupPage/>} />
        <Route path="/success" element={<SignupSuccessPage/>} />
        <Route path="/reset-password" element={<ResetPasswordPage/>} />
        <Route path="/dashboard" element={<DashboardPage children={undefined}/>} />
        <Route path="/taskboard" element={<ProjectBoard/>} />
        <Route path="/user" element={<DashboardContent/>} />
      </Routes>
    </div>
  );
}

export default App;
