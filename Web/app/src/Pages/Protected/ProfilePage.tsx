import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { UserDetail } from "../../Types/UserDetails";

type ProfilePageProps = {
  isSignedIn: boolean;
  userDetails: UserDetail;
  children: ReactElement;
};

function ProfilePage({ isSignedIn, children, userDetails }: ProfilePageProps) {
  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }

  const allowedRoles = ["TopManagement", "Admin", "ContentManager", "ContentWriter", "SeoManager", "SeoSpecialist", "WebDeveloper", "Client"];
  const userRole = userDetails.roles[0];

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/404" replace />;
  }

  return children;
}

export default ProfilePage;
