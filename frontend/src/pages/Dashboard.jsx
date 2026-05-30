import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const response = await API.get("/logs");
      setLogs(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>VisionGate Dashboard</h1>

      {logs.map((log, index) => (
        <div
          key={index}
          style={{
            border: "1px solid gray",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "10px",
          }}
        >
          <h3>{log.name}</h3>
          <p>Roll: {log.roll}</p>
          <p>Hostel: {log.hostel}</p>
          <p>Purpose: {log.purpose}</p>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;