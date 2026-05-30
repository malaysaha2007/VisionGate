import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import StudentLogin from "./pages/StudentLogin";
import StudentProfile from "./pages/StudentProfile";
import Rules from "./pages/Rules";
import Contact from "./pages/Contact";
import HostelLogin from "./pages/HostelLogin";
import HostelDashboard from "./pages/HostelDashboard";
import HostelStudents from "./pages/HostelStudents";
import StudentStatusPage from "./pages/StudentStatusPage";
import AddStudents from "./pages/AddStudents";
import EditStudent from "./pages/EditStudent";
import StudentSignup from "./pages/StudentSignup";
import FaceRegistration from "./pages/FaceRegistration";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ActivityLogs from "./pages/ActivityLogs";
import CurfewMail from "./pages/CurfewMail";


function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/studentLogin" element={<StudentLogin />} />

        <Route
  path="/student-signup"
  element={<StudentSignup />}
/>


<Route
  path="/face-registration"
  element={<FaceRegistration />}
/>


        <Route
  path="/StudentProfile"
  element={<StudentProfile />}
/>



        <Route path="/HostelLogin" element={<HostelLogin />} />
        <Route
  path="/HostelDashboard"
  element={<HostelDashboard />}
/>

<Route
  path="/HostelStudents"
  element={<HostelStudents />}
/>

<Route path="/student-status/:type" element={<StudentStatusPage />} />


<Route
  path="/add-students"
  element={<AddStudents />}
/>

<Route
  path="/edit-student"
  element={<EditStudent />}
/>


<Route
  path="/AdminLogin"
  element={<AdminLogin />}
/>

<Route
  path="/admin-dashboard"
  element={<AdminDashboard />}
/>

<Route
  path="/activity-logs"
  element={<ActivityLogs />}
/>

<Route
  path="/curfew-mail"
  element={<CurfewMail />}
/>

        
        <Route path="/rules" element={<Rules />} />

        <Route path="/contact" element={<Contact />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;