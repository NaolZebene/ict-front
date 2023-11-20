import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import DepAuthContext from "../Store/Dep-authContext";

function Sidebar() {
  const { pathname } = useLocation();

  const depAuthCtx = useContext(DepAuthContext);

  const [depName, setDepName] = useState("");

  const logoutHandler = () => {
    depAuthCtx.logout();
  };

  useEffect(() => {
    const datafetch = async () => {
      const response = await fetch(
        "http://localhost:8080/auth/department/verifyToken",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + depAuthCtx.token,
          },
        }
      );

      const data = await response.json();
      console.log(data);

      setDepName(data.payload.name);
    };
    datafetch();
  }, [depAuthCtx]);

  return (
    <>
      <div className="bg-white w-64 text-blue-600 text-xl p-6 flex flex-col border-r-2 border-neutral-200 fixed h-screen z-10">
        {/* <div className="fixed"> */}
        <h4 className="text-2xl text-center">ICT-PARK</h4>
        <div className="my-10 flex-1">
          <Link to="/department/dashboard">
            <div
              className={
                pathname === "/department/dashboard"
                  ? "mb-4 bg-neutral-200"
                  : "mb-4 hover:bg-neutral-200"
              }
            >
              <svg
                className="w-8 h-8 inline-block"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                ></path>
              </svg>{" "}
              Dashboard
            </div>
          </Link>
          <Link to="/department/employee">
            <div
              className={
                pathname === "/department/employee"
                  ? "mb-4 bg-neutral-200"
                  : "mb-4 hover:bg-neutral-200"
              }
            >
              <svg
                className="w-8 h-8 inline-block"
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
              </svg>{" "}
              Employees
            </div>
          </Link>
          <Link to="/department/requests">
            <div
              className={
                pathname === "/department/requests"
                  ? "mb-4 bg-neutral-200"
                  : "mb-4 hover:bg-neutral-200"
              }
            >
              <svg
                className="w-8 h-8 inline-block"
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
              </svg>{" "}
              Requests
            </div>
          </Link>
          <Link to="/department/escalated">
            <div
              className={
                pathname === "/department/escalated"
                  ? "mb-4 bg-neutral-200"
                  : "mb-4 hover:bg-neutral-200"
              }
            >
              <svg
                className="w-8 h-8 inline-block"
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
              </svg>{" "}
              Escalated
            </div>
          </Link>
          <Link
            to="/department/reports"
            className={`${depName === "Investor" ? "" : "hidden"}`}
          >
            <div
              className={
                pathname === "/department/reports"
                  ? "mb-4 bg-neutral-200"
                  : "mb-4 hover:bg-neutral-200"
              }
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
                  d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                />
              </svg>{" "}
              Reports
            </div>
          </Link>
          <Link to="/department/addemployee">
            <div
              className={
                pathname === "/department/addemployee"
                  ? "mb-4 bg-neutral-200"
                  : "mb-4 hover:bg-neutral-200"
              }
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
                  d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                />
              </svg>{" "}
              Add Employee
            </div>
          </Link>
          <Link to="/department/allhistory">
            <div
              className={
                pathname === "/department/allhistory"
                  ? "mb-4 bg-neutral-200"
                  : "mb-4 hover:bg-neutral-200"
              }
            >
              <svg
                className="w-8 h-8 inline-block"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                ></path>
              </svg>{" "}
              All History
            </div>
          </Link>
        </div>
        <div className="mt-auto">
        <Link to="/department/setting">
          <div  className={
                pathname === "/department/setting"
                  ? "mb-4 bg-neutral-200"
                  : "mb-4 hover:bg-neutral-200"
              }>
            <svg
              className="w-8 h-8 inline-block"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
            </svg>{" "}
            Setting
          </div>
          </Link>
          <div className="mb-4 active:text-white hover:bg-neutral-200">
            <button onClick={logoutHandler}>
              <svg
                className="w-8 h-8 inline-block"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                ></path>
              </svg>{" "}
              Logout
            </button>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}

export default Sidebar;
