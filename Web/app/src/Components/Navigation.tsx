import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavLogo from "../Assets/Images/searchwork-logo.svg";
import HomeIcon from "@mui/icons-material/HomeOutlined";
import TaskIcon from "@mui/icons-material/FormatListBulletedOutlined";
import ReportIcon from "@mui/icons-material/SummarizeOutlined";
import KanbanBoardIcon from "@mui/icons-material/ViewKanbanOutlined";
import UserIcon from "@mui/icons-material/PersonOutlineOutlined";
import ClientIcon from "@mui/icons-material/AccountBoxOutlined";
import { UserDetail } from "../Types/UserDetails";
import { MyToken } from "./Login";
import jwt_decode from "jwt-decode";

interface NavigationProps {
  user: UserDetail;
  isSignedIn: boolean;
}

function Navigation({ user, isSignedIn }: NavigationProps) {
  const [userDetail, setUserDetail] = useState<UserDetail>(
    JSON.parse(localStorage.getItem("user")!)
  );

  useEffect(() => {
    if (!userDetail) {
      setUserDetail(JSON.parse(localStorage.getItem("user")!));
    }
  }, []);

  return (
    <>
      <div className="flex items-center mb-6 px-4 py-6">
        <img src={NavLogo} alt="Logo" className="w-7 h-8 mr-2" />
        <span className="text-gray-400 font-bold text-base">SEARCH WORK</span>
      </div>
      <ul className="list-none text-l font-medium leading-relaxed tracking-wide">
        {userDetail!.roles[0] === "Admin" ? (
          <>
            <div className="flex justify-start items-center w-48 rounded-md py-2 px-4 text-gray-400 hover:text-white">
              <HomeIcon className="w-5 mr-3" />
              <li>
                <Link to="/pending">
                  <a href="/" className="tracking-wider">
                    Dashboard
                  </a>
                </Link>
              </li>
            </div>
            <div className="flex justify-start items-center w-48 rounded-md py-2 px-4 text-gray-400 hover:text-white">
              <UserIcon className="w-5 mr-3" />
              <li>
                <Link to="/user">
                  <a href="/" className="tracking-wider">
                    User
                  </a>
                </Link>
              </li>
            </div>
          </>
        ) : userDetail!.roles[0] === "client" ||
          userDetail!.roles[0] === "Client" ? (
          <div className="flex justify-start items-center w-48 rounded-md py-2 px-4 text-gray-400 hover:text-white">
            <HomeIcon className="w-5 mr-3" />
            <li>
              <Link to="/clientmain">
                <a href="/" className="tracking-wider">
                  Dashboard
                </a>
              </Link>
            </li>
          </div>
        ) : (
          <>
            <div className="flex justify-start items-center w-48 rounded-md py-2 px-4 text-gray-400 hover:text-white">
              <KanbanBoardIcon className="w-5 mr-3" />
              <li>
                <Link to="/kanbanboard">
                  <a href="/" className="tracking-wider">
                    Board
                  </a>
                </Link>
              </li>
            </div>
            <div className="flex justify-start items-center w-48 rounded-md py-2 px-4 text-gray-400 hover:text-white">
              <TaskIcon className="w-5 mr-3" />
              <li>
                <Link to="/task">
                  <a href="/task" className="tracking-wider">
                    Task
                  </a>
                </Link>
              </li>
            </div>
            <div className="flex justify-start items-center w-48 rounded-md py-2 px-4 text-gray-400 hover:text-white">
              <ClientIcon className="w-5 mr-3" />
              <li>
                <Link to="/contract">
                  <a href="/contract" className="tracking-wider">
                    Client
                  </a>
                </Link>
              </li>
            </div>
            <div className="flex justify-start items-center w-48 rounded-md py-2 px-4 text-gray-400 hover:text-white">
              <ReportIcon className="w-5 mr-3" />
              <li>
                <Link to="/report">
                  <a href="/" className="tracking-wider">
                    Report
                  </a>
                </Link>
              </li>
            </div>
          </>
        )}
      </ul>
    </>
  );
}

export default Navigation;
