import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getCurrentUser } from "../features/userSlice";
import Loader from "./Loader";
import useToastMessage from "../hooks/useToastMessage";
import { getCurrentCompany } from "../features/companySlice";
import { getCandidateProfile } from "../features/profileSlice";

function ProtectedRoute() {
  const { currentUser: user, authChecking, redirectUrl } = useSelector((state) => state.user);

  const currentUser = Object.keys(user).length > 0 ? user : null;

  const { jobs } = useSelector((state) => state.job);

  const { company } = useSelector((state) => state.company);

  const location = useLocation();

  // console.log("LOCATION", location);

  const dispatch = useDispatch();

  useEffect(() => {
    if (authChecking) {
      dispatch(getCurrentUser());
    }
  }, [authChecking, dispatch]);

  useEffect(() => {
    if (currentUser && currentUser.role === "recruiter" && !currentUser.needaCompanySetup && !company) {
      dispatch(getCurrentCompany());
    }
  }, [dispatch, currentUser, company]);

  useEffect(() => {
    if (currentUser && currentUser.role === "candidate" && !currentUser.candidate) {
      dispatch(getCandidateProfile());
    }
  }, [dispatch, currentUser]);

  useToastMessage("user");

  if (authChecking) {
    return <Loader colour="text-blue-500" margin="mx-auto" size="12" />;
  }

  if (!currentUser && redirectUrl) {
    return <Navigate to="/setup-company" replace />;
  }

  if (location.pathname === "/job-preview" && !jobs) {
    return <Navigate to="/" replace />;
  }

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  if (location.pathname === "/dashboard") {
    if (currentUser?.role === "candidate") {
      return <Navigate to={location?.state?.from ? location?.state?.from : "/dashboard/candidate"} />;
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
