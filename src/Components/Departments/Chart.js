import React, { useEffect, useState, useContext } from "react";
import DepAuthContext from "../Store/Dep-authContext";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function Chart() {
  const depAuthCtx = useContext(DepAuthContext);

  const [requestData, setRequestData] = useState([]);

  useEffect(() => {
    const datafetch = async () => {
      const response = await fetch(
        "http://localhost:8080/department/getannualrequest",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + depAuthCtx.token,
          },
        }
      );
      console.log(response);
      const data = await response.json();
      console.log(data);
      setRequestData(data.msg);
    };
    datafetch();
  }, [depAuthCtx]);

  const data = [
    {
      name: "Jan",
      Request: requestData["01"] ? requestData["01"]?.length : 0,
    },
    { name: "Feb", Request: requestData["02"] ? requestData["02"]?.length : 0 },
    { name: "Mar", Request: requestData["03"] ? requestData["03"]?.length : 0 },
    { name: "Apr", Request: requestData["04"] ? requestData["04"]?.length : 0 },
    { name: "May", Request: requestData["05"] ? requestData["05"]?.length : 0 },
    { name: "Jun", Request: requestData["06"] ? requestData["06"]?.length : 0 },
    {
      name: "July",
      Request: requestData["07"] ? requestData["07"]?.length : 0,
    },
    { name: "Aug", Request: requestData["08"] ? requestData["08"]?.length : 0 },
    { name: "Sep", Request: requestData["09"] ? requestData["09"]?.length : 0 },
    { name: "Oct", Request: requestData["10"] ? requestData["10"]?.length : 0 },
    { name: "Nov", Request: requestData["11"] ? requestData["11"]?.length : 0 },
    { name: "Dec", Request: requestData["12"] ? requestData["12"]?.length : 0 },
  ];

  // console.log(requestData["01"] ? requestData["01"].length : 0);
  return (
    <>
      <div className="my-10">
        <BarChart
          className="mx-10 bg-white shadow-md"
          width={850}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis dataKey="name" scale="point" padding={{ left: 5, right: 5 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="Request" fill="#8884d8" background={{ fill: "#eee" }} />
        </BarChart>
      </div>
    </>
  );
}
