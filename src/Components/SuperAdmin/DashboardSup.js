import React from "react";
import CardSup from "./CardSup";
import ChartSup from "./ChartSup";

function DashboardSup() {
  return (
    <>
      <div className="bg-neutral-50">
        <CardSup />
        <ChartSup />
      </div>
    </>
  );
}

export default DashboardSup;
