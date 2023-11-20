import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import EmpAuthContext from "../Store/Emp-authContext";

function DetailDepartments() {
  const empAuthCtx = useContext(EmpAuthContext);

  const { depid } = useParams();

  const [requestData, setRequestData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const singleFetch = async () => {
      const response = await fetch(
        `http://localhost:8080/user/department/details/` + depid,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + empAuthCtx.token,
          },
        }
      );
      if (!response.ok) {
        console.log("Something went wrong");
      }
      const data = await response.json();

      setRequestData(data.msg);
      setIsLoading(false);
    };

    singleFetch();
  }, [depid, empAuthCtx]);

  console.log(requestData);

  return (
    <>
      <div className="text-3xl text-center  text-blue-500 font-bold">
        Details
      </div>
      {isLoading && <h3 className="text-xl">Loading....</h3>}
      <div className="grid grid-cols-2 m-20">
        <div className="">
          <div className="flex justify-start p-5">
            <h4 className="text-blue-500 text-2xl mr-4">Department Name:</h4>{" "}
            <div className="pt-2"> {requestData.title} </div>
          </div>
          <div className="flex justify-start p-5">
            <h4 className="text-blue-500 text-2xl mr-4">Role:</h4>{" "}
            <div className="pt-2">{requestData.role} </div>
          </div>
        </div>

        <div className="border-l-4">
          {!isLoading && requestData.services.length <= 0 && (
            <h3 className="text-blue-500 text-2xl mr-4  p-5">
              There are no Services
            </h3>
          )}

          {!isLoading && requestData.services.length > 0 && (
            <>
              {requestData.services.map((service) => {
                return (
                  <>
                    <div className="flex justify-start p-5">
                      <h4 className="text-blue-500 text-2xl mr-4">Service:</h4>
                      <div className="pt-2">{service.title}</div>
                    </div>
                    <div className="flex justify-start p-5">
                      <h4 className="text-blue-500 text-2xl mr-4">
                        Description:
                      </h4>
                      <div className="pt-2">{service.description}</div>
                    </div>
                  </>
                );
              })}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default DetailDepartments;
