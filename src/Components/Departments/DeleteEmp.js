import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DepAuthContext from "../Store/Dep-authContext";

function DeleteEmp() {
  const navigate = useNavigate();

  const depAuthCtx = useContext(DepAuthContext);

  const { userid } = useParams();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const AssignedTask = async () => {
      const response = await fetch(`http://localhost:8080/user/${userid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + depAuthCtx.token,
        },
      });
      if (!response.ok) {
        console.log("Something went wrong");
      }
      const data = await response.json();

      console.log(data);
      setIsLoading(false);

      if (data.msg === "User Deleted Successfully") {
        navigate("/department/employee");
      }
    };

    AssignedTask();
  }, [userid, depAuthCtx, navigate]);

  return (
    <>
      <div className="bg-neutral-50">
        <div className="text-3xl text-center  text-blue-500 font-bold">
          {isLoading && <h4>Deleteing...</h4>}
          {!isLoading && <h1>Employee Removed Successfully</h1>}
        </div>
      </div>
    </>
  );
}

export default DeleteEmp;
