import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import InvAuthContext from "../Store/Inv-authContext";

function Request() {
  const invAuthCtx = useContext(InvAuthContext);

  const navigate = useNavigate();

  const [invName, setInvName] = useState("");
  const [workLoc, setWorkLoc] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [isPending, setIsPending] = useState(false)
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    const datafetch = async () => {
      const response = await fetch(
        "http://localhost:8080/auth/investor/verifyToken",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + invAuthCtx.token,
          },
        }
      );

      const data = await response.json();
      console.log(data);

      setInvName(data.payload.name);
    };
    datafetch();
  }, [invAuthCtx]);

  const [requestEmployee, setRequestEmployee] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      const response = await fetch("http://localhost:8080/user/department");
      const data = await response.json();
      console.log(data);
      setRequestEmployee(data.msg);
      setIsLoading(false);
      setCategory(data.msg[0].title);
    };
    fetchEmployee();
  }, []);

  const formSubmitHandler = (event) => {
    event.preventDefault();

    setIsPending(true)

    const addrequest = async () => {
      const response = await fetch("http://localhost:8080/task/post", {
        method: "POST",
        body: JSON.stringify({
          companyName: invName,
          description: desc,
          priority: "None",
          taskType: category,
          location: workLoc,
          contact_person_phone: phone,
          contact_person_name: name,
          requested_date: date,
          department: category,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + invAuthCtx.token,
        },
      });

      if (!response.ok) {
        console.log("something is wrong");
      }

      const data = await response.json();
      console.log(data);

      setIsPending(false)
      setErrMsg(data.msg);

      if (data.msg === "Task submitted Successfully") {
        navigate("/investor/myrequest");
      }
    };

    addrequest();
  };

  return (
    <>
      <div className="bg-neutral-50">
        <div className="w-full bg-white border border-gray-200 rounded-2xl shadow-md p-5 mb-20">
          <div className="text-3xl text-center  text-blue-500 font-bold">
            Information Communication Technology Park Service Request Form
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
                  <h4 className="mb-2">Name of Requesting Party or Investor</h4>
                  <div className="relative z-0">
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
                          d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                        />
                      </svg>
                    </div>
                    <input
                      value={invName}
                      onChange={(e) => {
                        setInvName(e.target.value);
                      }}
                      placeholder="Company Name"
                      type="text"
                      className="w-full pl-14 bg-white border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                    />
                  </div>
                </div>
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

              <div className="w-1/2 bg-white border border-gray-200 rounded-2xl shadow-md p-4 text-2xl font-bold text-blue-500 my-5">
                Contact Information
              </div>
              <div className="grid grid-cols-2 gap-10">
                <div>
                  <h4 className="mb-2">Name</h4>
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
                          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                        />
                      </svg>
                    </div>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Name"
                      type="text"
                      className="w-full pl-14 bg-white border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                    />
                  </div>
                </div>
                <div>
                  <h4 className="mb-2">Phone Number</h4>
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
                          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                        />
                      </svg>
                    </div>
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Phone Number"
                      type="number"
                      className="w-full pl-14 bg-white border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
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

              {/* <div className="w-3/4">
                <h4 className="w-2/5 bg-white border border-gray-200 rounded-2xl shadow-md p-4 text-2xl font-bold text-blue-500 my-5">
                  Priority
                </h4>
                <div className="flex items-center text-2xl">
                  <input
                    value="high"
                    onChange={(e) => setPriority(e.target.value)}
                    id="4"
                    type="radio"
                    name="priority"
                    className="w-4 h-4 focus:ring-2 focus:ring-blue-300"
                  />
                  <label for="4" className="block ml-2 font-bold text-gray-900">
                    High
                  </label>
                </div>

                <div className="flex items-center text-2xl">
                  <input
                    value="medium"
                    onChange={(e) => setPriority(e.target.value)}
                    id="5"
                    type="radio"
                    name="priority"
                    className="w-4 h-4 focus:ring-2 focus:ring-blue-300"
                  />
                  <label for="5" className="block ml-2 font-bold text-gray-900">
                    Meduim
                  </label>
                </div>

                <div className="flex items-center text-2xl">
                  <input
                    value="low"
                    onChange={(e) => setPriority(e.target.value)}
                    id="6"
                    type="radio"
                    name="priority"
                    className="w-4 h-4 focus:ring-2 focus:ring-blue-300"
                  />
                  <label for="6" className="block ml-2 font-bold text-gray-900">
                    Low
                  </label>
                </div>
              </div> */}

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
                <div>
                  <h4 className="w-2/5 bg-white border border-gray-200 rounded-2xl shadow-md p-4 text-2xl font-bold text-blue-500 my-5">
                    Time
                  </h4>
                  <input
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    type="time"
                    className="w-full pl-14 bg-white border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                  />
                </div>
              </div>

              <p className="text-red-500 text-lg mt-5">{errMsg}</p>

              <div className="w-44 text-center text-blue-500 rounded-lg hover:bg-blue-400 my-10 hover:text-white p-2 text-xl font-bold cursor-pointer tracking-wider border">
              {!isPending && <button> Submit</button> }
                 {isPending && <button disabled> Submiting</button> }
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Request;
