import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Signup from './Components/Signup';
import SignupSuccess from './Components/SignupSuccess';
import ResetPassword from './Components/ResetPassword';
import DashboardPage from './Pages/DashboardPage';
import ProjectBoard from './Components/ProjectBoard';
import DashboardContent from './Components/DashboardContent';
import Task from './Components/Task';
import AdminDashboard from './Components/AdminDashboard';
import Modal from '../src/modals/DeleteUser'
import UserAvatar from './Components/UserAvatar';
import SuccessNotification from './Components/Notification/SuccessNotification'
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
        <Route path="/board" element={<ProjectBoard/>} />
        <Route path="/task" element={<Task/>} />
        <Route path="/user" element={<DashboardContent/>} />
        <Route path="/pending" element={<AdminDashboard/>} />
        <Route path="/notif" element={<SuccessNotification/>} />
        <Route path="/modal" element={<Modal/>} />
        <Route path="/avatar" element={<UserAvatar/>} />
      </Routes>
    </div>
  );
}

export default App;
