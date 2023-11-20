import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EmpAuthContext from "../Store/Emp-authContext";

function RequestInt() {
  const empAuthCtx = useContext(EmpAuthContext);

  const navigate = useNavigate();

  const [workLoc, setWorkLoc] = useState("");
  const [category, setCategory] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");

  const [isPending, setIsPending] = useState(false)

  const formSubmitHandler = (event) => {
    event.preventDefault();

    setIsPending(true)

    const addrequest = async () => {
      const response = await fetch(
        "http://localhost:8080/employee/internalRequest",
        {
          method: "POST",
          body: JSON.stringify({
            description: desc,
            taskType: category,
            location: workLoc,
            requested_date: date,
            department: category,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + empAuthCtx.token,
          },
        }
      );

      if (!response.ok) {
        console.log("something is wrong");
      }

      const data = await response.json();
      console.log(data);

      setIsPending(false)

      if (data.msg === "Task submitted Successfully") {
        navigate("/employee/task");
      }
    };

    addrequest();
  };

  const [requestEmployee, setRequestEmployee] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      const response = await fetch("http://localhost:8080/user/department");
      const data = await response.json();
      console.log(data);
      setRequestEmployee(data.msg);
      setIsLoading(false);
    };
    fetchEmployee();
  }, []);

  return (
    <>
      <div className="bg-neutral-50">
        <div className="w-full bg-white border border-gray-200 rounded-2xl shadow-md p-5 mb-20">
          <div className="text-3xl text-center  text-blue-500 font-bold">
            Information Communication Technology Park Service Internal Request
            Form
          </div>
        </div>

        <div className="border-x-4 mx-10 border-b-4 rounded-lg">
          <form onSubmit={formSubmitHandler}>
            <div className="m-10">
              <div className="w-1/2 bg-white border border-gray-200 rounded-2xl shadow-md p-4 text-2xl font-bold text-blue-500 my-5">
                Requester Information
              </div>
              <div className="grid grid-cols-2 gap-10">
                <div>
                  <h4 className="mb-2">Work Location</h4>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-8 h-8 text-blue-500"
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
                    </div>
                    <input
                      value={workLoc}
                      onChange={(e) => {
                        setWorkLoc(e.target.value);
                      }}
                      placeholder="Location"
                      type="text"
                      class="w-full pl-14 bg-white border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                    />
                  </div>
                </div>
              </div>

              {isLoading && <h3>Loading......</h3>}

              {!isLoading && requestEmployee.length <= 0 && (
                <h3 className="mt-5">There are no Departments.</h3>
              )}

              {!isLoading && requestEmployee.length > 0 && (
                <>
                  <div className="w-1/2 bg-white border border-gray-200 rounded-2xl shadow-md p-4 text-2xl font-bold text-blue-500 my-5">
                    Department Service Category
                  </div>

                  <div className="grid grid-cols-4 gap-10">
                    {!isLoading &&
                      requestEmployee?.map((dep) => {
                        return (
                          <>
                            <div className="" key={dep.id}>
                              <div className="flex items-center text-2xl">
                                <input
                                  value={dep?.title}
                                  onChange={(e) => {
                                    setCategory(e.target.value);
                                  }}
                                  id="3"
                                  type="radio"
                                  name="department"
                                  className="w-4 h-4 focus:ring-2 focus:ring-blue-300"
                                />
                                <label
                                  for="3"
                                  className="block ml-2 font-bold text-gray-900"
                                >
                                  {dep.title}
                                </label>
                              </div>
                              <div>
                                <select className="ml-2 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 ">
                                  {dep.services && (
                                    <>
                                      <option value="Internet Service" selected>
                                        {dep.title}
                                      </option>
                                    </>
                                  )}
                                  {dep.services?.map((ser) => {
                                    return (
                                      <option value="Internet Service" selected>
                                        {ser.title}
                                      </option>
                                    );
                                  })}
                                </select>
                              </div>
                            </div>
                          </>
                        );
                      })}
                  </div>
                </>
              )}

              <div className="w-1/2 bg-white border border-gray-200 rounded-lg rounded-t-2xl shadow-md p-4 text-2xl font-bold text-blue-500 my-5">
                Description of Requested Work
              </div>
              <div>
                <div>
                  <textarea
                    onChange={(e) => {
                      setDesc(e.target.value);
                    }}
                    rows="5"
                    className="block p-2.5 w-full text-lg text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Description"
                  >
                    {desc}
                  </textarea>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-10">
                <div>
                  <h4 className="w-2/5 bg-white border border-gray-200 rounded-2xl shadow-md p-4 text-2xl font-bold text-blue-500 my-5">
                    Date of Request
                  </h4>
                  <input
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    type="date"
                    className="w-full pl-14 bg-white border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                  />
                </div>
              </div>

              <div className="w-44 text-center text-blue-500 rounded-lg hover:bg-blue-400 my-10 hover:text-white p-2 text-xl font-bold cursor-pointer tracking-wider border">
                {!isPending && <button> Submit</button>}
                {isPending && <button disabled> Submiting</button>}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default RequestInt;
