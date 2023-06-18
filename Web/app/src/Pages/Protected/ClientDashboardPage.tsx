import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { UserDetail } from "../../Types/UserDetails";

type ClientDashboardPageProps = {
  isSignedIn: boolean;
  userDetails: UserDetail;
  children: ReactElement;
};

function ClientDashboardPage({
  isSignedIn,
  children,
  userDetails,
}: ClientDashboardPageProps) {
  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }

  if (isSignedIn && userDetails.roles[0] === "Unassigned") {
    return <Navigate to="/pendingapproval" replace />;
  }

  if (isSignedIn && userDetails.roles[0] !== "client") {
    return <Navigate to="/404" replace />;
  }

  return children;
}

export default ClientDashboardPage;
