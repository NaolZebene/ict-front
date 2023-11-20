import React from "react";
import { Link } from "react-router-dom";
import Kena from "../../assets/kena.png";

function Navbar() {
  return (
    <>
      <div className=" fixed w-screen">
        <div className="bg-white h-16 px-4 border-b-4 border-neutral-200 flex justify-end items-center">
          {/* <div className="fixed"> */}
          <div className="relative inline-block text-blue-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
              />
            </svg>
            {/* <span className="absolute top-0 right-0 px-2 py-1 translate-x-1/2 bg-red-500 rounded-full text-xs text-white">
              6
            </span> */}
          </div>

          <div className="">
            <Link to="">
              <img
                src={Kena}
                alt="profile"
                className="h-10 w-10 ml-5 rounded-full"
              />
            </Link>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}

export default Navbar;
