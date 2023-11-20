import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EmpAuthContext from "../Store/Emp-authContext";

function EditClient() {
  const empAuthCtx = useContext(EmpAuthContext);

  const navigate = useNavigate();

  const { cliid } = useParams();

  const [title, setTitle] = useState("");
  const [logo, setLogo] = useState(null);

  const [isPending, setIsPending] = useState(false)
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    const addreport = async () => {
      const response = await fetch(`http://localhost:8080/clients/${cliid}`, {
        headers: {
          Authorization: "Bearer " + empAuthCtx.token,
        },
      });

      if (!response.ok) {
        console.log("something is wrong");
      }

      const data = await response.json();
      console.log(data);

      setTitle(data.msg.name);
      setLogo(data.msg.logo);
    };

    addreport();
  }, [cliid, empAuthCtx]);

  const submitHandler = (e) => {
    e.preventDefault();

    setIsPending(true)

    const formData = new FormData();
    formData.append("title", title);
    formData.append("logo", logo);

    const addreport = async () => {
      const response = await fetch(`http://localhost:8080/clients/${cliid}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        console.log("something is wrong");
      }

      const data = await response.json();
      console.log(data);

      setIsPending(false)
      setErrMsg(data.msg);

      if (data.msg === "Client Edited Successfully") {
        navigate("/superadmin/clients");
      }
    };

    addreport();
  };

  return (
    <>
      <div className="bg-neutral-50 bg">
      <div className="m-auto py-16 min-h-screen flex items-center justify-center">
          <div className="w-1/2">
            <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-5 mb-20">
              <div className="text-lg text-center text-blue-500 font-bold">
                Edit Client
              </div>
            <form onSubmit={submitHandler}>
              <div className="text-xl font-bold text-blue-500 my-3">
                <h4 className="mb-2">Client Name</h4>
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
                    placeholder="Client Name"
                    type="text"
                    className="w-full pl-14 bg-white border border-blue-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                  />
                </div>
              </div>

              <div className="text-xl font-bold text-blue-500 my-3">
                <h4 className="mb-2">Logo</h4>
                <input
                  name="logo"
                  onChange={(e) => setLogo(e.target.files[0])}
                  type="file"
                  className="w-full bg-white border border-blue-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                />
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

export default EditClient;
