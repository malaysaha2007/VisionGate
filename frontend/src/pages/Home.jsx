import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/Home.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Home() {
  const [stats, setStats] = useState({
    total: 0,
    inside: 0,
    outside: 0,
  });

  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    fetchLogs();
    updateClock();

    const interval = setInterval(updateClock, 1000);

    return () => clearInterval(interval);
  }, []);

  const fetchLogs = async () => {
    try {
      const response = await API.get("/logs");

      const logs = response.data;

      const total = logs.length;

      const inside = logs.filter(
        (log) => log.inTime && log.inTime !== ""
      ).length;

      const outside = total - inside;

      setStats({
        total,
        inside,
        outside,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const updateClock = () => {
    const now = new Date();

    const pad = (n) => n.toString().padStart(2, "0");

    const date =
      pad(now.getDate()) +
      "-" +
      pad(now.getMonth() + 1) +
      "-" +
      now.getFullYear();

    const time =
      pad(now.getHours()) +
      ":" +
      pad(now.getMinutes()) +
      ":" +
      pad(now.getSeconds());

    setCurrentTime(date + " " + time);
  };

  return (
    <div className="home-page">

      <Navbar showLogin={true} />
        



      {/* HERO */}
      <div className="hero">

        <h1>
          PDPM IIITDMJ Student Entry–Exit Management System
        </h1>

        <p>
          A secure digital platform to record, monitor, and manage student
          movement across the PDPM IIITDMJ campus with real-time access
          for administration and guards.
        </p>

      </div>

      {/* SUMMARY */}
      <section>

        <h2 className="section-title">
          Summary
        </h2>

        <p className="section-desc">
          Quick overview of current entry–exit status
        </p>

        <div className="summary-box">

          <div className="summary-header">

            <strong>Quick Stats</strong>

            <div className="timestamp">
              {currentTime}
            </div>

          </div>

          <div className="summary-grid">

            <div className="summary-item">
              <h3>{stats.total}</h3>
              <p>Total Records</p>
            </div>

            <div className="summary-item">
              <h3>{stats.inside}</h3>
              <p>Inside (IN)</p>
            </div>

            <div className="summary-item">
              <h3>{stats.outside}</h3>
              <p>Outside (OUT)</p>
            </div>

            <div className="summary-item">
              <h3>7</h3>
              <p>Hostels</p>
            </div>

          </div>

        </div>

      </section>

      {/* ABOUT */}
      <section>

        <h2 className="section-title">
          About the System
        </h2>

        <p className="section-desc">
          A centralized digital solution for PDPM IIITDMJ to ensure
          campus safety and accountability.
        </p>

        <div className="card-grid">

          <div className="card">
            <h3>Digital Logging</h3>
            <p>
              Automatic date and time–stamped entry–exit records
              for every student.
            </p>
          </div>

          <div className="card">
            <h3>Role-Based Access</h3>
            <p>
              Separate dashboards for students, administration,
              wardens, and guards.
            </p>
          </div>

          <div className="card">
            <h3>Enhanced Campus Monitoring</h3>
            <p>
              Guards can verify student movement at campus gates.
            </p>
          </div>

        </div>

      </section>

      {/* RULES */}
      <section>

        <h2 className="section-title">
          Basic Rules & Guidelines
        </h2>

        <div className="rules">

          <ul>

            <li>
              All students must log exit and entry through the portal.
            </li>

            <li>
              Guards will verify records at entry and exit points.
            </li>

            <li>
              Providing false information may lead to disciplinary action.
            </li>

            <li>
              Emergency movements must be reported to wardens or guards.
            </li>

            <li>
              Portal access is restricted to authorized personnel only.
            </li>

          </ul>

        </div>

      </section>

      {/* FOOTER */}
      <footer>
        © 2026 PDPM Indian Institute of Information Technology,
        Design and Manufacturing, Jabalpur
        <br />
        Student Entry–Exit Management System | Campus Safety Initiative
      </footer>

    </div>
  );
}

export default Home;