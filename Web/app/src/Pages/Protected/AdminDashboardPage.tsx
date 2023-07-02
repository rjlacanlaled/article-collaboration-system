import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { UserDetail } from "../../Types/UserDetails";

type AdminDashboardPageProps = {
  isSignedIn: boolean;
  userDetails: UserDetail;
  children: ReactElement;
};

function AdminDashboardPage({
  isSignedIn,
  children,
  userDetails,
}: AdminDashboardPageProps) {
  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }

  const allowedRoles = ["TopManagement", "Admin"];
  const userRole = userDetails.roles[0];

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/404" replace />;
  }

  if (userRole === "Unassigned") {
    return <Navigate to="/pendingapproval" replace />;
  }

  return children;
}

export default AdminDashboardPage;
