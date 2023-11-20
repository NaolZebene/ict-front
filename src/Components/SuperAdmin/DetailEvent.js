import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import EmpAuthContext from "../Store/Emp-authContext";

function DetailEvent() {
  const empAuthCtx = useContext(EmpAuthContext);

  const { eventid } = useParams();

  const [requestData, setRequestData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const singleFetch = async () => {
      const response = await fetch(
        `http://localhost:8080/home/event/` + eventid,
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

      setRequestData(data.msg);
      setIsLoading(false);
    };

    singleFetch();
  }, [eventid, empAuthCtx]);

  console.log(requestData);

  return (
    <>
      <div className="text-3xl text-center  text-blue-500 font-bold">
        Details
      </div>
      {isLoading && <h3 className="text-xl">Loading....</h3>}
      <div className="grid grid-cols-2 m-20">
        <div className="">
          <div className="flex justify-start p-5">
            <h4 className="text-blue-500 text-2xl mr-4">Title:</h4>{" "}
            <div className="pt-2"> {requestData.title} </div>
          </div>
          <div className="flex justify-start p-5">
            <h4 className="text-blue-500 text-2xl mr-4">Date:</h4>{" "}
            <div className="pt-2"> {requestData.date} </div>
          </div>
          <div className="p-5">
                  <img
                    className="w-[220px] h-[220px] ml-10"
                    src={"http://localhost:8080/" + requestData.event}
                    alt={requestData.title}
                  />
             </div>
        </div>

        <div className="border-l-4">
          <div className="flex justify-start p-5">
            <h4 className="text-blue-500 text-2xl mr-4">Description:</h4>{" "}
            <div className="pt-2"> {requestData.description} </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailEvent;
