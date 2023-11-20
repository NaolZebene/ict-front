import React, { useEffect, useState, useContext } from "react";
import EmpAuthContext from "../Store/Emp-authContext";

function CardSup() {
  const empAuthCtx = useContext(EmpAuthContext);

  const [totalEmp, setTotalEmp] = useState(0);
  const [totalReq, setTotalReq] = useState(0);
  const [canceled, setCanceled] = useState(0);
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    const fetchEmployee = async () => {
      const response = await fetch("http://localhost:8080/user/dashboarddata", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + empAuthCtx.token,
        },
      });
      const data = await response.json();
      console.log(data);

      setTotalEmp(data.msg.total_employees);
      setTotalReq(data.msg.totalrequest);
      setCanceled(data.msg.canceled);
      setCompleted(data.msg.completed);
    };
    fetchEmployee();
  }, [empAuthCtx]);

  return (
    <>
      <div className="grid grid-cols-4 gap-20 mx-10">
        <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow-md mt-16 w-80">
          <div className="flex justify-evenly">
            <div>
              <p className="font-normal text-gray-700">Total Employees</p>
              <h6 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                {totalEmp}
              </h6>
            </div>

            <div>
              <svg
                className="w-16 h-16 inline-block text-blue-600 ml-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow-md mt-16 w-80">
          <div className="flex justify-evenly">
            <div className="">
              <p className="font-normal text-gray-700">
                Total Incoming Requests
              </p>
              <h6 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                {totalReq}
              </h6>
            </div>

            <div>
              <svg
                className="w-16 h-16 text-blue-500 inline-block ml-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow-md mt-16 w-80">
          <div className="flex justify-evenly">
            <div className="">
              <p className="font-normal text-gray-700">
                Total Declined Requests
              </p>
              <h6 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                {canceled}
              </h6>
            </div>

            <div>
              <svg
                className="w-16 h-16 text-blue-500 inline-block  ml-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow-md mt-16 w-80">
          <div className="flex justify-evenly">
            <div className="">
              <p className="font-normal text-gray-700">
                Total Completed Requests
              </p>
              <h6 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                {completed}
              </h6>
            </div>

            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-16 h-16  text-blue-500 inline-block ml-5"
              >
                <path
                  strokeLinecap="round"
                  stroke-linejoin="round"
                  d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardSup;
