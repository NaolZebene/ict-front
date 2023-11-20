import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import EmpAuthContext from "../Store/Emp-authContext";

function DetailClient() {
  const empAuthCtx = useContext(EmpAuthContext);

  const { cliid } = useParams();

  const [requestData, setRequestData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const singleFetch = async () => {
      const response = await fetch(`http://localhost:8080/clients/` + cliid, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + empAuthCtx.token,
        },
      });
      if (!response.ok) {
        console.log("Something went wrong");
      }
      const data = await response.json();

      setRequestData(data.msg);
      setIsLoading(false);
    };

    singleFetch();
  }, [cliid, empAuthCtx]);

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
            <h4 className="text-blue-500 text-2xl mr-4">Client Name:</h4>{" "}
            <div className="pt-2"> {requestData.name} </div>
          </div>
        </div>

        <div className="border-l-4">
          <img
            className="w-[110px] h-[110px] rounded-[55px] ml-10"
            src={"http://localhost:8080/" + requestData.logo}
            alt="logo"
          />
        </div>
      </div>
    </>
  );
}

export default DetailClient;
