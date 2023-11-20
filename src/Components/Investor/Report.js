import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import InvAuthContext from "../Store/Inv-authContext";

function Report() {
  const invAuthCtx = useContext(InvAuthContext);

  const navigate = useNavigate();

  const [file, setFile] = useState(null);

  const [compName, setCompName] = useState("");
  const [month, setMonth] = useState("");

  const [totalMale, setTotalMale] = useState("");
  const [totalFemale, setTotalFemale] = useState("");
  const [totalExp, setTotalExp] = useState("");
  const [totalTotal, setTotalTotal] = useState("");

  const [hiredMale, setHiredMale] = useState("");
  const [hiredFemale, setHiredFemale] = useState("");
  const [hiredExp, setHiredExp] = useState("");
  const [hiredTotal, setHiredTotal] = useState("");

  const [firedMale, setFiredMale] = useState("");
  const [firedFemale, setFiredFemale] = useState("");
  const [firedExp, setFiredExp] = useState("");
  const [firedTotal, setFiredTotal] = useState("");

  const [avgWorker, setAvgWorker] = useState("");
  const [turnOver, setTurnOver] = useState("");
  const [jobCre, setJobCre] = useState("");
  const [creJobYr, setCreJobYr] = useState("");

  const [planExport, setPlanExport] = useState("");
  const [amountExport, setAmountExport] = useState("");
  const [monthlyImport, setMonthlyImport] = useState("");
  const [amountImport, setAmountImport] = useState("");

  const [cerType, setCerType] = useState("");
  const [numTrainee, setNumTrainee] = useState("");
  const [durTraining, setDurTraining] = useState("");

  const [challenge, setChallenge] = useState("");

  const departmentName = "investor";

  const [isPending, setIsPending] = useState(false)
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    const datafetch = async () => {
      const response = await fetch(
        "http://localhost:8080/auth/investor/verifyToken",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + invAuthCtx.token,
          },
        }
      );

      const data = await response.json();
      console.log(data);

      setCompName(data.payload.name);
    };
    datafetch();
  }, [invAuthCtx]);

  const submitHandler = (event) => {
    event.preventDefault();

    setIsPending(true)

    const formData = new FormData();
    formData.append("file", file);
    formData.append("companyName", compName);
    formData.append("month", month);
    formData.append("totalMale", totalMale);
    formData.append("totalFemale", totalFemale);
    formData.append("totalExp", totalExp);
    formData.append("totalTotal", totalTotal);
    formData.append("hiredMale", hiredMale);
    formData.append("hiredFemale", hiredFemale);
    formData.append("hiredExp", hiredExp);
    formData.append("hiredTotal", hiredTotal);
    formData.append("firedMale", firedMale);
    formData.append("firedFemale", firedFemale);
    formData.append("firedExp", firedExp);
    formData.append("firedTotal", firedTotal);

    formData.append("average_worker_per_month", avgWorker);
    formData.append("turn_over_rate", turnOver);
    formData.append("job_creation", jobCre);
    formData.append("cumulative_new_jobs_created", creJobYr);
    formData.append("planned_monthly_report", planExport);
    formData.append("amount_of_export", amountExport);
    formData.append("monthly_import_substitute", monthlyImport);
    formData.append("certificate_type", cerType);
    formData.append("amount_import_substitute", amountImport);
    formData.append("number_of_trainee", numTrainee);
    formData.append("duration_of_training", durTraining);
    formData.append("challenges", challenge);
    formData.append("departmentName", departmentName);

    const addreport = async () => {
      const response = await fetch("http://localhost:8080/report/post", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: "Bearer " + invAuthCtx.token,
        },
      });

      if (!response.ok) {
        console.log("something is wrong");
      }

      const data = await response.json();
      console.log(data);

      setIsPending(false)
      setErrMsg(data.msg);

      if (data.msg === "Report Sent Successfully") {
        navigate("/investor/myrequest");
      }
    };

    addreport();
  };

  return (
    <>
      <div className="bg-neutral-50 bg">
        <div className="w-full bg-white border border-gray-200 rounded-2xl shadow-md p-5 mb-20">
          <div className="text-3xl text-center text-blue-500 font-bold">
            Monthly Report Form
          </div>
        </div>
        <form onSubmit={submitHandler}>
          <div className="grid grid-cols-2 gap-10 mx-10">
            <div>
              <h4 className="mb-2">Company Name</h4>
              <input
                value={compName}
                onChange={(e) => {
                  setCompName(e.target.value);
                }}
                placeholder="Company Name"
                type="text"
                className="w-full bg-white border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              />
            </div>
            <div>
              <h4 className="mb-2">Month</h4>
              <input
                value={month}
                onChange={(e) => {
                  setMonth(e.target.value);
                }}
                type="Month"
                className="w-full bg-white border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              />
            </div>
          </div>

          <div className="border-x-4 mx-10 border-b-4 rounded-lg">
            <div className="text-2xl text-blue-500 text-center mx-96 bg-white border border-gray-200 rounded-2xl shadow-md p-5 my-10">
              Job Creation
            </div>
            <div className="grid grid-cols-3 gap-10 mb-10 mx-5">
              <div className="flex flex-col mx-5 shadow-xl shadow-blue-300 rounded-lg p-5">
                <h4 className="text-center text-2xl border-b-4 pb-2 mb-2">
                  Total Number of Workers
                </h4>
                <div className="grid grid-cols-3 my-1">
                  <label htmlFor="1" className="mx-10 text-start text-xl">
                    Male
                  </label>
                  <input
                    value={totalMale}
                    onChange={(e) => {
                      setTotalMale(e.target.value);
                    }}
                    id="1"
                    type="number"
                    className="col-span-2 w-full  bg-white border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1"
                  />
                </div>
                <div className="grid grid-cols-3 my-1">
                  <label htmlFor="2" className="mx-10 text-start text-xl">
                    Female
                  </label>
                  <input
                    value={totalFemale}
                    onChange={(e) => {
                      setTotalFemale(e.target.value);
                    }}
                    id="2"
                    type="number"
                    className="col-span-2 w-full  bg-white border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1"
                  />
                </div>
                <div className="grid grid-cols-3 my-1">
                  <label htmlFor="3" className="mx-10 text-start text-xl">
                    Expected
                  </label>
                  <input
                    value={totalExp}
                    onChange={(e) => {
                      setTotalExp(e.target.value);
                    }}
                    id="3"
                    type="number"
                    className="col-span-2 w-full  bg-white border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1"
                  />
                </div>
                <div className="grid grid-cols-3 my-1">
                  <label htmlFor="4" className="mx-10 text-start text-xl t">
                    Total
                  </label>
                  <input
                    value={totalTotal}
                    onChange={(e) => {
                      setTotalTotal(e.target.value);
                    }}
                    id="4"
                    type="number"
                    className="col-span-2 w-full  bg-white border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1"
                  />
                </div>
              </div>

              <div className="flex flex-col mx-5 shadow-xl shadow-blue-300 rounded-lg p-5">
                <h4 className="text-center text-2xl border-b-4 pb-2 mb-2">
                  Number of Workers Hired
                </h4>
                <div className="grid grid-cols-3 my-1">
                  <label htmlFor="5" className="mx-10 text-start text-xl">
                    Male
                  </label>
                  <input
                    value={hiredMale}
                    onChange={(e) => {
                      setHiredMale(e.target.value);
                    }}
                    id="5"
                    type="number"
                    className="col-span-2 w-full  bg-white border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1"
                  />
                </div>
                <div className="grid grid-cols-3 my-1">
                  <label htmlFor="6" className="mx-10 text-start text-xl">
                    Female
                  </label>
                  <input
                    value={hiredFemale}
                    onChange={(e) => {
                      setHiredFemale(e.target.value);
                    }}
                    id="6"
                    type="number"
                    className="col-span-2 w-full  bg-white border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1"
                  />
                </div>
                <div className="grid grid-cols-3 my-1">
                  <label htmlFor="7" className="mx-10 text-start text-xl">
                    Expected
                  </label>
                  <input
                    value={hiredExp}
                    onChange={(e) => {
                      setHiredExp(e.target.value);
                    }}
                    id="7"
                    type="number"
                    className="col-span-2 w-full  bg-white border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1"
                  />
                </div>
                <div className="grid grid-cols-3 my-1">
                  <label htmlFor="8" className="mx-10 text-start text-xl t">
                    Total
                  </label>
                  <input
                    value={hiredTotal}
                    onChange={(e) => {
                      setHiredTotal(e.target.value);
                    }}
                    id="8"
                    type="number"
                    className="col-span-2 w-full  bg-white border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1"
                  />
                </div>
              </div>

              <div className="flex flex-col mx-5 shadow-xl shadow-blue-300 rounded-lg p-5">
                <h4 className="text-center text-2xl border-b-4 pb-2 mb-2">
                  Number of workers Fired/Resigned
                </h4>
                <div className="grid grid-cols-3 my-1">
                  <label htmlFor="5" className="mx-10 text-start text-xl">
                    Male
                  </label>
                  <input
                    value={firedMale}
                    onChange={(e) => {
                      setFiredMale(e.target.value);
                    }}
                    id="5"
                    type="number"
                    className="col-span-2 w-full  bg-white border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1"
                  />
                </div>
                <div className="grid grid-cols-3 my-1">
                  <label htmlFor="6" className="mx-10 text-start text-xl">
                    Female
                  </label>
                  <input
                    value={firedFemale}
                    onChange={(e) => {
                      setFiredFemale(e.target.value);
                    }}
                    id="6"
                    type="number"
                    className="col-span-2 w-full  bg-white border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1"
                  />
                </div>
                <div className="grid grid-cols-3 my-1">
                  <label htmlFor="7" className="mx-10 text-start text-xl">
                    Expected
                  </label>
                  <input
                    value={firedExp}
                    onChange={(e) => {
                      setFiredExp(e.target.value);
                    }}
                    id="7"
                    type="number"
                    className="col-span-2 w-full  bg-white border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1"
                  />
                </div>
                <div className="grid grid-cols-3 my-1">
                  <label htmlFor="8" className="mx-10 text-start text-xl t">
                    Total
                  </label>
                  <input
                    value={firedTotal}
                    onChange={(e) => {
                      setFiredTotal(e.target.value);
                    }}
                    id="8"
                    type="number"
                    className="col-span-2 w-full  bg-white border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1"
                  />
                </div>
              </div>
            </div>

            <div className="text-center bg-white border border-gray-200 rounded-2xl shadow-xl shadow-blue-300 p-5 m-9">
              <div className="grid grid-cols-4 text-lg border-b-4">
                <div>Average number of worker during the month</div>
                <div>Turnover Rate</div>
                <div>Job Creation</div>
                <div>Cumulative new jobs created EFY 2015</div>
              </div>
              <div className="grid grid-cols-4 my-5 items-center">
                <input
                  value={avgWorker}
                  onChange={(e) => {
                    setAvgWorker(e.target.value);
                  }}
                  type="number"
                  className="w-3/4 ml-6 bg-white border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1"
                />
                <input
                  value={turnOver}
                  onChange={(e) => {
                    setTurnOver(e.target.value);
                  }}
                  type="number"
                  className="w-3/4 ml-6 bg-white border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1"
                />
                <input
                  value={jobCre}
                  onChange={(e) => {
                    setJobCre(e.target.value);
                  }}
                  type="number"
                  className="w-3/4 ml-6 bg-white border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1"
                />
                <input
                  value={creJobYr}
                  onChange={(e) => {
                    setCreJobYr(e.target.value);
                  }}
                  type="number"
                  className="w-3/4 ml-6 bg-white border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1"
                />
              </div>
            </div>
          </div>

          <div className="border-x-4 mx-10 border-b-4 rounded-lg">
            <div className="text-2xl text-blue-500 text-center mx-96 bg-white border border-gray-200 rounded-2xl shadow-md p-5 my-10">
              Export and Import Substitute
            </div>

            <div className="text-center bg-white border border-gray-200 rounded-2xl shadow-xl shadow-blue-300 p-5 m-9">
              <div className="grid grid-cols-4 text-lg border-b-4">
                <div>Planned Monthly export</div>
                <div>Amount of export (USD)</div>
                <div>Monthly import substitute(Local)</div>
                <div>Amount import substitute (Birr)</div>
              </div>
              <div className="grid grid-cols-4 my-5 items-center">
                <input
                  value={planExport}
                  onChange={(e) => {
                    setPlanExport(e.target.value);
                  }}
                  type="number"
                  className="w-3/4 ml-6 bg-white border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1"
                />
                <input
                  value={amountExport}
                  onChange={(e) => {
                    setAmountExport(e.target.value);
                  }}
                  type="number"
                  className="w-3/4 ml-6 bg-white border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1"
                />
                <input
                  value={monthlyImport}
                  onChange={(e) => {
                    setMonthlyImport(e.target.value);
                  }}
                  type="number"
                  className="w-3/4 ml-6 bg-white border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1"
                />
                <input
                  value={amountImport}
                  onChange={(e) => {
                    setAmountImport(e.target.value);
                  }}
                  type="number"
                  className="w-3/4 ml-6 bg-white border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1"
                />
              </div>
            </div>
          </div>

          <div className="border-x-4 mx-10 border-b-4 rounded-lg">
            <div className="text-2xl text-blue-500 text-center mx-96 bg-white border border-gray-200 rounded-2xl shadow-md p-5 my-10">
              On Job Training
            </div>

            <div className="text-center bg-white border border-gray-200 rounded-2xl shadow-xl shadow-blue-300 p-5 m-9">
              <div className="grid grid-cols-3 text-lg border-b-4">
                <div>Certificate Type </div>
                <div>Number of the trainee</div>
                <div>Duration of the training </div>
              </div>
              <div className="grid grid-cols-3 my-5 items-center">
                <input
                  value={cerType}
                  onChange={(e) => {
                    setCerType(e.target.value);
                  }}
                  type="text"
                  className="w-3/4 ml-6 bg-white border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1"
                />
                <input
                  value={numTrainee}
                  onChange={(e) => {
                    setNumTrainee(e.target.value);
                  }}
                  type="number"
                  className="w-3/4 ml-6 bg-white border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1"
                />
                <input
                  value={durTraining}
                  onChange={(e) => {
                    setDurTraining(e.target.value);
                  }}
                  type="text"
                  className="w-3/4 ml-6 bg-white border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1"
                />
              </div>
            </div>
          </div>

          <div className="border-x-4 mx-10 border-b-4 rounded-lg">
            <div className="text-2xl text-blue-500 text-center mx-96 bg-white border border-gray-200 rounded-2xl shadow-md p-5 my-10">
              Any Challenges this Month?
            </div>
            <div>
              <div className="rounded-2xl shadow-xl shadow-blue-300 p-5 m-9">
                <textarea
                  onChange={(e) => {
                    setChallenge(e.target.value);
                  }}
                  rows="5"
                  className="block p-2.5 w-full text-lg text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Challenges"
                >
                  {challenge}
                </textarea>
              </div>
            </div>
          </div>

          <div className="border-x-4 mx-10 border-b-4 rounded-lg">
            <div className="text-2xl text-blue-500 text-center mx-96 bg-white border border-gray-200 rounded-2xl shadow-md p-5 my-10">
              Upload Image
            </div>
            <div>
              <div className="rounded-2xl shadow-xl shadow-blue-300 p-5 m-9">
                <input
                  name="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  type="file"
                  className="w-full bg-white border border-blue-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                />
              </div>
            </div>
          </div>

          <p className="text-red-500 text-lg my-5 mx-10">{errMsg}</p>

          <div className="w-44 m-10 text-center text-blue-500 rounded-lg hover:bg-blue-400 my-10 hover:text-white p-2 text-xl font-bold cursor-pointer tracking-wider border">
          {!isPending && <button> Submit</button> }
                 {isPending && <button disabled> Submiting</button> }
          </div>
        </form>
      </div>
    </>
  );
}

export default Report;
