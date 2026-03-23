import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { getCurrentUser } from "../features/userSlice";
import Loader from "./Loader";

// function ProtectedRoute({ children }) {
//   const { currentUser, authChecking } = useSelector((state) => state.user);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getCurrentUser());
//   }, [dispatch]);

//   if (authChecking) {
//     return <Loader color="text-blue-600" />;
//   }

//   if (!currentUser) {
//     return <Navigate to="/" replace />;
//   }
//   return children;
// }

// export default ProtectedRoute;

function ProtectedRoute() {
  const { currentUser, authChecking } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (authChecking) {
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
