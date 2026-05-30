import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import API from "../services/api";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "../styles/ActivityLogs.css";

function ActivityLogs() {


  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
const admin = location.state?.admin;


  const [roleFilter, setRoleFilter] =
    useState("All");

  const [hostelFilter, setHostelFilter] =
    useState("");

  const [search, setSearch] =
    useState("");

  const fetchLogs = async () => {

    try {

      const response =
        await API.get(
          "/activity-logs"
        );

      setLogs(
        response.data.logs || []
      );

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchLogs();

  }, []);

  const filteredLogs = logs.filter(
    (log) => {

      const roleMatch =

        roleFilter === "All"

        ||

        log.role === roleFilter;

      const hostelMatch =

        hostelFilter === ""

        ||

        log.hostel === hostelFilter;

      const query =
        search.toLowerCase();

      const searchMatch =

        (log.user_id || "")
          .toLowerCase()
          .includes(query)

        ||

        (log.role || "")
          .toLowerCase()
          .includes(query)

        ||

        (log.hostel || "")
          .toLowerCase()
          .includes(query)

        ||

        (log.action_type || "")
          .toLowerCase()
          .includes(query);

      return (
        roleMatch &&
        hostelMatch &&
        searchMatch
      );

    }
  );

  const totalLogs =
    logs.length;

  const totalEntries =
    logs.filter(
      (log) =>
        log.action_type ===
        "ENTRY"
    ).length;

  const totalExits =
    logs.filter(
      (log) =>
        log.action_type ===
        "EXIT"
    ).length;

  const currentDate =
    new Date()
      .toLocaleDateString(
        "en-GB"
      )
      .replaceAll("/", "-");

  const getBadgeClass = (
    action
  ) => {

    if (
      action ===
      "CURFEW_MAIL_SENT"
    ) {
      return "badge-orange";
    }

    if (
      action ===
      "COMMENT_ADDED"
    ) {
      return "badge-blue";
    }

    if (
      action ===
      "LOGIN"
    ) {
      return "badge-green";
    }

    return "badge-default";

  };
return (
<>
  <Navbar
    admin={admin}
    showAdminDashboard={true}
    showLogout={true}
  />

  <div className="admin-hero">
    <div className="admin-hero-content">
      <div className="admin-hero-icon">
        🎓
      </div>

      <div>
        <h2>Administration Portal</h2>
        <p>
          Manage Students, Logs & Curfew System
        </p>
      </div>
    </div>
  </div>

  <div className="admin-dashboard-page">

     

      <div className="stats-grid">

        <div className="stat-card">

          <p>Total Logs</p>

          <h2>
            {totalLogs}
          </h2>

        </div>

        <div className="stat-card">

          <p>Total Entries</p>

          <h2 className="inside">
            {totalEntries}
          </h2>

        </div>

        <div className="stat-card">

          <p>Total Exits</p>

          <h2 className="outside">
            {totalExits}
          </h2>

        </div>

      </div>

      <div className="filter-card">

        <div className="filter-top">

          <div>

            <h3>
              Filter by Role
            </h3>

            <div className="hostel-buttons">

              {[
                "All",
                "Director",
                "Dean Academic",
                "Guard"
              ].map((role) => (

                <button
                  key={role}
                  className={
                    roleFilter === role
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setRoleFilter(role)
                  }
                >

                  {role}

                </button>

              ))}

            </div>

          </div>

          <div className="action-buttons">

            <button
              onClick={fetchLogs}
            >
              Refresh
            </button>

          </div>

        </div>

        <br />

        <h3>
          Filter by Hostel
        </h3>

        <div className="hostel-buttons">

          {[
            "Hostel 1",
            "Hostel 2",
            "Hostel 3",
            "Hostel 4",
            "Hostel 5"
          ].map((hostel) => (

            <button
              key={hostel}
              className={
                hostelFilter === hostel
                  ? "active"
                  : ""
              }
              onClick={() =>
                setHostelFilter(hostel)
              }
            >

              {hostel}

            </button>

          ))}

        </div>

        <input
          type="text"
          className="search-box"
          placeholder="Search by User ID, Role, Hostel or Action..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />

      </div>

      <div className="table-container">

        <table>

          <thead>

            <tr>

              <th>User ID</th>
              <th>Role</th>
              <th>Hostel</th>
              <th>Action</th>
              <th>Description</th>
              <th>Timestamp</th>

            </tr>

          </thead>

          <tbody>

            {loading ? (

              <tr>

                <td
                  colSpan="6"
                  className="empty-row"
                >

                  Loading...

                </td>

              </tr>

            ) : filteredLogs.length === 0 ? (

              <tr>

                <td
                  colSpan="6"
                  className="empty-row"
                >

                  No Activity Logs Found

                </td>

              </tr>

            ) : (

              filteredLogs.map(
                (
                  log,
                  index
                ) => (

                  <tr
                    key={index}
                  >

                    <td>
                      {log.user_id}
                    </td>

                    <td>
                      {log.role}
                    </td>

                    <td>
                      {log.hostel}
                    </td>

                    <td>

                      <span
                        className={`action-badge ${getBadgeClass(
                          log.action_type
                        )}`}
                      >

                        {log.action_type}

                      </span>

                    </td>

                    <td>
                      {log.description}
                    </td>

                    <td>
                      {log.timestamp}
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

export default ActivityLogs;