import React, { useEffect, useState } from "react";
import DashboardPage from "../Pages/DashboardPage";
import ArticleTable from "./CompletedArticle";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { UserLogin } from "../Types/UserLogin";
import { UserDetailList } from "../Types/UserDetailList";
import ExportUserSummaryButton from "./ExportUserSummaryButton";

function Report({ userDetail, isSignedIn }: UserLogin) {
  const [userData, setUserData] = useState<UserDetailList[]>([]);
  const [page, setPage] = useState(1);
  // const [selectedDate, setSelectedDate] = useState(userDetail.user.date);

  console.log(userData)

  const UserPerPage = 5;
  const totalPages = Math.ceil(userData.length / UserPerPage);

  const startIndex = (page - 1) * UserPerPage;
  const endIndex = startIndex + UserPerPage;
  const displayedUsers = userData?.slice(startIndex, endIndex);

  const handleChange = (e: any, p: number) => {
    console.log(page);
    setPage(p);
  };

  // const handleDateChange = (date: any) => {
  //   setSelectedDate(date);
  // };

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = async () => {
    const fetchData = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/UserData/users/approved`,
        {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const userDetails = await res.json();
      console.log( userDetails + "adasd");
      setUserData(res.ok ? userDetails : []);
    };

    fetchData();
  };

  return (
    <DashboardPage user={userDetail} isSignedIn={isSignedIn}>
      {userDetail.roles[0] === "SeoSpecialist" || userDetail.roles[0] === "ContentWriter" || userDetail.roles[0] === "WebDeveloper" ? (
        <>
        <ArticleTable />
        </>
        ) : (
          <>
      <ArticleTable />
      <div className="flex justify-start flex-col w-full bg-white p-6 text-center h-650 drop-shadow rounded-md m-4">
        <h2 className="text-zinc-800 lining-nums font-bold tracking-wider">
          {" "}
          USERS TASK SUMMARY
        </h2>
        <div className="bg-white flex justify-between items-center">
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
              placeholder="Search for User"
            />
          </div>
        </div>
        <div className="w-full h-400">
          <table className="table-auto border-collapse my-6 text-base w-full">
            <thead className="font-semibold bg-gray-800 text-white text-sm uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3">First Name</th>
                <th className="px-4 py-3">Middle Name</th>
                <th className="px-4 py-3">Last Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">In Progress</th>
                <th className="px-4 py-3">Completed Task</th>
                <th className="px-4 py-3">Past EOD</th>
              </tr>
            </thead>
            <tbody className="overflow-scroll text-sm text-zinc-700 font-medium tracking-wide">
              {displayedUsers.map((UserDatas) => (
                <tr key={UserDatas.email}>
                  <td className="border px-4 py-3">{UserDatas.firstName}</td>
                  <td className="border px-4 py-3">{UserDatas.middleName}</td>
                  <td className="border px-4 py-3">{UserDatas.lastName}</td>
                  <td className="border px-4 py-3">{UserDatas.email}</td>
                  <td className="border px-4 py-3">{UserDatas.roles[0]}</td>
                  <td className="border px-4 py-3">1</td>
                  <td className="border px-4 py-3">2</td>
                  <td className="border px-4 py-3">3</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="place-self-center mb-5">
          <Stack spacing={2}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handleChange}
              renderItem={(item) => (
                <PaginationItem
                  slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                  {...item}
                />
              )}
            />
          </Stack>
        </div>
        <ExportUserSummaryButton label="export all" />
      </div>
      </>
      )}
    </DashboardPage>
  );
}

export default Report;
