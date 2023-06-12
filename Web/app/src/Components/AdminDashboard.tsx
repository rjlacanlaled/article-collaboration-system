import React, { useState, useEffect } from "react";
import DashboardPage from "../Pages/DashboardPage";
import { Chip } from "@mui/material";
import ApproveUser from "../modals/ApproveUser";
import RejectUser from "../modals/RejectUser";
import AddRole from "../modals/AddRole";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

export interface State extends SnackbarOrigin {
  open: boolean;
}

export type UserDetail = {
  username: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  role: string[];
  date: any;
};

function AdminDashboard() {
  const [isRoleSuccess, setRoleSuccess] = useState(false)
  const [userDetails, setUserDetails] = useState<UserDetail[]>([
    {
      username: "",
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      role: [],
      date: "",
    },
  ]);

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleUserRoleClose = () => {
    setRoleSuccess(prevState => !prevState)
  }

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = async () => {
    const fetchData = async () => {
      const res = await fetch(
        "http://localhost:5143/api/v1/UserData/users/unapproved",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const userDetails = await res.json();
      console.log({ userDetails });
      setUserDetails(res.ok ? userDetails : []);
    };

    fetchData();
  };

  useEffect(() => {
    console.log(userDetails);
  }, [userDetails]);

  return (
    <DashboardPage>
      <div className="relative flex justify-start flex-col w-full bg-white p-6 text-center h-790 drop-shadow rounded-md mx-4 mt-4 mb-0.5">
        <div className="flex justify-center flex-col items-center bg-white p-7 drop-shadow w-72 h-16 rounded-md">
          <div className="flex justify-center items-center">
            <h1 className="text-sm font-semibold text-zinc-800 mr-1 tracking-wider">Pending Approvals</h1>
            <label className="lining-nums font-bold text-sm bg-gray-300 rounded-full px-3">
              {userDetails.length}
            </label>
          </div>
        </div>
        <div className="bg-white p-7 w-full scrollbar-thumb-gray-600 hover:scrollbar-thumb-gray-400 scrollbar-thin scroll-smooth">
          <table className="table-auto border-collapse my-6 text-base w-full">
            <thead className="font-semibold bg-gray-800 text-white text-sm uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3">First Name</th>
                <th className="px-4 py-3">Middle Name</th>
                <th className="px-4 py-3">Last Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Registration Date</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="overflow-scroll text-sm relative">
              {userDetails.length <= 0 ? (
                <div className="absolute top-0 left-0 bottom-0 right-0 mt-5">
                  <h1 className="text-xl text-stone-800">
                    No Pending Approvals
                  </h1>
                </div>
              ) : (
                userDetails.map((userDetail) => (
                  <tr className="hover:bg-slate-300 text-zinc-700 tracking-wide" key={userDetail.email}>
                    <td className="border px-4 py-3">{userDetail.firstName}</td>
                    <td className="border px-4 py-3">
                      {userDetail.middleName}
                    </td>
                    <td className="border px-4 py-3">{userDetail.lastName}</td>
                    <td className="border px-4 py-3">{userDetail.email}</td>
                    <td className="border px-4 py-3">{userDetail.role}</td>
                    <td className="border px-4 py-3">
                      <Chip label="For Approval" className="font-semibold"/>
                    </td>
                    <td className="border px-4 py-3">
                      {new Date(userDetail.date).toLocaleString()}
                    </td>
                    <td className="border px-4 py-3 items-center space-x-3">
                      <ApproveUser
                        user={userDetail}
                        updateHandler={refreshData}
                      />
                      <RejectUser />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* ADD ROLE BUTTON */}
        <div className="absolute top-0 right-0 p-0 m-3">
          <AddRole isAddRoleSuccess={isRoleSuccess}/>
        </div>
      </div>
        {/* ADD USER ROLE NOTIFICATION */}
        {isRoleSuccess && (
          <Snackbar
            autoHideDuration={3000}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            open={isRoleSuccess}
            onClose={handleUserRoleClose}
          >
            <Alert onClose={handleUserRoleClose} severity="info">
              User Successfully Added!
            </Alert>
          </Snackbar>
        )}
    </DashboardPage>
  );
}

export default AdminDashboard;
