import React, { useState, useEffect } from "react";
import DashboardPage from "../Pages/DashboardPage";
import { Chip } from "@mui/material";
import ApproveUser from "../modals/ApproveUser";
import RejectUser from "../modals/RejectUser";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { UserLogin } from "../Types/UserLogin";
import { UserDetailList } from "../Types/UserDetailList";
import { UserDetail } from "../Types/UserDetails";
import { TabTitle } from '../utils/GeneralFunctions';

export interface State extends SnackbarOrigin {
  open: boolean;
}

function AdminDashboard({ userDetail, isSignedIn }: UserLogin) {
  const [isRoleSuccess, setRoleSuccess] = useState(false);
  const [isRejectSuccess, setRejectSuccess] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetailList[]>();

  //Page Title
  TabTitle('Pending Users - SearchWorks')

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  // handle Approve Close
  const handleUserRoleClose = () => {
    setRoleSuccess((prevState) => !prevState);
  };

    // handle Reject close
    const handleRejectClose = () => {
      setRejectSuccess((prevState) => !prevState);
    };

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = async () => {
    const fetchData = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/UserData/users/unapproved`,
        {
          method: "GET",
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
    <DashboardPage user={userDetail} isSignedIn={isSignedIn}>
      <div className="relative flex justify-start flex-col w-full bg-white p-6 text-center h-790 drop-shadow rounded-md mx-4 mt-4 mb-0.5">
        <div className="flex justify-center flex-col items-center bg-white p-7 drop-shadow w-72 h-16 rounded-md">
          <div className="flex justify-center items-center">
            <h1 className="text-sm font-semibold text-zinc-800 mr-1 tracking-wider">
              Pending Approvals
            </h1>
            <label className="lining-nums font-bold text-sm bg-gray-300 rounded-full px-3">
              {userDetails && userDetails.length}
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
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="overflow-scroll text-sm relative">
              {userDetails && userDetails.length <= 0 ? (
                <div className="absolute top-0 left-0 bottom-0 right-0 mt-5">
                  <h1 className="text-xl text-stone-800">
                    No Pending Approvals
                  </h1>
                </div>
              ) : (
                userDetails &&
                userDetails.map((userDetail) => (
                  <tr
                    className="hover:bg-slate-300 text-zinc-700 tracking-wide"
                    key={userDetail.email}
                  >
                    <td className="border px-4 py-3">
                      {userDetail.firstName}
                    </td>
                    <td className="border px-4 py-3">
                      {userDetail.middleName}
                    </td>
                    <td className="border px-4 py-3">
                      {userDetail.lastName}
                    </td>
                    <td className="border px-4 py-3">
                      {userDetail.email}
                    </td>
                    <td className="border px-4 py-3">{userDetail.roles[0] === "Unassigned" && "Unassigned"}</td>
                    <td className="border px-4 py-3">
                      <Chip label="For Approval" className="font-semibold" />
                    </td>
                    <td className="border px-4 py-3 items-center space-x-3">
                      <ApproveUser
                        user={userDetail}
                        updateHandler={refreshData}
                        isApproveSuccess={setRoleSuccess}
                      />
                      <RejectUser 
                        user={userDetail}
                        updateHandler={refreshData}
                        isRejectedSuccess={setRejectSuccess}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
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
            User Successfully Approved!
          </Alert>
        </Snackbar>
      )}
      {/* DELETE NOTIFICATION */}
      {isRejectSuccess && (
        <Snackbar
          autoHideDuration={3000}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={isRejectSuccess}
          onClose={handleRejectClose}
        >
          <Alert onClose={handleRejectClose} severity="success">
            User Successfully Rejected!
          </Alert>
        </Snackbar>
      )}
    </DashboardPage>
  );
}

export default AdminDashboard;
