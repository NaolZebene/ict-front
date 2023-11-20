import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EmpAuthContext from "../Store/Emp-authContext";

function EditEvent() {
  const empAuthCtx = useContext(EmpAuthContext);

  const navigate = useNavigate();

  const { eventid } = useParams();

  const [title, setTitle] = useState("");
  const [photo, setPhoto] = useState(null);
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const [isPending, setIsPending] = useState(false)
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    const singleFetch = async () => {
      const response = await fetch(
        `http://localhost:8080/home/event/` + eventid,
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
      console.log(data);

      setTitle(data.msg.title);
      setDate(data.msg.date);
      setDescription(data.msg.description);
        setPhoto(data.msg.event)
    };

    singleFetch();
  }, [eventid, empAuthCtx]);

  const submitHandler = (e) => {
    e.preventDefault();

    setIsPending(true)

    const formData = new FormData();
    formData.append("title", title);
    formData.append("event", photo);
    formData.append("date", date);
    formData.append("description", description);

    const addreport = async () => {
      const response = await fetch(
        `http://localhost:8080/home/event/edit/${eventid}`,
        {
          method: "PUT",
          body: formData,
          headers: {
            Authorization: "Bearer " + empAuthCtx.token,
          },
        }
      );
      if (!response.ok) {
        console.log("something is wrong");
      }

      const data = await response.json();
      console.log(data);

      setIsPending(false)
      setErrMsg(data.msg);

      if (data.msg === "Event Edited Successfully") {
        navigate("/superadmin/events");
      }
    };

    addreport();    
  };

  return (
    <>
     <div className="bg-neutral-50">
        <div className="m-auto py-16 min-h-screen flex items-center justify-center">
          <div className="w-1/2">
            <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-5 mb-20">
              <div className="text-lg text-center text-blue-500 font-bold">
                Edit Event
              </div>
              <form onSubmit={submitHandler}>
                <div className="text-xl font-bold text-blue-500 my-3">
                  <h4 className="mb-2">Title</h4>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-8 h-8 text-blue-500"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                        />
                      </svg>
                    </div>
                    <input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Title"
                      type="text"
                      className="w-full pl-14 bg-white border border-blue-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                    />
                  </div>
                </div>

                <div className="text-xl font-bold text-blue-500 my-3">
                  <h4 className="mb-2">Photo</h4>
                  <input
                    multiple
                    name="event"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    type="file"
                    className="w-full bg-white border border-blue-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                  />
                </div>

                <div className="text-xl font-bold text-blue-500 my-3">
                  <h4 className="mb-2">Date</h4>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-8 h-8 text-blue-500"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                        />
                      </svg>
                    </div>
                    <input
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      placeholder="Date"
                      type="date"
                      className="w-full pl-14 bg-white border border-blue-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                    />
                  </div>
                </div>

                <div className="text-xl font-bold text-blue-500 my-3">
                  <h4 className="mb-2">Description</h4>
                  <div>
                    <div>
                      <textarea
                       value={description}
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                        rows="5"
                        className="block p-2.5 w-full text-lg text-gray-900 bg-white rounded-lg border border-blue-300 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Message"
                      >
                      </textarea>
                    </div>
                  </div>
                </div>

                <p className="text-red-500 text-lg">{errMsg}</p>

                <div className="w-44 items-center text-center text-blue-500 rounded-lg hover:bg-blue-400 my-5 hover:text-white p-2 text-xl font-bold cursor-pointer tracking-wider border">
                {!isPending && <button> Update</button> }
                 {isPending && <button disabled> Updating</button> }
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditEvent;
