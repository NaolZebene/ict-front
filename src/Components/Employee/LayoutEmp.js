import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function LayoutEmp() {
  return (
    <>
      <div className="flex flex-row">
        <Sidebar />
        <div className="flex-1">
          <Navbar />
          <div className="bg-neutral-50 h-screen ml-64 mt-16">{<Outlet />}</div>
        </div>
      </div>
    </>
  );
}

export default LayoutEmp;
