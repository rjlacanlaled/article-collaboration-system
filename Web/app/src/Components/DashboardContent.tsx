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
          <div className="bg-white flex justify-end items-center">
            <label htmlFor="table-search" className="sr-only">
              Search
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-slate-500"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="table-search"
                className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-slate-500 dark:text-slate-700 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for items"
              />
            </div>
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
