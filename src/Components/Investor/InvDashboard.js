import React from "react";
import CardInv from "./CardInv";
import ChartInv from "./ChartInv";

function InvDashboard() {
  return (
    <>
      <div className="bg-neutral-50">
        <CardInv />
        <ChartInv />
      </div>
    </>
  );
}

export default InvDashboard;
