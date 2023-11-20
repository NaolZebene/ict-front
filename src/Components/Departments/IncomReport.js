import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import DepAuthContext from "../Store/Dep-authContext";

function IncomReport() {
  const depAuthCtx = useContext(DepAuthContext);

  const [requestEmployee, setRequestEmployee] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      const response = await fetch("http://localhost:8080/user/investor", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + depAuthCtx.token,
        },
      });
      const data = await response.json();
      console.log(data);
      setRequestEmployee(data.msg);
      setIsLoading(false);
    };
    fetchEmployee();
  }, [depAuthCtx]);
  return (
    <>
      <div className="bg-neutral-50">
        <div className="text-3xl text-center  text-blue-500 font-bold mb-5">
          Reports
        </div>

        {isLoading && <h3>Loading......</h3>}

        {!isLoading && requestEmployee.length <= 0 && (
          <h3 className="mt-5">There are no Investors.</h3>
        )}

        <div className="grid grid-cols-3 gap-10 mb-10 mx-5">
          {requestEmployee.map((name) => {
            return (
              <Link to={`/department/viewreport/${name.companyName}`}>
                <div
                  className="flex flex-col mx-5 shadow-md hover:shadow-blue-300 hover:shadow-lg bg-white rounded-lg p-5 text-center text-blue-500"
                  key={name._id}
                >
                  <h4 className="text-2xl border-b-4 pb-2 mb-2">
                    {name.companyName}
                  </h4>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-60 h-60 ml-20"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776"
                    />
                  </svg>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default IncomReport;
