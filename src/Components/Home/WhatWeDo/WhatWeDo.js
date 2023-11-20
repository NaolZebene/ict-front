import React, { useEffect } from "react";
import Services from "./Services";
import { useState } from "react";

function WhatWeDo() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const addreport = async () => {
      const response = await fetch("http://localhost:8080/user/services");

      if (!response.ok) {
        console.log("something is wrong");
      }

      const data = await response.json();
      console.log(data);
      setData(data);
      setIsLoading(false);
    };

    addreport();
  }, []);

  return (
    <div className="">
      <div className="flex flex-col items-center mt-[30px]">
        <h1 className="font-[300] text-[36px] leading-[22px] text-[#00000094] underline mb-[30.5px]">
          What We Do ?
        </h1>
        <p className="font-[300] text-[40px] leading-[42px] text-[#4879F5] mb-[81px] w-[865px] text-center">
          The things that motivates us is common form of motivation
        </p>
      </div>

      <div className="grid grid-cols-4 pl-[52px]">
        {isLoading && <h1>Loading</h1>}
        {!isLoading &&
          data.msg.map((d) => (
            <Services
              key={d._id}
              img={d.icon}
              title={d.title}
              description={d.description}
            />
          ))}
      </div>
    </div>
  );
}

export default WhatWeDo;
