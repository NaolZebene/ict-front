import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import EmpAuthContext from "../Store/Emp-authContext";

function AsToDep() {
  const empAuthCtx = useContext(EmpAuthContext);

  const { taskid, depid } = useParams();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const AssignedTask = async () => {
      const response = await fetch(
        `http://localhost:8080/user/${taskid}/${depid}`,
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
      console.log(depid);
      setIsLoading(false);
    };

    AssignedTask();
  }, [taskid, depid, empAuthCtx]);

  return (
    <>
      <div className="bg-neutral-50">
        <div className="text-3xl text-center  text-blue-500 font-bold">
          {isLoading && <h4>Loading...</h4>}
          {!isLoading && <h1>Task Assigned successfully</h1>}
        </div>
      </div>
    </>
  );
}

export default AsToDep;
