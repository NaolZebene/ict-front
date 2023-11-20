import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import EmpAuthContext from "../Store/Emp-authContext";

function Gallery() {
  const empAuthCtx = useContext(EmpAuthContext);

  const navigate = useNavigate();

  const [gallery, setGallery] = useState([]);

  const [isPending, setIsPending] = useState(false)
  const [errMsg, setErrMsg] = useState("");

  

  const submitHandler = (e) => {
    e.preventDefault();
console.log(gallery)
    setIsPending(true)

    const formData = new FormData();
    Array.from(gallery).forEach((item) => {
      formData.append("gallery", item);
    })
    

    const addreport = async () => {
      const response = await fetch("http://localhost:8080/home/gallary/create", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: "Bearer " + empAuthCtx.token,
        },
      });

      if (!response.ok) {
        console.log("something is wrong");
      }

      const data = await response.json();
      console.log(data);

      setIsPending(false)
      setErrMsg(data.msg);

      if (data.msg === "Gallary Posted") {
        navigate("/superadmin/addimage");
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
                Add Gallery
              </div>
              <form onSubmit={submitHandler}>

                <div className="text-xl font-bold text-blue-500 my-3">
                  <h4 className="mb-2">Gallery</h4>
                  <input
                    multiple
                    name="gallery"
                    onChange={(e) => setGallery(e.target.files)}
                    type="file"
                    className="w-full bg-white border border-blue-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                  />
                </div>

                <p className="text-red-500 text-lg">{errMsg}</p>

                <div className="w-44 items-center text-center text-blue-500 rounded-lg hover:bg-blue-400 my-5 hover:text-white p-2 text-xl font-bold cursor-pointer tracking-wider border">
                 {!isPending && <button> Submit</button> }
                 {isPending && <button disabled> Submiting</button> }
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Gallery;
