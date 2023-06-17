import React from "react";
import Header from "../Components/Header";
import Navigation from "../Components/Navigation";
import { UserDetail } from "../Types/UserDetails";

interface DashboardPageProps {
  children: React.ReactNode;
  user: UserDetail;
  isSignedIn: boolean;
}

const DashboardPage = ({ children, user, isSignedIn }: DashboardPageProps) => {
  return (
    <div className="flex h-screen bg-gray-100 overflow-y-auto">
      <div className="flex flex-col justify-start items-center w-64 h-screen bg-gray-800 border-r drop-shadow">
        <Navigation user={user} isSignedIn={isSignedIn} />
      </div>
      <div className="flex flex-col w-screen h-screen bg-gray-100 overflow-y-auto">
        <div className="sticky top-0 w-full h-20 shrink-0 bg-white flex justify-end items-center flex-row drop-shadow z-10">
          <Header userDetail={user} isSignedIn={isSignedIn} />
        </div>
        {/* DASHBOARD CONTENT */}
        <div className="w-full h-fit bg-gray-100 flex justify-start items-center flex-col p-6 z-0">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
