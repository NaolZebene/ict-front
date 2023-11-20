import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import DepAuthContext from "../Store/Dep-authContext";

function Allhistory() {
  const depAuthCtx = useContext(DepAuthContext);

  const [requestData, setRequestData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const datafetch = async () => {
      const response = await fetch("http://localhost:8080/task/allhistory", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + depAuthCtx.token,
        },
      });
      const data = await response.json();
      setRequestData(data.msg);
      setIsLoading(false);
      console.log(data);
    };
    datafetch();
  }, [depAuthCtx]);

  return (
    <>
      <div className="bg-neutral-50">
        <div className="text-3xl text-center  text-blue-500 font-bold">
          All History
        </div>
        <div className="m-16">
          {isLoading && <h3>Loading.....</h3>}
          {!isLoading && requestData.length <= 0 && (
            <h3 className="mt-5 pt-5">There are no History for now.</h3>
          )}

          {!isLoading && requestData.length > 0 && (
            <div className="w-full bg-neutral-300 border border-gray-200 rounded-lg rounded-t-2xl shadow-md mb-20">
              <div className="grid grid-cols-4 text-center p-3 border-b-2 mx-5">
                <h6 className="text-lg">Company Name</h6>
                <h6 className="text-lg">Status</h6>
                <h6 className="text-lg">Details</h6>
                <h6 className="text-lg">Category</h6>
              </div>
              <div className="bg-white rounded-lg rounded-t-2xl">
                {!isLoading &&
                  requestData.map((task) => {
                    return (
                      <div key={task._id}>
                        <div className="grid grid-cols-4 text-center py-3 border-b-2">
                          <p className="">{task.companyName}</p>
                          <p>{task.isAssigned}</p>
                          <Link
                            to={`/department/requests/${task._id}`}
                            className="text-blue-500"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="w-8 h-8  inline-block mr-1"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                              />
                            </svg>
                            Details
                          </Link>
                          <p>{task.taskType}</p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Allhistory;
