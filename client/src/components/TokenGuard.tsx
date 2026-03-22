import React from "react";
import { Navigate, Outlet, useSearchParams } from "react-router-dom";

function TokenGuard() {
  const [query, setQuery] = useSearchParams();
  const token = query.get("token");

  if (!token) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
}

export default TokenGuard;
