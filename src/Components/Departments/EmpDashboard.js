import React, { useEffect, useState, useContext } from "react";
import ReactStars from "react-rating-stars-component";
import DepAuthContext from "../Store/Dep-authContext";

function EmpDashboard() {
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
      <div className="m-11">
        {isLoading && <h3>Loading......</h3>}
        {!isLoading && requestEmployee.length <= 0 && (
          <h3 className="mt-5">There are no Employees.</h3>
        )}
        {!isLoading && requestEmployee.length > 0 && (
          <div className="w-7/12 bg-blue-500 border border-gray-200 rounded-lg rounded-t-2xl shadow-md mb-20">
            <h6 className="text-white text-lg m-3">Employee Lists</h6>
            <div className="bg-white rounded-lg rounded-t-2xl">
              {requestEmployee.map((emp) => {
                return (
                  <div className="flex justify-evenly p-3 border-b-2 mx-5">
                    <p className="" key={emp.id}>
                      {emp.firstName} {emp.lastName}
                    </p>
                    <ReactStars
                      size={30}
                      count={5}
                      isHalf={true}
                      value={emp.rating}
                      edit={false}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default EmpDashboard;
