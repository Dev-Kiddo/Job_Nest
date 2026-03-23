import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { getCurrentUser } from "../features/userSlice";
import Loader from "./Loader";

function ProtectedRoute() {
  const { currentUser, authChecking } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Im inside protected route");
    if (authChecking) {
      console.log("Im inside protected route effect");
      dispatch(getCurrentUser());
    }
  }, [authChecking, dispatch]);

  if (authChecking) {
    return <Loader colour="text-blue-500" />;
  }

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
