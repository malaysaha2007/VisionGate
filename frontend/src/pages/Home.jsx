import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import CountUp from "react-countup";

import AOS from "aos";
import "aos/dist/aos.css";

import {
  FaUserShield,
  FaChartLine,
  FaHistory,
  FaServer,
  FaShieldAlt,
  FaTachometerAlt,
  FaArrowRight,
  FaArrowDown
} from "react-icons/fa";

import API from "../services/api";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "../styles/Home.css";

import Tilt from "react-parallax-tilt";



function Home() {
  const [stats, setStats] = useState({
    total: 0,
    inside: 0,
    outside: 0,
  });

  const [activities, setActivities] = useState([]);

  const [currentTime, setCurrentTime] = useState("");

useEffect(() => {
  fetchLogs();
  updateClock();

  AOS.init({
    duration: 1000,
    once: true,
  });

  const timer = setInterval(updateClock, 1000);

  return () => clearInterval(timer);
}, []);

  const fetchLogs = async () => {
    try {
      const response = await API.get("/logs");

      const logs = response.data || [];

      const total = logs.length;

      const inside = logs.filter(
        (log) => log.inTime && log.inTime !== null
      ).length;

      const outside = total - inside;

      setStats({
        total,
        inside,
        outside,
      });

      setActivities(logs.slice(-5).reverse());
    } catch (error) {
      console.error(error);
    }
  };

  const updateClock = () => {
    const now = new Date();

    setCurrentTime(
      now.toLocaleDateString() +
      " | " +
      now.toLocaleTimeString()
    );
  };

  return (


    
    <div className="home-page">

      <Navbar showLogin={true} />


      <div className="grid-background"></div>

<div className="floating-blob blob-1"></div>
<div className="floating-blob blob-2"></div>
<div className="floating-blob blob-3"></div>

<div className="floating-icon icon-1">
  <FaShieldAlt />
</div>

<div className="floating-icon icon-2">
  <FaServer />
</div>

<div className="floating-icon icon-3">
  <FaHistory />
</div>

      {/* HERO */}

      <section className="hero-section">

<div className="hero-layout">

  <div className="hero-left">

  
          <div className="visiongate-badge">
            VISIONGATE
          </div>

          <h1>
            Smart Campus Entry–Exit Monitoring System
          </h1>

          <p>
            AI-powered student movement monitoring platform
            designed for secure campus access, automated
            verification, vacation approval workflows,
            and real-time security tracking.
          </p>


          <div className="hero-metrics">

  <div className="metric">
    <h3>5000+</h3>
    <span>Logs Recorded</span>
  </div>

  <div className="metric">
    <h3>99.9%</h3>
    <span>Recognition Accuracy</span>
  </div>

  <div className="metric">
    <h3>7</h3>
    <span>Hostels Connected</span>
  </div>

</div>


        </div>

     

  <div className="hero-right">

    <Tilt
  tiltMaxAngleX={15}
  tiltMaxAngleY={15}
  perspective={1200}
  glareEnable={true}
  glareMaxOpacity={0.2}
  scale={1.03}
>
  
  <div className="face-card tilt-card">
    <div className="scan-ring"></div>

    <img
      src="..\Iiitdmj_logo.jpg"
      alt="Face Recognition"
      className="face-image"
    />

    <div className="face-info">
      <h3>Face Recognition</h3>
      <p>Real-time Hostel Entry Verification</p>
    </div>

    <div className="scan-status">
      <span className="status-dot"></span>
      Identity Verified
    </div>
  </div>

  </Tilt>
</div>



<div className="dashboard-preview">

    <div className="hero-buttons">

            <Link
              to="/student-login"
              className="primary-btn"
            >
              Student Portal
            </Link>

            <Link
              to="/admin-login"
              className="secondary-btn"
            >
              Admin Dashboard
            </Link>

          </div>

  <div className="preview-card">
    <span className="card-label">
      Students Inside
    </span>

    <h2>{stats.inside}</h2>

    <small>+12 today</small>
  </div>

  <div className="preview-card">
    <span className="card-label">
      Students Outside
    </span>

    <h2>{stats.outside}</h2>

    <small>Currently Out</small>
  </div>

  <div className="preview-card">
    <span className="card-label">
      Active Hostels
    </span>

    <h2>7</h2>

    <small>Connected</small>
  </div>

</div>

</div>

      </section>




      <section className="status-strip"
      data-aos="fade-right"
>


  <div>
    System Status:
    <span className="online">
      ONLINE
    </span>
  </div>

  <div>
    Last Sync:
    {currentTime}
  </div>

</section>



      <section className="ai-performance-section">

<h2>System Intelligence</h2>

<div className="performance-bars">

<div className="performance-item">
  <span>Face Recognition Accuracy</span>
  <div className="progress">
    <div className="fill accuracy"></div>
  </div>
  <strong>99.9%</strong>
</div>

<div className="performance-item">
  <span>Verification Speed</span>
  <div className="progress">
    <div className="fill speed"></div>
  </div>
  <strong>95%</strong>
</div>

<div className="performance-item">
  <span>System Availability</span>
  <div className="progress">
    <div className="fill uptime"></div>
  </div>
  <strong>100%</strong>
</div>

</div>

</section>

      {/* LIVE STATS */}
<section className="live-stats-section">
      <div className="stats">
          
            <div className="stats-grid"
            data-aos="zoom-in">

              <div className="stat-card">
    <h2>{stats.total}</h2>           <p>Total Logs</p>
              </div>

              <div className="stat-card">
    <h2>{stats.inside}</h2>          <p>Inside Campus</p>
              </div>
            </div>
              <div className="stats-grid"
              data-aos="zoom-in">
              <div className="stat-card">
    <h2>{stats.outside}</h2>          <p>Outside Campus</p>
              </div>

              <div className="stat-card">
                <h2>7</h2>
                <p>Hostels</p>
              </div>
            </div>
    </div>

      <div className="live-feed">

              <h2 className="section-title">
              Live Security Feed
              </h2>

              <div className="feed-container">
                {activities.length > 0 ? (
                  activities.map((item, index) => (
                    <div key={index} className="feed-card" data-aos="fade-left">
                      <h4>{item.name}</h4>
                      <p>{item.roll}</p>
                      <span>{item.outTime || item.inTime}</span>
                    </div>
                  ))
                ) : (
                  <div className="empty-feed-state">
                    <div className="spinner"></div>
                    <p>Waiting for secure access logs...</p>
                  </div>
                )}
              </div>

      </div>
</section>
      



      {/* FEATURES */}

<section
  className="features-section"
  data-aos="fade-up"
>
        <h2 className="section-title">
          Platform Features
        </h2>

        <div className="feature-grid">

          <div className="feature-card">
            <FaUserShield className="feature-icon" />
            <h3>Face Recognition</h3>
            <p>
              Secure identity verification through
              facial authentication.
            </p>
          </div>

          <div className="feature-card">
            <FaChartLine className="feature-icon" />
            <h3>Real-Time Monitoring</h3>
            <p>
              Track student movement and access
              activity instantly.
            </p>
          </div>

          <div className="feature-card">
            <FaShieldAlt className="feature-icon" />
            <h3>Security Workflow</h3>
            <p>
              Multi-level approval and secure
              campus access management.
            </p>
          </div>

          <div className="feature-card">
            <FaTachometerAlt className="feature-icon" />
            <h3>Analytics Dashboard</h3>
            <p>
              Comprehensive monitoring and
              reporting system.
            </p>
          </div>

          <div className="feature-card">
  <FaHistory className="feature-icon" />

  <h3>Activity Logs</h3>

  <p>
    Complete history of all
    campus movement records.
  </p>
</div>

<div className="feature-card">
  <FaServer className="feature-icon" />

  <h3>Cloud Database</h3>

  <p>
    Secure centralized storage
    powered by MongoDB.
  </p>
</div>

        </div>

      </section>


 {/* Workfloe-Network */}

<section className="workflow-network-section">

  {/* Workflow */}
<div
  className="workflow-section"
  
>
        <h2 className="section-title"
        data-aos="zoom-in">
          How VisionGate Works
        </h2>

        <div className="workflow">

          <div className="step-card"
          data-aos="zoom-in">
            <span>01</span>
            <h3>Student</h3>
          </div>

          <FaArrowDown className="workflow-arrow" />

          <div className="step-card"
          data-aos="zoom-in">
            <span>02</span>
            <h3>Face Scan</h3>
          </div>

          <FaArrowDown className="workflow-arrow" />

          <div className="step-card"
          data-aos="zoom-in">
            <span>03</span>
            <h3>Verification</h3>
          </div>

          <FaArrowDown className="workflow-arrow" />

          <div className="step-card"
          data-aos="zoom-in">
            <span>04</span>
            <h3>Permission Check</h3>
          </div>

          <FaArrowDown className="workflow-arrow" />

          <div className="step-card"
          data-aos="zoom-in">
            <span>05</span>
            <h3>Entry Logged</h3>
          </div>

        </div>
</div>

{/* Network */}

<div className="network-security">
    <div className="network-section"
    data-aos="zoom-out">

<h2 className="section-title">
Connected Campus
</h2>

<div className="network-map">

<div className="node">
Main Gate
</div>

<div className="node">
Hostel A
</div>

<div className="node">
Hostel B
</div>

<div className="node">
Hostel C
</div>

<div className="node">
Hostel D
</div>

<div className="node">
Hostel E
</div>

<div className="node">
Hostel F
</div>

<div className="node">
Dashboard
</div>

</div>

</div>
<div className="security-preview"
data-aos="zoom-out">

<h2 className="section-title">
Security Center
</h2>

<div className="security-grid">

<div className="security-card">
<h3>Threat Level</h3>
<p>Low</p>
</div>

<div className="security-card">
<h3>System Health</h3>
<p>99.9%</p>
</div>

<div className="security-card">
<h3>Active Monitoring</h3>
<p>24/7</p>
</div>

</div>

</div>
</div>
      </section>


{/* TechStack-SystemArchitecture-Rules */}

<section className="techstack-systemArch-rules-section">

    <div className="techstack-architecture-section"
     data-aos="zoom-in">

      {/* TechStack */}
      <div className="tech-stack">

<h2 className="section-title">
Technology Stack
</h2>

<div className="tech-grid">

<div className="tech-badge">
React
</div>

<div className="tech-badge">
FastAPI
</div>

<div className="tech-badge">
MongoDB
</div>

<div className="tech-badge">
OpenCV
</div>

<div className="tech-badge">
Face Recognition
</div>

<div className="tech-badge">
Expo
</div>

</div>
</div>

{/* Architecture */}

<div
  className="architecture"
>
        <h2 className="section-title">
          System Architecture
        </h2>

        <div className="architecture-flow">

          <div className="arch-card">Student</div>

          <FaArrowRight />

          <div className="arch-card">
            VisionGate App
          </div>

          <FaArrowRight />

          <div className="arch-card">
            Face Recognition
          </div>

          <FaArrowRight />

          <div className="arch-card">
            Backend API
          </div>

          <FaArrowRight />

          <div className="arch-card">
            MongoDB
          </div>

          <FaArrowRight />

          <div className="arch-card">
            Dashboard
          </div>

        </div>

      </div>

</div>

      {/* RULES */}

      <div className="rules-section"
       data-aos="fade-left"
       >

        <h2 className="section-title">
          Rules & Guidelines
        </h2>

        <ul>
          <li>All students must log entry and exit activity.</li>
          <li>Guards must verify movement at gate checkpoints.</li>
          <li>False information may result in disciplinary action.</li>
          <li>Emergency movement must be reported immediately.</li>
          <li>Access is restricted to authorized users only.</li>
        </ul>

      </div>

</section>

     
      

      {/* BENEFITS */}

<section
  className="benefits-section"
  data-aos="fade-up"
>
        <h2 className="section-title">
          Why VisionGate?
        </h2>

        <div className="benefits-grid">

          <div className="benefit-card">
            <h3>Enhanced Security</h3>
            <p>
              Prevent unauthorized access through
              digital verification.
            </p>
          </div>

          <div className="benefit-card">
            <h3>Automation</h3>
            <p>
              Eliminate manual entry registers.
            </p>
          </div>

          <div className="benefit-card">
            <h3>Transparency</h3>
            <p>
              Accurate and traceable movement logs.
            </p>
          </div>

          <div className="benefit-card">
            <h3>Centralized System</h3>
            <p>
              Single platform for hostel and gate
              operations.
            </p>
          </div>

        </div>

      </section>



<section className="lastTwo-boxes-section">
      <div className="visiongate-highlight"
      data-aos="fade-right"
>

  <h2>
    Built For Modern Campuses
  </h2>

  <p>
    VisionGate combines AI-powered
    verification, automated workflows,
    centralized monitoring and secure
    student tracking into one platform.
  </p>

</div>

<div className="premium-cta" >

<h2 data-aos="zoom-out">
Ready To Experience
VisionGate?
</h2>

<p data-aos="zoom-in">
Secure your campus with
AI-powered monitoring.
</p>

<div className="cta-buttons"
data-aos="zoom-in"
>

<Link
to="/student-login"
className="primary-btn"
>
Student Portal
</Link>

<Link
to="/admin-login"
className="secondary-btn"
>
Admin Dashboard
</Link>

</div>
</div>

</section>

      <Footer />

    </div>
  );
}

export default Home;