import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import DepAuthContext from "../Store/Dep-authContext";

function Employee() {
  const depAuthCtx = useContext(DepAuthContext);

  const [requestEmployee, setRequestEmployee] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      const response = await fetch("http://localhost:8080/user", {
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
        <div className="text-3xl text-center  text-blue-500 font-bold">
          Employees
        </div>
        <div className="m-16">
          {isLoading && <h3>Loading......</h3>}
          {!isLoading && requestEmployee.length <= 0 && (
            <h3 className="mt-5">There are no Employees.</h3>
          )}

          {!isLoading && requestEmployee.length > 0 && (
            <div className="w-full bg-blue-500 border border-gray-200 rounded-lg rounded-t-2xl shadow-md mb-20">
              <h6 className="text-white text-lg m-3">Employee Lists</h6>
              <div className="bg-white rounded-lg rounded-t-2xl">
                {!isLoading &&
                  requestEmployee.map((emp) => {
                    return (
                      <div className="grid grid-cols-3 p-3 border-b-2 mx-5 items-center">
                        <p className="" key={emp._id}>
                          {emp.firstName} {emp.lastName}
                        </p>
                        <ReactStars
                          size={30}
                          count={5}
                          isHalf={true}
                          value={emp.rating}
                          edit={false}
                        />
                        <p className="flex justify-between">
                          <Link
                            to={`/department/employee/${emp._id}`}
                            className="w-44 text-center text-blue-500 rounded-lg hover:bg-blue-400 hover:text-white p-2 text-xl font-bold cursor-pointer tracking-wider border"
                          >
                            Details
                          </Link>
                          <Link
                            to={`/department/delete/${emp._id}`}
                            className="w-44 text-center text-red-500 rounded-lg hover:bg-red-400 hover:text-white p-2 text-xl font-bold cursor-pointer tracking-wider border"
                          >
                            Remove
                          </Link>
                        </p>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Employee;
