import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/StudentProfile.css";

import API from "../services/api";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import StudentPortalHeader from "../components/StudentPortalHeader";

function StudentProfile() {
  const navigate = useNavigate();
  const rollNo = localStorage.getItem("roll_no");

  const [student, setStudent] = useState(null);
  const [logs, setLogs] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

const logsPerPage = 20;

  // State to control open/close toggles
  const [isMovementOpen, setIsMovementOpen] = useState(true);

  // Search states
  const [searchTerm, setSearchTerm] = useState("");
  const [searchDate, setSearchDate] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get(`/student/profile/${rollNo}`);
        setStudent(res.data.student || null);
        setLogs(res.data.logs || []);
      } catch (error) {
        console.error(error);
      }
    };

    if (rollNo) {
      fetchProfile();
    }
  }, [rollNo]);

  if (!rollNo) {
    return (
      <div className="student-profile-page">
        <h2>No Student Data Found</h2>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="student-profile-page">
        <h2>Loading...</h2>
      </div>
    );
  }

  // Filter Logic
  const movementLogs = logs.filter((log) => {
    if (log.purpose === "Vacation" || log.purpose === "Leave") return false;

    const matchesTerm =
      searchTerm === "" ||
      (log.purpose && log.purpose.toLowerCase().includes(searchTerm.toLowerCase()));

    let logDate = "";
    if (log.outTime) logDate = log.outTime.split(" ")[0];
    else if (log.inTime) logDate = log.inTime.split(" ")[0];

    const matchesDate = searchDate === "" || logDate === searchDate;

    return matchesTerm && matchesDate;
  });

  const renderMovementRows = (logData) => {
    if (logData.length === 0) {
      return (
        <tr>
          <td colSpan="4">No records found matching your search.</td>
        </tr>
      );
    }

return logData.map((log, index) => {

  const date = log.outTime
    ? log.outTime.split(" ")[0]
    : log.inTime
    ? log.inTime.split(" ")[0]
    : "-";

  const outTime = log.outTime
    ? log.outTime.split(" ")[1]
    : "-";

  const inTime = log.inTime
    ? log.inTime.split(" ")[1]
    : "-";

  return (
    <tr key={index}>
      <td>{date}</td>
      <td>
  <span className={`purpose-badge ${getPurposeClass(log.purpose)}`}>
    {log.purpose}
  </span>
</td>
      <td>{outTime}</td>
      <td>{inTime}</td>
    </tr>
  );
});
    
  
  };

  return (
    <div className="student-profile-page">
      <Navbar showLogout={true} />
      <StudentPortalHeader student={student} logs={logs} />
<div className="profile-container">

  {/* ================= HERO PROFILE CARD ================= */}
  <div className="student-profile-hero">

    <div className="hero-left">

      <img
        src={
          student.face_images?.length
            ? student.face_images[0]
            : "/default-avatar.png"
        }
        alt="Student"
        className="hero-profile-image"
      />

    </div>

    <div className="hero-right">

      <h1>{student.name}</h1>

      <p className="hero-roll">
        {student.roll}
      </p>

      <p className="hero-course">
        {student.branch} • {student.hostel}
      </p>

     <div
  className={`hero-status ${
    isInside ? "status-inside" : "status-outside"
  }`}
>
  {statusText}

</div>

    </div>


    

  </div>

  {/* ================= STUDENT DETAILS ================= */}
<div className="student-profile-grid">



 
  <div className="profile-info-card">
    <span className="info-label">Room No.</span>
    <span className="info-value">{student.room}</span>
  </div>

  <div className="profile-info-card">
    <span className="info-label">Student Contact</span>
    <span className="info-value">{student.contact?.student_no}</span>
  </div>

  <div className="profile-info-card">
    <span className="info-label">Parent Contact</span>
    <span className="info-value">{student.contact?.parent_no}</span>
  </div>

  <div className="profile-info-card">
    <span className="info-label">Email</span>
    <span className="info-value">{student.contact?.email}</span>
  </div>

</div>

        {/* --- MOVEMENT LOG HEADER --- */}
        <div 
          className="collapsible-header" 
          onClick={() => setIsMovementOpen(!isMovementOpen)}
        >
          <h2 className="table-title">Movement Log</h2>
          <span className="toggle-icon">{isMovementOpen ? "▲" : "▼"}</span>
        </div>

        {isMovementOpen && (
          <div className="movement-log-wrapper">
            
            {/* --- SEARCH BAR --- */}
            <div className="search-bar-container">
              <input
                type="text"
                placeholder="Search purpose (e.g., Tea Break)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <input
                type="date"
                value={searchDate}
                onChange={(e) => setSearchDate(e.target.value)}
                className="search-date"
                title="Filter by Date"
              />
              {(searchTerm || searchDate) && (
                <button
                  className="clear-search-btn"
                  onClick={() => {
                    setSearchTerm("");
                    setSearchDate("");
                  }}
                >
                  Clear
                </button>
              )}
            </div>

            {/* --- TABLE --- */}
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Purpose</th>
                  <th>Out Time</th>
                  <th>In Time</th>
                </tr>
              </thead>
              <tbody>{renderMovementRows(movementLogs)}</tbody>
            </table>
          </div>
        )}

        

    {isMovementOpen && (
  <>
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Purpose</th>
          <th>Out Time</th>
          <th>In Time</th>
        </tr>
      </thead>

      <tbody>




      
        {renderMovementRows(currentLogs)}
      </tbody>
    </table>

    <div className="pagination">

      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        Previous
      </button>

      <span>
        Page {currentPage} of {totalPages}
      </span>

      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        Next
      </button>

    </div>

  </>
)}


    

   

        
      </div>
      <Footer />
    </div>
  );
}

export default StudentProfile;