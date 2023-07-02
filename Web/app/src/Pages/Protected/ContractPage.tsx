import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { UserDetail } from "../../Types/UserDetails";

type ContractPageProps = {
  isSignedIn: boolean;
  userDetails: UserDetail;
  children: ReactElement;
};

function ContractPage({ isSignedIn, children, userDetails }:  ContractPageProps) {
  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }

  const allowedRoles = ["TopManagement", "ContentManager", "ContentWriter", "SeoManager", "SeoSpecialist", "WebDeveloper"];
  const userRole = userDetails.roles[0];

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/404" replace />;
  }

  if (userRole === "Unassigned") {
    return <Navigate to="/pendingapproval" replace />;
  }

  return children;
}                           

export default ContractPage;
                             