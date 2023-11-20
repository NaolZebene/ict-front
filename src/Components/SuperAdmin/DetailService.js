import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import EmpAuthContext from "../Store/Emp-authContext";

function DelService() {
  const empAuthCtx = useContext(EmpAuthContext);

  const { serid } = useParams();

  const [requestData, setRequestData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const singleFetch = async () => {
      const response = await fetch(
        `http://localhost:8080/user/services/` + serid,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + empAuthCtx.token,
          },
        }
      );
      console.log(response);
      if (!response.ok) {
        console.log("Something went wrong");
      }
      const data = await response.json();
      console.log(data);

      setRequestData(data.msg);
      setIsLoading(false);
    };

    singleFetch();
  }, [serid, empAuthCtx]);

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
            <h4 className="text-blue-500 text-2xl mr-4">Department:</h4>{" "}
            <div className="pt-2"> {requestData.department?.title} </div>
          </div>

          <div>
            <img
              className="w-[110px] h-[110px] rounded-[55px] ml-10"
              src={"http://localhost:8080/" + requestData.icon}
              alt="icon"
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

export default DelService;
