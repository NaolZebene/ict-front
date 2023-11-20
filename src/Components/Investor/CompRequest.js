import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import InvAuthContext from "../Store/Inv-authContext";

function CompRequest() {
  const invAuthCtx = useContext(InvAuthContext);

  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const AssignedTask = async () => {
      const response = await fetch(`http://localhost:8080/report/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + invAuthCtx.token,
        },
      });
      if (!response.ok) {
        console.log("Something went wrong");
      }
      const data = await response.json();

      console.log(data);
      setIsLoading(false);
    };

    AssignedTask();
  }, [id, invAuthCtx]);

  return (
    <>
      <div className="bg-neutral-50">
        <div className="text-3xl text-center  text-blue-500 font-bold">
          {isLoading && <h4>Loading...</h4>}
          {!isLoading && <h1>Completed</h1>}
        </div>
      </div>
    </>
  );
}

export default CompRequest;
