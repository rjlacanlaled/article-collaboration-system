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

  if (isSignedIn && userDetails.roles[0] === "Unassigned") {
    return <Navigate to="/pendingapproval" replace />;
  }

  return children;
}

export default TaskPage;