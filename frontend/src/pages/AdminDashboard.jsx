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
  const [studentsInside, setStudentsInside] = useState(0);
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

    setLogs(response.data.logs || []);
    setTotalRecords(response.data.total_records || 0);
    setStudentsInside(response.data.students_inside || 0);
    setStudentsOutside(response.data.students_outside || 0);
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
    "Hostel",
    "Room",
    "Phone",
    "Purpose",
    "Out Time",
    "In Time",
    "Status",
    "Comment",
  ];

  const rows = filteredLogs.map((log) => [
    log.name,
    log.roll,
    log.hostel,
    log.room,
    log.phone,
    log.purpose,
    log.outTime,
    log.inTime || "-",
    log.inTime ? "IN" : "OUT",
    log.comment_text || "-",
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  const blob = new Blob(
    [csvContent],
    { type: "text/csv;charset=utf-8;" }
  );

  const url =
    window.URL.createObjectURL(blob);

  const link =
    document.createElement("a");

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
      (log.name || "")
        .toLowerCase()
        .includes(query) ||
      (log.roll || "")
        .toLowerCase()
        .includes(query) ||
      (log.phone || "")
        .toLowerCase()
        .includes(query) ||
      (log.purpose || "")
        .toLowerCase()
        .includes(query);

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

  <AdminPortalHeader />

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
          <p>Students Inside</p>
          <h2 className="inside">
            {studentsInside}
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
    placeholder="Search by Name, Roll Number, Hostel, Phone or Purpose..."
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
              <th>Hostel</th>
              <th>Room</th>
              <th>Phone</th>
              <th>Purpose</th>
              <th>Out Time</th>
              <th>In Time</th>
              <th>Status</th>
              <th>Comment</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan="10"
                  className="empty-row"
                >
                  Loading...
                </td>
              </tr>
            ) : filteredLogs.length === 0 ? (
              <tr>
                <td
                  colSpan="10"
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
                    <td>{log.hostel}</td>
                    <td>{log.room}</td>
                    <td>{log.phone}</td>
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
                    <td>
                      {log.comment_text || "-"}
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
