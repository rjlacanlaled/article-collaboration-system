import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Login, { MyToken } from "./Components/Login";
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
import NewPassword from "./Components/ResetPassword";
import SuccessReset from "./Components/SuccessReset";
import PendingApproval from "./Components/PendingApproval";
import "./App.css";
import { UserDetail } from "./Types/UserDetails";
import AdminDashboardPage from "./Pages/Protected/AdminDashboardPage";
import ClientDashboardPage from "./Pages/Protected/ClientDashboardPage";
import jwt_decode from "jwt-decode";
import ProfilePage from "./Pages/Protected/ProfilePage";
import TaskPage from "./Pages/Protected/TaskPage";
import KanbanboardPage from "./Pages/Protected/KanbanboardPage";
import ViewTaskPage from "./Pages/Protected/ViewTaskPage";
import ContractPage from "./Pages/Protected/ContractPage";
import ReportPage from "./Pages/Protected/ReportPage";

function App() {
  // isSignedIn state = if signed out false
  const [user, setUser] = useState<UserDetail | null>(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleLoginAsync = async (token: string) => {
      // fetch user details
      const decodedToken = jwt_decode<MyToken>(token);
      console.log({ decodedToken });
      var userDetailReq = await fetch(
        `http://localhost:5143/api/v1/UserData/email/${encodeURIComponent(
          decodedToken.email
        )}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      var userDetail: UserDetail = await userDetailReq.json();
      console.log({ userDetail });

      setUser(userDetail);
      setIsSignedIn(true);

      localStorage.setItem("user", JSON.stringify(userDetail));

      console.log("pathbnae", location.pathname);

      switch (true) {
        case userDetail.roles[0] === "Admin":
          navigate(location.pathname === "/" ? "/pending" : location.pathname);
          break;
        case userDetail.roles[0] === "Client":
          navigate(
            location.pathname === "/" ? "/clientmain" : location.pathname
          );
          break;
        case userDetail.roles[0] === "Unassigned":
          navigate(
            location.pathname === "/" ? "/pendingapproval" : location.pathname
          );
          break;
        default:
          navigate(
            location.pathname === "/" ? "/kanbanboard" : location.pathname
          );
      }
    };
    if (localStorage.getItem("token") != null) {
      handleLoginAsync(localStorage.getItem("token")!);
    }
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Login
              onLoginSuccess={setIsSignedIn}
              onFetchUserDetails={setUser}
            />
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        {/* Protected Routes */}
        <Route
          path="/pending"
          element={
            <AdminDashboardPage
              isSignedIn={isSignedIn}
              userDetails={user!}
              children={
                <AdminDashboard userDetail={user!} isSignedIn={isSignedIn} />
              }
            />
          }
        />
        <Route
          path="/user"
          element={
            <AdminDashboardPage
              isSignedIn={isSignedIn}
              userDetails={user!}
              children={
                <DashboardContent userDetail={user!} isSignedIn={isSignedIn} />
              }
            />
          }
        />
        <Route
          path="/profile"
          element={
            <ProfilePage
              isSignedIn={isSignedIn}
              userDetails={user!}
              children={
                <Profile userDetail={user!} isSignedIn={isSignedIn} />
              }
            />
          }
        />
        <Route
          path="/clientmain"
          element={
            <ClientDashboardPage
              isSignedIn={isSignedIn}
              userDetails={user!}
              children={<ClientDashboard userDetail={user!} isSignedIn={isSignedIn} />}
            />
          }
        />
        <Route
          path="/report"
          element={
            <ReportPage
              isSignedIn={isSignedIn}
              userDetails={user!}
              children={
                <Report userDetail={user!} isSignedIn={isSignedIn} />
              }
            />
          }
        />
        <Route
          path="/contract"
          element={
            <ContractPage
              isSignedIn={isSignedIn}
              userDetails={user!}
              children={<ClientBoard userDetail={user!} isSignedIn={isSignedIn} />}
            />
          }
        />
        <Route
          path="/viewTask/:id"
          element={
            <ViewTaskPage
              isSignedIn={isSignedIn}
              userDetails={user!}
              children={<ViewTask userDetail={user!} isSignedIn={isSignedIn} />}
            />
          }
        />
        <Route
          path="/kanbanboard"
          element={
            <KanbanboardPage
              isSignedIn={isSignedIn}
              userDetails={user!}
              children={<ProjectBoard userDetail={user!} isSignedIn={isSignedIn} />}
            />
          }
        />
        <Route
          path="/task"
          element={
          <TaskPage
              isSignedIn={isSignedIn}
              userDetails={user!}
              children={<TaskList userDetail={user!} isSignedIn={isSignedIn} />}
            />
          }
        />
        <Route path="/success" element={<SignupSuccess />} />
        <Route path="/successreset" element={<SuccessReset />} />
        <Route path="/resetemail" element={<ResetEmail />} />
        <Route path="/newpassword" element={<NewPassword />} />
        <Route path="/pendingapproval" element={<PendingApproval />} />
        {/* </Route> */}
        {/* error page */}
        <Route path="/*" element={<NotFoundPage />} />
        <Route path="/404" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
