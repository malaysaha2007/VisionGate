import { useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import API from "../services/api";
import { FaSyncAlt, FaSearch, FaFilter, FaHistory, FaUndo } from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AdminPortalHeader from "../components/AdminPortalHeader";

import "../styles/ActivityLogs.css";

// Visual Mappings for SOC Theme
const ROLE_CONFIGS = {
  "Director": { icon: "👑", label: "Director" },
  "Guard": { icon: "🛡️", label: "Guard" },
  "Dean Academic": { icon: "🎓", label: "Dean Academic" },
  "Hostel Warden": { icon: "🏢", label: "Warden" }
};

const ACTION_CONFIGS = {
  ENTRY: { label: "Entry Approved", color: "green", dot: "🟢" },
  EXIT: { label: "Exit Recorded", color: "red", dot: "🔴" },
  LOGIN: { label: "System Login", color: "blue", dot: "🔵" },
  CURFEW_MAIL_SENT: { label: "Curfew Mail Sent", color: "orange", dot: "🟠" },
  COMMENT_ADDED: { label: "Comment Logged", color: "purple", dot: "🟣" },
  VACATION: { label: "Vacation Approved", color: "cyan", dot: "🔵" },
  DELETE: { label: "Record Deleted", color: "crimson", dot: "🔴" }
};

function ActivityLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const location = useLocation();
  const admin = location.state?.admin;

  // Filter States
  const [roleFilter, setRoleFilter] = useState("All");
  const [hostelFilter, setHostelFilter] = useState("All");
  const [actionFilter, setActionFilter] = useState("All");
  const [search, setSearch] = useState("");

  const fetchLogs = async () => {
    setRefreshing(true);
    try {
      const response = await API.get("/activity-logs");
      setLogs(response.data.logs || []);
    } catch (error) {
      console.error("SOC Error fetching logs:", error);
    } finally {
      setLoading(false);
      setTimeout(() => setRefreshing(false), 300);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  // 1. Dynamic Metric Computations (Derived Client-Side)
  const metrics = useMemo(() => {
    const total = logs.length;
    
    // Find today's date format matching backend timestamps
    const todayStr = new Date().toLocaleDateString("en-GB").replaceAll("/", "-");
    const todayLogs = logs.filter(log => log.timestamp?.includes(todayStr));
    const todayCount = todayLogs.length;

    // Calculate Most Active Role
    const roleCounts = logs.reduce((acc, log) => {
      if (log.role) acc[log.role] = (acc[log.role] || 0) + 1;
      return acc;
    }, {});
    
    let activeRole = "N/A";
    let maxActions = 0;
    Object.entries(roleCounts).forEach(([role, count]) => {
      if (count > maxActions) {
        maxActions = count;
        activeRole = role;
      }
    });

    // Calculate Mini-Chart Actions distribution
    const actionCounts = { ENTRY: 0, EXIT: 0, CURFEW: 0, OTHER: 0 };
    logs.forEach(log => {
      if (log.action_type === "ENTRY") actionCounts.ENTRY++;
      else if (log.action_type === "EXIT") actionCounts.EXIT++;
      else if (log.action_type === "CURFEW_MAIL_SENT") actionCounts.CURFEW++;
      else actionCounts.OTHER++;
    });

    // Latest action label
    const latestTime = logs[0] ? "Just Now" : "No Activity";

    return { total, todayCount, activeRole, maxActions, latestTime, actionCounts };
  }, [logs]);

  // 2. Client-Side Real-Time Filter Logic
  const filteredLogs = logs.filter((log) => {
    const roleMatch = roleFilter === "All" || log.role === roleFilter;
    const hostelMatch = hostelFilter === "All" || log.hostel === hostelFilter;
    const actionMatch = actionFilter === "All" || log.action_type === actionFilter;
    
    const query = search.toLowerCase();
    const searchMatch =
      (log.role || "").toLowerCase().includes(query) ||
      (log.hostel || "").toLowerCase().includes(query) ||
      (log.action_type || "").toLowerCase().includes(query) ||
      (log.description || "").toLowerCase().includes(query);

    return roleMatch && hostelMatch && actionMatch && searchMatch;
  });

  // 3. Temporal Feed Grouping (Today / Yesterday / Older)
  const groupedLogs = useMemo(() => {
    const todayStr = new Date().toLocaleDateString("en-GB").replaceAll("/", "-");
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toLocaleDateString("en-GB").replaceAll("/", "-");

    const groups = { Today: [], Yesterday: [], Older: [] };

    filteredLogs.forEach(log => {
      if (log.timestamp?.includes(todayStr)) {
        groups.Today.push(log);
      } else if (log.timestamp?.includes(yesterdayStr)) {
        groups.Yesterday.push(log);
      } else {
        groups.Older.push(log);
      }
    });

    return groups;
  }, [filteredLogs]);

  const resetFilters = () => {
    setRoleFilter("All");
    setHostelFilter("All");
    setActionFilter("All");
    setSearch("");
  };

  const getActionDetails = (actionType) => {
    return ACTION_CONFIGS[actionType] || { label: actionType, color: "default", dot: "⚪" };
  };

  const getRoleIcon = (role) => {
    return ROLE_CONFIGS[role]?.icon || "👤";
  };

  return (
    <>
      <Navbar admin={admin} showAdminDashboard={true} showLogout={true} />
      <AdminPortalHeader admin={admin} />

      <div className={`soc-dashboard-container ${refreshing ? "feed-refreshing" : ""}`}>
        
        {/* Header Block */}
        <div className="soc-header">
          <div>
            <h2>Activity Streams</h2>
            <p className="soc-subtitle">Real-time system telemetry and authorization monitoring logs</p>
          </div>
          <div className="soc-live-indicator">
            <span className="pulse-dot"></span>
            <span>SECURE LINK ACTIVE</span>
          </div>
        </div>

        {/* 4 Analytics Cards */}
        <div className="soc-stats-grid">
          <div className="soc-stat-card">
            <div className="card-top">
              <span className="card-label">TOTAL ACTIONS</span>
              <span className="trend-up">System Wide</span>
            </div>
            <h3>{metrics.total}</h3>
            <p className="card-subtext">+{metrics.todayCount} added today</p>
          </div>

          <div className="soc-stat-card highlight">
            <div className="card-top">
              <span className="card-label">TODAY'S METRICS</span>
              <span className="live-pill">LIVE FEED</span>
            </div>
            <h3>{metrics.todayCount}</h3>
            <p className="card-subtext">Awaiting synchronization</p>
          </div>

          <div className="soc-stat-card">
            <div className="card-top">
              <span className="card-label">MOST ACTIVE CONSOLE</span>
              <span className="trend-neutral">Peak Load</span>
            </div>
            <h3>{ROLE_CONFIGS[metrics.activeRole]?.label || metrics.activeRole}</h3>
            <p className="card-subtext">{metrics.maxActions} sequential events</p>
          </div>

          <div className="soc-stat-card">
            <div className="card-top">
              <span className="card-label">LAST TELEMETRY</span>
              <span className="time-icon"><FaHistory /></span>
            </div>
            <h3>{metrics.latestTime}</h3>
            <p className="card-subtext">No latency overhead</p>
          </div>
        </div>

        {/* Tiny Chart Visualization */}
        <div className="soc-mini-chart-card">
          <p className="chart-title">Current Load Distribution Tracker</p>
          <div className="mini-bar-wrapper">
            <div className="bar-segment green" style={{ width: `${(metrics.actionCounts.ENTRY / (metrics.total || 1)) * 100}%` }} title="Entries"></div>
            <div className="bar-segment red" style={{ width: `${(metrics.actionCounts.EXIT / (metrics.total || 1)) * 100}%` }} title="Exits"></div>
            <div className="bar-segment orange" style={{ width: `${(metrics.actionCounts.CURFEW / (metrics.total || 1)) * 100}%` }} title="Curfew Mails"></div>
            <div className="bar-segment mixed" style={{ width: `${(metrics.actionCounts.OTHER / (metrics.total || 1)) * 100}%` }} title="Other system actions"></div>
          </div>
          <div className="chart-legend">
            <span><span className="dot green"></span> Entries ({metrics.actionCounts.ENTRY})</span>
            <span><span className="dot red"></span> Exits ({metrics.actionCounts.EXIT})</span>
            <span><span className="dot orange"></span> Curfew Updates ({metrics.actionCounts.CURFEW})</span>
            <span><span className="dot mixed"></span> Configs ({metrics.actionCounts.OTHER})</span>
          </div>
        </div>

        {/* Compact Single Row Toolbar */}
        <div className="soc-filter-toolbar">
          <div className="search-input-wrapper">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search monitor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="dropdown-group">
            <div className="select-styled-container">
              <FaFilter className="inline-filter-icon" />
              <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
                <option value="All">All Consoles</option>
                <option value="Director">Director</option>
                <option value="Dean Academic">Dean Academic</option>
                <option value="Guard">Guard</option>
              </select>
            </div>

            <div className="select-styled-container">
              <select value={hostelFilter} onChange={(e) => setHostelFilter(e.target.value)}>
                <option value="All">All Locations</option>
                <option value="Hostel 1">Hostel 1</option>
                <option value="Hostel 2">Hostel 2</option>
                <option value="Hostel 3">Hostel 3</option>
                <option value="Hostel 4">Hostel 4</option>
                <option value="Hostel 5">Hostel 5</option>
              </select>
            </div>

            <div className="select-styled-container">
              <select value={actionFilter} onChange={(e) => setActionFilter(e.target.value)}>
                <option value="All">All Action Typologies</option>
                <option value="ENTRY">Entry Approved</option>
                <option value="EXIT">Exit Logged</option>
                <option value="CURFEW_MAIL_SENT">Mails Sent</option>
                <option value="COMMENT_ADDED">Comments Logged</option>
              </select>
            </div>
          </div>

          <div className="toolbar-action-buttons">
            <button onClick={resetFilters} className="soc-btn-secondary" title="Reset Filters">
              <FaUndo />
            </button>
            <button onClick={fetchLogs} className="soc-btn-primary" title="Sync Feed">
              <FaSyncAlt className={refreshing ? "spin-animation" : ""} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Modern Chronological Activity Stream Feed */}
        <div className="soc-activity-stream">
          {loading ? (
            <div className="soc-state-view">
              <div className="loader-pulse"></div>
              <p>Establishing secure socket connection to telemetry datastore...</p>
            </div>
          ) : filteredLogs.length === 0 ? (
            <div className="soc-state-view empty">
              <p>📭 Zero operations matched your specified filter variables.</p>
            </div>
          ) : (
            Object.entries(groupedLogs).map(([timeLabel, logsInGroup]) => {
              if (logsInGroup.length === 0) return null;
              return (
                <div key={timeLabel} className="timeline-block">
                  <div className="timeline-header-pill">
                    <span>{timeLabel.toUpperCase()}</span>
                  </div>
                  
                  <div className="timeline-nodes-container">
                    {logsInGroup.map((log, index) => {
                      const actionDetails = getActionDetails(log.action_type);
                      return (
                        <div key={index} className={`timeline-card border-theme-${actionDetails.color}`}>
                          {/* Colored status line */}
                          <div className="status-indicator-bar"></div>

                          {/* Left Column: Role Details */}
                          <div className="node-identity">
                            <span className="role-avatar">{getRoleIcon(log.role)}</span>
                            <div className="identity-text">
                              <h4>{log.role}</h4>
                              <span className="location-tag">{log.hostel || "Global Core"}</span>
                            </div>
                          </div>

                          {/* Center Column: Core Content Payload */}
                          <div className="node-payload">
                            <div className="badge-row">
                              <span className={`soc-badge badge-${actionDetails.color}`}>
                                {actionDetails.dot} {actionDetails.label}
                              </span>
                            </div>
                            <p className="payload-description">{log.description}</p>
                          </div>

                          {/* Right Column: Time Verification Metric */}
                          <div className="node-timestamp">
                            <span className="time-string">
                              {log.timestamp?.split(" ").slice(-2).join(" ") || log.timestamp}
                            </span>
                            <span className="date-string">
                              {log.timestamp?.split(" ")[0]}
                            </span>
                          </div>
                          
                          {/* Interactive Hover Vector Element */}
                          <div className="interactive-arrow-hint">➔</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ActivityLogs;