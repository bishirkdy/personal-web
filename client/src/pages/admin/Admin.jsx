import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router";
const Admin = () => {
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user?.role === "admin";

  return (
    <>
      {isAdmin ? (
       <Outlet/>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
          <p className="text-lg">
            You do not have permission to access this page.
          </p>
        </div>
      )}
    </>
  );
};

export default Admin;
