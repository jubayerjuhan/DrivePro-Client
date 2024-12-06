import React from "react";
import { useSelector } from "react-redux";
import { State } from "../../typings/reduxTypings";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
  location: any;
}
const ProtectedRoute = ({ children, location }: ProtectedRouteProps) => {
  const { user } = useSelector((state: State) => state.user);

  if (!user) return <Navigate to={"/login"} state={{ from: { location } }} />;
  return <>{children}</>;
};

export default ProtectedRoute;
