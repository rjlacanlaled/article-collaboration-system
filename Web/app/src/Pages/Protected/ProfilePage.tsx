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

  if (isSignedIn && userDetails.roles[0] === "Unassigned") {
    return <Navigate to="/pendingapproval" replace />;
  }

  return children;
}

export default ProfilePage;
