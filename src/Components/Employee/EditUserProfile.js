import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EmpAuthContext from "../Store/Emp-authContext";

const EditUserProfile = () => {
  const empAuthCtx = useContext(EmpAuthContext);

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");

  const [isPending, setIsPending] = useState(false)
  const [errMsg, setErrMsg] = useState("");

  const [role, setRole] = useState('')

  useEffect(() => {
    const singleFetch = async () => {
      const response = await fetch(
        `http://localhost:8080/user/viewprofile`,
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
      console.log(data);
      setUsername(data.msg.username)
      setFirstname(data.msg.firstName)
      setLastname(data.msg.lastName)
      setEmail(data.msg.email)
    };

    singleFetch();
  }, [empAuthCtx]);

  const submitHandler = (e) => {
    e.preventDefault();

    setIsPending(true)

    const signUpEmployee = async () => {
      const response = await fetch("http://localhost:8080/user/edit", {
        method: "PUT",
        body: JSON.stringify({
          username: username,
          firstName: firstname,
          lastName: lastname,
          email: email,
        }),
        headers: {
          "Content-Type": "application/json",
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

      if (data.msg === "Data Updated Successfully") {
        if (role === 'Employee') {
          navigate("/employee/setting");
        } else if (role === 'Admin') {
          navigate("/superadmin/setting");
        }
      }
    };

    signUpEmployee();
  }

  useEffect(() => {
    const datafetch = async () => {
      const response = await fetch(
        "http://localhost:8080/auth/verifyusertoken",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + empAuthCtx.token,
          },
        }
      );

      const data = await response.json();
      console.log(data);

      setRole(data.payload.role)

    };
    datafetch();
  }, [empAuthCtx]);

  return (
    <>
      <div className="bg-neutral-50">
        <div className="m-auto py-16 min-h-screen flex items-center justify-center">
          <div className="w-1/2">
            <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-5 mb-20">
              <div className="text-lg text-center text-blue-500 font-bold">
                Edit User
              </div>
              <form onSubmit={submitHandler}>
                <div className="text-xl font-bold text-blue-500 my-3">
                  <h4 className="mb-2">First Name</h4>
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
                      value={firstname}
                      onChange={(e) => setFirstname(e.target.value)}
                      placeholder="First Name"
                      type="text"
                      className="w-full pl-14 bg-white border border-blue-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                    />
                  </div>
                </div>

                <div className="text-xl font-bold text-blue-500 my-3">
                  <h4 className="mb-2">Last Name</h4>
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
                      value={lastname}
                      onChange={(e) => setLastname(e.target.value)}
                      placeholder="Last Name"
                      type="text"
                      className="w-full pl-14 bg-white border border-blue-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                    />
                  </div>
                </div>

                <div className="text-xl font-bold text-blue-500 my-3">
                  <h4 className="mb-2">Username</h4>
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
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Username"
                      type="text"
                      className="w-full pl-14 bg-white border border-blue-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                    />
                  </div>
                </div>

                <div className="text-xl font-bold text-blue-500 my-3">
                  <h4 className="mb-2">Email</h4>
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
                          d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                        />
                      </svg>
                    </div>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      type="email"
                      className="w-full pl-14 bg-white border border-blue-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                    />
                  </div>
                </div>

                <p className="text-red-500 text-lg">{errMsg}</p>

                <div className="w-44 items-center text-center text-blue-500 rounded-lg hover:bg-blue-400 my-5 hover:text-white p-2 text-xl font-bold cursor-pointer tracking-wider border">
                  {!isPending && <button> Update</button>}
                  {isPending && <button disabled> Updating</button>}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditUserProfile