import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EmpAuthContext from "../Store/Emp-authContext";

function DelEvent() {
  const navigate = useNavigate();

  const empAuthCtx = useContext(EmpAuthContext);

  const { eventid } = useParams();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const AssignedTask = async () => {
      const response = await fetch(
        `http://localhost:8080/home/event/delete/${eventid}`,
        {
          method: "DELETE",
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

      if (data.msg === "Event Deleted Successfully") {
        navigate("/superadmin/events");
      }
    };

    AssignedTask();
  }, [eventid, empAuthCtx, navigate]);

  return (
    <>
      <div className="bg-neutral-50">
        <div className="text-3xl text-center  text-blue-500 font-bold">
          {isLoading && <h4>Deleteing...</h4>}
          {!isLoading && <h1>Event Removed Successfully</h1>}
        </div>
      </div>
    </>
  );
}

export default DelEvent;
