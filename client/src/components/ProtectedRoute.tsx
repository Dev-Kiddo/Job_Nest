import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { deactivateAuthChecking, getCurrentUser } from "../features/userSlice";
import Loader from "./Loader";
import useToastMessage from "../hooks/useToastMessage";
import { getCurrentCompany } from "../features/companySlice";
import { getCandidateProfile } from "../features/candidateSlice";

function ProtectedRoute() {
  const { currentUser, authChecking, redirectUrl } = useSelector((state) => state.user);
  const { company } = useSelector((state) => state.company);
  const { candidate } = useSelector((state) => state.candidate);

  const location = useLocation();

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
    if (currentUser && currentUser.role === "candidate" && !candidate) {
      dispatch(getCandidateProfile());
    }
  }, [dispatch, currentUser, candidate]);

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
