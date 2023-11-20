import React, { useEffect, useState} from "react";
import { Link } from "react-router-dom";

const GalBack = () => {

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const addreport = async () => {
      const response = await fetch("http://localhost:8080/home/gallary/get");

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
    return(
        <>
         <div className="bg-neutral-50">
        <div className="text-3xl text-center text-blue-500 font-bold mb-20">
            Gallery
        </div>
        <Link
          to="/superadmin/gallery"
          className="w-60 mx-32 items-center text-center text-blue-500 rounded-lg hover:bg-blue-400 hover:text-white p-2 text-xl font-bold cursor-pointer tracking-wider border"
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
          Add Gallery
        </Link>

        <Link
          to="/superadmin/backImage"
          className="w-60 mx-32 items-center text-center text-blue-500 rounded-lg hover:bg-blue-400 hover:text-white p-2 text-xl font-bold cursor-pointer tracking-wider border"
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
          Add Background Image
        </Link>


        {isLoading && <h1>Loading</h1>}

        {!isLoading && data.msg.length <= 0 && (
          <h3 className="mt-5">There are no Images in Gallery.</h3>
        )}


<div className="grid grid-cols-3 ml-24">
        {!isLoading &&
          data.msg.map((d) => (
            <div
            className="grid grid-cols-5 gap-10 p-3"
            key={d._id}
          >
              <img
                className="w-[410px] h-[410px] rounded-[10px] mt-5 col-span-4"
                src={"http://localhost:8080/" + d.path}
                alt="Gallery"
              />
            <div>
                          <Link to={`/superadmin/gallery/delete/${d._id}`}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="w-6 h-6 text-red-500"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </Link>
                        </div>
          </div>
          ))}
        </div>

        </div>
        </>
    )
}

export default GalBack