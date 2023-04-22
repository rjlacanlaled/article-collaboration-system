import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Signup from './Components/Signup';
import SignupSuccess from './Components/SignupSuccess';
import ForgotPassword from './Components/ForgotPassword';
import DashboardPage from './Pages/DashboardPage';
import ProjectBoard from './Components/KanbanBoard';
import DashboardContent from './Components/DashboardContent';
import TaskList from './Components/TaskList';
import AdminDashboard from './Components/AdminDashboard';
import Modal from '../src/modals/DeleteUser'
import UserAvatar from './Components/UserAvatar';
import SuccessNotification from './Components/Notification/SuccessNotification'
import Profile from './Components/Profile';
import EditableTitle from './Components/EditableTitle';
import Board from './Components/Board';
import ViewTask from './Components/ViewTask';
import ClientBoard from './Components/ClientBoard';
import ClientDashboard from './Components/ClientDashboard';
import Report from './Components/Report';
import ResetPassword from './Components/ResetPassword';
import ResetEmail from './Components/ResetEmail';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/success" element={<SignupSuccess/>} />
        <Route path="/forgotpassword" element={<ForgotPassword/>} />
        <Route path="/dashboard" element={<DashboardPage children={undefined}/>} />
        <Route path="/board" element={<ProjectBoard/>} />
        <Route path="/task" element={<TaskList/>} />
        <Route path="/user" element={<DashboardContent/>} />
        <Route path="/pending" element={<AdminDashboard/>} />
        <Route path="/notif" element={<SuccessNotification/>} />
        <Route path="/modal" element={<Modal/>} />
        <Route path="/avatar" element={<UserAvatar/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/title" element={<EditableTitle initialValue={''}/>} />
        <Route path="/boardpage" element={<Board/>} />
        <Route path="/viewTask/:id" element={<ViewTask />} />
        <Route path="/client" element={<ClientBoard />} />
        <Route path="/clientmain" element={<ClientDashboard />} />
        <Route path="/report" element={<Report />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/resetemail" element={<ResetEmail />} />
      </Routes>
    </div>
  );
}

export default App;
