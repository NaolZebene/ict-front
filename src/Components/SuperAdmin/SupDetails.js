import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import EmpAuthContext from "../Store/Emp-authContext";

function SupDetails() {
  const empAuthCtx = useContext(EmpAuthContext);

  const { id } = useParams();

  const [requestData, setRequestData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const singleFetch = async () => {
      const response = await fetch(`http://localhost:8080/task/view/` + id, {
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
  }, [id, empAuthCtx]);

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
            <div className="pt-2">{requestData.contact_person_name} </div>
          </div>
          <div className="flex justify-start p-5">
            <h4 className="text-blue-500 text-2xl mr-4">Contact Info:</h4>{" "}
            <div className="pt-2">{requestData.contact_person_phone} </div>
          </div>
          <div className="flex justify-start p-5">
            <h4 className="text-blue-500 text-2xl mr-4">Description:</h4>
            <div className="pt-2">{requestData.description}</div>
          </div>
          <div className="flex justify-start p-5">
            <h4 className="text-blue-500 text-2xl mr-4">Service Category:</h4>
            <div className="pt-2">{requestData.taskType}</div>
          </div>
        </div>

        <div className="border-l-4">
          <div className="flex justify-start p-5">
            <h4 className="text-blue-500 text-2xl mr-4">Status:</h4>
            <div className="pt-2">{requestData.isAssigned}</div>
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
            <h4 className="text-blue-500 text-2xl mr-4">Date:</h4>
            <div className="pt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6 inline-block mr-2 text-blue-600"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                />
              </svg>
              {requestData.requested_date}
            </div>
          </div>
          <div className="flex justify-start p-5">
            <h4 className="text-blue-500 text-2xl mr-4">Priority:</h4>
            <div className="p-2 text-red-500 font-semibold">
              {requestData.priority == 1 && "HIGH"}
            </div>
            <div className="p-2 text-blue-500 font-semibold">
              {requestData.priority == 2 && "MEDIUM"}
            </div>
            <div className="text-green-500 font-semibold p-2">
              {requestData.priority == 3 && "LOW"}
            </div>
          </div>
          <div
            className={`${
              requestData.reason ? "flex justify-start p-5" : "hidden"
            }`}
          >
            <h4 className="text-blue-500 text-2xl mr-4">Declined Reason:</h4>
            <div className="pt-2">{requestData.reason}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SupDetails;
