import React, { useState, useEffect } from "react";
import DashboardPage from "../Pages/DashboardPage";
import { Chip } from "@mui/material";
import ApproveUser from "../modals/ApproveUser";
import RejectUser from "../modals/RejectUser";

export type UserDetail = {
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  registrationDate: number;
};

function AdminDashboard() {
  const [userDetails, setUserDetails] = useState<UserDetail[]>([
    {
      id: -1,
      userId: -1,
      firstName: "",
      lastName: "",
      email: "",
      role: "",
      registrationDate: 1,
    },
  ]);

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = async () => {
    const fetchData = async () => {
      const res = await fetch(
        "http://localhost:5143/api/v1/Users/users/unapproved"
      );

      const userDetails = await res.json();

      setUserDetails(res.ok ? userDetails : []);
    };

    fetchData();
  };

  useEffect(() => {
    console.log(userDetails);
  }, [userDetails]);

  return (
    <DashboardPage>
      <div className="flex justify-start flex-col w-full bg-white p-6 text-center h-700 drop-shadow rounded-md m-4">
        <div className="flex justify-center flex-col items-center bg-white p-7 drop-shadow w-72 h-16 rounded-md">
          <div className="flex justify-center items-center">
            <h1 className="text-sm font-semibold mr-1">Pending Approvals</h1>
            <label className="lining-nums font-bold text-sm bg-gray-300 rounded-full px-3">
              {userDetails.length}
            </label>
          </div>
        </div>
        <div className="bg-white p-7 w-full scrollbar-thumb-gray-600 hover:scrollbar-thumb-gray-400 scrollbar-thin scroll-smooth">
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
            <thead className="font-semibold bg-gray-800 text-white text-sm uppercase">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">First Name</th>
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
                  <h1 className="text-xl text-stone-800">No Pending Approvals</h1>
                </div>
              ) : (
                userDetails.map((userDetail) => (
                  <tr className="hover:bg-slate-300" key={userDetail.id}>
                    <td className="border px-4 py-3">{userDetail.userId}</td>
                    <td className="border px-4 py-3">{userDetail.firstName}</td>
                    <td className="border px-4 py-3">{userDetail.lastName}</td>
                    <td className="border px-4 py-3">{userDetail.email}</td>
                    <td className="border px-4 py-3">{userDetail.role}</td>
                    <td className="border px-4 py-3"><Chip label="For Approval" /></td>
                    <td className="border px-4 py-3">
                    {new Date(
                          userDetail.registrationDate
                        ).toLocaleString()}
                    </td>
                    <td className="border px-4 py-3 items-center space-x-3">
                      <ApproveUser user={userDetail} updateHandler={refreshData} />
                      <RejectUser />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardPage>
  );
}

export default AdminDashboard;
