import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { FaEnvelope } from "react-icons/fa";

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
  const [refreshing, setRefreshing] = useState(false);
  const [showMailPopup, setShowMailPopup] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [mailResult, setMailResult] = useState(null);

  const fetchStudents = async () => {
    try {
      setLoading(true);

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
      setSelectedStudents([]);
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

      <AdminPortalHeader admin={admin} />
      <div
        className={`admin-dashboard-page ${
          refreshing ? "page-refresh" : ""
        }`}
      >

      
      {/* ACTIONS */}
      {/* HERO MAIL ACTION */}

      <div className="mail-hero">

        <div className="mail-hero-icon">
          <FaEnvelope />
        </div>

        <h2>
          Send Mail to Students
        </h2>

        <p>
          Notify students who are outside after curfew time.
        </p>

        <button
          className="mail-hero-btn"
          onClick={() => {
            setMailResult(null);
            setShowMailPopup(true);
            setSelectedStudents([]);
          }}
        >
          <FaEnvelope />
          <span>Send Mail</span>
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

              <div className="mail-popup-top">

                <div>

                  <h2>
                    📧 Send Curfew Alert
                  </h2>

                  <p>
                    Select the students who should receive a
                    curfew notification email.
                  </p>

                </div>

                <div className="mail-counter">

                  <h1>{selectedStudents.length}</h1>

                  <span>
                    Selected
                  </span>

                </div>

              </div>

              <div className="mail-actions">

                <button
                  className="cancel-btn"
                  onClick={() =>
                    setShowMailPopup(false)
                  }
                >
                  Cancel
                </button>

                <button
                  className="send-selected-btn"
                  onClick={handleSendMail}
                >

                  <FaEnvelope />

                  Send {selectedStudents.length} Mail
                  {selectedStudents.length !== 1 && "s"}

                </button>

              </div>

            </div>

            <div className="student-list">

              <div className="popup-search">

                <input
                  type="text"
                  placeholder="Search students..."
                  className="popup-search-box"
                />

              </div>
              {
                selectedStudents.length>0 && (

                <div className="selection-info">

                ✓ {selectedStudents.length} student
                {selectedStudents.length!==1 && "s"} selected

                </div>

                )
              }
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
                      <td>
                        <div className="student-name">
                          <div className="student-avatar">
                            {student.name.charAt(0)}
                          </div>
                          {student.name}
                        </div>
                      </td>
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
      {mailResult &&
        (mailResult.sent?.length > 0 ||
          mailResult.failed?.length > 0) && (
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
                  onClick={() => {
                    setMailResult(null);
                    setSelectedStudents([]);
                  }}
                >
                  Close
                </button>
              </div>
            </div>
      )}

      </div>
      <Footer />
    </>
  );
}

export default CurfewMail;