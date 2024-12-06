import React from "react";
import AdminSidebar from "../AdminSidebar/AdminSidebar";

interface AdminPageWrapperProps {
  children: React.ReactNode;
  className?: string;
}
const AdminPageWrapper = ({ children, className }: AdminPageWrapperProps) => {
  return <AdminSidebar component={children} className={className} />;
};

export default AdminPageWrapper;
