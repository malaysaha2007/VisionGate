import { useLocation, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HostelPortalHeader from "../components/HostelPortalHeader";
import API from "../services/api";
import "../styles/HostelStudents.css";
import { FaSyncAlt, FaFileCsv } from "react-icons/fa";

function HostelStudents() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user;

  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (user) {
      fetchStudents();
    }
  }, []);

  const fetchStudents = async () => {
    setRefreshing(true);
    try {
      const response = await API.get(`/hostel/students/${user.hostel}`);
      setStudents(response.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setRefreshing(false);
      }, 300);
    }
  };

  const exportCSV = () => {
    if (filteredStudents.length === 0) {
      alert("No students to export");
      return;
    }

    const headers = ["Name", "Roll Number", "Room", "Status"];
    const rows = filteredStudents.map((student) => [
      student.name || "",
      student.roll_no || "",
      student.room || "",
      student.status || "",
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${user.hostel}_students.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  if (!user) {
    return <h2>No Hostel Staff Data Found</h2>;
  }

  /* =========================
     SEARCH FILTER
  ========================= */
  const filteredStudents = students.filter((student) => {
    const searchText = search.toLowerCase();
    return (
      student.name?.toLowerCase().includes(searchText) ||
      student.roll_no?.toLowerCase().includes(searchText) ||
      student.room?.toLowerCase().includes(searchText)
    );
  });

  /* =========================
     COUNTS
  ========================= */
  const totalStudents = students.length;
  const outsideStudents = students.filter((s) => s.status === "OUT");
  const outsideCount = outsideStudents.length;
  const curfewStudents = outsideStudents.filter((s) => s.afterCurfew === true);
  const curfewCount = curfewStudents.length;
  const leaveStudents = outsideStudents.filter(
    (s) =>
      s.purpose === "Hospital" ||
      s.purpose === "Medical" ||
      s.purpose === "Leave" ||
      s.purpose === "Special Leave"
  );
  const leaveCount = leaveStudents.length;

  return (
    <div className={`hostel-students-page ${refreshing ? "page-refresh" : ""}`}>
      {/* NAVBAR */}
      <Navbar showLogout={true} />
      <HostelPortalHeader />

      {/* =========================
          STATS CARDS
      ========================= */}
      <div className="stats-grid">
        {/* CARD 1 */}
        <div
          className="stat-card clickable-card"
          onClick={() =>
            navigate("/student-status/outside", {
              state: {
                title: "Students Outside Campus",
                students: outsideStudents,
                hostel: user.hostel,
              },
            })
          }
        >
          <p>Students Outside Campus</p>
          <h2>{outsideCount}</h2>
          <span className="card-sub">View Full Details</span>
        </div>

        {/* CARD 2 */}
        <div
          className="stat-card clickable-card danger-card"
          onClick={() =>
            navigate("/student-status/curfew", {
              state: {
                title: "Outside After Curfew",
                students: curfewStudents,
                hostel: user.hostel,
              },
            })
          }
        >
          <p>Outside After Curfew</p>
          <h2>{curfewCount}</h2>
          <span className="card-sub">View Full Details</span>
        </div>

        {/* CARD 3 */}
        <div
          className="stat-card clickable-card special-card"
          onClick={() =>
            navigate("/student-status/leave", {
              state: {
                title: "Leave / Special Purpose",
                students: leaveStudents,
                hostel: user.hostel,
              },
            })
          }
        >
          <p>Leave / Special Purpose</p>
          <h2>{leaveCount}</h2>
          <span className="card-sub">Hospital / Medical / Leave</span>
        </div>

        {/* CARD 4 */}
        <div
          className="stat-card clickable-card special-card"
          onClick={() =>
            navigate("/student-status/vacation", {
              state: {
                title: "Vacation Applications",
                students: leaveStudents,
                hostel: user.hostel,
              },
            })
          }
        >
          <p>Vacation Applications</p>
          <h2>{leaveCount}</h2>
          <span className="card-sub">View all Vacation Applications</span>
        </div>
      </div>

      {/* STATUS */}
      <div className="monitoring-box">
        <div className="monitoring-badge">
          <span className="dot"></span>
          Hostel Monitoring Active
        </div>
      </div>

      {/* MAIN */}
      <div className="container">
        <h1 className="page-title">Students – {user.hostel}</h1>
        <div className="card">
          {/* TOP ACTIONS */}
          <div className="top-actions">
            {(user.role === "Warden" || user.role === "Caretaker") && (
              <Link to="/add-students" className="add-btn">
                + Add Student
              </Link>
            )}
          </div>

          {/* SEARCH */}
          <div className="search-row">
            <input
              type="text"
              placeholder="Search by Name, Roll Number or Room..."
              className="search-box"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="action-buttons">
              <button
                onClick={fetchStudents}
                title="Refresh"
                className="icon-btn"
              >
                <FaSyncAlt />
              </button>
              <button
                className="icon-btn"
                onClick={exportCSV}
                title="Export CSV"
              >
                <FaFileCsv />
              </button>
            </div>
          </div>

          <p className="student-count">
            Showing {filteredStudents.length} Students
          </p>

          {/* TABLE */}
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Roll No</th>
                  <th>Room</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan="4">No Students Found</td>
                  </tr>
                ) : (
                  filteredStudents.map((student) => (
                    <tr key={student._id}>
                      <td>{student.name}</td>
                      <td>{student.roll_no}</td>
                      <td>{student.room}</td>
                      <td>
                        <div className="actions">
                          <Link
                            to="/StudentProfile"
                            state={{ student }}
                            className="view"
                          >
                            View
                          </Link>
                          {(user.role === "Warden" ||
                            user.role === "Caretaker") && (
                            <>
                              <Link
                                to="/edit-student"
                                state={{ student }}
                                className="edit"
                              >
                                Edit
                              </Link>
                              <button
                                className="delete"
                                onClick={async () => {
                                  const confirmDelete = window.confirm(
                                    "Are You Sure?"
                                  );
                                  if (!confirmDelete) return;

                                  try {
                                    await API.delete(
                                      `/student/delete/${student._id}`
                                    );
                                    alert("Student Deleted");
                                    fetchStudents();
                                  } catch (error) {
                                    console.error(error);
                                    alert("Delete Failed");
                                  }
                                }}
                              >
                                Delete
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HostelStudents;