import React, { useEffect, useState, useContext } from "react";
import DepAuthContext from "../Store/Dep-authContext";
import { useParams } from "react-router-dom";
import Download from "./Download";

function ViewReport() {
  const { name } = useParams();

  const depAuthCtx = useContext(DepAuthContext);

  const [requestData, setRequestData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const download = (e) => {
    e.preventDefault();
    console.log(e.target.src);
    // console.log(e.target.name);
    fetch(e.target.src, {
      method: "GET",
      headers: {},
    })
      .then((response) => {
        response.arrayBuffer().then(function (buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `image.jpg`); //or any other extension
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const fetchEmployee = async () => {
      const response = await fetch(
        `http://localhost:8080/user/report/${name}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + depAuthCtx.token,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setRequestData(data.msg);
      setIsLoading(false);
    };
    fetchEmployee();
  }, [depAuthCtx, name]);

  return (
    <>
      <div className="bg-neutral-50">
        <div className="text-3xl text-center  text-blue-500 font-bold">
          Monthly Reports
        </div>
        <div className="m-16">
          {isLoading && <h3>Loading.....</h3>}
          {!isLoading && requestData.length <= 0 && (
            <h3 className="mt-5 pt-5">There are no reports for now.</h3>
          )}

          {!isLoading && requestData.length > 0 && (
            <div className="w-full bg-neutral-300 border border-gray-200 rounded-lg rounded-t-2xl shadow-md mb-20">
              <div className="grid grid-cols-3 text-center p-3 border-b-2 mx-5">
                <h6 className="text-lg">Filename</h6>
                <h6 className="text-lg">Download File</h6>
                <h6 className="text-lg">Download Image</h6>
              </div>
              <div className="bg-white rounded-lg rounded-t-2xl">
                {!isLoading &&
                  requestData.map((task) => {
                    return (
                      <div>
                        <div
                          className="grid grid-cols-3 text-center py-3 border-b-2"
                          key={task._id}
                        >
                          <p className="">{task.month}</p>

                          <Download data={task} />

                          {/* <a
                            href={`http://localhost:8080/${task.additional_file}`}
                            download
                            onClick={(e) => download(e)}
                          > */}
                          <img
                            className="w-[65px] h-[65px] mb-[25px]"
                            src={
                              "http://localhost:8080/" + task.additional_file
                            }
                            alt="additional file"
                            download
                            onClick={(e) => download(e)}
                          />
                          {/* </a> */}

                          {/* <Link
                            to={`http://localhost:8080/${task.additional_file}`}
                          >
                            <img
                              className="w-[65px] h-[65px] mb-[25px]"
                              src={
                                "http://localhost:8080/" + task.additional_file
                              }
                              alt="additional file"
                            />
                          </Link> */}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ViewReport;
