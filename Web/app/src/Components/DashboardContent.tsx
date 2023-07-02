import React, { useEffect, useState } from "react";
import { Chip } from "@mui/material";
import MemberLogo from "../Assets/Images/member-logo.svg";
import DashboardPage from "../Pages/DashboardPage";
import DeleteUser from "../modals/DeleteUser";
import UpdateUser from "../modals/UpdateUser";
import { UserLogin } from "../Types/UserLogin";
import { UserDetailList } from "../Types/UserDetailList";
import { TabTitle } from '../utils/GeneralFunctions';

function DashboardContent({ userDetail, isSignedIn }: UserLogin) {
  const [userDetails, setUserDetails] = useState<UserDetailList[]>();

  //Page Title
  TabTitle('Users - SearchWorks')

  console.log(userDetails);
  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/UserData/users/approved`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const userDetails = await res.json();
    console.log({ userDetails });

    setUserDetails(userDetails);
  };

  return (
    <DashboardPage user={userDetail} isSignedIn={isSignedIn}>
      <div className="flex justify-start flex-col w-full bg-white p-6 text-center h-790 drop-shadow rounded-md mx-4 mt-4 mb-0.5">
        <div className="bg-white p-7 w-full scrollbar-thumb-gray-600 hover:scrollbar-thumb-gray-400 scrollbar-thin scroll-smooth">
          <div className="flex justify-center flex-row text-left bg-white p-7 drop-shadow w-72 rounded-md">
            <div className="flex justify-center flex-col mr-9">
              <h1 className="text-sm font-semibold mb-1 tracking-widest text-zinc-800">
                MEMBERS
              </h1>
              {userDetails && userDetails.length > 0 ? (
                <label className="lining-nums font-bold text-4xl">
                  {userDetails.length}
                </label>
              ) : (
                <p className="lining-nums font-bold text-4xl">0</p>
              )}
            </div>
            <img src={MemberLogo} alt="member-logo" className="w-20" />
          </div>
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
            <tbody className="overflow-scroll text-sm relative tracking-wider">
              {userDetails && userDetails.length > 0 ? (
                userDetails.map((userD) => (
                  <tr className="hover:bg-slate-300" key={userD.email}>
                    <td className="border px-4 py-3">{userD.firstName}</td>
                    <td className="border px-4 py-3">{userD.middleName}</td>
                    <td className="border px-4 py-3">{userD.lastName}</td>
                    <td className="border px-4 py-3">{userD.email}</td>
                    <td className="border px-4 py-3">{userD.roles[0].replace(/([a-z])([A-Z])/g, '$1 $2')}</td>
                    <td className="border px-4 py-3">
                      <Chip label="Approved" color="success" />
                    </td>
                    <td className="border px-4 py-3 items-center">
                      <div className="flex justify-center">
                        <UpdateUser user={userD} updateHandler={refreshData} />
                        <DeleteUser user={userD} updateHandler={refreshData} />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <div className="absolute top-0 left-0 bottom-0 right-0 mt-5">
                  <h1 className="text-xl text-stone-800">No Approved Users</h1>
                </div>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardPage>
  );
}

export default DashboardContent;
