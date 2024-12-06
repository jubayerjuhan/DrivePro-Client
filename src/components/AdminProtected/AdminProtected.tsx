import React from "react";
import { useSelector } from "react-redux";
import { State } from "../../typings/reduxTypings";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
  location: any;
}
const AdminProtected = ({ children, location }: ProtectedRouteProps) => {
  const { admin } = useSelector((state: State) => state.admin);

  if (!admin)
    return <Navigate to={"/admin/login"} state={{ from: { location } }} />;
  return <>{children}</>;
};

export default AdminProtected;
