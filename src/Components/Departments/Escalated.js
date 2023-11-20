import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import DepAuthContext from "../Store/Dep-authContext";

function Escalated() {
  const depAuthCtx = useContext(DepAuthContext);

  const [requestData, setRequestData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const singleFetch = async () => {
      const response = await fetch(
        `http://localhost:8080/department/escalated`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + depAuthCtx.token,
          },
        }
      );
      if (!response.ok) {
        console.log("Something went wrong");
      }

      const data = await response.json();
      console.log(data);
      setRequestData(data.msg);
      setIsLoading(false);
    };

    singleFetch();
  }, [depAuthCtx]);

  return (
    <>
      <div className="bg-neutral-50">
        <div className="text-3xl text-center  text-blue-500 font-bold">
          Escalated Requests
        </div>
        <div className="m-16 border-b-2">
          {isLoading && <h3>Loading.....</h3>}
          {!isLoading && requestData.length <= 0 && (
            <h3 className="mt-5 pt-5">There are no Escalated tasks for now.</h3>
          )}

          {!isLoading &&
            requestData.map((task) => {
              return (
                <div
                  className="w-full bg-white border border-gray-200 rounded-lg rounded-t-2xl shadow-md mb-10"
                  key={task._id}
                >
                  <div className="grid grid-cols-2">
                    <div className="grid grid-cols-2">
                      <div className="flex justify-start p-5">
                        <h4 className="text-blue-500 text-2xl mr-4">
                          Company:
                        </h4>{" "}
                        <div className="pt-2 text-lg"> {task.companyName} </div>
                      </div>
                      <div className="flex justify-start p-5">
                        <h4 className="text-blue-500 text-2xl mr-4">
                          Service Category:
                        </h4>
                        <h4 className="pt-2 text-lg ">{task.taskType}</h4>
                      </div>
                    </div>

                    <div className="grid grid-cols-2">
                      <div className="flex justify-start p-5">
                        <h4 className="text-blue-500 text-2xl mr-4">
                          Escalated from:
                        </h4>
                        <h4 className="pt-2 text-lg ">
                          {task.assignedTo.firstName} {task.assignedTo.lastName}
                        </h4>
                      </div>

                      <div className="flex justify-start p-5">
                        <h4 className="text-4xl">#</h4>
                        <h4 className="pt-2 text-lg ">{task.ticketNumber}</h4>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2">
                    <div className="p-3 pl-5 text-xl">
                      <div className="mb-3">
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
                        <span className="text-blue-500">{task.location}</span>
                      </div>
                      <div className="">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-6 h-6 inline-block mr-2 text-blue-700"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                          />
                        </svg>
                        <span className="text-red-500">
                          {task.contact_person_phone}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <Link
                        to={`/department/requests/${task._id}`}
                        className=""
                      >
                        <div className="text-blue-500 rounded-lg hover:bg-blue-400 mb-6 px-5 hover:text-white  p-2 text-lg font-bold cursor-pointer tracking-wider border m-4">
                          Details
                        </div>
                      </Link>
                      <Link to={`/department/assign/${task._id}`} className="">
                        <div className="text-green-500 rounded-lg hover:bg-green-400 mb-6 px-5 hover:text-white  p-2 text-lg font-bold cursor-pointer tracking-wider border m-4">
                          Assign To
                        </div>
                      </Link>
                      <Link to={`/department/${task._id}/decline`} className="">
                        <div className="text-red-500 rounded-lg hover:bg-red-400 mb-6 px-5 hover:text-white  p-2 text-lg font-bold cursor-pointer tracking-wider border m-4">
                          Decline
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Escalated;
