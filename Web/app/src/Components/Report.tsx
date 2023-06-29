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
import { TabTitle } from '../utils/GeneralFunctions';

function Report({ userDetail, isSignedIn }: UserLogin) {
  const [userData, setUserData] = useState<UserDetailList[]>([]);
  const [page, setPage] = useState(1);
  // const [selectedDate, setSelectedDate] = useState(userDetail.user.date);

  //Page Title
  TabTitle('Report Summary - SearchWorks')

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
