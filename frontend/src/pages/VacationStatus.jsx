import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

import "../styles/VacationStatus.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StudentPortalHeader from "../components/StudentPortalHeader";

import {
  FaUser,
  FaIdCard,
  FaBriefcase,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaUmbrellaBeach,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaChevronDown,
  FaChevronRight,
  FaPlaneDeparture,
  FaHome,
  FaUniversity,
  FaStickyNote,
  FaPlay
} from "react-icons/fa";


function VacationStatus() {
  const navigate = useNavigate();
  const rollNo = localStorage.getItem("roll_no");

  const [student, setStudent] = useState(null);
  const [vacations, setVacations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
      const studentRes = await API.get(
  `/student/profile/${rollNo}`
);

setStudent(studentRes.data.student || null);

const vacationRes = await API.get(
  `/vacation/student/${rollNo}`
);

setVacations(
  (vacationRes.data || []).reverse()
);
      } catch (error) {
        console.error("Error fetching vacation data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (rollNo) {
      fetchData();
    }
  }, [rollNo]);
return (
  <div className="vacation-status-page">
    <Navbar showLogout={true} />

    {student && (
      <StudentPortalHeader
        student={student}
        logs={vacations}
        showVacationButtons={false}
      />
    )}

    <div className="vacation-container">

      <div className="vacation-hero">

<div className="hero-left">

<div className="hero-icon">
{/* 
<FaUmbrellaBeach /> */}
<img src="../public/vacation-status-icon.svg"/>
</div>

<div>

<h1>Vacation Status</h1>

<p>
Track all your vacation requests and approval status.
</p>

</div>

</div>
      <div className="button-area">
        <button
          onClick={() => navigate(-1)}
          className="back-btn"
        >
          ← Back
        </button>
  </div>
{/* <div className="hero-image">

<img
src="/vacation-banner.png"
alt="Vacation"
/>

</div> */}

</div>

      {/* Student Info Cards */}
      <div className="student-info-grid">

<div className="glass-card user">

<div className="glass-icon user">

<FaUser />

</div>

<div>

<span>Student Name</span>

<h3>{student?.name}</h3>

</div>

</div>

<div className="glass-card roll">

<div className="glass-icon roll">

<FaIdCard />

</div>

<div>

<span>Roll Number</span>

<h3>{student?.roll || rollNo}</h3>

</div>

</div>

</div>



      {/* Summary Cards */}

  <div className="summary-grid">

<div className="summary-card total">

<div className="summary-icon briefcase">

<FaBriefcase />

</div>

<div>

<h2>{vacations.length}</h2>

<p>Total Requests</p>

</div>

</div>

<div className="summary-card pending">

<div className="summary-icon clock">

<FaClock />

</div>

<div>

<h2>

{
vacations.filter(
v =>
v.hostel_status === "Pending" ||
v.gate_status === "Pending"
).length
}

</h2>

<p>Pending</p>

</div>

</div>

<div className="summary-card approved">

<div className="summary-icon check">

<FaCheckCircle />

</div>

<div>

<h2>

{
vacations.filter(
v =>
v.hostel_status === "Approved" &&
v.gate_status === "Approved"
).length
}

</h2>
<p>Approved</p>

</div>

</div>

<div className="summary-card rejected">

<div className="summary-icon reject">

<FaTimesCircle />

</div>

<div>

<h2>

{
vacations.filter(
v =>
v.hostel_status === "Denied" ||
v.gate_status === "Denied"
).length
}

</h2>

<p>Rejected</p>

</div>

</div>

</div>


      {/* Table */}

<div className="vacation-list">

  <div className="vacation-table-header">
    <span>Destination</span>
    <span>Leave Date</span>
    <span>Return Date</span>
  </div>

  {loading ? (
    <div className="empty-state">
      Loading requests...
    </div>
  ) : vacations.length === 0 ? (
    <div className="empty-state">
      No vacation requests found.
    </div>
  ) : (
    vacations.map((vac, index) => {
      const isOpen = openIndex === index;

return (

<div
key={index}
className={`vacation-item ${isOpen ? "open" : ""}`}
>

<div
className="vacation-row"
onClick={() => setOpenIndex(isOpen ? null : index)}
>

<div className="destination">

{ isOpen ? "" : <FaPlay className="play-icon"/>}
<FaMapMarkerAlt className="row-icon"/>

<span>{vac.destination || "-"}</span>

</div>

<div className="date-box">

<FaCalendarAlt/>

<span>
{vac.leave_date || vac.leaveDate || "-"}
</span>

</div>

<div className="date-box">

<FaCalendarAlt/>

<span>
{vac.return_date || vac.returnDate || "-"}
</span>

</div>

<div className="expand-icon">

{
isOpen ?

<FaChevronDown/>

:

<FaChevronRight/>

}

</div>

</div>

{
isOpen && (

<div className="vacation-details">

<div className="submitted-date">

Submitted on

<strong>

{vac.created_at || "-"}

</strong>

</div>

<div className="details-cards">

<div className="detail-card">

<div className="detail-icon reason-icon">

<FaStickyNote/>

</div>

<div>

<h4>{vac.reason || "-"}</h4>

<p>Reason</p>

</div>

</div>

<div className="detail-card">

<div className="detail-icon time-icon">

<FaClock/>

</div>

<div>

<h4>

{vac.leave_campus_time || "-"}

</h4>

<p>Campus Leaving Time</p>

</div>

</div>

</div>

<div className="status-cards">

<div className="status-card hostel">

<div className="status-icon hoste-icon">

<FaHome/>

</div>

<div>

<h3>

{vac.hostel_status || "Pending"}

</h3>

<p>Hostel Status</p>

</div>

</div>

<div className="status-card gate">

<div className="status-icon gate-icon">

<FaUniversity/>

</div>

<div>

<h3>

{vac.gate_status || "Not Requested"}

</h3>

<p>Gate Status</p>

</div>

</div>

<div className="status-card vacation-status">

<div className="status-icon vacation-status-icon">

<FaPlaneDeparture/>

</div>

<div>

<h3>

{(vac.vacation_status || "NOT_STARTED")
.replaceAll("_"," ")
.toLowerCase()
.replace(/\b\w/g,c=>c.toUpperCase())}

</h3>

<p>Vacation Status</p>

</div>

</div>

</div>

</div>

)

}

</div>

);

})
  )}

</div>

    </div>

    <Footer />
  </div>
);
}

export default VacationStatus;