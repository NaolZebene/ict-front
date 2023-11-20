import React, { useState, useEffect } from "react";

const Event = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      const addreport = async () => {
        const response = await fetch("http://localhost:8080/home/event");
  
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
        <>
        <div className="mb-[100px]">
        <p className="font-[300] font-bold text-[40px] text-[#4879F5] text-center mb-[50px]">
          Upcoming Events
        </p>
        <div className="grid grid-cols-3 pl-[100px]">
        {isLoading && <h1>Loading</h1>}

{!isLoading &&
  data.msg.map((d) => (
      <>
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-2xl">
        <img className="rounded-t-lg w-[385px] h-[320px]"  src={"http://localhost:8080/" + d.event} alt={d.title} />
        <div className="p-5">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{d.title}</h5>
            <p className="mb-1 text-sm">{d.date}</p>
            <p className="mb-3 font-normal text-gray-700">{d.description}</p>
        </div>
    </div>
    </>
      )
  )}
</div>
</div>
        </>
    )
}

export default Event