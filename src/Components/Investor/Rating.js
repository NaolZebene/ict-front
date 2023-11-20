import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import InvAuthContext from "../Store/Inv-authContext";
import ReactStars from "react-rating-stars-component";

function Rating() {
  const invAuthCtx = useContext(InvAuthContext);

  const { id } = useParams();

  const [empid, setEmpId] = useState("");
  const [taskid, setTaskId] = useState("");

  const [isPending, setIsPending] = useState(false)

  useEffect(() => {
    const singleFetch = async () => {
      const response = await fetch(`http://localhost:8080/task/view/` + id, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + invAuthCtx.token,
        },
      });
      if (!response.ok) {
        console.log("Something went wrong");
      }
      const data = await response.json();
      console.log(data.msg);
      setEmpId(data.msg.assignedTo);
      setTaskId(data.msg._id);
    };

    singleFetch();
  }, [id, invAuthCtx]);

  const ratingOnChange = (rating) => {

    setIsPending(true)

    const AssignedTask = async () => {
      const response = await fetch(
        `http://localhost:8080/employee/${empid}/rating`,
        {
          method: "post",
          body: JSON.stringify({
            rating: rating,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + invAuthCtx.token,
          },
        }
      );
      if (!response.ok) {
        console.log("Something went wrong");
      }
      const data = await response.json();
      console.log(data);

      setIsPending(false)
    };

    AssignedTask();
  };
  return (
    <>
      <div className="bg-neutral-50">
        <div className="text-3xl text-center  text-blue-500 font-bold">
          How Satisfied are you with the Help?
        </div>

        <div className="flex justify-center">
          <div className="border-b border-neutral-50 flex-row justify-center">
            <ReactStars
              size={40}
              count={5}
              isHalf={true}
              onChange={ratingOnChange}
            />
            <Link to={`/investor/${taskid}`}>
              <div className="w-40 text-center text-blue-500 rounded-lg hover:bg-blue-400 hover:text-white p-2 text-xl font-bold cursor-pointer tracking-wider border">
              {!isPending && <button> Submit</button> }
                 {isPending && <button disabled> Submiting</button> }
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Rating;
