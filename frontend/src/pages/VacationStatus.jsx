import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

import "../styles/VacationStatus.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StudentPortalHeader from "../components/StudentPortalHeader";

function VacationStatus() {
  const navigate = useNavigate();
  const rollNo = localStorage.getItem("roll_no");

  const [student, setStudent] = useState(null);
  const [vacations, setVacations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState(null);


      const getVacationStatusClass = (vac) => {
  // Denied
  if (
    vac.hostel_status === "Denied" ||
    vac.gate_status === "Denied"
  ) {
    return "denied";
  }

  // Active (Student is currently on vacation)
  if (vac.vacation_status === "ACTIVE") {
    return "active";
  }

  // Completed
  if (vac.vacation_status === "COMPLETED") {
    return "completed";
  }

  // Pending
  return "pending";
};

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

      <div className="vacation-header">
  <h1>Vacation Status</h1>
</div>

      {/* Student Info Cards */}
      <div className="student-info-grid">
  <div className="glass-card">
    <span>Name</span>
    <h3>{student?.name}</h3>
  </div>

  <div className="glass-card">
    <span>Roll Number</span>
    <h3>{student?.roll || rollNo}</h3>
  </div>
</div>



      {/* Summary Cards */}

  <div className="summary-grid">

  <div className="summary-card">
    <h2>{vacations.length}</h2>
    <p>Total Requests</p>
  </div>

  <div className="summary-card pending">
    <h2>
      {
        vacations.filter(
          (v) =>
               v.hostel_status === "Pending" ||
            v.gate_status === "Pending"
        ).length
      }
    </h2>
    <p>Pending</p>
  </div>

  <div className="summary-card approved">
    <h2>
      {
        vacations.filter(
          (v) =>
            v.hostel_status === "Approved" &&
            v.gate_status === "Approved"
        ).length
      }
    </h2>
    <p>Approved</p>
  </div>

  <div className="summary-card rejected">
    <h2>
      {
        vacations.filter(
          (v) =>
            v.hostel_status === "Denied" ||
            v.gate_status === "Denied"
        ).length
      }
    </h2>
    <p>Rejected</p>
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
  className={`vacation-item ${getVacationStatusClass(vac)} ${isOpen ? "open" : ""}`}
>
          <div
            className="vacation-row"
            onClick={() =>
              setOpenIndex(isOpen ? null : index)
            }
          >
            <span>
              {isOpen ? "▼" : "▶"}{" "}
              {vac.destination || "-"}
            </span>

            <span>
              {vac.leave_date ||
                vac.leaveDate ||
                "-"}
            </span>

            <span>
              {vac.return_date ||
                vac.returnDate ||
                "-"}
            </span>
          </div>

 {isOpen && (
  <div className="vacation-details">

    <div className="submitted-date">
      Submitted on: {vac.created_at || "-"}
    </div>

    <div className="details-cards">

      <div className="mini-status-card">
        <div className="status-value">
          {vac.reason || "-"}
        </div>

        <div className="status-label">
          📝 Reason
        </div>
      </div>

      <div className="mini-status-card">
        <div className="status-value">
          {vac.leave_campus_time || "-"}
        </div>

        <div className="status-label">
          🕒 Campus Leaving Time
        </div>
      </div>

    </div>

    <div className="status-cards">

      <div className="mini-status-card hostel">
        <div className="status-value">
          {vac.hostel_status || "Pending"}
        </div>

        <div className="status-label">
          𖠿 Hostel Status
        </div>
      </div>

      <div className="mini-status-card gate">
        <div className="status-value">
          {vac.gate_status || "Not Requested"}
        </div>

        <div className="status-label">
          🏛️ Gate Status
        </div>
      </div>

 <div className="mini-status-card vacation">
  <div className="status-value">
    {(vac.vacation_status || "NOT_STARTED")
      .replaceAll("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, c => c.toUpperCase())}
  </div>

  <div className="status-label">
    ✈ Vacation Status
  </div>
</div>

    </div>

  </div>
)}
        </div>
      );
    })
  )}

</div>

      <div className="button-area">
        <button
          onClick={() => navigate(-1)}
          className="back-btn"
        >
          ← Back
        </button>
      </div>

    </div>

    <Footer />
  </div>
);
}

export default VacationStatus;