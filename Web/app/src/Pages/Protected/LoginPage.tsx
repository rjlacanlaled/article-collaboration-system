import { ReactElement } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { UserDetail } from "../../Types/UserDetails";

type LoginPageProps = {
  isSignedIn: boolean;
  userDetails: UserDetail;
  children: ReactElement;
  redirectTo: string;
};

function LoginPage({
  isSignedIn,
  children,
  userDetails,
  redirectTo,
}: LoginPageProps) {
  const navigate = useNavigate();

  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }

  if (isSignedIn && userDetails.roles[0] === "Unassigned") {
    return <Navigate to="/pendingapproval" replace />;
  }

  switch (true) {
    case userDetails.roles[0] === "Admin":
      navigate(redirectTo === "/" ? "/pending" : redirectTo);
      break;
    case userDetails.roles[0] === "Client":
      navigate(redirectTo === "/" ? "/clientmain" : redirectTo);
      break;
    case userDetails.roles[0] === "Unassigned":
      navigate(redirectTo === "/" ? "/pendingApproval" : redirectTo);
      break;
    default:
      navigate(redirectTo === "/" ? "/kanbanboard" : redirectTo);
  }

  return children;
}

export default LoginPage;
