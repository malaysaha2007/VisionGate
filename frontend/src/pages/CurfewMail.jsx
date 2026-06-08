import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import {
  FaSyncAlt,
  FaEnvelope
} from "react-icons/fa";

import API from "../services/api";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AdminPortalHeader from "../components/AdminPortalHeader";

import "../styles/AdminDashboard.css";
import "../styles/CurfewMail.css";

function CurfewMail() {
  const navigate = useNavigate();
  const location = useLocation();

  const admin = location.state?.admin;

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMailPopup, setShowMailPopup] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [mailResult, setMailResult] = useState(null);

  const fetchStudents = async () => {
    setLoading(true); 
    try {
      const response = await API.get("/curfew-mail");
      setStudents(response.data.students || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSendMail = async () => {
    try {
      if (selectedStudents.length === 0) {
        alert("Please select at least one student.");
        return;
      }

      const response = await API.post("/curfew-mail/send", {
        emails: selectedStudents
      });

      setMailResult(response.data);
      setShowMailPopup(false);
    } catch (error) {
      console.error(error);
      alert("Failed to send mails");
    }
  };

  return (
    <>
      <Navbar
        admin={admin}
        showActivityLogs={true}
        showLogout={true}
      />

      <AdminPortalHeader />

      {/* ACTIONS */}
      <div className="curfew-actions">
        <button
          className="refresh-btn"
          onClick={fetchStudents}
        >
          <FaSyncAlt />
          Refresh
        </button>

        <button
          className="send-mail-btn"
          onClick={() => setShowMailPopup(true)}
        >
          <FaEnvelope />
          Send Mail
        </button>
      </div>

      {/* TABLE */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Roll</th>
              <th>Email</th>
              <th>Hostel</th>
              <th>Room</th>
              <th>Purpose</th>
              <th>Out Time</th>
              <th>In Time</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8" className="empty-row" style={{ padding: "30px", textAlign: "center" }}>
                  Loading...
                </td>
              </tr>
            ) : students.length === 0 ? (
              <tr>
                <td colSpan="8" className="empty-row" style={{ padding: "30px", textAlign: "center" }}>
                  No Students Outside
                </td>
              </tr>
            ) : (
              students.map((student, index) => (
                <tr key={index}>
                  <td>{student.name}</td>
                  <td>{student.roll}</td>
                  <td>{student.email}</td>
                  <td>{student.hostel}</td>
                  <td>{student.room}</td>
                  <td>{student.purpose}</td>
                  <td>{student.outTime}</td>
                  <td>{student.inTime}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* SEND MAIL POPUP */}
      {showMailPopup && (
        <div className="mail-popup-overlay">
          <div className="mail-popup">
            <div className="mail-popup-header">
              <button
                className="cancel-btn"
                onClick={() => setShowMailPopup(false)}
              >
                Cancel
              </button>

              <h2>Select Students</h2>

              <button
                className="send-selected-btn"
                onClick={handleSendMail}
              >
                Send Selected Students
              </button>
            </div>

            <div className="student-list">
              <table className="mail-table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Roll</th>
                    <th>Email</th>
                    <th>Hostel</th>
                    <th>Room</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.roll}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedStudents.includes(student.email)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedStudents([
                                ...selectedStudents,
                                student.email
                              ]);
                            } else {
                              setSelectedStudents(
                                selectedStudents.filter(
                                  (email) => email !== student.email
                                )
                              );
                            }
                          }}
                        />
                      </td>
                      <td>{student.name}</td>
                      <td>{student.roll}</td>
                      <td>{student.email}</td>
                      <td>{student.hostel}</td>
                      <td>{student.room}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* RESULTS POPUP */}
      {mailResult && (
        <div className="mail-popup-overlay">
          <div className="mail-result-popup">
            <h2>Mail Sending Report</h2>

            <div className="success-section">
              <h3>Mail Sent Successfully</h3>
              {mailResult.sent?.length > 0 ? (
                mailResult.sent.map((email, index) => (
                  <p key={index}>✓ {email}</p>
                ))
              ) : (
                <p>No successful mails</p>
              )}
            </div>

            <div className="failed-section">
              <h3>Mail Not Sent</h3>
              {mailResult.failed?.length > 0 ? (
                mailResult.failed.map((email, index) => (
                  <p key={index}>✗ {email}</p>
                ))
              ) : (
                <p>No failed mails</p>
              )}
            </div>

            <button
              className="close-result-btn"
              onClick={() => setMailResult(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default CurfewMail;