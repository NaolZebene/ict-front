import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import InvAuthContext from "./Components/Store/Inv-authContext";
import DepAuthContext from "./Components/Store/Dep-authContext";
import EmpAuthContext from "./Components/Store/Emp-authContext";
import LayoutDep from "./Components/Departments/LayoutDep";
import Dashboard from "./Components/Departments/Dashboard";
import Allhistory from "./Components/Departments/Allhistory";
import Employee from "./Components/Departments/Employee";
import EmpListDetails from "./Components/Departments/EmpListDetails";
import DepDetails from "./Components/Departments/DepDetails";
import DepRequest from "./Components/Departments/DepRequest";
import Escalated from "./Components/Departments/Escalated";
import AssignEmp from "./Components/Departments/AssignEmp";
import AddEmployee from "./Components/Departments/AddEmployee";
import AsEmpTo from "./Components/Departments/AsEmpTo";
import Decline from "./Components/Departments/Decline";
import IncomReport from "./Components/Departments/IncomReport";
import ViewReport from "./Components/Departments/ViewReport";
import Folder from "./Components/Departments/Folder";
import Download from "./Components/Departments/Download";
import DeleteEmp from "./Components/Departments/DeleteEmp";
import ForgetPassword from "./Components/Departments/ForgetPassword";
import ChangePassword from "./Components/Departments/ChangePassword";
import UpdatePassDep from "./Components/Departments/UpdatePassDep";
import SettingDep from "./Components/Departments/SettingDep";
import EditDepProfile from "./Components/Departments/EditDepProfile";
import LayoutEmp from "./Components/Employee/LayoutEmp";
import Tasks from "./Components/Employee/Tasks";
import EmpDetails from "./Components/Employee/EmpDetails";
import EscalateTask from "./Components/Employee/EscalateTask";
import Profile from "./Components/Employee/Profile";
import DeclineReason from "./Components/Employee/DeclineReason";
import RequestInt from "./Components/Employee/RequestInt";
import ForgetPasswordUser from "./Components/Employee/ForgetPasswordUser";
import ChangePasswordUser from "./Components/Employee/ChangePasswordUser";
import UpdatePassword from "./Components/Employee/UpdatePassword";
import Setting from './Components/Employee/Setting'
import EditUserProfile from "./Components/Employee/EditUserProfile";
import LayoutInv from "./Components/Investor/LayoutInv";
import InvDashboard from "./Components/Investor/InvDashboard";
import Request from "./Components/Investor/Request";
import MyRequests from "./Components/Investor/MyRequests";
import Completed from "./Components/Investor/Completed";
import Report from "./Components/Investor/Report";
import InvDetails from "./Components/Investor/InvDetails";
import CompRequest from "./Components/Investor/CompRequest";
import DecRequest from "./Components/Investor/DecRequest";
import Rating from "./Components/Investor/Rating";
import ForgetPasswordInvestor from "./Components/Investor/ForgetPasswordInvestor";
import ChangePasswordInvestor from "./Components/Investor/ChangePasswordInvestor";
import UpdatePassInvestor from "./Components/Investor/UpdatePassInvestor";
import SettingInvestor from "./Components/Investor/SettingInvestor";
import EditInvProfile from "./Components/Investor/EditInvProfile";
import LayoutSup from "./Components/SuperAdmin/LayoutSup";
import Department from "./Components/SuperAdmin/Department";
import Investor from "./Components/SuperAdmin/Investor";
import Declined from "./Components/SuperAdmin/Declined";
import SupDetails from "./Components/SuperAdmin/SupDetails";
import AddDepartment from "./Components/SuperAdmin/AddDepartment";
import AddInvestor from "./Components/SuperAdmin/AddInvestor";
import AssignDepartment from "./Components/SuperAdmin/AssignDepartment";
import AsToDep from "./Components/SuperAdmin/AsToDep";
import DelDep from "./Components/SuperAdmin/DelDep";
import DelInv from "./Components/SuperAdmin/DelInv";
import CreateService from "./Components/SuperAdmin/CreateService";
import Services from "./Components/SuperAdmin/Services";
import DetailService from "./Components/SuperAdmin/DetailService";
import EditService from "./Components/SuperAdmin/EditService";
import DelSer from "./Components/SuperAdmin/DelSer";
import DetailDepartments from "./Components/SuperAdmin/DetailDepartments";
import DetailInvestors from "./Components/SuperAdmin/DetailInvestors";
import EditDepartment from "./Components/SuperAdmin/EditDepartment";
import EditInvestor from "./Components/SuperAdmin/EditInvestor";
import AddClients from "./Components/SuperAdmin/AddClients";
import Clients from "./Components/SuperAdmin/Clients";
import DetailClient from "./Components/SuperAdmin/DetailClient";
import EditClient from "./Components/SuperAdmin/EditClient";
import DelCli from "./Components/SuperAdmin/DelCli";
import AddTest from "./Components/SuperAdmin/AddTest";
import Test from "./Components/SuperAdmin/Test";
import DetailTest from "./Components/SuperAdmin/DetailTest";
import EditTest from "./Components/SuperAdmin/EditTest";
import DelTest from "./Components/SuperAdmin/DelTest";
import DecReason from "./Components/SuperAdmin/DecReason";
import DashboardSup from "./Components/SuperAdmin/DashboardSup";
import Gallery from "./Components/SuperAdmin/Gallery";
import UpcomingEvents from "./Components/SuperAdmin/UpcomingEvents";
import BackgroundImage from "./Components/SuperAdmin/BackgroundImage";
import GalBack from "./Components/SuperAdmin/GalAndBackImage";
import AddEvents from "./Components/SuperAdmin/AddEvents";
import DetailEvent from "./Components/SuperAdmin/DetailEvent";
import EditEvent from "./Components/SuperAdmin/EditEvent";
import DelEvent from "./Components/SuperAdmin/DelEvent";
import UpdatePasswordSuper from "./Components/SuperAdmin/UpdatePasswordSuper";
import SettingSuper from './Components/SuperAdmin/SettingSuper'
import DelGallery from "./Components/SuperAdmin/DelGallery";
import LogDepartment from "./Components/Auth/LogDepartment";
import LogEmployee from "./Components/Auth/LogEmployee";
import LogInvestor from "./Components/Auth/LogInvestor";
import Home from "./Components/Home/Home";
import NotFound404 from "./Components/NotFound404";
import Contact from "./Components/Home/ContactUs/Contact";

