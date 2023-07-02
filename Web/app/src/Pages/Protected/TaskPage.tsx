import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { UserDetail } from "../../Types/UserDetails";

type TaskPageProps = {
  isSignedIn: boolean;
  userDetails: UserDetail;
  children: ReactElement;
};

function TaskPage({ isSignedIn, children, userDetails }: TaskPageProps) {
  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }

  const allowedRoles = ["TopManagement", "ContentManager", "ContentWriter", "SeoManager", "SeoSpecialist", "WebDeveloper"];
  const userRole = userDetails.roles[0];

  if (userRole === "Unassigned") {
    return <Navigate to="/pendingapproval" replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/404" replace />;
  }

  return children;
}

export default TaskPage;
