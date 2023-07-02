import React from "react";
import NotificationDropdown from "./NotificationDropdown";
import UserAvatar from "./UserAvatar";
import { UserLogin } from "../Types/UserLogin";

function Header({ userDetail, isSignedIn }: UserLogin) {
  return (
    <>
      <div className="flex justify-center flex-row items-center mr-20">
        {/* <NotificationDropdown /> */}
        <UserAvatar userDetail={userDetail} isSignedIn={isSignedIn} />
      </div>
    </>
  );
}

export default Header;
