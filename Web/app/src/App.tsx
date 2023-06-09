import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import SignupSuccess from "./Components/SignupSuccess";
import ForgotPassword from "./Components/ForgotPassword";
import ProjectBoard from "./Components/KanbanBoard";
import DashboardContent from "./Components/DashboardContent";
import TaskList from "./Components/TaskList";
import AdminDashboard from "./Components/AdminDashboard";
import Profile from "./Components/Profile";
import ViewTask from "./Components/ViewTask";
import ClientBoard from "./Components/ClientBoard";
import ClientDashboard from "./Components/ClientDashboard";
import Report from "./Components/Report";
import ResetEmail from "./Components/ResetEmail";
import NotFoundPage from "./Components/NotFound";
import NewPassword from "./Components/ResetPassword"
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetemail" element={<ResetEmail />} />
        <Route path="/newpassword" element={<NewPassword />} />
        <Route path="/*" element={<NotFoundPage/>} />
        <Route path="/404" element={<NotFoundPage/>} />
        {/* Protected Routes */}
        <Route path="/pending" element={<AdminDashboard />} />
        <Route path="/user" element={<DashboardContent />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/report" element={<Report />} />
        <Route path="/clientmain" element={<ClientDashboard />} />
        <Route path="/contract" element={<ClientBoard />} />
        <Route path="/viewTask/:id" element={<ViewTask />} />
        <Route path="/kanbanboard" element={<ProjectBoard />} />
        <Route path="/task" element={<TaskList />} />
        {/* <Route path="/dashboard" element={<DashboardPage children={undefined} />}/> */}
        <Route path="/success" element={<SignupSuccess />} />
      </Routes>
    </div>
  );
}

export default App;
