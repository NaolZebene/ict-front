import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import InvAuthContext from "../Store/Inv-authContext";

function LogInvestor() {
  const invAuthCtx = useContext(InvAuthContext);

  const navigate = useNavigate();

  const [companyname, setCompanyname] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    const loginRequest = async () => {
      const response = await fetch(
        "http://localhost:8080/auth/investor/login",
        {
          method: "POST",
          body: JSON.stringify({
            companyName: companyname,
            password: password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.log("something is wrong");
      }

      const data = await response.json();
      console.log(data);

      setErrMsg(data.msg);

      const remainingMilliseconds = 60 * 60 * 1000;
      const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);

      invAuthCtx.login(data.token, expiryDate.toISOString());

      if (data.msg === "Logged In Successfully") {
        navigate("/investor/request");
      }
    };

    loginRequest();
  };
  return (
    <>
      <div className="bg-neutral-50 h-screen">
        <div className="w-9/12 m-auto py-16 min-h-screen flex items-center justify-center">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-5 mb-20">
            <div className="text-lg text-center text-blue-500 font-bold">
              Log in AS Investor
            </div>
           
            <form onSubmit={submitHandler}>
              <div className="text-xl font-bold text-blue-500 my-3">
                <h4 className="mb-2">Company Name</h4>
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
                    value={companyname}
                    onChange={(e) => setCompanyname(e.target.value)}
                    placeholder="Company Name"
                    type="text"
                    className="w-full pl-14 bg-white border border-blue-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                  />
                </div>
              </div>

              <div className="text-xl font-bold text-blue-500 my-3">
                <h4 className="mb-2">Password</h4>
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
                        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                      />
                    </svg>
                  </div>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    type="password"
                    className="w-full pl-14 bg-white border border-blue-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                  />
                </div>
              </div>

              <p className="text-red-500 text-lg">{errMsg}</p>

              <div className="w-44 items-center text-center text-blue-500 rounded-lg hover:bg-blue-400 my-5 hover:text-white p-2 text-xl font-bold cursor-pointer tracking-wider border">
                <button>Log in</button>
              </div>

              <div>
                <Link to="/investor/forgetpassword" className="text-blue-500 hover:underline">
                  forget password?
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default LogInvestor;
