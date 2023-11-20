import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import EmpAuthContext from "../Store/Emp-authContext";
import { useParams } from "react-router-dom";

function AssignDepartment() {
  const { taskid } = useParams();

  const empAuthCtx = useContext(EmpAuthContext);

  const [requestEmployee, setRequestEmployee] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      const response = await fetch("http://localhost:8080/user/department", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + empAuthCtx.token,
        },
      });
      const data = await response.json();
      console.log(data);
      setRequestEmployee(data.msg);
      setIsLoading(false);
      console.log(taskid);
    };
    fetchEmployee();
  }, [empAuthCtx, taskid]);

  return (
    <>
      <div className="bg-neutral-50 bg">
        <div className="text-3xl text-center text-blue-500 font-bold">
          Assign To
        </div>
        <div className="m-32 mx-96">
          <div className="w-full bg-white border border-gray-200 rounded-2xl shadow-md p-5 mb-20">
            {isLoading && <h3>Loading......</h3>}
            {!isLoading && requestEmployee.length <= 0 && (
              <h3 className="mt-5">There are no Departments.</h3>
            )}

            {requestEmployee.map((emp) => {
              return (
                <div
                  className="grid grid-cols-2 gap-10 mx-10 items-center border-b-2 p-3 my-2"
                  key={emp.id}
                >
                  <div>{emp.title}</div>
                  <div className="ml-20">
                    <Link
                      to={`/superadmin/assign/${taskid}/${emp.id}`}
                      className="w-44 text-center text-green-500 rounded-lg hover:bg-green-400 hover:text-white p-2 text-xl font-bold cursor-pointer tracking-wider border"
                    >
                      Assign Task
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default AssignDepartment;
