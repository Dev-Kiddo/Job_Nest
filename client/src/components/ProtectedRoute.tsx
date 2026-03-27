import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { getCurrentUser } from "../features/userSlice";
import Loader from "./Loader";
import useToastMessage from "../hooks/useToastMessage";

function ProtectedRoute() {
  const { currentUser, authChecking } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (authChecking) {
      dispatch(getCurrentUser());
    }
  }, [authChecking, dispatch]);

  useToastMessage("auth");

  if (authChecking) {
    return <Loader colour="text-blue-500" margin="mx-auto" size="12" />;
  }

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  return <Outlet context={currentUser?.role} />;
}

export default ProtectedRoute;
