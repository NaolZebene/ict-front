import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { InvAuthContextProvider } from "./Components/Store/Inv-authContext";
import { DepAuthContextProvider } from "./Components/Store/Dep-authContext";
import { EmpAuthContextProvider } from "./Components/Store/Emp-authContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <DepAuthContextProvider>
    <EmpAuthContextProvider>
      <InvAuthContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </InvAuthContextProvider>
    </EmpAuthContextProvider>
  </DepAuthContextProvider>
);