function App() {
  const invAuthCtx = useContext(InvAuthContext);
  const depAuthCtx = useContext(DepAuthContext);
  const empAuthCtx = useContext(EmpAuthContext);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/department/"
          element={
            <>
              {depAuthCtx.isDepLoggedIn && <LayoutDep />}
              {!depAuthCtx.isDepLoggedIn && <LogDepartment />}
            </>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="allhistory" element={<Allhistory />} />
          <Route path="requests/:id" element={<DepDetails />} />
          <Route path="employee" element={<Employee />} />
          <Route path="employee/:empId" element={<EmpListDetails />} />
          <Route path="requests" element={<DepRequest />} />
          <Route path="escalated" element={<Escalated />} />
          <Route path="assign/:taskid" element={<AssignEmp />} />
          <Route path="addemployee" element={<AddEmployee />} />
          <Route path="assign/:taskid/:userid" element={<AsEmpTo />} />
          <Route path=":id/decline" element={<Decline />} />
          <Route path="delete/:userid" element={<DeleteEmp />} />
          <Route path="reports" element={<IncomReport />} />
          <Route path="viewreport/:name" element={<ViewReport />} />
          <Route path="viewreport/download/:name" element={<Folder />} />
          <Route path="viewreport/download" element={<Download />} />
          <Route path="setting" element={<SettingDep />} />
          <Route path="changepassword" element={<UpdatePassDep />} />
          <Route path="editprofile" element={<EditDepProfile />} />
        </Route>
        <Route>
          <Route
            path="/department/forgetpassword"
            element={<ForgetPassword />}
          />
          <Route
            path="/auth/department/passwordreset/:depId/:token"
            element={<ChangePassword />}
          />
        </Route>
        <Route
          path="/employee/"
          element={
            <>
              {empAuthCtx.isEmpLoggedIn && <LayoutEmp />}
              {!empAuthCtx.isEmpLoggedIn && <LogEmployee />}
            </>
          }
        >
          <Route path="task" element={<Tasks />} />
          <Route path="task/:id" element={<EmpDetails />} />
          <Route path="escalate/:id" element={<EscalateTask />} />
          <Route path="profile" element={<Profile />} />
          <Route path="decreason/:id" element={<DeclineReason />} />
          <Route path="request" element={<RequestInt />} />
          <Route path="setting" element={<Setting />} />
          <Route path="changepassword" element={<UpdatePassword />} />
          <Route path="editprofile" element={<EditUserProfile />} />
        </Route>
        <Route>
          <Route
            path="/empoyee/forgetpassword"
            element={<ForgetPasswordUser />}
          />
          <Route
            path="/auth/passwordreset/:userId/:token"
            element={<ChangePasswordUser />}
          />
        </Route>
        <Route
          path="/investor/"
          element={
            <>
              {invAuthCtx.isInvLoggedIn && <LayoutInv />}
              {!invAuthCtx.isInvLoggedIn && <LogInvestor />}
            </>
          }
        >
          <Route path="dashboard" element={<InvDashboard />} />
          <Route path="request" element={<Request />} />
          <Route path="myrequest" element={<MyRequests />} />
          <Route path="myrequest/:id" element={<InvDetails />} />
          <Route path="completed" element={<Completed />} />
          <Route path="report" element={<Report />} />
          <Route path=":id" element={<CompRequest />} />
          <Route path="decline" element={<DecRequest />} />
          <Route path="rating/:id" element={<Rating />} />
          <Route path="setting" element={<SettingInvestor />} />
          <Route path="changepassword" element={<UpdatePassInvestor />} />
          <Route path="editprofile" element={<EditInvProfile />} />
        </Route>
        <Route>
          <Route
            path="/investor/forgetpassword"
            element={<ForgetPasswordInvestor />}
          />
          <Route
            path="/auth/investor/passwordreset/:invId/:token"
            element={<ChangePasswordInvestor />}
          />
        </Route>
        <Route
          path="/superadmin/"
          element={
            <>
              {/* <LayoutSup /> */}
              {empAuthCtx.isEmpLoggedIn && <LayoutSup />}
              {!empAuthCtx.isEmpLoggedIn && <LogEmployee />}
            </>
          }
        >
          <Route path="departments" element={<Department />} />
          <Route path="investors" element={<Investor />} />
          <Route path="decline" element={<Declined />} />
          <Route path="decline/:id" element={<SupDetails />} />
          <Route path="adddepartment" element={<AddDepartment />} />
          <Route path="addinvestor" element={<AddInvestor />} />
          <Route path="assign/:taskid" element={<AssignDepartment />} />
          <Route path="assign/:taskid/:depid" element={<AsToDep />} />
          <Route path="department/delete/:userid" element={<DelDep />} />
          <Route path="investor/delete/:userid" element={<DelInv />} />
          <Route path="addservice" element={<CreateService />} />
          <Route path="services" element={<Services />} />
          <Route path="ser/details/:serid" element={<DetailService />} />
          <Route path="ser/edit/:serid" element={<EditService />} />
          <Route path="ser/delete/:serid" element={<DelSer />} />
          <Route path="dep/details/:depid" element={<DetailDepartments />} />
          <Route path="inv/details/:invid" element={<DetailInvestors />} />
          <Route path="dep/edit/:depid" element={<EditDepartment />} />
          <Route path="inv/edit/:invid" element={<EditInvestor />} />
          <Route path="addclient" element={<AddClients />} />
          <Route path="clients" element={<Clients />} />
          <Route path="cli/details/:cliid" element={<DetailClient />} />
          <Route path="cli/edit/:cliid" element={<EditClient />} />
          <Route path="client/delete/:cliid" element={<DelCli />} />
          <Route path="addtest" element={<AddTest />} />
          <Route path="tests" element={<Test />} />
          <Route path="test/details/:testid" element={<DetailTest />} />
          <Route path="test/edit/:testid" element={<EditTest />} />
          <Route path="test/delete/:testid" element={<DelTest />} />
          <Route path=":id/decline" element={<DecReason />} />
          <Route path="dashboard" element={<DashboardSup />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="backImage" element={<BackgroundImage />} />
          <Route path="addimage" element={<GalBack />} />
          <Route path="addevent" element={<AddEvents />} />
          <Route path="events" element={<UpcomingEvents />} />
          <Route path="eve/details/:eventid" element={<DetailEvent />} />
          <Route path="eve/edit/:eventid" element={<EditEvent />} />
          <Route path="event/delete/:eventid" element={<DelEvent />} />
          <Route path="setting" element={<SettingSuper />} />
          <Route path="changepassword" element={<UpdatePasswordSuper />} />
          <Route path="editprofile" element={<EditUserProfile />} />
          <Route path="gallery/delete/:galid" element={<DelGallery />} />
        </Route>
        <Route path="/loginDepartment" element={<LogDepartment />} />
        <Route path="/loginEmployee" element={<LogEmployee />} />
        <Route path="/loginInvestor" element={<LogInvestor />} />

        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </>
  );
}

export default App;
