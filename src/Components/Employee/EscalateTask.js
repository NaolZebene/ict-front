import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import EmpAuthContext from "../Store/Emp-authContext";

function EscalateTask() {
  const empAuthCtx = useContext(EmpAuthContext);

  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const singleFetch = async () => {
      const response = await fetch(
        `http://localhost:8080/employee/escalate/` + id,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + empAuthCtx.token,
          },
        }
      );
      if (!response.ok) {
        console.log("Something went wrong");
      }
      const data = await response.json();
      console.log(data);
      setIsLoading(false);
    };

    singleFetch();
  }, [id, empAuthCtx]);
  return (
    <>
      <div className="bg-neutral-50">
        <div className="text-3xl text-center  text-blue-500 font-bold">
          {isLoading && <h4>Loading...</h4>}
          {!isLoading && <h1>Task Escalated Successfully</h1>}
        </div>
      </div>
    </>
  );
}

export default EscalateTask;
