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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get(`/student/profile/${rollNo}`); 
        setStudent(res.data.student || null);
        
        const allLogs = res.data.logs || [];
        const vacationRequests = allLogs.filter(
          (log) => log.purpose === "Vacation" || log.purpose === "Leave"
        );
        
        setVacations(vacationRequests);
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

      <div className="vacation-unique-container">
        <h2 className="page-title">Vacation Status</h2>
        
        <div className="student-info-row">
          <div className="info-box">
            <span className="info-label">Name :</span> {student?.name || "Loading..."}
          </div>
          <div className="info-box">
            <span className="info-label">Roll No :</span> {student?.roll || rollNo}
          </div>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Destination</th>
                <th>Reason</th>
                <th>Leave Date</th>
                <th>Return Date</th>
                <th>Status</th>
                <th>Denial Reason</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6">Loading requests...</td>
                </tr>
              ) : vacations.length === 0 ? (
                <tr>
                  <td colSpan="6">No vacation requests found.</td>
                </tr>
              ) : (
                vacations.map((vac, index) => (
                  <tr key={index}>
                    <td>{vac.destination || "-"}</td>
                    <td>{vac.reason || vac.purpose || "-"}</td>
                    <td>{vac.leaveDate || vac.outTime || "-"}</td>
                    <td>{vac.returnDate || vac.inTime || "-"}</td>
                    <td>
                      <span className={`status-badge ${vac.status?.toLowerCase() || 'pending'}`}>
                        {vac.status || "Pending"}
                      </span>
                    </td>
                    <td>{vac.denialReason || "-"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <button onClick={() => navigate(-1)} className="back-btn">
          ← Back
        </button>
      </div>

      <Footer />
    </div>
  );
}

export default VacationStatus;