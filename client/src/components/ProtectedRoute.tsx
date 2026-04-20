import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getCurrentUser } from "../features/userSlice";
import Loader from "./Loader";
import useToastMessage from "../hooks/useToastMessage";

function ProtectedRoute() {
  const { currentUser, authChecking, redirectUrl } = useSelector((state) => state.user);
  const location = useLocation();

  // console.log("location", location);

  const dispatch = useDispatch();

  useEffect(() => {
    if (authChecking) {
      dispatch(getCurrentUser());
    }
  }, [authChecking, dispatch]);

  useToastMessage("user");

  if (authChecking) {
    return <Loader colour="text-blue-500" margin="mx-auto" size="12" />;
  }

  if (!currentUser && redirectUrl) {
    return <Navigate to="/setup-company" replace />;
  }

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  if (location.pathname === "/dashboard") {
    if (currentUser?.role === "candidate") {
      return <Navigate to="/dashboard/candidate" replace />;
    }
  }

  if (location.pathname === "/dashboard") {
    if (currentUser?.role === "recruiter" && currentUser?.needaCompanySetup === true) {
      return <Navigate to="/create-company" replace />;
    }
    if (currentUser?.role === "recruiter") {
      return <Navigate to="/dashboard/recruiter" replace />;
    }
  }

  return <Outlet />;
}

export default ProtectedRoute;
