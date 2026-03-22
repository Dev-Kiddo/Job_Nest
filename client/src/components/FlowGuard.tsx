import { Navigate, Outlet, useLocation } from "react-router-dom";

function FlowGuard() {
  const location = useLocation();

  if (!location?.state?.allowAccess) {
    return <Navigate to="/" />;
  }

  // if (!token) {
  // }
  return <Outlet />;
}

export default FlowGuard;
