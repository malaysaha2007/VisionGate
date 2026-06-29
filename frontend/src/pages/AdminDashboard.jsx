import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

import {
  FaSyncAlt,
  FaEnvelope,
  FaFileCsv
} from "react-icons/fa";

import "../styles/AdminDashboard.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AdminPortalHeader from "../components/AdminPortalHeader";

function AdminDashboard() {
  const location = useLocation();
  const navigate = useNavigate();

  const admin = location.state?.admin;

  const [search, setSearch] = useState("");
  const [logs, setLogs] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [leaveCount, setLeaveCount] = useState(0);
  const [studentsOutside, setStudentsOutside] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedHostel, setSelectedHostel] = useState("All");
  const [refreshing, setRefreshing] = useState(false);

  const hostels = [
    "All",
    "Hostel 1",
    "Hostel 2",
    "Hostel 3",
    "Hostel 4",
    "Hostel 5",
  ];

  const fetchDashboard = async () => {
  setRefreshing(true);

  try {
    const response = await API.get("/admin/dashboard");

    const dashboardLogs = response.data.logs || [];

    setLogs(dashboardLogs);

    setTotalRecords(
      response.data.total_records || 0
    );

   

    setStudentsOutside(
      response.data.students_outside || 0
    );

    const leaveStudents = dashboardLogs.filter(
      (log) =>
        log.purpose === "Hospital" ||
        log.purpose === "Medical" ||
        log.purpose === "Leave" ||
        log.purpose === "Special Leave"
    );

    setLeaveCount(leaveStudents.length);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);

    setTimeout(() => {
      setRefreshing(false);
    }, 300);
  }
};

  const exportCSV = () => {
    const headers = [
      "Name",
      "Roll",
      "Room",
      "Purpose",
      "Out Time",
      "In Time",
      "Status"
    ];

    const rows = filteredLogs.map((log) => [
      log.name,
      log.roll,
      log.room,
      log.purpose,
      log.outTime,
      log.inTime || "-",
      log.inTime ? "IN" : "OUT"
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob(
      [csvContent],
      { type: "text/csv;charset=utf-8;" }
    );

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "student_records.csv";
    link.click();
    window.URL.revokeObjectURL(url);
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const filteredLogs = logs.filter((log) => {
    const matchesHostel =
      selectedHostel === "All" ||
      log.hostel === selectedHostel;

    const query = search.toLowerCase();

    const matchesSearch =
      (log.name || "").toLowerCase().includes(query) ||
      (log.roll || "").toLowerCase().includes(query) ||
      (log.purpose || "").toLowerCase().includes(query);

    return matchesHostel && matchesSearch;
  });

  if (!admin) {
    return (
      <>
        <Navbar />
        <AdminPortalHeader />
        <Footer />
      </>
    );
  }

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
        <div className="stats-grid">

      <div className="stat-card">
        <p>Total Records</p>
        <h2>{totalRecords}</h2>
      </div>

      <div className="stat-card">
        <p>Leave / Special Purpose</p>
        <h2 className="leave-count">
          {leaveCount}
        </h2>
      </div>

      <div className="stat-card">
        <p>Students Outside</p>
        <h2 className="outside">
          {studentsOutside}
        </h2>
      </div>

    </div>

        <div className="filter-card">
          <div className="filter-top">
            <div>
              <h3>Filter by Hostel</h3>
              <div className="hostel-buttons">
                {hostels.map((hostel) => (
                  <button
                    key={hostel}
                    className={
                      selectedHostel === hostel
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      setSelectedHostel(hostel)
                    }
                  >
                    {hostel}
                  </button>
                ))}
              </div>
            </div>

            <div className="action-buttons">
              <button
                onClick={fetchDashboard}
                title="Refresh"
                className="icon-btn"
              >
                <FaSyncAlt />
              </button>

              <button
                onClick={() =>
                  navigate("/curfew-mail", {
                    state: { admin }
                  })
                }
                title="Send Mail"
                className="icon-btn"
              >
                <FaEnvelope />
              </button>

              <button
                onClick={exportCSV}
                title="Export CSV"
                className="icon-btn"
              >
                <FaFileCsv />
              </button>
            </div>
          </div>

          <input
            type="text"
            placeholder="Search by Name, Roll Number, or Purpose..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="search-box"
          />
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Roll</th>
                <th>Room</th>
                <th>Purpose</th>
                <th>Out Time</th>
                <th>In Time</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan="7"
                    className="empty-row"
                  >
                    Loading...
                  </td>
                </tr>
              ) : filteredLogs.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="empty-row"
                  >
                    No Records Found
                  </td>
                </tr>
              ) : (
                filteredLogs.map(
                  (log, index) => (
                    <tr key={index}>
                      <td>{log.name}</td>
                      <td>{log.roll}</td>
                      <td>{log.room}</td>
                      <td>{log.purpose}</td>
                      <td>{log.outTime}</td>
                      <td>
                        {log.inTime || "-"}
                      </td>
                      <td>
                        {log.inTime
                          ? "IN"
                          : "OUT"}
                      </td>
                    </tr>
                  )
                )
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default AdminDashboard;