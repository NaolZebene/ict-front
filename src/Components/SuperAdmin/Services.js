import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import EmpAuthContext from "../Store/Emp-authContext";

function Services() {
  const empAuthCtx = useContext(EmpAuthContext);

  const [requestEmployee, setRequestEmployee] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      const response = await fetch("http://localhost:8080/user/services", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + empAuthCtx.token,
        },
      });
      const data = await response.json();
      console.log(data);
      setRequestEmployee(data.msg);
      setIsLoading(false);
    };
    fetchEmployee();
  }, [empAuthCtx]);

  return (
    <>
      <div className="bg-neutral-50">
        <div className="text-3xl text-center text-blue-500 font-bold">
          Services
        </div>

        <Link
          to="/superadmin/addservice"
          className="w-60 mx-32 items-center text-center text-blue-500 rounded-lg hover:bg-blue-400 hover:text-white p-2 text-xl font-bold cursor-pointer tracking-wider border"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-8 h-8 inline-block"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"
            />
          </svg>{" "}
          Add Service
        </Link>

        {isLoading && <h3>Loading......</h3>}

        {!isLoading && requestEmployee.length <= 0 && (
          <h3 className="mt-5">There are no Services.</h3>
        )}

        {!isLoading && requestEmployee.length > 0 && (
          <div className="mx-32">
            <div className="w-full items-center bg-white border border-gray-200 rounded-2xl shadow-md my-10 font-semibold text-xl">
              <div className="grid grid-cols-4 gap-10 bg-neutral-400 rounded-t-2xl p-5 pl-20">
                <div>Name</div>
                <div>Details</div>
                <div>Edit</div>
                <div>Remove</div>
              </div>

              {!isLoading &&
                requestEmployee.map((dep) => {
                  return (
                    <>
                      <div
                        className="grid grid-cols-4 gap-10 p-3 pl-24"
                        key={dep._id}
                      >
                        <div>{dep.title}</div>
                        <div>
                          <Link
                            to={`/superadmin/ser/details/${dep._id}`}
                            className=" text-blue-500"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="w-8 h-8 inline-block mr-2"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                              />
                            </svg>
                            Details
                          </Link>
                        </div>
                        <div>
                          <Link to={`/superadmin/ser/edit/${dep._id}`}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="w-6 h-6 text-blue-500"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                              />
                            </svg>
                          </Link>
                        </div>
                        <div>
                          <Link to={`/superadmin/ser/delete/${dep._id}`}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="w-6 h-6 text-red-500"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Services;
