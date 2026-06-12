import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HostelPortalHeader from "../components/HostelPortalHeader";

import API from "../services/api";

import "../styles/StudentVacationStatus.css";

function StudentVacationStatus() {
  const [vacations, setVacations] = useState([]);
  const [loading, setLoading] = useState(true);

  const student =
    JSON.parse(localStorage.getItem("student"));

  useEffect(() => {
    fetchVacationStatus();
  }, []);

  const fetchVacationStatus = async () => {
    try {
      const res = await API.get(
        `/vacation/student/${student.roll_no}`
      );

      setVacations(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="vacation-status-page">
      <Navbar showLogout />

      <HostelPortalHeader
        student={student}
      />

      <div className="vacation-status-container">
        <h2>Vacation Status</h2>

        {loading ? (
          <div className="loading">
            Loading...
          </div>
        ) : vacations.length === 0 ? (
          <div className="empty-card">
            No vacation applications found.
          </div>
        ) : (
          <div className="vacation-grid">
            {vacations.map((vacation, index) => (
              <div
                key={index}
                className="vacation-card"
              >
                <div className="card-header">
                  <h3>
                    Application #{index + 1}
                  </h3>

                  <span
                    className={`status-badge ${
                      vacation.status?.toLowerCase()
                    }`}
                  >
                    {vacation.status || "Pending"}
                  </span>
                </div>

                <div className="card-body">
                  <p>
                    <strong>From:</strong>{" "}
                    {vacation.from_date}
                  </p>

                  <p>
                    <strong>To:</strong>{" "}
                    {vacation.to_date}
                  </p>

                  <p>
                    <strong>Destination:</strong>{" "}
                    {vacation.destination}
                  </p>

                  <p>
                    <strong>Reason:</strong>{" "}
                    {vacation.reason}
                  </p>

                  {vacation.status === "Denied" &&
                    vacation.denial_reason && (
                      <div className="deny-box">
                        <strong>
                          Denial Reason:
                        </strong>
                        <p>
                          {
                            vacation.denial_reason
                          }
                        </p>
                      </div>
                    )}

                  {vacation.status ===
                    "Approved" && (
                    <div className="approve-box">
                      Vacation Approved
                    </div>
                  )}

                  {(!vacation.status ||
                    vacation.status ===
                      "Pending") && (
                    <div className="pending-box">
                      Waiting For Approval
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default StudentVacationStatus;