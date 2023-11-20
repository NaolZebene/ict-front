import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import EmpAuthContext from "../Store/Emp-authContext";

function DetailInvestors() {
  const empAuthCtx = useContext(EmpAuthContext);

  const { invid } = useParams();

  const [requestData, setRequestData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const singleFetch = async () => {
      const response = await fetch(
        `http://localhost:8080/user/investor/details/` + invid,
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
  }, [invid, empAuthCtx]);

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
            <h4 className="text-blue-500 text-2xl mr-4">Company:</h4>{" "}
            <div className="pt-2"> {requestData.companyName} </div>
          </div>
          <div className="flex justify-start p-5">
            <h4 className="text-blue-500 text-2xl mr-4">Contact Person:</h4>{" "}
            <div className="pt-2">{requestData.contact_person} </div>
          </div>
          <div className="flex justify-start p-5">
            <h4 className="text-blue-500 text-2xl mr-4">Contact Info:</h4>{" "}
            <div className="pt-2">{requestData.contact_phone} </div>
          </div>
        </div>

        <div className="border-l-4">
          <div className="flex justify-start p-5">
            <h4 className="text-blue-500 text-2xl mr-4">Role:</h4>
            <div className="pt-2">{requestData.role}</div>
          </div>
          <div className="flex justify-start p-5">
            <h4 className="text-blue-500 text-2xl mr-4">Location:</h4>
            <div className="pt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6 inline-block mr-2 text-yellow-600"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
              {requestData.location}
            </div>
          </div>
          <div className="flex justify-start p-5">
            <h4 className="text-blue-500 text-2xl mr-4">Email:</h4>
            <div className="pt-2">{requestData.email}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailInvestors;
