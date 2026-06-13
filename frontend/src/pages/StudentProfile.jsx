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

  // State to control open/close toggles
  const [isMovementOpen, setIsMovementOpen] = useState(true);
  const [isVacationOpen, setIsVacationOpen] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get(`/student/profile/${rollNo}`);
        console.log("PROFILE RESPONSE:", res.data);

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

  // Split logs into Movement and Vacation
  const vacationLogs = logs.filter(
    (log) => log.purpose === "Vacation" || log.purpose === "Leave"
  );
  
  const movementLogs = logs.filter(
    (log) => log.purpose !== "Vacation" && log.purpose !== "Leave"
  );

  // --- MOVEMENT ROW RENDERER ---
  const renderMovementRows = (logData) => {
    if (logData.length === 0) {
      return (
        <tr>
          <td colSpan="4">No records found.</td>
        </tr>
      );
    }

    return [...logData]
      .sort((a, b) => {
        const aTime = new Date(a.outTime || a.inTime || 0);
        const bTime = new Date(b.outTime || b.inTime || 0);
        return bTime - aTime;
      })
      .map((log, index) => {
        const date = log.outTime
          ? log.outTime.split(" ")[0]
          : log.inTime
          ? log.inTime.split(" ")[0]
          : "-";

        const outTime = log.outTime ? log.outTime.split(" ")[1] : "-";
        const inTime = log.inTime ? log.inTime.split(" ")[1] : "-";

        return (
          <tr key={index}>
            <td>{date}</td>
            <td>{log.purpose}</td>
            <td>{outTime}</td>
            <td>{inTime}</td>
          </tr>
        );
      });
  };

  // --- VACATION ROW RENDERER ---
  const renderVacationRows = (logData) => {
    if (logData.length === 0) {
      return (
        <tr>
          <td colSpan="4">No records found.</td>
        </tr>
      );
    }

    return [...logData]
      .sort((a, b) => {
        const aTime = new Date(a.leaveDate || a.outTime || 0);
        const bTime = new Date(b.leaveDate || b.outTime || 0);
        return bTime - aTime;
      })
      .map((log, index) => {
        // Fallbacks included just in case your backend uses different variable names
        const destination = log.destination || "-";
        const reason = log.reason || log.purpose || "-";
        const leaveDate = log.leaveDate || log.outTime || "-";
        const returnDate = log.returnDate || log.inTime || "-";

        return (
          <tr key={index}>
            <td>{destination}</td>
            <td>{reason}</td>
            <td>{leaveDate}</td>
            <td>{returnDate}</td>
          </tr>
        );
      });
  };

  return (
    <div className="student-profile-page">
      <Navbar showLogout={true} />
      <StudentPortalHeader student={student} logs={logs} />

      <div className="profile-container">
        <h2 className="details-title">Student Details</h2>

        <div className="student-profile-grid">
          <p><strong>Name :</strong> {student.name}</p>
          <p><strong>Roll No :</strong> {student.roll}</p>
          <p><strong>Branch :</strong> {student.branch}</p>
          <p><strong>Hostel :</strong> {student.hostel}</p>
          <p><strong>Room :</strong> {student.room}</p>
          <p><strong>Student Contact :</strong> {student.contact?.student_no}</p>
          <p><strong>Parent Contact :</strong> {student.contact?.parent_no}</p>
          <p><strong>Email :</strong> {student.contact?.email}</p>
        </div>

        {/* --- MOVEMENT LOG SECTION --- */}
        <div 
          className="collapsible-header" 
          onClick={() => setIsMovementOpen(!isMovementOpen)}
        >
          <h2 className="table-title">Movement Log</h2>
          <span className="toggle-icon">{isMovementOpen ? "▲" : "▼"}</span>
        </div>

        {isMovementOpen && (
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
        )}

        {/* --- VACATION LOG SECTION --- */}
        <div 
          className="collapsible-header" 
          onClick={() => setIsVacationOpen(!isVacationOpen)}
        >
          <h2 className="table-title">Vacation Log</h2>
          <span className="toggle-icon">{isVacationOpen ? "▲" : "▼"}</span>
        </div>

        {isVacationOpen && (
          <table>
            <thead>
              <tr>
                <th>Destination</th>
                <th>Reason</th>
                <th>Leave Date</th>
                <th>Return Date</th>
              </tr>
            </thead>
            <tbody>{renderVacationRows(vacationLogs)}</tbody>
          </table>
        )}

      </div>
      <Footer />
    </div>
  );
}

export default StudentProfile;