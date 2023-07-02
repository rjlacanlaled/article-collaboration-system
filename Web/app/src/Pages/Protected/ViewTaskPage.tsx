import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { UserDetail } from "../../Types/UserDetails";

type ViewTaskPageProps = {
  isSignedIn: boolean;
  userDetails: UserDetail;
  children: ReactElement;
};

function ViewTaskPage({ isSignedIn, children, userDetails }: ViewTaskPageProps) {
  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }

  if (userDetails.roles[0] === "Unassigned") {
    return <Navigate to="/pendingapproval" replace />;
  }

  const allowedRoles = ["TopManagement", "ContentManager", "ContentWriter", "SeoManager", "SeoSpecialist", "WebDeveloper"];
  const userRole = userDetails.roles[0];

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/404" replace />;
  }

  return children;
}

export default ViewTaskPage;
