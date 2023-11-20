import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EmpAuthContext from "../Store/Emp-authContext";

function DeclineReason() {
  const navigate = useNavigate();

  const empAuthCtx = useContext(EmpAuthContext);

  const { id } = useParams();

  const [reason, setReason] = useState("");

  const [isPending, setIsPending] = useState(false)
  const [errMsg, setErrMsg] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();

    setIsPending(true)

    const DeclineHandler = async () => {
      const response = await fetch(
        `http://localhost:8080/employee/escalate/` + id,
        {
          method: "post",
          body: JSON.stringify({
            reason: reason,
          }),
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

      console.log(data);

      setIsPending(false)
      setErrMsg(data.msg);

      if (data.msg === "Escalated Task Successfully") {
        navigate("/employee/task");
      }
    };

    DeclineHandler();
  };

  return (
    <>
      <div className="bg-neutral-50 bg">
        <div className="text-3xl text-center text-blue-500 font-bold">
          Enter Reason for Decline the Task
        </div>
        <div className="border-x-4 mx-10 border-b-4 rounded-lg">
          <div className="m-10">
            <div className="w-1/2 bg-white border border-gray-200 rounded-lg rounded-t-2xl shadow-md p-4 text-2xl font-bold text-blue-500 my-5">
              Reason
            </div>
            <div>
              <div>
                <textarea
                  value={reason}
                  onChange={(e) => {
                    setReason(e.target.value);
                  }}
                  rows="5"
                  className="block p-2.5 w-full text-lg text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Description"
                ></textarea>
              </div>
            </div>

            <p className="text-red-500 text-lg">{errMsg}</p>

            <div className="w-44 text-center text-blue-500 rounded-lg hover:bg-blue-400 my-10 hover:text-white p-2 text-xl font-bold cursor-pointer tracking-wider border">
              {!isPending && <button  onClick={submitHandler}> Submit</button> }
                 {isPending && <button disabled> Submiting</button> }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeclineReason;
