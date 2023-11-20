import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import DepAuthContext from "../Store/Dep-authContext";

function EmpListDetails() {
  const depAuthCtx = useContext(DepAuthContext);
  const { empId } = useParams();

  const [requestEmployee, setRequestEmployee] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      const response = await fetch(`http://localhost:8080/employee/${empId}`, {
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
  }, [empId, depAuthCtx]);

  return (
    <>
      <div className="text-3xl text-center  text-blue-500 font-bold">
        Details
      </div>
      {isLoading && <h4>Loading.....</h4>}

      {!isLoading && (
        <div className="grid grid-cols-2 m-20">
          <div className="">
            <div className="flex justify-start p-5">
              <h4 className="text-blue-500 text-2xl mr-4">Full Name:</h4>{" "}
              <div className="pt-2">
                {" "}
                {requestEmployee.firstName} {requestEmployee.lastName}{" "}
              </div>
            </div>
            <div className="flex justify-start p-5">
              <h4 className="text-blue-500 text-2xl mr-4">Username:</h4>{" "}
              <div className="pt-2">{requestEmployee.username} </div>
            </div>
            <div className="flex justify-start p-5">
              <h4 className="text-blue-500 text-2xl mr-4">Email:</h4>
              <div className="pt-2">{requestEmployee.email}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default EmpListDetails;
