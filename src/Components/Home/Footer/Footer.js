import React from "react";
import logo from "../Navbar/gear.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import SimpleMap from "../Map/Map";

function Footer() {
  return (
    <div
      style={{
        backgroundImage: `url("./Footerimg.jpg")`,
      }}
      className="bg-[#d9d9d92e] h-fit flex justify-between px-[99px] pt-[108px] pb-[30px]"
    >
      <div>
        <div className="flex items-center">
          <img src={logo} />
          <p className="text-center text-[#4879F5] text-[32px] font-[500]">
            ICT PARK
          </p>
        </div>
        <div className="ml-[70px]">
          <p className="font-[300] text-[24px] text-[#A3A3A3]">
            <FontAwesomeIcon icon="envelope" />
            ictpark@gmail.com
          </p>
          <p className="font-[300] text-[24px] text-[#A3A3A3]">
            <FontAwesomeIcon icon="phone" />
            +251999999
          </p>
        </div>
      </div>

      <div className="flex flex-col">
        <h1 className="font-[500] text-[#4879F5] text-[32px]">About</h1>
        <p className="font-[300] text-[24px] text-[#4879F5]">Services</p>
        <p className="font-[300] text-[24px] text-[#4879F5]">Clients</p>
        <p className="font-[300] text-[24px] text-[#4879F5]">Testimonials</p>
      </div>

      <div className="flex flex-col">
        <h1 className="font-[500] text-[#4879F5] text-[32px]">Address</h1>
        <p className="font-[300] text-[24px] text-[#4879F5]">
          <FontAwesomeIcon icon="location" /> GORO,ADDIS ABABA
        </p>
        {/* <SimpleMap /> */}
      </div>
    </div>
  );
}

export default Footer;
