import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { UserDetail } from "../../Types/UserDetails";

type ReportProps = {
  isSignedIn: boolean;
  userDetails: UserDetail;
  children: ReactElement;
};

function ReportPage({ isSignedIn, children, userDetails }: ReportProps) {
  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }

  const allowedRoles = ["TopManagement", "ContentManager", "ContentWriter", "SeoManager", "SeoSpecialist", "WebDeveloper"];
  const userRole = userDetails.roles[0];

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/404" replace />;
  }

  return children;
}

export default ReportPage;
