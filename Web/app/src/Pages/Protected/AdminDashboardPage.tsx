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

  if (isSignedIn && userDetails.roles[0] === "Unassigned") {
    return <Navigate to="/success" replace />;
  }

  if (isSignedIn && userDetails.roles[0] !== "Admin") {
    return <Navigate to="/404" replace />;
  }

  return children;
}

export default AdminDashboardPage;
