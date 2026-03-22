import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { currentUser } = useSelector((state) => state.user);
  // const currentUser = 1;
  if (!currentUser) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default ProtectedRoute;

// function ProtectedRoute() {
//   // const { currentUser } = useSelector((state) => state.user);
//   const currentUser = 1;
//   if (!currentUser) {
//     return <Navigate to="/" replace />;
//   }
//   return <Outlet />;
// }

// export default ProtectedRoute;
