import React from "react";
import CardDashboard from "./CardDashboard";
import EmpDashboard from "./EmpDashboard";
import Chart from "./Chart";

function Dashboard() {
  return (
    <>
      <div className="bg-neutral-50">
        <CardDashboard />
        <Chart />
        <EmpDashboard />
      </div>
    </>
  );
}

export default Dashboard;
