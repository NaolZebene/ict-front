import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EmpAuthContext from "../Store/Emp-authContext";

function CreateService() {
  const empAuthCtx = useContext(EmpAuthContext);

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [department, setDepartment] = useState("");
  const [icon, setIcon] = useState(null);

  const [isPending, setIsPending] = useState(false)
  const [errMsg, setErrMsg] = useState("");

  const formSubmitHandler = (event) => {
    event.preventDefault();

    setIsPending(true)

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("department", department);
    formData.append("icon", icon);

    const addrequest = async () => {
      const response = await fetch("http://localhost:8080/user/services/post", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: "Bearer " + empAuthCtx.token,
        },
      });

      if (!response.ok) {
        console.log("something is wrong");
      }

      const data = await response.json();
      console.log(data);

      setIsPending(false)
      setErrMsg(data.msg);

      if (data.msg === "Service Added Successfully") {
        navigate("/superadmin/services");
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
      setDepartment(data.msg[0].title);
    };
    fetchEmployee();
  }, []);

  return (
    <>
      <div className="bg-neutral-50">
        <div className="m-auto py-16 min-h-screen flex items-center justify-center">
          <div className="w-1/2">
            <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-5 mb-20">
              <div className="text-lg text-center text-blue-500 font-bold">
                Add New Service
              </div>
              <form onSubmit={formSubmitHandler}>
                <div className="text-xl font-bold text-blue-500 my-3">
                  <h4 className="mb-2">Title</h4>
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
                          d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                        />
                      </svg>
                    </div>
                    <input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Title"
                      type="text"
                      className="w-full pl-14 bg-white border border-blue-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                    />
                  </div>
                </div>

                {isLoading && <h3>Loading......</h3>}

                {!isLoading && requestEmployee.length <= 0 && (
                  <h3 className="mt-5">There are no Departments.</h3>
                )}

                {!isLoading && requestEmployee.length > 0 && (
                  <>
                    <div className="text-xl font-bold text-blue-500 my-3">
                      <h4 className="mb-2">Department</h4>

                      <div className="grid grid-cols-4">
                        {!isLoading &&
                          requestEmployee?.map((dep) => {
                            return (
                              <>
                                <div
                                  className="flex items-center text-2xl"
                                  key={dep.id}
                                >
                                  <input
                                    value={dep?.title}
                                    onChange={(e) =>
                                      setDepartment(e.target.value)
                                    }
                                    id="4"
                                    type="radio"
                                    name="priority"
                                    className="w-4 h-4 focus:ring-2 focus:ring-blue-300"
                                  />
                                  <label
                                    for="4"
                                    className="block ml-2 font-bold text-gray-900"
                                  >
                                    {dep.title}
                                  </label>
                                </div>
                              </>
                            );
                          })}
                      </div>
                    </div>
                  </>
                )}

                <div className="text-xl font-bold text-blue-500 my-3">
                  <h4 className="mb-2">Icon</h4>
                  <input
                    name="icon"
                    onChange={(e) => setIcon(e.target.files[0])}
                    type="file"
                    className="w-full bg-white border border-blue-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                  />
                </div>

                <div className="text-xl font-bold text-blue-500 my-3">
                  <h4 className="mb-2">Description</h4>
                  <div>
                    <div>
                      <textarea
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                        rows="5"
                        className="block p-2.5 w-full text-lg text-gray-900 bg-white rounded-lg border border-blue-300 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Description"
                      >
                        {description}
                      </textarea>
                    </div>
                  </div>
                </div>

                <p className="text-red-500 text-lg">{errMsg}</p>

                <div className="w-44 items-center text-center text-blue-500 rounded-lg hover:bg-blue-400 my-5 hover:text-white p-2 text-xl font-bold cursor-pointer tracking-wider border">
                {!isPending && <button> Submit</button> }
                 {isPending && <button disabled> Submiting</button> }
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateService;
