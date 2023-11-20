import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import gearIcon from "./gear.svg";
import InvAuthContext from "../../Store/Inv-authContext";

function Navbar() {
  const { pathname } = useLocation();

  const invAuthCtx = useContext(InvAuthContext);

  const isInvLoggedIn = invAuthCtx.isInvLoggedIn;

  const logoutHandler = () => {
    invAuthCtx.logout();
  };

  return (
    <div>
      <div className="flex justify-between p-2 drop-shadow-sm shadow-md fixed left-0 right-0 top-0 z-10 bg-white h-[98px]">
        <div className="flex w-[30%] justify-center items-center text-[32px] font-[500]">
          <img src={gearIcon} alt="" />
          <h1 className="text-[#4879F5]">ICT PARK</h1>
        </div>

        <div>
          <ul className=" p-6 text-[20px] flex justify-center items-center">
            <li
              className={
                pathname === "/"
                  ? "mr-10 p-2 text-[#4879F5] cursor-pointer rounded bg-neutral-200"
                  : "mr-10 p-2 text-[#4879F5] cursor-pointer rounded hover:bg-neutral-200"
              }
            >
              <Link to={"/"}>Home</Link>
            </li>
            <li
              className={
                pathname === "/service"
                  ? "mr-10 p-2 text-[#4879F5] cursor-pointer rounded bg-neutral-200"
                  : "mr-10 p-2 text-[#4879F5] cursor-pointer rounded hover:bg-neutral-200"
              }
            >
              <a>Services</a>
            </li>
            <li
              className={
                pathname === "/contact"
                  ? "mr-10 p-2 text-[#4879F5] cursor-pointer rounded bg-neutral-200"
                  : "mr-10 p-2 text-[#4879F5] cursor-pointer rounded hover:bg-neutral-200"
              }
            >
              <Link to={"/contact"}> Contact Us </Link>
            </li>
            <li
              className={
                pathname === "/clients"
                  ? "mr-10 p-2 text-[#4879F5] cursor-pointer rounded bg-neutral-200"
                  : "mr-10 p-2 text-[#4879F5] cursor-pointer rounded hover:bg-neutral-200"
              }
            >
              <a>Clients</a>
            </li>
            <li className="border-2 py-[13px] px-[36px] bg-[#4879F5] text-white rounded-[7px] cursor-pointer">
              {!isInvLoggedIn && (
                <Link
                  to="/loginInvestor"
                  className="nav-link text-white fw-bold"
                >
                  Log in
                </Link>
              )}
              {isInvLoggedIn && (
                <button onClick={logoutHandler}>Log out</button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Navbar;
