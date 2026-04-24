import React from "react";
import { Navigate, Outlet, useSearchParams } from "react-router-dom";

function TokenGuard() {
  const [query] = useSearchParams();
  const token = query.get("token");
  const allowAccess = query.get("allowAccess");

  console.log("TOKEN", token);

  if (!token) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
}

export default TokenGuard;
